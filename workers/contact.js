/**
 * Cloudflare Worker for handling contact form submissions
 * Sends emails via Resend API
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    try {
      // Parse request body
      const body = await request.json();
      const { email, message } = body;

      // Validate input
      if (!email || !message) {
        return new Response(
          JSON.stringify({ error: "Email and message are required" }),
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email address" }),
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Validate environment variables
      if (!env.RESEND_API_KEY || !env.FROM_EMAIL || !env.TO_EMAIL) {
        return new Response(
          JSON.stringify({
            error: "Server configuration error",
            details: "Missing required environment variables",
          }),
          {
            status: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Send email via Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: env.TO_EMAIL,
          reply_to: email,
          subject: `Bighill Studio Contact Form`,
          text: `${email}\n\n${message}`,
        }),
      });

      if (!resendResponse.ok) {
        let errorData;
        try {
          errorData = await resendResponse.json();
        } catch (e) {
          errorData = {
            message: (await resendResponse.text()) || "Unknown error",
          };
        }
        return new Response(
          JSON.stringify({
            error: "Failed to send email",
            details: errorData.message || errorData.error || "Unknown error",
          }),
          {
            status: 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Success response
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }
  },
};
