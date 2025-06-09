document.addEventListener('DOMContentLoaded', function() {
    Chart.register(ChartDataLabels);

    Chart.defaults.set('plugins.datalabels', {
        color: '#FFF',
        font: {
            weight: 'bold',
            size: 11
        },
        formatter: (value) => {
            if (window.innerWidth < 600) {
                Chart.defaults.plugins.datalabels.font.size = 8;
            }
            return value;
        }
    });

    function formatarValorBR(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function inicializarTodosOsGraficos() {
        inicializarGraficosRecebimentos();
        inicializarGraficosPagamentos();
        inicializarGraficosTaxas();
        inicializarGraficosDivergencias();
        inicializarGraficosComparativos();
    }
    
    function inicializarGraficosRecebimentos() {
        const ctxRecebimentosMes = document.getElementById('graficoRecebimentosMes');
        if (ctxRecebimentosMes) {
            new Chart(ctxRecebimentosMes.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Valor (R$)',
                        data: [15800, 19200, 22500, 18700, 16300, 21400],
                        backgroundColor: '#412884',
                        borderRadius: 4,
                        barThickness: 25
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                        datalabels: { anchor: 'end', align: 'top', color: '#374151', formatter: (value) => (value / 1000).toFixed(1) + 'k' }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
        
        const ctxMetodosPagamento = document.getElementById('graficoMetodosPagamento');
        if (ctxMetodosPagamento) {
            new Chart(ctxMetodosPagamento.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Crédito', 'Débito', 'Pix', 'Outros'],
                    datasets: [{ data: [35, 35, 22, 8], backgroundColor: ['#12283F', '#322871','#89eb88', '#ddede0'], borderWidth: 0 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position:'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                        datalabels: { formatter: (value, ctx) => { const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return `${((value / total) * 100).toFixed(0)}%`; } }
                    }
                }
            });
        }
        
        const ctxBrutoLiquido = document.getElementById('graficoBrutoLiquido');
        if (ctxBrutoLiquido) {
            new Chart(ctxBrutoLiquido.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        { label: 'Bruto', data: [15800, 19200, 22500, 18700, 16300, 21400, 23800, 25100, 20700, 19500, 22800, 27500], backgroundColor: '#322871', borderRadius: 4, barThickness: 16 },
                        { label: 'Líquido', data: [15200, 18500, 21700, 18000, 15700, 20600, 22900, 24200, 19900, 18800, 22000, 26500], backgroundColor: '#89eb88', borderRadius: 4, barThickness: 16 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
        
        const ctxBandeiras = document.getElementById('graficoBandeiras');
        if (ctxBandeiras) {
            new Chart(ctxBandeiras.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        { label: 'Visa', data: [7500, 9200, 10500, 8700, 7300, 9400, 11800, 12100, 9700, 8500, 10800, 13500], backgroundColor: '#322871' },
                        { label: 'Mastercard', data: [5300, 6400, 7300, 6000, 5300, 7200, 7300, 8400, 7300, 7000, 7300, 8400], backgroundColor: '#89eb88' },
                        { label: 'Outras', data: [3000, 3600, 4700, 4000, 3700, 4800, 4700, 4600, 3700, 4000, 4700, 5600], backgroundColor: '#ddede0' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { stacked: true, grid: { display: false } } }
                }
            });
        }
    }

    function inicializarGraficosPagamentos() {
        const ctxPagamentosMes = document.getElementById('graficoPagamentosMes');
        if (ctxPagamentosMes) {
            new Chart(ctxPagamentosMes.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Valor (R$)',
                        data: [8500, 9200, 10500, 9700, 8300, 9400],
                        backgroundColor: '#322871',
                        borderRadius: 4,
                        barThickness: 25
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                        datalabels: { anchor: 'end', align: 'top', color: '#374151', formatter: (value) => (value / 1000).toFixed(1) + 'k' }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(1)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
    
        const ctxCategoriasPagamento = document.getElementById('graficoCategoriasPagamento');
        if (ctxCategoriasPagamento) {
            new Chart(ctxCategoriasPagamento.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Fornecedores', 'Funcionários', 'Impostos', 'Outros'],
                    datasets: [{ data: [35, 25, 30, 10], backgroundColor: ['#12283F', '#322871', '#89eb88', '#ddede0' ], borderWidth: 0 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: { size: 11 } } },
                        datalabels: { formatter: (value, ctx) => { const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return `${((value / total) * 100).toFixed(0)}%`; } }
                    }
                }
            });
        }

        const ctxPagamentosCategoria = document.getElementById('graficoPagamentosCategoria');
        if (ctxPagamentosCategoria) {
            new Chart(ctxPagamentosCategoria.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        { label: 'Fornecedores', data: [4200, 4800, 5300, 4900, 4100, 4700, 5200, 5500, 5000, 4800, 5100, 5800], backgroundColor: '#412884' },
                        { label: 'Funcionários', data: [2800, 2800, 2800, 2800, 2800, 2800, 3000, 3000, 3000, 3000, 3000, 3200], backgroundColor: '#89eb88' },
                        { label: 'Impostos', data: [1500, 1600, 2400, 2000, 1400, 1900, 2000, 2200, 2100, 1900, 2000, 2500], backgroundColor: '#262756' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
    
        const ctxPagamentosMetodo = document.getElementById('graficoPagamentosMetodo');
        if (ctxPagamentosMetodo) {
            new Chart(ctxPagamentosMetodo.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [
                        { label: 'Transferência', data: [5500, 6000, 6500, 6000, 5300, 6000, 6500, 7000, 6500, 6000, 6500, 7500], backgroundColor: '#262756' },
                        { label: 'Boleto', data: [2000, 2200, 2500, 2200, 2000, 2400, 2700, 2800, 2500, 2300, 2600, 2800], backgroundColor: '#89eb88' },
                        { label: 'Outros', data: [1000, 1000, 1500, 1500, 1000, 1000, 1000, 1300, 1200, 1400, 1000, 1200], backgroundColor: '#ddede0' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { stacked: true, grid: { display: false } } }
                }
            });
        }
    }

    function inicializarGraficosTaxas() {
        const ctxTaxaMediaMes = document.getElementById('graficoTaxaMediaMes');
        if (ctxTaxaMediaMes) {
            new Chart(ctxTaxaMediaMes.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
                    datasets: [{
                        label: 'Taxa Média (%)',
                        data: [2.85, 2.91, 2.88, 2.95, 2.92, 2.89, 2.98, 3.01],
                        borderColor: '#322871',
                        backgroundColor: '#322871',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => `Taxa: ${context.raw.toFixed(2)}%` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { grid: { display: false }, ticks: { callback: (value) => `${value.toFixed(2)}%` } }, x: { grid: { display: false } } }
                }
            });
        }

        const ctxTotalTaxasAdquirente = document.getElementById('graficoTotalTaxasAdquirente');
        if (ctxTotalTaxasAdquirente) {
            new Chart(ctxTotalTaxasAdquirente.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Stone', 'Cielo', 'Rede', 'GetNet', 'PagSeguro'],
                    datasets: [{
                        label: 'Valor Total de Taxas (R$)',
                        data: [1250, 980, 850, 730, 1100],
                        backgroundColor: ['#12283F', '#322871', '#89eb88', '#262756', '#412884'],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                        datalabels: { 
                            anchor: 'end',
                            align: 'start',
                            color: '#444', 
                            formatter: (value) => formatarValorBR(value) 
                        }
                    },
                    scales: { y: { grid: { display: false } }, x: { grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(1)}k` } } }
                }
            });
        }

        const ctxTaxaMediaBandeira = document.getElementById('graficoTaxaMediaBandeira');
        if(ctxTaxaMediaBandeira) {
            new Chart(ctxTaxaMediaBandeira.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Visa', 'Mastercard', 'Elo', 'Amex', 'Hipercard'],
                    datasets: [{
                        label: 'Taxa Média',
                        data: [2.80, 2.85, 3.15, 3.50, 3.25],
                        backgroundColor: ['#12283F', '#322871', '#89eb88', '#ddede0', '#262756']
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw.toFixed(2)}%` } },
                        datalabels: { formatter: (value) => `${value.toFixed(2)}%`, color: (context) => context.dataset.backgroundColor === '#ddede0' ? '#333' : '#fff' }
                    }
                }
            })
        }

        const ctxTaxasVsFaturamento = document.getElementById('graficoTaxasVsFaturamento');
        if (ctxTaxasVsFaturamento) {
            new Chart(ctxTaxasVsFaturamento.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        { label: 'Faturamento Bruto', data: [15800, 19200, 22500, 18700, 16300, 21400], backgroundColor: '#322871' },
                        { label: 'Total em Taxas', data: [450, 558, 648, 551, 476, 618], backgroundColor: '#F87171' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
    }

    function inicializarGraficosDivergencias() {
        const ctxDivergenciasMes = document.getElementById('graficoDivergenciasMes');
        if (ctxDivergenciasMes) {
            new Chart(ctxDivergenciasMes.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{ label: 'Quantidade', data: [32, 28, 42, 35, 26, 38], backgroundColor: '#412884', borderRadius: 4, barThickness: 25 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => `${context.raw} divergências` } },
                        datalabels: { anchor: 'end', align: 'top', color: '#374151', formatter: (value) => value }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 10 } }, x: { grid: { display: false } } }
                }
            });
        }
    
        const ctxTiposDivergencias = document.getElementById('graficoTiposDivergencias');
        if (ctxTiposDivergencias) {
            new Chart(ctxTiposDivergencias.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Não Recebido', 'Taxa Incorreta', 'Valor Incorreto', 'Duplicidade'],
                    datasets: [{ data: [45, 30, 15, 10], backgroundColor: ['#12283F', '#322871','#89eb88',  '#ddede0'], borderWidth: 0 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 10, padding: 15, font: { size: 11 } } },
                         datalabels: {
                            formatter: (value, ctx) => { const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0); return `${((value / total) * 100).toFixed(0)}%`; },
                            color: (context) => context.dataset.backgroundColor === '#ddede0' ? '#333' : '#fff'
                        }
                    }
                }
            });
        }

        const ctxValorDivergencias = document.getElementById('graficoValorDivergencias');
        if (ctxValorDivergencias) {
            new Chart(ctxValorDivergencias.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [{
                        label: 'Valor (R$)',
                        data: [1850, 1580, 2670, 2230, 1680, 2450, 1980, 1750, 2120, 1890, 2350, 2780],
                        backgroundColor: '#412884',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                        datalabels: { anchor: 'end', align: 'top', color: '#374151', formatter: (value) => formatarValorBR(value) }
                    },
                    scales: { y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(1)}k` } }, x: { grid: { display: false } } }
                }
            });
        }

        const ctxDivergenciasAdquirente = document.getElementById('graficoDivergenciasAdquirente');
        if (ctxDivergenciasAdquirente) {
            new Chart(ctxDivergenciasAdquirente.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Stone', 'Cielo', 'Rede', 'GetNet', 'PagSeguro'],
                    datasets: [
                        { label: 'Não Recebido', data: [18, 15, 12, 10, 14], backgroundColor: '#12283F' },
                        { label: 'Taxa Incorreta', data: [12, 10, 8, 7, 9], backgroundColor: '#322871' },
                        { label: 'Valor Incorreto', data: [6, 5, 4, 3, 5], backgroundColor: '#89eb88' },
                        { label: 'Duplicidade', data: [4, 3, 2, 2, 3], backgroundColor: '#ddede0' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw} ocorrências` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { stepSize: 10 } }, x: { stacked: true, grid: { display: false } } }
                }
            });
        }
    }

    function inicializarGraficosComparativos() {
        const ctxFaturamentoAnual = document.getElementById('graficoFaturamentoAnual');
        if (ctxFaturamentoAnual) {
            new Chart(ctxFaturamentoAnual.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        { label: '2024', data: [14500, 17800, 21000, 17500, 15200, 19800], backgroundColor: '#ddede0' },
                        { label: '2025', data: [15800, 19200, 22500, 18700, 16300, 21400], backgroundColor: '#322871' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', align: 'end' },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }

        const ctxTicketMedio = document.getElementById('graficoTicketMedio');
        if (ctxTicketMedio) {
            new Chart(ctxTicketMedio.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Ticket Médio',
                        data: [283.50, 287.10, 291.80, 285.40, 289.90, 295.20],
                        borderColor: '#89eb88',
                        backgroundColor: '#89eb88',
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => `Ticket Médio: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { grid: { display: false }, ticks: { callback: (value) => formatarValorBR(value) } }, x: { grid: { display: false } } }
                }
            });
        }

        const ctxVolumeAdquirente = document.getElementById('graficoVolumeAdquirente');
        if (ctxVolumeAdquirente) {
            new Chart(ctxVolumeAdquirente.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Stone', 'Cielo', 'Rede', 'GetNet', 'PagSeguro'],
                    datasets: [{
                        data: [35, 25, 15, 10, 15],
                        backgroundColor: ['#12283F', '#322871', '#89eb88', '#262756', '#412884']
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
                        datalabels: { formatter: (value) => `${value}%` }
                    }
                }
            });
        }

        const ctxEficienciaAdquirente = document.getElementById('graficoEficienciaAdquirente');
        if (ctxEficienciaAdquirente) {
            new Chart(ctxEficienciaAdquirente.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Stone', 'Cielo', 'Rede', 'PagSeguro'],
                    datasets: [
                        { label: 'Faturamento', data: [75000, 62000, 48000, 55000], backgroundColor: '#322871' },
                        { label: 'Taxas', data: [2100, 1950, 1650, 1850], backgroundColor: '#F87171' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', align: 'end' },
                        tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                        datalabels: { display: false }
                    },
                    scales: { y: { grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } }, x: { grid: { display: false } } }
                }
            });
        }
    }
    
    inicializarTodosOsGraficos();
});