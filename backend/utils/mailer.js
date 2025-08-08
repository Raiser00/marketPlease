const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

module.exports = async function sendEmail(to, subject, html) {
await transporter.sendMail({
    from: '"MarketPlease" <noreply@marketplease.com>',
    to,
    subject,
    html
});
};

