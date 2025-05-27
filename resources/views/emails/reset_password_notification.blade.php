<!-- resources/views/emails/reset_password_notification.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>MBLearn Notification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f4f4; padding:20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
          <tr>
            <td style="text-align:center; background-color:#004481; padding:20px;">
              <img src="{{ $imageUrl }}" alt="Notification Image" width="100" style="max-width:100%; height:auto; border-radius:4px;" />
            </td>
          </tr>
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Hello, {{ $username }}!</h2>
              <p style="font-size:16px; line-height:1.5;">
                {!! $message !!}
              </p>
              <p style="margin-top:20px;">
                <a href="{{ $actionUrl }}" style="display:inline-block; padding:12px 24px; background-color:#004481; color:#ffffff; text-decoration:none; border-radius:4px;">
                  {{ $actionText }}
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; text-align:center; font-size:12px; color:#777777;">
              &copy; Metrobank MBLearn. This is an automated message. Please do not reply.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
