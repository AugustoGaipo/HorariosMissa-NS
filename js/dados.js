/* =========================================================
   DADOS REAIS
   Tirados do site da Diocese de Divinópolis (outubro de 2026):
   https://diocesedivinopolis.org.br/missas/
   Tabela completa: horarios-missas/dados/horarios-missas-nova-serrana.csv
   ========================================================= */

// dia: 0 = domingo, 1 = segunda ... 6 = sábado
// semanas: em quais semanas do mês tem (ex.: [1] = só na 1ª sexta do mês)
// diaDoMes: horário que acontece num dia fixo do mês (ex.: todo dia 19)
const igrejas = [
  {"id": 1, "nome": "Matriz São Sebastião", "paroquia": "São Sebastião", "endereco": "Praça José Batista de Freitas, 41", "bairro": "Centro", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Matriz+São+Sebastião+Praça+José+Batista+de+Freitas,+41+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 2, "nome": "Hospital São José", "paroquia": "São Sebastião", "endereco": "", "bairro": "Hospital São José", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Hospital+São+José+Hospital+São+José+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 3, "nome": "Comunidade Terapêutica Cruz e Glória", "paroquia": "São Sebastião", "endereco": "", "bairro": "Zona rural", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Comunidade+Terapêutica+Cruz+e+Glória+Zona+rural+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 4, "nome": "Nossa Senhora Aparecida", "paroquia": "São Sebastião", "endereco": "", "bairro": "Bairro Laranjeiras", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+Aparecida+Bairro+Laranjeiras+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 5, "nome": "São Pedro e São Paulo", "paroquia": "São Sebastião", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Pedro+e+São+Paulo+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 6, "nome": "São Cristóvão", "paroquia": "São Sebastião", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Cristóvão+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 7, "nome": "São Crispim e São Crispiniano (e São José Operário)", "paroquia": "São Sebastião", "endereco": "", "bairro": "Bairro São Geraldo", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Crispim+e+São+Crispiniano+(e+São+José+Operário)+Bairro+São+Geraldo+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 8, "nome": "Santa Luzia", "paroquia": "São Sebastião", "endereco": "", "bairro": "Bairro Santa Luzia", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Santa+Luzia+Bairro+Santa+Luzia+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 9, "nome": "Nossa Senhora das Graças", "paroquia": "São Sebastião", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+das+Graças+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 10, "nome": "São José", "paroquia": "São Sebastião", "endereco": "", "bairro": "Bairro São José", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+José+Bairro+São+José+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 11, "nome": "São Galvão", "paroquia": "São Sebastião", "endereco": "", "bairro": "Bairro Morada do Sol", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Galvão+Bairro+Morada+do+Sol+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 12, "nome": "Santa Luzia (Barretos)", "paroquia": "São Sebastião", "endereco": "", "bairro": "Barretos (zona rural)", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Santa+Luzia+(Barretos)+Barretos+(zona+rural)+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 13, "nome": "Nossa Senhora do Rosário", "paroquia": "São Sebastião", "endereco": "", "bairro": "Capão", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+do+Rosário+Capão+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 14, "nome": "Imaculada Conceição", "paroquia": "São Sebastião", "endereco": "", "bairro": "Ripas (zona rural)", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Imaculada+Conceição+Ripas+(zona+rural)+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 15, "nome": "Nossa Senhora de Fátima", "paroquia": "São Sebastião", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+de+Fátima+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 16, "nome": "São Francisco de Assis", "paroquia": "São Sebastião", "endereco": "", "bairro": "Fazenda Paraná (zona rural)", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Francisco+de+Assis+Fazenda+Paraná+(zona+rural)+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 17, "nome": "Santa Rita de Cássia", "paroquia": "São Sebastião", "endereco": "", "bairro": "Barretinho (zona rural)", "telefone": "(37) 3226-1236", "mapa": "https://www.google.com/maps/search/?api=1&query=Santa+Rita+de+Cássia+Barretinho+(zona+rural)+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 18, "nome": "Matriz São Geraldo Magela", "paroquia": "São Geraldo Magela", "endereco": "Rua Francisco de Paula Batista de Freitas, 686", "bairro": "Bairro Romeu Duarte", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Matriz+São+Geraldo+Magela+Rua+Francisco+de+Paula+Batista+de+Freitas,+686+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 19, "nome": "Henriques", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Henriques", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Henriques+Henriques+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 20, "nome": "Areias", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Areias", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Areias+Areias+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 21, "nome": "Frei Paulo", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Frei Paulo", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Frei+Paulo+Frei+Paulo+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 22, "nome": "São Sebastião (Santo Expedito)", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Sebastião+(Santo+Expedito)+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 23, "nome": "São Bento", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Nova Serrana", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Bento+Nova+Serrana+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 24, "nome": "São Judas Tadeu", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Novo Horizonte", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Judas+Tadeu+Novo+Horizonte+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 25, "nome": "Sagrado Coração de Jesus", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Novais", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Sagrado+Coração+de+Jesus+Novais+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 26, "nome": "Nossa Senhora do Rosário de Fátima", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Veredas da Serra", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+do+Rosário+de+Fátima+Veredas+da+Serra+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 27, "nome": "Sagrado Coração de Jesus", "paroquia": "São Geraldo Magela", "endereco": "", "bairro": "Vila Ozanan", "telefone": "(37) 3226-2401", "mapa": "https://www.google.com/maps/search/?api=1&query=Sagrado+Coração+de+Jesus+Vila+Ozanan+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 28, "nome": "Matriz São João Bosco", "paroquia": "São João Bosco", "endereco": "Rua Fernando de Noronha, 731", "bairro": "Bairro Planalto", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Matriz+São+João+Bosco+Rua+Fernando+de+Noronha,+731+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 29, "nome": "Santa Maria Eufrásia", "paroquia": "São João Bosco", "endereco": "", "bairro": "Bairro Concesso Elias", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Santa+Maria+Eufrásia+Bairro+Concesso+Elias+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 30, "nome": "Nossa Senhora Auxiliadora", "paroquia": "São João Bosco", "endereco": "", "bairro": "Bairro Amaral", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+Auxiliadora+Bairro+Amaral+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 31, "nome": "Nossa Senhora Aparecida", "paroquia": "São João Bosco", "endereco": "", "bairro": "Gamas", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+Aparecida+Gamas+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 32, "nome": "Santo Antônio", "paroquia": "São João Bosco", "endereco": "", "bairro": "Bairro Santo Antônio", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Santo+Antônio+Bairro+Santo+Antônio+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 33, "nome": "São João Batista", "paroquia": "São João Bosco", "endereco": "", "bairro": "Água Espraiada", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=São+João+Batista+Água+Espraiada+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 34, "nome": "Nossa Senhora de Lourdes", "paroquia": "São João Bosco", "endereco": "", "bairro": "Estação do Cercado", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+de+Lourdes+Estação+do+Cercado+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 35, "nome": "São Francisco de Assis", "paroquia": "São João Bosco", "endereco": "", "bairro": "Bairro Antônio Venâncio", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=São+Francisco+de+Assis+Bairro+Antônio+Venâncio+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 36, "nome": "Mãe Rainha", "paroquia": "São João Bosco", "endereco": "", "bairro": "Bairro Itapuã", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Mãe+Rainha+Bairro+Itapuã+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 37, "nome": "São José", "paroquia": "São João Bosco", "endereco": "", "bairro": "Moreiras", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=São+José+Moreiras+Nova+Serrana+MG", "situacao": "aberta"},
  {"id": 38, "nome": "Nossa Senhora do Carmo", "paroquia": "São João Bosco", "endereco": "", "bairro": "Boa Vista de Minas", "telefone": "(37) 3225-3512", "mapa": "https://www.google.com/maps/search/?api=1&query=Nossa+Senhora+do+Carmo+Boa+Vista+de+Minas+Nova+Serrana+MG", "situacao": "aberta"},
];

