document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.getElementById("user-table").querySelector("tbody");
  
    function fetchUsers() {
      fetch('/api/users')
        .then(response => response.json())
        .then(users => {
          userTableBody.innerHTML = users.map(user => `
            <tr>
              <td>${user.nome}</td>
              <td>${user.email}</td>
              <td>${user.funcao}</td>
              <td>${user.departamento}</td>
              <td>
                <button onclick="editUser('${user.id}')">✏️</button>
                <button onclick="toggleUserStatus('${user.id}')">${user.ativo ? 'Inativar' : 'Ativar'}</button>
              </td>
            </tr>
          `).join('');
        });
    }
  
    function editUser(id) {
      // Função para editar o usuário
      alert(`Editar usuário: ${id}`);
    }
  
    function toggleUserStatus(id) {
      // Função para ativar/inativar o usuário
      alert(`Alterar status do usuário: ${id}`);
    }
  
    fetchUsers();
  });
  