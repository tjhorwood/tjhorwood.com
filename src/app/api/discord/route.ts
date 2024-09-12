import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: 3, // 100 requests
  duration: 600, // Per 10 minutes (600 seconds) by IP
});

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1'; // Get the user's IP address

  try {
    // Consume 1 point for each request from this IP
    await rateLimiter.consume(ip);

    // Parse the incoming request body
    const { firstname, lastname, email, subject, message } =
      await request.json();

    const payload = {
      content: '**New Contact Form Submission**',
      embeds: [
        {
          fields: [
            { name: 'Name', value: `${firstname} ${lastname}`, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Subject', value: subject },
            { name: 'Message', value: message },
            { name: 'IP Address', value: ip },
          ],
          footer: { text: 'tjhorwood.com' },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Send the message to Discord via webhook
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Check if the Discord API returned an error
    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    // Return a success response if everything went fine
    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle rate limiting errors (IP exceeded limit)
    if (error instanceof Error && error instanceof RateLimiterMemory) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Try again later.' },
        { status: 429 },
      );
    }

    // Handle other errors (e.g., API or server issues)
    console.error(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
