/* =========================================================
   TROCA DE ABAS
   ========================================================= */

// Cada link do menu tem seu endereço: #missas, #confissoes, #adoracoes, #igrejas, #eventos
const TIPO_DA_TELA = { missas: "Missa", confissoes: "Confissão", adoracoes: "Adoração" };

// Onde a pessoa estava (lista de horários ou eventos), para voltar ao mesmo ponto depois de ver uma igreja
let posicaoLista = null;
document.getElementById("conteudo").addEventListener("click", e => {
  if (e.target.closest(".link-igreja")) posicaoLista = window.scrollY;
});

function abrirTela() {
  let tela = location.hash.replace("#", "");

  // Link de uma igreja da lista de horários, ex.: #igreja-28
  const linkIgreja = /^igreja-(\d+)$/.exec(tela);
  if (linkIgreja && igrejaPorId(Number(linkIgreja[1]))) {
    tela = "igrejas";
    seletor.value = linkIgreja[1];
    mostrarIgreja();
  }
  if (!["missas", "confissoes", "adoracoes", "igrejas", "eventos"].includes(tela)) tela = "missas";

  document.querySelectorAll(".aba").forEach(a => {
    if (a.dataset.tela === tela) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // Missas, confissões e adorações usam a mesma tela de horários
  const telaHorarios = tela in TIPO_DA_TELA;
  document.getElementById("tela-horarios").hidden = !telaHorarios;
  document.getElementById("tela-igrejas").hidden = tela !== "igrejas";
  document.getElementById("tela-eventos").hidden = tela !== "eventos";
  if (telaHorarios) {
    tipoEscolhido = TIPO_DA_TELA[tela];
    mostrarHorarios();
  }
  if ((telaHorarios || tela === "eventos") && posicaoLista !== null) {   // voltou da ficha da igreja
    window.scrollTo(0, posicaoLista);
    posicaoLista = null;
  }
  if (linkIgreja) document.getElementById("ficha-igreja").scrollIntoView();
}
window.addEventListener("hashchange", abrirTela);

// Link "Pular para o conteúdo" (para quem usa teclado): vai direto ao conteúdo
// sem mudar o endereço, para não trocar de tela.
document.querySelector(".pular").addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("conteudo").focus();
});

// A cada minuto, atualiza a "Próxima" e o que já passou.
// Se virou o dia (meia-noite), recarrega a página.
setInterval(() => {
  const d = new Date();
  if (d.getDay() !== hojeDia) { location.reload(); return; }
  minutosAgora = d.getHours() * 60 + d.getMinutes();
  if (!document.getElementById("tela-horarios").hidden) mostrarHorarios();
}, 60 * 1000);

document.getElementById("fachada-rodape").innerHTML = FACHADA;

mostrarIgreja();
mostrarEventos();
abrirTela();
