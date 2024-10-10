const db = require("../db/database");

// Listar Funcionários
exports.getUsers = (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).send("Erro ao listar funcionários.");
    res.json(rows);
  });
};

// Adicionar Funcionário
exports.addUser = (req, res) => {
  const { nome, email, funcao, departamento } = req.body;
  db.run(
    "INSERT INTO users (nome, email, funcao, departamento) VALUES (?, ?, ?, ?)",
    [nome, email, funcao, departamento],
    function (err) {
      if (err) return res.status(500).send("Erro ao adicionar funcionário.");
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Editar Funcionário
exports.editUser = (req, res) => {
  const { id } = req.params;
  const { nome, email, funcao, departamento } = req.body;
  db.run(
    "UPDATE users SET nome = ?, email = ?, funcao = ?, departamento = ? WHERE id = ?",
    [nome, email, funcao, departamento, id],
    (err) => {
      if (err) return res.status(500).send("Erro ao editar funcionário.");
      res.send("Funcionário atualizado com sucesso.");
    }
  );
};

// Ativar/Inativar Funcionário
exports.toggleUserStatus = (req, res) => {
  const { id } = req.params;
  const { ativo } = req.body;
  db.run("UPDATE users SET ativo = ? WHERE id = ?", [ativo, id], (err) => {
    if (err)
      return res.status(500).send("Erro ao atualizar status do funcionário.");
    res.send("Status atualizado com sucesso.");
  });
};
