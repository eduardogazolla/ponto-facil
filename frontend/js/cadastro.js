document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const funcao = document.getElementById("funcao").value;
    const departamento = document.getElementById("departamento").value;

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, funcao, departamento }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Funcionário cadastrado com sucesso!");
        window.location.href = "/admin.html"; // Redireciona para a lista de funcionários
      })
      .catch((error) => console.error("Erro ao cadastrar funcionário:", error));
  });
