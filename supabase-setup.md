# Supabase Setup Guide for Starlight RWA

To securely store and view your form submissions in your own database (and use the new `/admin` dashboard), follow these fast steps:

## 1. Create a Supabase Project
1. Go to [database.new](https://database.new) (Supabase).
2. Create a new organization and project (the free tier is perfect).
3. Once your project is ready, go to **Project Settings -> API**.
4. Copy the **Project URL** and the **anon / public API Key**.

## 2. Connect Your Website
1. Go to your **Cloudflare Pages Dashboard** -> `starlight-website` -> **Settings** -> **Environment variables**.
2. Add these two variables (make sure the names match exactly):
   - `VITE_SUPABASE_URL` = (Paste your Project URL)
   - `VITE_SUPABASE_ANON_KEY` = (Paste your Anon API Key)
3. Click **Save** and trigger a new deployment (or just let GitHub push the next update).

## 3. Create Your Tables
We need to create the folders (tables) in your database for the forms to drop data into.
1. In your Supabase Dashboard, go to the **SQL Editor** on the left menu.
2. Click **New query**.
3. Paste the entire block of code below and click **Run**.

```sql
-- Create the registrations table
CREATE TABLE registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  title text NOT NULL,
  email text NOT NULL,
  asset_type text NOT NULL
);

-- Create the contacts table
CREATE TABLE contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (so forms can save data)
CREATE POLICY "Allow public insert to registrations" ON registrations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert to contacts" ON contacts FOR INSERT TO public WITH CHECK (true);

-- Allow reading data (so the Admin Dashboard can fetch the records)
CREATE POLICY "Allow public select from registrations" ON registrations FOR SELECT TO public USING (true);
CREATE POLICY "Allow public select from contacts" ON contacts FOR SELECT TO public USING (true);
```

## 4. You're Done!
Your website will now seamlessly save all future form submissions directly into your new, private database! 

To view the data, simply go to your website and add `/admin` to the end of the URL (e.g., `starlightrwa.com/admin`). The Admin Dashboard will instantly pull and display all your submissions.
