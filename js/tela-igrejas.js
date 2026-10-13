/* =========================================================
   TELA 2: IGREJAS
   ========================================================= */

const seletor = document.getElementById("escolha-igreja");
// Uma lista para cada paróquia, com o bairro para não confundir igrejas de mesmo nome
[...new Set(igrejas.map(i => i.paroquia))].forEach(paroquia => {
  const grupo = document.createElement("optgroup");
  grupo.label = "Paróquia " + paroquia;
  igrejas.filter(i => i.paroquia === paroquia).forEach(i => {
    const op = document.createElement("option");
    op.value = i.id;
    op.textContent = i.nome + (i.bairro !== "Nova Serrana" && i.bairro !== i.nome ? " – " + i.bairro : "");
    grupo.appendChild(op);
  });
  seletor.appendChild(grupo);
});
seletor.addEventListener("change", mostrarIgreja);

function mostrarIgreja() {
  const igreja = igrejaPorId(Number(seletor.value));
  let html = '<div class="ficha"><div class="ficha-info">';
  html += '<div class="ficha-titulo"><span class="fachada-mini">' + FACHADA + "</span><h2>" + escapar(igreja.nome) + "</h2></div>";
  html += '<p class="endereco">' + escapar(endereco(igreja)) + "</p>";
  html += '<p class="endereco">Paróquia ' + escapar(igreja.paroquia) + "</p>";
  html += '<div class="botoes">';
  html += '<a class="botao-link" href="' + linkSeguro(igreja.mapa) + '">' + ICONE_MAPA + "Ver no mapa</a>";
  if (igreja.telefone) {
    html += '<a class="botao-link" href="tel:' + igreja.telefone.replace(/\D/g, "") + '">' + ICONE_FONE + escapar(igreja.telefone) + "</a>";
  }
  html += "</div>";

  if (igreja.situacao === "fechada") {
    html += '<p class="situacao-fechada">Fechada para reforma. Sem celebrações por enquanto.</p></div>';
  } else {
    html += '</div><div class="ficha-horarios">';
    // Uma parte para cada tipo: missas, confissões e adorações
    ["Missa", "Confissão", "Adoração"].forEach(tipo => {
      const doTipo = horarios.filter(h => h.igreja === igreja.id && h.tipo === tipo);
      html += '<div class="bloco-tipo"><h3 class="semana-titulo">' + PLURAL[tipo] + "</h3>";
      if (doTipo.length === 0) {
        html += '<p class="sem">' + (horarios.some(h => h.tipo === tipo)
          ? "Sem " + SINGULAR_MINUSCULO[tipo] + " nesta igreja."
          : "Ainda não temos o horário. Pergunte na secretaria da paróquia.") + "</p></div>";
        return;
      }
      html += '<dl class="semana">';
      for (let i = 0; i < 7; i++) {
        const dia = (hojeDia + i) % 7;
        const doDia = doTipo
          .filter(h => h.dia === dia)
          .sort((a, b) => emMinutos(a.hora) - emMinutos(b.hora));
        if (doDia.length === 0) continue;   // só mostra os dias que têm horário
        html += '<div class="semana-dia"><dt>' + NOMES_DIAS[dia] + "</dt><dd>";
        doDia.forEach(h => {
          const extra = [textoSemanas(h), h.obs].filter(Boolean).map(escapar).join(" · ");
          html += '<span class="linha-hora"><strong>' + horaBonita(h.hora) + "</strong>" + (extra ? " · " + extra : "") + "</span>";
        });
        html += "</dd></div>";
      }
      // Horários num dia fixo do mês (ex.: todo dia 19)
      const doMes = doTipo.filter(h => h.diaDoMes);
      if (doMes.length) {
        html += '<div class="semana-dia"><dt>Todo mês</dt><dd>';
        doMes.forEach(h => {
          html += '<span class="linha-hora"><strong>' + horaBonita(h.hora) + "</strong> · dia " + Number(h.diaDoMes) + "</span>";
        });
        html += "</dd></div>";
      }
      html += "</dl></div>";
    });
    html += "</div>";
  }
  html += "</div>";
  document.getElementById("ficha-igreja").innerHTML = html;
}
