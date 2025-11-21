import { createClient } from '@/lib/supabase'
import { validateLogin } from '@/lib/validation'
import { generateToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate input
    const validation = validateLogin(data)
    if (!validation.success) {
      return Response.json(
        { 
          error: 'Validation failed',
          details: validation.error.flatten()
        },
        { status: 400 }
      )
    }

    const { email, password } = data

    // Create Supabase client
    const supabase = createClient(
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, password_hash, name')
      .eq('email', email)
      .single()

    if (userError || !userData) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, userData.password_hash)
    if (!isValidPassword) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      id: userData.id,
      email: userData.email,
      name: userData.name
    })

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    // Return user data without password hash
    const { password_hash, ...userWithoutPassword } = userData

    return Response.json({
      user: userWithoutPassword,
      token
    }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}