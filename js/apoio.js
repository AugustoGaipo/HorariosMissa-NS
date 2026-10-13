/* =========================================================
   FUNÇÕES DE APOIO
   ========================================================= */

const NOMES_DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const NOMES_DIAS_LONGOS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const CURTOS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const agora = new Date();
const hojeDia = agora.getDay();
let minutosAgora = agora.getHours() * 60 + agora.getMinutes();   // é atualizado a cada minuto (veja abas.js)

// Protege o texto que vem dos dados: se alguém digitar "<" ou ">" num aviso,
// aparece como letra normal e não vira código dentro da página.
function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
// Transforma "(37) 3226-1236" num link para ligar, que não quebra no meio da linha
function comTelefones(texto) {
  return texto.replace(/\(\d{2}\) \d{4,5}-\d{4}/g, t => '<a class="telefone" href="tel:' + t.replace(/\D/g, "") + '">' + t + "</a>");
}
// Só aceita link de mapa que começa com https://
function linkSeguro(url) {
  return /^https:\/\//.test(url || "") ? escapar(url) : "#";
}

function emMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}
function horaBonita(hora) {
  // "07:00" vira "7h", "19:30" vira "19h30"
  const [h, m] = hora.split(":");
  return Number(h) + "h" + (m === "00" ? "" : m);
}
function periodoDe(hora) {
  const min = emMinutos(hora);
  if (min < 12 * 60) return "manha";
  if (min < 18 * 60) return "tarde";
  return "noite";
}
function igrejaPorId(id) {
  return igrejas.find(i => i.id === id);
}
function dataCurta(d) {
  return d.getDate() + " de " + MESES[d.getMonth()];
}
// A data certa do dia escolhido (hoje ou nos próximos 6 dias)
function dataDoDia(dia) {
  return diasAPartirDeHoje((dia - hojeDia + 7) % 7);
}
// Vê se o horário acontece nesta data (cuida do "1ª sexta do mês" e do "todo dia 19")
function aconteceEm(h, data) {
  if (h.diaDoMes) return data.getDate() === h.diaDoMes;
  if (h.dia !== data.getDay()) return false;
  return !h.semanas || h.semanas.includes(Math.ceil(data.getDate() / 7));
}
// [1, 3] vira "1ª e 3ª do mês"
function textoSemanas(h) {
  if (!h.semanas) return "";
  const nomes = h.semanas.map(s => s + (h.dia === 0 || h.dia === 6 ? "º" : "ª"));
  return (nomes.length > 1 ? nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1] : nomes[0]) + " do mês";
}
// Endereço com bairro; quando não tem rua, mostra só o bairro
function endereco(igreja) {
  return igreja.endereco ? igreja.endereco + " – " + igreja.bairro : igreja.bairro;
}

const ICONE_MAPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
const ICONE_SETA = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
const ICONE_CALENDARIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 12.5v5.5M9.5 14.5h5"/></svg>';
const ICONE_FONE ='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>';

/* ---------------------------------------------------------
   DESENHOS (enfeites, todos em linha dourada)
   --------------------------------------------------------- */

// Fachada de igreja mineira: duas torres, frontão curvo e porta em arco.
// É um desenho genérico, não é nenhuma igreja de verdade.
const FACHADA = '<svg viewBox="0 0 160 124" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M4 122h152"/>' +
  // torres
  '<path d="M20 122V40h26v82M114 122V40h26v82"/>' +
  '<path d="M20 40c0-12 6-19 13-21 7 2 13 9 13 21M114 40c0-12 6-19 13-21 7 2 13 9 13 21"/>' +
  '<path d="M33 19v-9M29 13.5h8M127 19v-9M123 13.5h8"/>' +
  '<path d="M27 64v-8a6 6 0 0 1 12 0v8zM121 64v-8a6 6 0 0 1 12 0v8z"/>' +
  // corpo e frontão
  '<path d="M46 122V56h68v66"/>' +
  '<path d="M46 56c4-2 8-8 12-14 6-10 14-16 22-16s16 6 22 16c4 6 8 12 12 14"/>' +
  '<path d="M80 26V12M74 17h12"/>' +
  '<circle cx="80" cy="44" r="5"/>' +
  // janelas e porta
  '<path d="M56 92v-14h10v14zM94 92v-14h10v14z"/>' +
  '<path d="M70 122V96a10 10 0 0 1 20 0v26"/>' +
  '</svg>';

// Um ícone para cada tipo de celebração
const ICONE_TIPO = {
  // cálice com a hóstia
  "Missa": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="2.5"/><path d="M6.5 8h11c0 4.5-2.5 7-5.5 7s-5.5-2.5-5.5-7zM12 15v4.5M8 21h8"/></svg>',
  // estola do padre
  "Confissão": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3c1.3 1.8 6.7 1.8 8 0"/><path d="M8 3 6.5 21h3.5l.8-15.5M16 3l1.5 18H14l-.8-15.5"/><path d="M7.2 16.5h2.6M8.5 15.2v2.6M14.2 16.5h2.6M15.5 15.2v2.6"/></svg>',
  // ostensório
  "Adoração": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3"/><path d="M12 2v1.5M12 13.5V15M5.5 8.5H7M17 8.5h1.5M7.4 3.9l1.1 1.1M15.5 12l1.1 1.1M16.6 3.9 15.5 5M8.5 12l-1.1 1.1M12 15v4M9 19.5h6M8 21.5h8"/></svg>'
};
