/* =========================================================
   TELA 1: HORÁRIOS
   ========================================================= */

let diaEscolhido = hojeDia;
let periodoEscolhido = "todos";
let tipoEscolhido = "Missa";

document.getElementById("hoje").textContent =
  "Hoje é " + NOMES_DIAS_LONGOS[hojeDia] + ", " + dataCurta(agora) + ".";

// Monta os botões dos dias, começando por hoje
const caixaDias = document.getElementById("dias");
for (let i = 0; i < 7; i++) {
  const dia = (hojeDia + i) % 7;
  const b = document.createElement("button");
  b.dataset.dia = dia;
  b.setAttribute("aria-pressed", dia === diaEscolhido);
  b.innerHTML = CURTOS[dia] + (i === 0 ? '<span class="eh-hoje">hoje</span>' : "");
  b.setAttribute("aria-label", NOMES_DIAS[dia] + (i === 0 ? ", hoje" : ""));
  caixaDias.appendChild(b);
}

caixaDias.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  diaEscolhido = Number(b.dataset.dia);
  caixaDias.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
  mostrarHorarios();
});

const caixaPeriodos = document.getElementById("periodos");
caixaPeriodos.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  periodoEscolhido = b.dataset.periodo;
  caixaPeriodos.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
  mostrarHorarios();
});

// Nomes usados nos títulos e na contagem
const PLURAL = { "Missa": "Missas", "Confissão": "Confissões", "Adoração": "Adorações" };
const SINGULAR_MINUSCULO = { "Missa": "missa", "Confissão": "confissão", "Adoração": "adoração" };

function mostrarHorarios() {
  // Junta os horários fixos do dia + missas extras da semana
  const dataEscolhida = dataDoDia(diaEscolhido);
  let itens = horarios
    .filter(h => aconteceEm(h, dataEscolhida) && igrejaPorId(h.igreja).situacao === "aberta")
    .map(h => {
      const aviso = avisos.find(a => a.igreja === h.igreja && a.dia === h.dia && a.hora === h.hora);
      // Horário especial: nesta semana a celebração muda de hora
      if (aviso && aviso.aviso === "especial" && aviso.novaHora) {
        return { ...h, hora: aviso.novaHora, horaNormal: h.hora, aviso: aviso };
      }
      return { ...h, aviso: aviso };
    });

  avisos
    .filter(a => a.aviso === "extra" && a.dia === diaEscolhido)
    .forEach(a => itens.push({ igreja: a.igreja, dia: a.dia, hora: a.hora, tipo: a.tipo, aviso: a }));

  // Só o que a pessoa escolheu: missa, confissão ou adoração
  itens = itens.filter(h => h.tipo === tipoEscolhido);

  if (periodoEscolhido !== "todos") {
    itens = itens.filter(h => periodoDe(h.hora) === periodoEscolhido);
  }
  itens.sort((a, b) => emMinutos(a.hora) - emMinutos(b.hora));

  // Título da lista
  const nomePeriodo = { todos: "", manha: " de manhã", tarde: " à tarde", noite: " à noite" }[periodoEscolhido];
  const nomeDia = diaEscolhido === hojeDia ? "hoje" : (diaEscolhido === 0 || diaEscolhido === 6 ? "no " : "na ") + NOMES_DIAS_LONGOS[diaEscolhido];
  document.getElementById("titulo-lista").textContent = PLURAL[tipoEscolhido] + " " + nomeDia + nomePeriodo;
  document.getElementById("icone-tipo").innerHTML = ICONE_TIPO[tipoEscolhido];

  // Descobre qual é a próxima (só quando o dia é hoje)
  let proxima = null;
  if (diaEscolhido === hojeDia) {
    proxima = itens.find(h => emMinutos(h.hora) >= minutosAgora && !(h.aviso && h.aviso.aviso === "cancelada"));
  }

  // Junta as missas que têm o mesmo horário
  const grupos = [];
  itens.forEach(h => {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.hora === h.hora) ultimo.itens.push(h);
    else grupos.push({ hora: h.hora, itens: [h] });
  });

  const nomesAviso = { cancelada: "Cancelada", especial: "Horário especial", extra: "Missa extra" };
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  grupos.forEach(g => {
    const li = document.createElement("li");
    li.className = "item";
    if (diaEscolhido === hojeDia && emMinutos(g.hora) < minutosAgora) li.classList.add("passou");
    if (g.itens.includes(proxima)) li.classList.add("proxima-missa");

    let linhas = "";
    g.itens.forEach(h => {
      const igreja = igrejaPorId(h.igreja);
      const cancelada = h.aviso && h.aviso.aviso === "cancelada";

      // Só mostra o tipo quando não é missa (confissão, adoração)
      let marcas = "";
      if (h === proxima) marcas += '<span class="marca proxima">Próxima</span>';
      if (h.aviso) marcas += '<span class="marca ' + h.aviso.aviso + '">' + nomesAviso[h.aviso.aviso] + "</span>";

      let notas = "";
      if (h.aviso) notas += '<p class="nota">' + escapar(h.aviso.texto) + "</p>";
      if (h.horaNormal) notas += '<p class="nota">O horário normal é às ' + horaBonita(h.horaNormal) + ".</p>";
      if (h.obs) notas += '<p class="nota">' + escapar(h.obs) + "</p>";

      linhas +=
        '<li class="linha-igreja' + (cancelada ? " cancelada" : "") + '">' +
          // O nome da igreja leva para a ficha dela (endereço, mapa e telefone)
          '<a class="link-igreja" href="#igreja-' + igreja.id + '">' +
            '<p class="igreja">' + escapar(igreja.nome) + '<span class="bairro">' + escapar(igreja.bairro) + "</span></p>" +
            '<span class="so-leitor">, ver endereço</span>' + ICONE_SETA +
          "</a>" +
          (marcas ? '<div class="marcas">' + marcas + "</div>" : "") +
          notas +
        "</li>";
    });

    // "já passou" só para leitor de tela; quem enxerga percebe pela cor mais suave
    const passou = li.classList.contains("passou") ? '<span class="so-leitor"> (já passou)</span>' : "";
    li.innerHTML =
      '<div class="hora">' + horaBonita(g.hora) + passou + "</div>" +
      '<ul class="igrejas-do-horario">' + linhas + "</ul>";
    lista.appendChild(li);
  });

  // Quantas celebrações tem, e uma dica quando a lista é grande
  let contagem = itens.length === 1 ? "1 " + SINGULAR_MINUSCULO[tipoEscolhido] + "." : itens.length + " " + PLURAL[tipoEscolhido].toLowerCase() + ".";
  if (itens.length > 15 && periodoEscolhido === "todos") contagem += " Para ver menos, escolha Manhã, Tarde ou Noite.";
  document.getElementById("contagem").textContent = itens.length ? contagem : "";

  const vazio = document.getElementById("vazio");
  const textoVazio = horarios.some(h => h.tipo === tipoEscolhido)
    ? "Nenhuma " + SINGULAR_MINUSCULO[tipoEscolhido] + " neste dia e período."
    : "Ainda não temos os horários de " + SINGULAR_MINUSCULO[tipoEscolhido] + ". As paróquias não publicam na internet. Ligue na secretaria: São Sebastião (37) 3226-1236, São Geraldo (37) 3226-2401, São João Bosco (37) 3225-3512.";
  vazio.innerHTML = '<span class="vazio-icone">' + ICONE_TIPO[tipoEscolhido] + "</span><span>" + comTelefones(escapar(textoVazio)) + "</span>";
  vazio.hidden = itens.length > 0;
}
