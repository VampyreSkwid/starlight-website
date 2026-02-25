import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1da2e686/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit registration form
app.post("/make-server-1da2e686/submit-registration", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    const { companyName, contactName, title, email, assetType } = body;
    
    if (!companyName || !contactName || !title || !email || !assetType) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }
    
    // Create a unique ID for this submission
    const submissionId = `registration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the submission with timestamp
    const submission = {
      id: submissionId,
      companyName,
      contactName,
      title,
      email,
      assetType,
      submittedAt: new Date().toISOString(),
    };
    
    await kv.set(submissionId, submission);
    
    console.log(`Registration submitted successfully: ${email} from ${companyName}`);
    
    return c.json({ 
      success: true, 
      message: "Registration submitted successfully",
      submissionId 
    });
  } catch (error) {
    console.error("Error submitting registration:", error);
    return c.json({ error: "Failed to submit registration" }, 500);
  }
});

// Get all registrations (for admin access)
app.get("/make-server-1da2e686/registrations", async (c) => {
  try {
    const registrations = await kv.getByPrefix("registration_");
    
    // Sort by submission date (newest first)
    const sorted = registrations.sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
    
    return c.json({ 
      success: true, 
      count: registrations.length,
      registrations: sorted 
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return c.json({ error: "Failed to fetch registrations" }, 500);
  }
});

Deno.serve(app.fetch);