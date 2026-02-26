# Automated Alerts Setup Guide (Make.com)

To get instant email alerts and automatic Google Sheets updates whenever someone submits a form on your website, we will use **Make.com** to catch the data seamlessly from your database.

This process requires no code and is entirely free!

## Step 1: Set up the Receiver (Make.com)
1. Go to [Make.com](https://www.make.com) and create a free account.
2. In your dashboard, click **Create a new scenario** in the top right.
3. Click the giant `+` button in the center of the screen to add your first module.
4. Search for **Webhooks** and select it.
5. Choose **Custom Webhook** as the trigger.
6. Click **Create a webhook**. Name it something like "Starlight Form Submissions" and click Save.
7. **Copy the unique URL** it generates (e.g., `https://hook.us1.make.com/...`). 
   *Keep this window open! It is currently "listening" for a test signal.*

## Step 2: Set up the Sender (Supabase)
1. In a new tab, open your [Supabase Dashboard](https://supabase.com/dashboard/projects) and go to your project.
2. On the left menu, click on **Database** (the database icon), then click **Webhooks** in the sub-menu.
3. Click **Create an Event Destination** -> **Webhook**. 
4. Fill out the form:
   - **Name**: "Make Notification Trigger"
   - **Table**: Select `public.registrations` (You will repeat this whole process later for the `contacts` table if you want alerts for both).
   - **Events**: Check **Insert**. 
   - **Method**: POST
   - **URL**: Paste the Make.com Webhook URL you copied in Step 1!
5. Scroll down to **HTTP Headers**. You don't need to add any.
6. Click **Create webhook**.

*(Alternative Note: If you prefer to bypass the UI, you can run the SQL script I provided in chat directly in the SQL Editor!)*

## Step 3: Send a Test Signal
Your pipes are now connected! Let's test them.
1. Go to your live website (`starlightrwa.com`) and fill out a dummy Registration form.
2. Go back to your Make.com tab. You should see a green box saying **"Successfully determined!"**. This means Make.com heard your database! Click **OK**.

## Step 4: Add Your Actions!
Now that Make.com has the data, you can tell it what to do with it.

### Action A: Send an Email Alert
1. In Make.com, hover next to your Webhook module and click the `+` to add another module.
2. Search for **Email** (or Gmail, or Outlook, depending on what you use) and select **Send an email**.
3. Connect your email account when prompted.
4. **Subject**: Type something like `New Lead: ` and then click inside the box. A menu will appear showing the data Make caught from your test. Click on `record.company_name`!
5. **Content**: Design your email! You can type text and click the dynamic fields (like `record.email`, `record.contact_name`) to insert the data exactly where you want it.
6. Click **OK**.

### Action B: Add to Google Sheets
1. Hover next to your Email module and click `+` again to add one final module.
2. Search for **Google Sheets** and select **Add a Row**.
3. Connect your Google account.
4. Select the specific Spreadsheet and Worksheet you want to use. Make will automatically load the column headers from your sheet!
5. Simply drag and drop the dynamic data from the Webhook (like `record.email`) into the corresponding Google Sheet column fields.
6. Click **OK**.

## Step 5: Turn It On!
Look at the bottom left of your Make.com screen. Switch the **Scheduling** toggle to **ON**. 

You are done! You will now instantly receive nicely formatted emails and spreadsheet rows the second someone clicks submit on your website!
