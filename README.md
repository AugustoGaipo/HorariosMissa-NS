# Horários de Missa em Nova Serrana

Site com os horários de missa, confissão e adoração das igrejas de Nova Serrana (MG).
Funciona no celular e no computador.

Os horários de missa são reais, tirados do site da Diocese de Divinópolis (outubro de 2026). Confissões e adorações ainda não têm horários, porque as paróquias não publicam na internet.

## Arquivos

- `index.html`: a página.
- `css/estilo.css`: as cores, as letras e o layout.
- `js/`: a parte que faz a página funcionar, dividida em arquivos:
  - `dados.js`: igrejas, horários, avisos e eventos (depois vai vir do banco de dados).
  - `apoio.js`: funções pequenas usadas por todo o site (ex.: transformar "19:30" em "19h30").
  - `tela-horarios.js`: a tela de missas, confissões e adorações (dias e períodos).
  - `tela-igrejas.js`: a tela de cada igreja.
  - `tela-eventos.js`: a tela de eventos.
  - `abas.js`: o menu de cima, que troca de tela.

## Como ver

Abra o arquivo `index.html` no navegador.

---
Site independente, sem ligação oficial com a diocese nem com as paróquias.
