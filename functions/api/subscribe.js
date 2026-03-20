export async function onRequestPost(context) {
  const RESEND_API_KEY = 're_M3fpqSN9_7CceEgd28kHK5s8WJ4a1kWys';
  const AUDIENCE_ID = '144e13c0-4ad9-46af-a98e-1b8b1aba96ed';
  
  try {
    const formData = await context.request.formData();
    const email = formData.get('email');
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Add to Resend audience
    const response = await fetch('https://api.resend.com/audiences/' + AUDIENCE_ID + '/contacts', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        unsubscribed: false
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Redirect back with success
      return Response.redirect('https://asianbus.com/?subscribed=1', 302);
    } else {
      return Response.redirect('https://asianbus.com/?error=1', 302);
    }
  } catch (err) {
    return Response.redirect('https://asianbus.com/?error=1', 302);
  }
}
