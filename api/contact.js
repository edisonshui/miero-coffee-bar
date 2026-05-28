export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, org, email, phone, type, date, guests, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Miero Inquiry Form <onboarding@resend.dev>',
      to: ['miero@endlessgrp.com'],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New Event Inquiry</h2>
        <table>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          ${org ? `<tr><td><strong>Organization</strong></td><td>${org}</td></tr>` : ''}
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          ${type ? `<tr><td><strong>Event type</strong></td><td>${type}</td></tr>` : ''}
          ${date ? `<tr><td><strong>Preferred date</strong></td><td>${date}</td></tr>` : ''}
          ${guests ? `<tr><td><strong>Estimated guests</strong></td><td>${guests}</td></tr>` : ''}
          ${message ? `<tr><td><strong>Message</strong></td><td>${message}</td></tr>` : ''}
        </table>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
}
