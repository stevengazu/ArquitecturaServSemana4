const jwt = require('jsonwebtoken');

module.exports.sendVerificationEmail = (user) => {
    const token = jwt.sign(
        {sub: user._id},"Super Secreto");//1 minuto

    const VerificationLink = `http://localhost:8000/api/users/${user.id}/verify?token=${token}`;
    console.log(
        `Sending email to ${user.email}: Verify your account at ${VerificationLink}`);
};