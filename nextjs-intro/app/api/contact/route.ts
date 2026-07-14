export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, message } = body

  // Basic validation
  if (!name || !email || !message) {
    return Response.json(
      { error: 'All fields are required' },
      { status: 400 }
    )
  }

  // In a real app you'd send an email or save to a database here
  console.log('New contact submission:', { name, email, message })

  return Response.json(
    { success: true, message: 'Message received!' },
    { status: 200 }
  )
}