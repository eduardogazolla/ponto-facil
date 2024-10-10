const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('./models/User'); // Importe o modelo de usuário

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenha'
  }
});

// Endpoint para solicitar a redefinição de senha
app.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send('Usuário não encontrado.');
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // Token válido por 1 hora
  await user.save();

  const resetLink = `http://seusite.com/reset-password?token=${token}`;

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: user.email,
    subject: 'Redefinição de Senha',
    text: `Clique no link para redefinir sua senha: ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).send('Erro ao enviar o e-mail.');
    }
    res.status(200).send('E-mail enviado com sucesso.');
  });
});
