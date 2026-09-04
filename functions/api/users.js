const json = (body, status = 200, extraHeaders = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=UTF-8',
    ...extraHeaders,
  },
});

export async function onRequestPost({ request, env }) {
  let body;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const fullName = typeof body?.full_name === 'string' ? body.full_name.trim() : '';

  if (!email || !fullName) {
    return json({ error: 'Email and full_name are required.' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please provide a valid email address.' }, 400);
  }

  if (fullName.length > 160 || email.length > 254) {
    return json({ error: 'One or more fields are too long.' }, 400);
  }

  try {
    const result = await env.DB
      .prepare('INSERT INTO Users (email, full_name) VALUES (?, ?)')
      .bind(email, fullName)
      .run();

    return json({ success: true, id: result.meta?.last_row_id ?? null }, 200);
  } catch (error) {
    if (String(error?.message).toLowerCase().includes('unique')) {
      return json({ error: 'This email is already on the waitlist.' }, 409);
    }

    console.error('Unable to insert waitlist user:', error);
    return json({ error: 'Unable to save your details right now.' }, 500);
  }
}

export async function onRequest({ request, ...context }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method Not Allowed' }, 405, { allow: 'POST' });
  }

  return onRequestPost({ request, ...context });
}
