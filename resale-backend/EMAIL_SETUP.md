# Email Setup for Magic Link Authentication

The magic link plugin requires email configuration to send authentication links. Here's how to set it up:

## Environment Variables

Create a `.env` file in the `resale-backend` directory with the following variables:

```env
# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (for Magic Link)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
SMTP_REPLY_TO=your-email@gmail.com
```

## Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASSWORD`

3. **Update the environment variables**:
   ```env
   SMTP_USERNAME=your-gmail@gmail.com
   SMTP_PASSWORD=your-16-character-app-password
   SMTP_FROM=your-gmail@gmail.com
   SMTP_REPLY_TO=your-gmail@gmail.com
   ```

## Alternative Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USERNAME=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```

## Testing the Setup

1. **Start the backend server**:
   ```bash
   yarn develop
   ```

2. **Test the magic link**:
   - Go to your frontend
   - Click "Sign In"
   - Enter an email address
   - Check if you receive the magic link email

## Troubleshooting

- **"Method Not Allowed" error**: Make sure the backend server is running
- **Emails not sending**: Check your SMTP credentials and app password
- **"Invalid credentials"**: Verify your email and app password are correct
- **Connection timeout**: Check your internet connection and SMTP settings

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main email password
- Consider using environment-specific email services for production
