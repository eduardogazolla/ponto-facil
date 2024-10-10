-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
  reset_password_token TEXT,
  reset_password_expires INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para garantir unicidade no email
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
