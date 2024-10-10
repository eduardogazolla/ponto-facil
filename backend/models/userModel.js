const db = require('../db/database');

const User = {
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.get(query, [email], (err, row) => {
      callback(err, row);
    });
  },
  
  createUser: (user, callback) => {
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const params = [user.name, user.email, user.password, user.role];
    db.run(query, params, function (err) {
      callback(err, this.lastID);
    });
  },
  
  setPasswordResetToken: (email, token, expires, callback) => {
    const query = `UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?`;
    db.run(query, [token, expires, email], (err) => {
      callback(err);
    });
  },
  
  resetPassword: (email, password, callback) => {
    const query = `UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE email = ?`;
    db.run(query, [password, email], (err) => {
      callback(err);
    });
  }
};

module.exports = User;
