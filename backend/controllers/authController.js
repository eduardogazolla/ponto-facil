const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

// Função para login e outras funções aqui...

const requestPasswordReset = (req, res) => {
  const { email } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err || !user) return res.status(404).send("Usuário não encontrado.");

    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000; // 1 hora

    User.setPasswordResetToken(email, token, expires, (err) => {
      if (err) return res.status(500).send("Erro ao gerar token.");

      const resetLink = `http://localhost:3000/reset_password.html?token=${token}`;
      // Enviar e-mail aqui com resetLink

      res.send("Email de redefinição enviado.");
    });
  });
};

const resetPassword = (req, res) => {
  const { token, password } = req.body;

  // Procura o usuário pelo token e verifica se ainda está válido
  User.findByResetToken(token, (err, user) => {
    if (err || !user || user.reset_password_expires < Date.now()) {
      return res.status(400).send("Token inválido ou expirado.");
    }

    // Gera um novo hash para a senha
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send("Erro ao criptografar a senha.");

      // Atualiza a senha do usuário
      User.resetPassword(user.email, hashedPassword, (err) => {
        if (err) return res.status(500).send("Erro ao redefinir a senha.");

        res.send("Senha redefinida com sucesso.");
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.json({ success: false, message: "Usuário não encontrado." });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        // Autenticação bem-sucedida
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Senha incorreta." });
      }
    });
  });
};

const loginAsAdmin = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user || user.role !== "admin") {
      return res.json({ success: false, message: "Acesso negado." });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Senha incorreta." });
      }
    });
  });
};

module.exports = { requestPasswordReset, resetPassword, login, loginAsAdmin };
