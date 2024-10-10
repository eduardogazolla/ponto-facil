document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");

  // Simulação de dados para exibição
  const users = [
    {
      nome: "Alexandre Henrique Dias",
      email: "alex@example.com",
      funcao: "Gerente",
      departamento: "RH",
    },
    {
      nome: "Maria Souza",
      email: "maria@example.com",
      funcao: "Analista",
      departamento: "TI",
    },
    // Outros funcionários
  ];

  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${user.nome}</span>
        <span>${user.email}</span>
        <span>${user.funcao}</span>
        <span>${user.departamento}</span>
        <div class="actions">
          <button>✏️</button>
          <button>⚙️</button>
        </div>
      `;
    userList.appendChild(li);
  });
});
