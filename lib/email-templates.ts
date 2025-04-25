export const donationEmailTemplate = (donorName: string, amount: number, paymentMethod: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 10px 20px; background: #8B4513; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Donation!</h1>
        </div>
        <div class="content">
            <p>Dear ${donorName},</p>
            <p>Thank you for your generous donation of $${amount} to RCA ILEAD Initiative. Your support helps us continue our mission of empowering future leaders in Rwanda.</p>
            <p><strong>Donation Details:</strong></p>
            <ul>
                <li>Amount: $${amount}</li>
                <li>Payment Method: ${paymentMethod}</li>
            </ul>
            <p>To complete your donation, please follow these steps:</p>
            <ol>
                <li>Send your donation to MTN Mobile Money number +250796060684 or BK Bank Account : 100194326248</li>
                <li>Send the screenshot of the payment to ileadinitiativeteam@gmail.com</li>
                <li>We will verify the payment and update your donation status</li>
            </ol>
            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
            <p>Thank you for making a difference!</p>
        </div>
        <div class="footer">
            <p>RCA ILEAD Initiative</p>
            <p>Email: contact@rcailead.org</p>
        </div>
    </div>
</body>
</html>
`;

export const adminNotificationTemplate = (donorName: string, email: string, amount: number, paymentMethod: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Donation Received</h1>
        </div>
        <div class="content">
            <p>A new donation has been received:</p>
            <ul>
                <li>Donor Name: ${donorName}</li>
                <li>Email: ${email}</li>
                <li>Amount: $${amount}</li>
                <li>Payment Method: ${paymentMethod}</li>
            </ul>
            <p>Please process this donation and send payment instructions to the donor.</p>
        </div>
        <div class="footer">
            <p>RCA ILEAD Initiative - Admin Notification</p>
        </div>
    </div>
</body>
</html>
`; 