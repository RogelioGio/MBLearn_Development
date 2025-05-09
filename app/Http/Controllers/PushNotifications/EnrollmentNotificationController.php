<?php

namespace App\Http\Controllers\PushNotifications;

use App\Http\Controllers\Controller;
use App\Mail\PHPMailerService;
use Illuminate\Http\Request;
use App\Mail\EnrollmentNotification;
use Illuminate\Support\Facades\Mail;

class EnrollmentNotificationController extends Controller
{
    /**
     * Enroll a learner and send email notification.
     */
    public function send(Request $request, PHPMailerService $mailer)
{
    $to = $request->input('to');
    $subject = $request->input('subject');
    $body = $request->input('body');

    $result = $mailer->send($to, $subject, $body);

    return response()->json([
        'success' => $result,
        'message' => $result ? 'Email sent successfully.' : 'Failed to send email.'
    ]);
}
}
