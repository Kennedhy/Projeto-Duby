document.addEventListener("DOMContentLoaded", () => {
  const cardsResumo = document.querySelectorAll(".cardsResumo .card");
  const abas = document.querySelectorAll(".conteudoAbas .aba");

  function ativarAba(tabId) {
    abas.forEach((aba) => {
      if (aba.id === tabId) aba.classList.add("ativo");
      else aba.classList.remove("ativo");
    });
    cardsResumo.forEach((card) => {
      if (card.dataset.tab === tabId) card.classList.add("ativo");
      else card.classList.remove("ativo");
    });
    if (abas.length > 0) {
      abas[0].parentElement.classList.add('ativo');
    }
  }

  ativarAba("recebimentos");

  cardsResumo.forEach((card) => {
    card.addEventListener("click", () => {
      ativarAba(card.dataset.tab);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        ativarAba(card.dataset.tab);
      }
    });
  });

  // Purple palette
  const primary = "#412884";
  const primaryLight = "#816cf8";
  const white = "#fff";
  const purpleAlpha = "rgba(65, 40, 132, 0.7)";
  const purpleAlphaLight = "rgba(129, 140, 248, 0.7)";

  function criarGrafico(id, tipo, labels, dados, cor, labelDataset = "Dados") {
    const ctx = document.getElementById(id).getContext("2d");
    return new Chart(ctx, {
      type: tipo,
      data: {
        labels: labels,
        datasets: [
          {
            label: labelDataset,
            data: dados,
            backgroundColor: cor,
            borderColor: cor,
            borderWidth: 1,
            fill: tipo === "line" ? false : true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Recebimentos
  criarGrafico(
    "graficoRecebimentosMes",
    "bar",
    ["Jan", "Fev", "Mar", "Abr", "Mai"],
    [6000, 7000, 6500, 8000, 9000],
    purpleAlpha,
    "Recebimentos"
  );

  criarGrafico(
    "graficoMetodosPagamento",
    "pie",
    ["Cartão", "Boleto", "Pix", "Dinheiro"],
    [35, 25, 30, 10],
    [primary, primaryLight, white, purpleAlpha],
    "Métodos"
  );

  // Bruto x Líquido Recebimentos (apenas UMA vez, com dois datasets)
  const ctxBrutoLiquido = document
    .getElementById("graficoBrutoLiquido")
    .getContext("2d");
  new Chart(ctxBrutoLiquido, {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [
        {
          label: "Bruto",
          data: [6500, 7200, 6700, 8500, 9400],
          backgroundColor: "transparent",
          borderColor: primary,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
        {
          label: "Líquido",
          data: [5800, 6700, 6200, 7900, 8800],
          backgroundColor: "transparent",
          borderColor: primaryLight,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  criarGrafico(
    "graficoBandeiras",
    "doughnut",
    ["Visa", "Mastercard", "Amex", "Elo"],
    [40, 30, 20, 10],
    [primary, primaryLight, white, purpleAlpha],
    "Bandeiras"
  );

  // Pagamentos
  criarGrafico(
    "graficoPagamentosMes",
    "bar",
    ["Jan", "Fev", "Mar", "Abr", "Mai"],
    [5000, 6000, 5800, 7200, 7600],
    purpleAlpha,
    "Pagamentos"
  );

  criarGrafico(
    "graficoMetodosPagamentoPag",
    "pie",
    ["Cartão", "Boleto", "Pix", "Dinheiro"],
    [30, 30, 25, 15],
    [primary, primaryLight, white, purpleAlpha],
    "Métodos"
  );

  // Bruto x Líquido Pagamentos (apenas UMA vez, com dois datasets)
  const ctxBrutoLiquidoPag = document
    .getElementById("graficoBrutoLiquidoPag")
    .getContext("2d");
  new Chart(ctxBrutoLiquidoPag, {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [
        {
          label: "Bruto",
          data: [5500, 6300, 6000, 7400, 7800],
          backgroundColor: "transparent",
          borderColor: primary,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
        {
          label: "Líquido",
          data: [4800, 5700, 5400, 6700, 7100],
          backgroundColor: "transparent",
          borderColor: primaryLight,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  criarGrafico(
    "graficoBandeirasPag",
    "doughnut",
    ["Visa", "Mastercard", "Amex", "Elo"],
    [45, 25, 20, 10],
    [primary, primaryLight, white, purpleAlpha],
    "Bandeiras"
  );

  // Taxas
  criarGrafico(
    "graficoTaxasMes",
    "bar",
    ["Jan", "Fev", "Mar", "Abr", "Mai"],
    [550, 670, 610, 720, 750],
    purpleAlpha,
    "Taxas"
  );

  criarGrafico(
    "graficoMetodosTaxas",
    "pie",
    ["Cartão", "Boleto", "Pix", "Dinheiro"],
    [40, 30, 20, 10],
    [primary, primaryLight, white, purpleAlpha],
    "Métodos"
  );

  // Bruto x Líquido Taxas (apenas UMA vez, com dois datasets)
  const ctxBrutoLiquidoTaxas = document
    .getElementById("graficoBrutoLiquidoTaxas")
    .getContext("2d");
  new Chart(ctxBrutoLiquidoTaxas, {
    type: "line",
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [
        {
          label: "Bruto",
          data: [600, 720, 670, 800, 850],
          backgroundColor: "transparent",
          borderColor: primary,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
        {
          label: "Líquido",
          data: [550, 660, 610, 720, 780],
          backgroundColor: "transparent",
          borderColor: primaryLight,
          borderWidth: 2,
          fill: false,
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  criarGrafico(
    "graficoBandeirasTaxas",
    "doughnut",
    ["Visa", "Mastercard", "Amex", "Elo"],
    [50, 30, 15, 5],
    [primary, primaryLight, white, purpleAlpha],
    "Bandeiras"
  );

  // Divergências
  criarGrafico(
    "graficoDivergenciasMes",
    "bar",
    ["Jan", "Fev", "Mar", "Abr", "Mai"],
    [4, 5, 3, 6, 1],
    purpleAlpha,
    "Divergências"
  );
});
