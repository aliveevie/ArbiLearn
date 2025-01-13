'use server'

import { revalidatePath } from 'next/cache'
import { createVerificationsTable } from "@/lib/db-tables";

export async function verifyForm(formData: FormData) {
  // Log the form data
  await createVerificationsTable();
  console.log('Form data received:')
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`)
  }

  // Here you would typically process the form data,
  // save it to a database, or send it to an API

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Revalidate the courses page
  revalidatePath('/courses')

  return { success: true }
}