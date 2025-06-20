<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GraphMailService
{
    public function send($accessToken, $toEmail, $subject, $htmlContent)
    {
        $payload = [
            'message' => [
                'subject' => $subject,
                'body' => [
                    'contentType' => 'HTML',
                    'content' => $htmlContent,
                ],
                'toRecipients' => [
                    [
                        'emailAddress' => [
                            'address' => $toEmail,
                        ],
                    ],
                ],
            ]
        ];

        $response = Http::withToken($accessToken)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post('https://graph.microsoft.com/v1.0/me/sendMail', $payload);

        if ($response->status() === 202) {
            return true;
        }

        Log::error('❌ Failed to send email via Microsoft Graph', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        return false;

    }
    public function refreshAccessToken($refreshToken)
    {
        $response = Http::asForm()->post('https://login.microsoftonline.com/common/oauth2/v2.0/token', [
            'client_id' => env('MS_GRAPH_CLIENT_ID'),
            'client_secret' => env('MS_GRAPH_CLIENT_SECRET'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
            'scope' => 'https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/User.Read',
        ]);

        if ($response->successful()) {
            return $response->json(); // contains new access_token and refresh_token
        }

        Log::error('❌ Failed to refresh Microsoft Graph token.', $response->json());
        return null;
    }
}
