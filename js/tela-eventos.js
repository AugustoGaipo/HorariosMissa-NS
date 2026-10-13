/* =========================================================
   TELA 3: EVENTOS
   ========================================================= */

const hojeZero = diasAPartirDeHoje(0);
const eventosValidos = eventos
  .filter(ev => ev.fim >= hojeZero)          // some sozinho depois que passa
  .sort((a, b) => a.inicio - b.inicio);

function mostrarEventos() {
  const caixa = document.getElementById("lista-eventos");
  // Sem evento: avisa com clareza, para ninguém achar que o site está com defeito
  if (eventosValidos.length === 0) {
    caixa.innerHTML = '<p class="vazio"><span class="vazio-icone">' + ICONE_CALENDARIO + "</span>" +
      "<span>Nenhum evento marcado no momento. Quando uma paróquia marcar festa, novena ou outro evento, ele aparece aqui.</span></p>";
    return;
  }
  caixa.innerHTML = eventosValidos.map(ev => {
    const quando = ev.inicio.getTime() === ev.fim.getTime()
      ? dataCurta(ev.inicio)
      : ev.inicio.getMonth() === ev.fim.getMonth()
        ? ev.inicio.getDate() + " a " + dataCurta(ev.fim)
        : dataCurta(ev.inicio) + " a " + dataCurta(ev.fim);
    // Local é opcional: se ficar vazio, usa o endereço da igreja
    const igreja = igrejaPorId(ev.igreja);
    const local = ev.local || (igreja ? igreja.nome + ", " + endereco(igreja) : "");
    // Quando o evento é numa igreja, o local leva para a ficha dela (endereço, mapa e telefone)
    const onde = !local ? ""
      : igreja
        ? '<a class="link-igreja onde" href="#igreja-' + igreja.id + '"><span>' + escapar(local) + '<span class="so-leitor">, ver endereço</span></span>' + ICONE_SETA + "</a>"
        : '<p class="onde">' + escapar(local) + "</p>";
    // A foto do cartaz só aparece se a paróquia mandou uma
    const cartaz = ev.cartaz
      ? '<img class="cartaz" src="' + escapar(ev.cartaz) + '" alt="Cartaz: ' + escapar(ev.titulo) + '" loading="lazy">'
      : "";
    return '<article class="evento' + (cartaz ? " com-cartaz" : "") + '"><div class="evento-texto">' +
      '<p class="quando">' + quando + (ev.hora ? ", às " + horaBonita(ev.hora) : "") + "</p>" +
      "<h3>" + escapar(ev.titulo) + "</h3>" +
      onde +
      (ev.descricao ? '<p class="descricao">' + escapar(ev.descricao) + "</p>" : "") +
      "</div>" + cartaz +
    "</article>";
  }).join("");
}
