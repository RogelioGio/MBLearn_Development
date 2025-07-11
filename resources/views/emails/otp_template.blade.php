<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>MBLearn OTP Account Verification</title>
</head>
<body style="margin:0; padding:0; background-color:hsl(0,0%,95%); font-family: Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <img src="https://i.imgur.com/vwrf1xG.png" alt="MBLearn Banner" style="max-width: 600px; width: 100%; display: block; border: 0;" />
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px; background-color: #fff; padding: 20px;">
                    <tr>
                        <td align="left" style="max-width: 600px; border: 1px;">
                            <h2 style="margin:0px; color:hsl(218,97%,26%)">Dear {{$user}},</h2>
                            <p style="font-size: small; line-height: 2rem;">We received a request to log in to your MBLearn account. To complete your login, please use the One-Time Password (OTP) provided below:</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px; background-color: #fff; padding: 0px 20px;">
                    <tr>
                        <td align="center" style="max-width: 600px; border: 1px;">
                            <p style="font-size: small; margin: 1rem">Account Current One Time Password </p> <p style="font-style: italic; margin: 0rem 0.5rem;">This code is valid for the next 5 minutes.</p>
                            <table>
                                <tr>
                                    <td style="border: 1px solid hsl(0, 0%, 40%); font-size: 32px; font-weight: bold; color: hsl(218, 97%, 26%); text-align: center; padding: 2rem;">
                                        {{$otp}}
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: xx-small; margin: 1rem">If you did not initiate this request, please ignore this email or contact your system administrator immediately.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px; background-color: #fff; padding: 20px;">
                    <tr>
                        <td align="left" style="max-width: 600px; border: 1px; font-size: small;">
                            <p style="margin: 0px">Thank you,</p>
                            <p style="font-weight: bold; line-height: 2rem; font-size: medium; color: hsl(218,97%,26%); margin: 0px">MBLearn Support Team</p>
                            <p style="font-style:italic; margin: 0px">Metrobank Learning Management System</p>

                            <p style="color:red;">
                                Note: </br>
                                Do not share your OTP with anyone. MBLearn will never ask for your password or OTP via email or phone.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <img src="https://i.imgur.com/kv2ADfK.png" alt="MBLearn Banner" style="max-width: 600px; width: 100%; display: block; border: 0;" />
            </td>
        </tr>
    </table>
</body>
</html>