const horarios = [
  {"igreja": 1, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "06:00"},
  {"igreja": 2, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "15:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 2, "hora": "19:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 3, "hora": "19:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 4, "hora": "19:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 5, "hora": "19:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 6, "hora": "18:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 6, "semanas": [2], "hora": "14:00", "obs": "Missa dos enfermos"},
  {"igreja": 1, "tipo": "Missa", "dia": 0, "hora": "07:00"},
  {"igreja": 1, "tipo": "Missa", "dia": 0, "hora": "09:30"},
  {"igreja": 1, "tipo": "Missa", "dia": 0, "hora": "19:00"},
  {"igreja": 3, "tipo": "Missa", "dia": 0, "semanas": [1], "hora": "10:30"},
  {"igreja": 4, "tipo": "Missa", "dia": 0, "hora": "19:00"},
  {"igreja": 5, "tipo": "Missa", "dia": 2, "semanas": [3], "hora": "19:00"},
  {"igreja": 6, "tipo": "Missa", "dia": 0, "hora": "17:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 7, "tipo": "Missa", "dia": 6, "hora": "18:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 7, "tipo": "Missa", "dia": 0, "hora": "08:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 8, "tipo": "Missa", "dia": 6, "hora": "19:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 9, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:00"},
  {"igreja": 9, "tipo": "Missa", "dia": 0, "hora": "17:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 10, "tipo": "Missa", "dia": 0, "semanas": [2], "hora": "17:00"},
  {"igreja": 11, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 12, "tipo": "Missa", "dia": 4, "semanas": [2], "hora": "19:30"},
  {"igreja": 13, "tipo": "Missa", "dia": 0, "semanas": [1], "hora": "08:30"},
  {"igreja": 14, "tipo": "Missa", "dia": 0, "hora": "09:30", "obs": "Só um domingo por mês. Confirme na paróquia"},
  {"igreja": 15, "tipo": "Missa", "dia": 0, "hora": "09:00", "obs": "Pode ser missa ou celebração da Palavra"},
  {"igreja": 16, "tipo": "Missa", "dia": 5, "semanas": [2], "hora": "19:30"},
  {"igreja": 17, "tipo": "Missa", "dia": 4, "semanas": [2], "hora": "19:30"},
  {"igreja": 18, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:00"},
  {"igreja": 18, "tipo": "Missa", "dia": 6, "hora": "19:00"},
  {"igreja": 18, "tipo": "Missa", "dia": 0, "hora": "09:30"},
  {"igreja": 18, "tipo": "Missa", "dia": 0, "hora": "19:00"},
  {"igreja": 19, "tipo": "Missa", "dia": 6, "semanas": [3, 5], "hora": "17:00"},
  {"igreja": 20, "tipo": "Missa", "dia": 6, "semanas": [1, 3], "hora": "18:30"},
  {"igreja": 21, "tipo": "Missa", "dia": 5, "hora": "19:00"},
  {"igreja": 21, "tipo": "Missa", "dia": 0, "hora": "17:30"},
  {"igreja": 22, "tipo": "Missa", "dia": 0, "semanas": [1, 3], "hora": "08:00"},
  {"igreja": 22, "tipo": "Missa", "diaDoMes": 19, "hora": "20:00"},
  {"igreja": 23, "tipo": "Missa", "dia": 4, "semanas": [1, 3], "hora": "19:30"},
  {"igreja": 24, "tipo": "Missa", "dia": 6, "semanas": [2, 4], "hora": "20:00"},
  {"igreja": 24, "tipo": "Missa", "diaDoMes": 28, "hora": "20:00"},
  {"igreja": 25, "tipo": "Missa", "dia": 6, "semanas": [2, 4], "hora": "18:30"},
  {"igreja": 26, "tipo": "Missa", "dia": 6, "semanas": [1, 3], "hora": "20:00"},
  {"igreja": 26, "tipo": "Missa", "diaDoMes": 13, "hora": "20:00"},
  {"igreja": 27, "tipo": "Missa", "dia": 0, "semanas": [2, 4], "hora": "08:00"},
  {"igreja": 27, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "20:00"},
  {"igreja": 28, "tipo": "Missa", "dia": 4, "hora": "19:30"},
  {"igreja": 28, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 28, "tipo": "Missa", "dia": 6, "hora": "19:30"},
  {"igreja": 28, "tipo": "Missa", "dia": 0, "hora": "06:30"},
  {"igreja": 28, "tipo": "Missa", "dia": 0, "hora": "08:00"},
  {"igreja": 28, "tipo": "Missa", "dia": 0, "hora": "19:30"},
  {"igreja": 29, "tipo": "Missa", "dia": 0, "hora": "08:00"},
  {"igreja": 29, "tipo": "Missa", "dia": 0, "hora": "18:00"},
  {"igreja": 29, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 30, "tipo": "Missa", "dia": 0, "hora": "08:00"},
  {"igreja": 30, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 31, "tipo": "Missa", "dia": 0, "hora": "18:00"},
  {"igreja": 31, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 32, "tipo": "Missa", "dia": 6, "hora": "18:00"},
  {"igreja": 32, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 33, "tipo": "Missa", "dia": 5, "semanas": [3], "hora": "19:30"},
  {"igreja": 34, "tipo": "Missa", "dia": 6, "semanas": [4], "hora": "16:30"},
  {"igreja": 35, "tipo": "Missa", "dia": 2, "hora": "19:30"},
  {"igreja": 36, "tipo": "Missa", "dia": 3, "hora": "19:30"},
  {"igreja": 37, "tipo": "Missa", "dia": 0, "hora": "09:30"},
  {"igreja": 37, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
  {"igreja": 38, "tipo": "Missa", "dia": 6, "hora": "18:00"},
  {"igreja": 38, "tipo": "Missa", "dia": 0, "hora": "09:30"},
  {"igreja": 38, "tipo": "Missa", "dia": 5, "semanas": [1], "hora": "19:30"},
];

// Confissões e adorações: ainda sem horário fixo publicado pelas paróquias.

// Avisos desta semana (missa cancelada, horário especial, missa extra).
const avisos = [];

function diasAPartirDeHoje(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}
// Eventos: festas, novenas etc. Sem eventos, o botão "Eventos" some.
const eventos = [];
