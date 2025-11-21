import { createClient } from '@supabase/supabase-js'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { SignJWT } from 'jose'
import { jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(1, { message: 'Name is required' })
})

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      return Response.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { email, password, name } = validationResult.data

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw new Error(fetchError.message)
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password: hashedPassword,
          name
        }
      ])
      .select()
      .single()

    if (insertError) {
      throw new Error(insertError.message)
    }

    // Generate JWT token
    const token = await new SignJWT({ 
      id: newUser.id, 
      email: newUser.email,
      name: newUser.name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    // Return success response with token
    return Response.json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)

    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}