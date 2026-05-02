export const otpTemplate = (otp: string, userName: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .body-wrap { background-color: #f9fafb; font-family: 'Inter', Helvetica, sans-serif; padding: 40px 20px; margin: 0; }
        .container { max-width: 550px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .header { text-align: center; padding: 40px 0 20px 0; }
        .logo { width: 80px; height: auto; margin-bottom: 10px; }
        .brand-name { font-size: 24px; font-weight: 800; color: #a28b5d; margin: 0; }
        .content { padding: 0 40px 40px 40px; text-align: center; color: #374151; }
        .greeting { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
        .otp-box { background-color: #ece8df; border-radius: 8px; padding: 20px; margin: 30px 0; border: 1px dashed #c7b99e; }
        .otp-code { font-size: 48px; font-weight: 500; letter-spacing: 25px; color: #000000; margin: 0; }
        .security-info { font-size: 12px; color: #9ca3af; background: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 30px; text-align: left; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .social-links a { color: #000000; text-decoration: none; margin: 0 10px; font-weight: 600; }
      </style>
    </head>
    <body class="body-wrap">
      <div class="container">
        <div class="header">
          <p class="brand-name">CampusTalk</p>
        </div>

        <div class="content">
          <p class="greeting">Hey ${userName},</p>
          <p>Ready to join the conversation? Use the code below to verify your account and start sharing with your campus.</p>
          
          <div class="otp-box">
            <h2 class="otp-code">${otp}</h2>
          </div>

          <p style="font-size: 14px;">This code is valid for 5 minutes. If you didn't request this, you can safely ignore this email.</p>

          <div class="security-info">
            <strong>Security Note:</strong> This request was made from a new device. If this wasn't you, we recommend securing your account immediately.
          </div>
        </div>

        <div class="footer">
          <div class="social-links">
            <a href="#">Trending Topics</a> | <a href="#">Study Tips</a> | <a href="#">Class Struggles</a>
          </div>
          <p style="margin-top: 15px;">&copy; 2026 CampusTalk. Built for students, by students.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
