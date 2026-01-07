# GitHub Pages Deployment - Step by Step

## Prerequisites
- GitHub account (create at https://github.com if you don't have one)
- Your Royal Circle form files (already ready in `C:\Users\USER\royal-circle-form`)

---

## Step 1: Create a GitHub Account
1. Go to https://github.com
2. Click "Sign up"
3. Fill in your email, password, and username
4. Verify your email
5. Done!

---

## Step 2: Create a New Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `royal-circle-form`
   - **Description:** "The Royal Circle - Heritage & Creative Community Form"
   - **Visibility:** Public
3. Do NOT initialize with README (we have our own)
4. Click "Create repository"

---

## Step 3: Push Your Code to GitHub

Run these commands in PowerShell from your project folder:

### Option A: Using HTTPS (Easier)

```powershell
cd C:\Users\USER\royal-circle-form

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/royal-circle-form.git

# Rename branch to main
git branch -M main

# Push your code
git push -u origin main
```

When prompted for password, use a **Personal Access Token** (not your password):
1. Go to https://github.com/settings/tokens/new
2. Select scopes: `repo`
3. Generate token
4. Copy and paste when prompted

### Option B: Using SSH (More secure, if you prefer)

```powershell
# Set up SSH key first at https://github.com/settings/keys
cd C:\Users\USER\royal-circle-form

git remote add origin git@github.com:YOUR_USERNAME/royal-circle-form.git
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages

1. Go to https://github.com/YOUR_USERNAME/royal-circle-form
2. Click **Settings** (on the repository page)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
5. Click **Save**

**Note:** A GitHub Actions workflow has been set up automatically. Once you enable GitHub Actions as the source, it will automatically deploy your form whenever you push changes to the main branch.

---

## Step 5: Your Form is Live!

Your form will be available at:
```
https://YOUR_USERNAME.github.io/royal-circle-form/
```

**Wait 1-2 minutes for GitHub to build and deploy.**

---

## Verify It's Working

1. Visit `https://YOUR_USERNAME.github.io/royal-circle-form/`
2. Your form should appear!
3. Share this URL with anyone

---

## Making Future Updates

If you update your form, just run:

```powershell
cd C:\Users\USER\royal-circle-form
git add .
git commit -m "Update form"
git push
```

GitHub will automatically rebuild and deploy within 1-2 minutes.

---

## Share Your Form

Your form is now online and shareable! Use this URL:
```
https://YOUR_USERNAME.github.io/royal-circle-form/
```

You can:
- Share on social media
- Email to your community
- Embed in your website
- Put in QR code

---

## Troubleshooting

**Form not loading?**
- Wait 2-3 minutes for GitHub to build
- Refresh the page (Ctrl+F5)
- Check your repository is public

**Need to update form?**
- Edit your files locally
- Run `git add .`, `git commit -m "message"`, `git push`
- Wait 1-2 minutes for update

**Google Sheet integration not working?**
- Make sure you added the Google Apps Script URL in the form
- Check browser console (F12) for errors
- Verify Google Apps Script is deployed as "Anyone"

---

**Your form is now live and ready to collect responses!**
