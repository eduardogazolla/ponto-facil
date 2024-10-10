let dataAtualServidor;
let contadorCliques = 0; // Mantém o controle de quantos pontos foram registrados

const janelasPermitidas = [
  { id: "horario1", inicio: "07:40", fim: "08:10", nome: "Entrada manhã" },
  { id: "horario2", inicio: "12:00", fim: "12:10", nome: "Saída manhã" },
  { id: "horario3", inicio: "12:50", fim: "13:10", nome: "Entrada tarde" },
  { id: "horario4", inicio: "18:00", fim: "18:10", nome: "Saída tarde" },
];

// Obtém o horário atual do servidor
function obterDataHoraAtual() {
  fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
    .then((response) => response.json())
    .then((data) => {
      dataAtualServidor = new Date(data.datetime);
      const hora = dataAtualServidor.getHours().toString().padStart(2, "0");
      const minutos = dataAtualServidor
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const dia = dataAtualServidor.getDate().toString().padStart(2, "0");
      const mes = (dataAtualServidor.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const ano = dataAtualServidor.getFullYear();
      document.getElementById(
        "data_hora_atual"
      ).textContent = `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    })
    .catch((error) => console.error("Erro ao obter data e hora atual:", error));
}

// Verifica se o horário está dentro da janela permitida
function estaDentroDaJanela(horarioAtual, inicio, fim) {
  const [horaAtual, minutoAtual] = horarioAtual.split(":").map(Number);
  const [horaInicio, minutoInicio] = inicio.split(":").map(Number);
  const [horaFim, minutoFim] = fim.split(":").map(Number);
  const horarioEmMinutos = horaAtual * 60 + minutoAtual;
  const inicioEmMinutos = horaInicio * 60 + minutoInicio;
  const fimEmMinutos = horaFim * 60 + minutoFim;
  return (
    horarioEmMinutos >= inicioEmMinutos && horarioEmMinutos <= fimEmMinutos
  );
}

// Atualiza o horário do servidor a cada minuto
obterDataHoraAtual();
setInterval(obterDataHoraAtual, 60000);

// Registra o ponto sem depender de ordem e limitando a 4 registros por dia
// Registra o ponto sem depender de ordem e limitando a 4 registros por dia
document.getElementById("btnRegistrar").addEventListener("click", function () {
  if (contadorCliques >= 4) {
    alert("Você já registrou o número máximo de pontos para hoje.");
    return;
  }

  if (dataAtualServidor) {
    const hora = dataAtualServidor.getHours().toString().padStart(2, "0");
    const minutos = dataAtualServidor.getMinutes().toString().padStart(2, "0");
    const horarioAtual = `${hora}:${minutos}`;

    let registrado = false; // Variável para checar se o horário está na janela permitida

    for (let i = 0; i < janelasPermitidas.length; i++) {
      const { id, inicio, fim, nome } = janelasPermitidas[i];
      const campo = document.getElementById(id);

      if (!campo.value && estaDentroDaJanela(horarioAtual, inicio, fim)) {
        campo.value = horarioAtual;
        alert(`${nome} registrada às ${horarioAtual}!`);
        contadorCliques++;
        registrado = true; // Marca que o horário está dentro da janela
        break;
      }
    }

    // Se nenhum horário foi registrado, mostra a mensagem "fora do horário"
    if (!registrado) {
      alert("Fora do horário permitido para registro.");
    }
  } else {
    alert("Erro ao obter o horário do servidor, tente novamente.");
  }
});
