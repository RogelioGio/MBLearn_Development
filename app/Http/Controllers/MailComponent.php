<?php
namespace App\Http\Controllers;

    use App\Services\GmailService;
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\OAuth;
    use League\OAuth2\Client\Provider\Google;


    // require_once __DIR__ . '../../../vendor/autoload.php'; // Adjust path as needed

    class MailComponent{

        public function send($to, $subject, $body) {
            try {

                // $this->mail->addAddress($to);
                // $this->mail->Subject = $subject;
                // $this->mail->Body = $body;
                // $this->mail->isHTML(true);

                // if (!$this->mail->send()) {
                //     throw new \Exception('Mailer Error: ' . $this->mail->ErrorInfo);
                // }
                // return true; // Email sent successfully
                $gmailService = new GmailService();
                $gmailService->sendEmail($to, $subject, $body);
                return true; // Email sent successfully
            } catch (\Exception $e) {
                // // Handle the error as needed
                // error_log('Mail sending failed: ' . $e->getMessage(), );
                // error_log( $this->mail->SMTPDebug = 2);
                // error_log('Debug output: ' . $this->mail->ErrorInfo);
                error_log('Mail sending failed: ' . $e->getMessage());
                return false;
            } finally {
                // Clear all addresses and attachments for the next email
                // $this->mail->clearAddresses();
                // $this->mail->clearAttachments();
            }
        }
    }

?>
