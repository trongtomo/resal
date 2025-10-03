module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT'),
        secure: env.bool('SMTP_SECURE'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM'),
        defaultReplyTo: env('SMTP_REPLY_TO'),
      },
    },
  },
  'magic-link': {
    enabled: true,
    config: {
      jwtSecret: env('JWT_SECRET'),
      tokenExpiration: '1h',
      redirectUrl: env('FRONTEND_URL') + '/auth/callback',
    },
  },
});