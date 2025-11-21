import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(1, 'Name is required'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Store visit validation schemas
export const storeVisitSchema = z.object({
  store_name: z.string().min(1, 'Store name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip_code: z.string().min(1, 'ZIP code is required'),
  contact_person: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().email('Invalid email address').optional().or(z.literal('')),
  visit_date: z.string().min(1, 'Visit date is required'),
  testing_status: z.enum(['pending', 'in_progress', 'completed', 'failed'], {
    required_error: 'Testing status is required',
  }),
  notes: z.string().optional(),
});

export const updateStoreVisitSchema = storeVisitSchema.partial().extend({
  id: z.string().min(1, 'ID is required'),
});

// Validation function for API routes
export function validateRequest(schema, data) {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      return { success: false, errors };
    }
    return { success: false, errors: [{ path: 'unknown', message: 'Validation failed' }] };
  }
}