<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

class PushNotificationController extends Controller
{
    public function sendResetPasswordReq(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
        ]);

        $recipientEmail = $request->email;

        // Load environment variables
        $clientId = env('GOOGLE_CLIENT_ID');
        $clientSecret = env('GOOGLE_CLIENT_SECRET');
        $refreshToken = env('GOOGLE_REFRESH_TOKEN');
        $senderEmail = env('GMAIL_USERNAME');

        // Configure OAuth provider
        $provider = new Google([
            'clientId'     => $clientId,
            'clientSecret' => $clientSecret,
        ]);

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPAuth = true;
            $mail->AuthType = 'XOAUTH2';

            $mail->setOAuth(new OAuth([
                'provider'     => $provider,
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken,
                'userName'     => $senderEmail,
            ]));

            $mail->setFrom($senderEmail, 'MBLearn Alert');
            $mail->addAddress($recipientEmail, 'User');
            $mail->Subject = 'Reset Password Request';
            $mail->isHTML(true);

            // You can dynamically generate a reset link
            $mail->Body = '<h1>Password Reset</h1><p>Click <a href="' . url('/reset-password?token=example_token') . '">here</a> to reset your password.</p>';

            $mail->send();

            return response()->json(['message' => 'Reset password email sent successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Mailer Error: ' . $mail->ErrorInfo], 500);
        }
    }
}
