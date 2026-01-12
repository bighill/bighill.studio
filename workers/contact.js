/**
 * Cloudflare Worker for handling contact form submissions
 * Sends emails via Resend API
 */

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://bighill.studio",
  "https://bighill.github.io",
  "http://localhost:8181",
];

/**
 * Gets the allowed origin from the request, or null if not allowed
 * @param {Request} request - The incoming request
 * @returns {string|null} - The origin if allowed, null otherwise
 */
function getAllowedOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) {
    return null;
  }

  // Check exact matches first
  if (ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }

  // For GitHub Pages, check if origin starts with the base URL
  if (origin.startsWith("https://bighill.github.io")) {
    return origin;
  }

  return null;
}

/**
 * Truncates message content to maximum length
 * @param {string} message - The message content to truncate
 * @returns {string} - The message, truncated if necessary
 */
function truncateMessage(message) {
  if (typeof message !== "string") {
    return "";
  }

  // Truncate to 5000 characters if longer (gracefully, no error)
  const MAX_LENGTH = 5000;
  if (message.length > MAX_LENGTH) {
    return message.substring(0, MAX_LENGTH);
  }

  return message;
}

export default {
  async fetch(request, env) {
    const allowedOrigin = getAllowedOrigin(request) || "";

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      });
    }

    try {
      // Parse request body
      const body = await request.json();
      let { email, message } = body;

      // Validate input
      if (!email || !message) {
        return new Response(
          JSON.stringify({ error: "Email and message are required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": allowedOrigin,
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
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": allowedOrigin,
            },
          }
        );
      }

      // Truncate message if too long (JSON.stringify handles escaping)
      message = truncateMessage(message);

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
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": allowedOrigin,
            },
          }
        );
      }

      // Send email via Resend
      // Note: JSON.stringify automatically escapes special characters in the email body
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
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": allowedOrigin,
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
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      });
    }
  },
};
