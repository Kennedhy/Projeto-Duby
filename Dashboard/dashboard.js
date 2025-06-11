document.addEventListener('DOMContentLoaded', function() {
    Chart.register(ChartDataLabels);

    Chart.defaults.set('plugins.datalabels', {
        color: '#FFF',
        font: {
            weight: 'bold',
            size: 11
        },
        formatter: (value, ctx) => {
            if (window.innerWidth < 600) {
                ctx.chart.options.plugins.datalabels.font.size = 8;
            }
            return value;
        }
    });


    inicializarAbas();
    
    preencherConteudoAbas().then(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        inicializarGraficos();
    });
});

function inicializarAbas() {
    const cardsResumo = document.querySelectorAll('.cardsResumo .card');
    const abas = document.querySelectorAll('.aba');

    if (!cardsResumo.length || !abas.length) return;

    if (cardsResumo.length > 0 && abas.length > 0) {
        cardsResumo[0].classList.add('ativo');
        abas[0].classList.add('ativo');
    }

    cardsResumo.forEach(card => {
        card.addEventListener('click', () => {
            const tabId = card.getAttribute('data-tab');
            
            cardsResumo.forEach(c => c.classList.remove('ativo'));
            abas.forEach(a => a.classList.remove('ativo'));
            
            card.classList.add('ativo');
            const abaAlvo = document.getElementById(tabId);
            if (abaAlvo) abaAlvo.classList.add('ativo');
        });
    });
}

function preencherConteudoAbas() {
    return new Promise((resolve) => {

        inicializarGraficosPagamentos();
        inicializarGraficosDivergencias();
        resolve();
    });
}

function formatarValorBR(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function inicializarGraficos() {
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => formatarValorBR(context.raw)
                        }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        color: '#374151',
                        formatter: (value) => (value / 1000).toFixed(1) + 'k'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: {
                            callback: (value) => `R$ ${(value / 1000).toFixed(0)}k`
                        }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    const ctxMetodosPagamento = document.getElementById('graficoMetodosPagamento');
    if (ctxMetodosPagamento) {
        new Chart(ctxMetodosPagamento.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Crédito', 'Débito', 'Pix', 'Outros'],
                datasets: [{
                    data: [35, 35, 22, 8],
                    backgroundColor: ['#12283F', '#322871','#89eb88', '#ddede0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position:'bottom',
                        labels: { boxWidth: 12, padding: 16, font: { size: 12 } }
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return `${((value / total) * 100).toFixed(0)}%`;
                        }
                    }
                },
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
                    {
                        label: 'Bruto',
                        data: [15800, 19200, 22500, 18700, 16300, 21400, 23800, 25100, 20700, 19500, 22800, 27500],
                        backgroundColor: '#322871',
                        borderRadius: 4,
                        barThickness: 16
                    },
                    {
                        label: 'Líquido',
                        data: [15200, 18500, 21700, 18000, 15700, 20600, 22900, 24200, 19900, 18800, 22000, 26500],
                        backgroundColor: '#89eb88',
                        borderRadius: 4,
                        barThickness: 16
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                    datalabels: {
                        display: false 
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` }
                    },
                    x: { grid: { display: false } }
                }
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
                    {
                        label: 'Visa',
                        data: [7500, 9200, 10500, 8700, 7300, 9400, 11800, 12100, 9700, 8500, 10800, 13500],
                        backgroundColor: '#322871',
                    },
                    {
                        label: 'Mastercard',
                        data: [5300, 6400, 7300, 6000, 5300, 7200, 7300, 8400, 7300, 7000, 7300, 8400],
                        backgroundColor: '#89eb88',
                    },
                    {
                        label: 'Outras',
                        data: [3000, 3600, 4700, 4000, 3700, 4800, 4700, 4600, 3700, 4000, 4700, 5600],
                        backgroundColor: '#ddede0',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                    datalabels: {
                         display: false 
                    }
                },
                scales: {
                    y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } },
                    x: { stacked: true, grid: { display: false } }
                }
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        color: '#374151',
                        formatter: (value) => (value / 1000).toFixed(1) + 'k'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(1)}k` }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const ctxCategoriasPagamento = document.getElementById('graficoCategoriasPagamento');
    if (ctxCategoriasPagamento) {
        new Chart(ctxCategoriasPagamento.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Fornecedores', 'Funcionários', 'Impostos', 'Outros'],
                datasets: [{
                    data: [35, 25, 30, 10],
                    backgroundColor: ['#12283F', '#322871', '#89eb88', '#ddede0' ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, font: { size: 11 } } },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return `${((value / total) * 100).toFixed(0)}%`;
                        }
                    }
                },
            }
        });
    }

    inicializarOutrosGraficosPagamentos();
}

function inicializarOutrosGraficosPagamentos() {
    const ctxPagamentosCategoria = document.getElementById('graficoPagamentosCategoria');
    if (ctxPagamentosCategoria) {
        new Chart(ctxPagamentosCategoria.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Fornecedores',
                        data: [4200, 4800, 5300, 4900, 4100, 4700, 5200, 5500, 5000, 4800, 5100, 5800],
                        backgroundColor: '#412884',
                    },
                    {
                        label: 'Funcionários',
                        data: [2800, 2800, 2800, 2800, 2800, 2800, 3000, 3000, 3000, 3000, 3000, 3200],
                        backgroundColor: '#89eb88',
                    },
                    {
                        label: 'Impostos',
                        data: [1500, 1600, 2400, 2000, 1400, 1900, 2000, 2200, 2100, 1900, 2000, 2500],
                        backgroundColor: '#262756',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                    datalabels: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } },
                    x: { grid: { display: false } }
                }
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
                    {
                        label: 'Transferência',
                        data: [5500, 6000, 6500, 6000, 5300, 6000, 6500, 7000, 6500, 6000, 6500, 7500],
                        backgroundColor: '#262756'
                    },
                    {
                        label: 'Boleto',
                        data: [2000, 2200, 2500, 2200, 2000, 2400, 2700, 2800, 2500, 2300, 2600, 2800],
                        backgroundColor: '#89eb88'
                    },
                    {
                        label: 'Outros',
                        data: [1000, 1000, 1500, 1500, 1000, 1000, 1000, 1300, 1200, 1400, 1000, 1200],
                        backgroundColor: '#ddede0'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${formatarValorBR(context.raw)}` } },
                    datalabels: {
                         display: false 
                    }
                },
                scales: {
                    y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } },
                    x: { stacked: true, grid: { display: false } }
                }
            }
        });
    }
}


function inicializarGraficosDivergencias() {
    const ctxMeiaLua = document.getElementById('graficoMeiaLua');
    if (ctxMeiaLua) {
        new Chart(ctxMeiaLua.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Conciliados', 'Divergências', 'Pendentes'],
                datasets: [{
                    data: [77, 13, 10],
                    backgroundColor: [ '#4ADE80', '#F87171', '#FBBF24' ],
                    borderColor: '#FFFFFF',
                    borderWidth: 2,
                    circumference: 180, 
                    rotation: 270 
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
                    datalabels: {
                        formatter: (value) => `${value}%`
                    }
                },
                cutout: '70%'
            }
        });
    }

    const ctxDivergenciasMes = document.getElementById('graficoDivergenciasMes');
    if (ctxDivergenciasMes) {
        new Chart(ctxDivergenciasMes.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Quantidade',
                    data: [32, 28, 42, 35, 26, 38],
                    backgroundColor: '#412884',
                    borderRadius: 4,
                    barThickness: 25
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => `${context.raw} divergências` } },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        color: '#374151',
                         formatter: (value) => value
                    }
                },
                scales: {
                    y: { beginAtZero: true, grid: { display: false }, ticks: { stepSize: 10 } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const ctxTiposDivergencias = document.getElementById('graficoTiposDivergencias');
    if (ctxTiposDivergencias) {
        new Chart(ctxTiposDivergencias.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Não Recebido', 'Taxa Incorreta', 'Valor Incorreto', 'Duplicidade'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#12283F', '#322871','#89eb88',  '#ddede0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 10, padding: 15, font: { size: 11 } } },
                     datalabels: {
                        formatter: (value, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            return `${((value / total) * 100).toFixed(0)}%`;
                        },
                        color: (context) => context.dataset.backgroundColor === '#ddede0' ? '#333' : '#fff'
                    }
                },
            }
        });
    }

    inicializarOutrosGraficosDivergencias();
}

function inicializarOutrosGraficosDivergencias() {
    const ctxValorDivergencias = document.getElementById('graficoValorDivergencias');
    if (ctxValorDivergencias) {
        new Chart(ctxValorDivergencias.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Valor (R$)',
                    data: [18500, 15800, 26700, 22300, 16800, 24500, 19800, 17500, 21200, 18900, 23500, 27800],
                    backgroundColor: '#412884',
                    borderRadius: 4,
                    barThickness: 25
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => formatarValorBR(context.raw) } },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        color: '#374151',
                        formatter: (value) => (value / 1000).toFixed(1) + 'k'
                    }
                },
                scales: {
                    y: { beginAtZero: true, grid: { display: false }, ticks: { callback: (value) => `R$ ${(value / 1000).toFixed(0)}k` } },
                    x: { grid: { display: false } }
                }
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 8, usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11 } } },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw} ocorrências` } },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    y: { stacked: true, beginAtZero: true, grid: { display: false }, ticks: { stepSize: 10 } },
                    x: { stacked: true, grid: { display: false } }
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openOverlay');
    const closeBtn = document.getElementById('closeOverlay');
    
    if(openBtn) {
        openBtn.addEventListener('click', function() {
            overlay.classList.add('active');
        });
    }
    
    if(closeBtn) {
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
        });
    }
    
    if(overlay){
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }
    
    const seletorCategoria = document.getElementById('seletorCategoria');
    const opcoesCategoria = document.getElementById('opcoesCategoria');
    
    if(seletorCategoria) {
        seletorCategoria.addEventListener('click', function(e) {
            e.stopPropagation();
            opcoesCategoria.classList.toggle('ativo');
        });
    }

    document.addEventListener('click', function() {
        if(opcoesCategoria) {
            opcoesCategoria.classList.remove('ativo');
        }
    });
    
    if(opcoesCategoria){
        opcoesCategoria.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    function isMobile() {
        return window.innerWidth <= 768; 
    }

    function transformarTabelasParaMobile() {
        if (!isMobile()) return;

        const todasTabelas = document.querySelectorAll('.tabela:not([data-mobile-transformado])');
        
        const tabelasParaProcessar = Array.from(todasTabelas).slice(0, 5); // Processa no máximo 5 tabelas de cada vez
        
        tabelasParaProcessar.forEach(tabela => {
            tabela.setAttribute('data-mobile-transformado', 'true');
            
            const tabelaContainer = tabela.closest('.tabelaContainer');
            const cabecalhoTabela = tabela.closest('.cartaoTabela')?.querySelector('.cabecalhoTabela');
            
            const mobileWrapper = document.createElement('div');
            mobileWrapper.className = 'tabela-mobile-wrapper';
            
            const processarLinhas = () => {
                const linhas = tabela.querySelectorAll('tbody tr');
                let i = 0;
                
                const processarProximaLinha = () => {
                    if (i >= linhas.length) return;
                    
                    const linha = linhas[i];
                    i++;
                    
                    const celulas = linha.querySelectorAll('td');
                    const linhaMobile = document.createElement('div');
                    linhaMobile.className = 'linha-mobile';
                    
                    const cabecalhoLinha = document.createElement('div');
                    cabecalhoLinha.className = 'cabecalho-linha-mobile';
                    
                    const codigo = document.createElement('div');
                    codigo.className = 'codigo-mobile';
                    codigo.textContent = celulas[0]?.textContent || '';
                    
                    const valor = document.createElement('div');
                    valor.className = 'valor-mobile';
                    valor.textContent = celulas[2]?.textContent || celulas[1]?.textContent || '';
                    
                    const status = celulas[celulas.length - 1]?.querySelector('.badge')?.cloneNode(true);
                    if (status) {
                        status.className = status.className.replace('badge', 'status-mobile');
                    }
                    
                    cabecalhoLinha.append(codigo, valor);
                    if (status) cabecalhoLinha.appendChild(status);
                    
                    const botaoExpandir = document.createElement('button');
                    botaoExpandir.className = 'botao-expandir-mobile';
                    botaoExpandir.innerHTML = '<i data-lucide="chevron-down"></i>';
                    cabecalhoLinha.appendChild(botaoExpandir);
                    
                    linhaMobile.appendChild(cabecalhoLinha);
                    
                    const detalhesLinha = document.createElement('div');
                    detalhesLinha.className = 'detalhes-linha-mobile';
                    detalhesLinha.style.display = 'none';
                    
                    const cabecalhos = tabela.querySelectorAll('thead th');
                    for (let j = 1; j < celulas.length - 1; j++) {
                        if (j === 2) continue;
                        
                        const item = document.createElement('div');
                        item.className = 'item-detalhe-mobile';
                        
                        const rotulo = document.createElement('span');
                        rotulo.className = 'rotulo-mobile';
                        rotulo.textContent = cabecalhos[j]?.textContent || '';
                        
                        const valorDetalhe = document.createElement('span');
                        valorDetalhe.className = 'valor-mobile';
                        valorDetalhe.textContent = celulas[j]?.textContent || '';
                        
                        item.append(rotulo, valorDetalhe);
                        detalhesLinha.appendChild(item);
                    }
                    
                    linhaMobile.appendChild(detalhesLinha);
                    mobileWrapper.appendChild(linhaMobile);
                    
                    cabecalhoLinha.addEventListener('click', function() {
                        const expandida = linhaMobile.classList.toggle('expandida');
                        detalhesLinha.style.display = expandida ? 'grid' : 'none';
                        botaoExpandir.innerHTML = expandida ? 
                            '<i data-lucide="chevron-up"></i>' : 
                            '<i data-lucide="chevron-down"></i>';
                        
                        if (window.lucide) {
                            lucide.createIcons();
                        }
                    });
                    
                    requestAnimationFrame(processarProximaLinha);
                };
                
                processarProximaLinha();
            };
            
            setTimeout(processarLinhas, 0);
            
            if (cabecalhoTabela) {
                cabecalhoTabela.insertAdjacentElement('afterend', mobileWrapper);
            } else {
                tabelaContainer.parentNode.insertBefore(mobileWrapper, tabelaContainer);
            }
            
            tabelaContainer.classList.add('tabela-desktop');
        });
    }

    function adicionarEstilosMobile() {
        if (document.getElementById('estilos-tabela-mobile')) return;
        
        const style = document.createElement('style');
        style.id = 'estilos-tabela-mobile';
        style.textContent = `
            @media (max-width: 768px) {
                .tabela-mobile-wrapper {
                    display: block;
                    padding: 8px;
                }
                
                .tabela-desktop {
                    display: none !important;
                }
                
                .linha-mobile {
                    background: var(--cartoes);
                    border-radius: 10px;
                    margin-bottom: 12px;
                    box-shadow: var(--sombra);
                    border: 1px solid var(--borda);
                }
                
                .cabecalho-linha-mobile {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px;
                    cursor: pointer;
                    gap: 8px;
                }
                
                .codigo-mobile {
                    font-weight: 700;
                    font-size: 0.9rem;
                    min-width: 80px;
                }
                
                .valor-mobile {
                    flex-grow: 1;
                    text-align: right;
                }
                
                .status-mobile {
                    font-size: 0.75rem;
                    padding: 4px 8px;
                    border-radius: 12px;
                    margin-left: 8px;
                }
                
                .botao-expandir-mobile {
                    background: none;
                    border: none;
                    padding: 4px;
                    margin-left: 8px;
                }
                
                .detalhes-linha-mobile {
                    display: none;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    padding: 12px;
                    border-top: 1px solid var(--borda);
                }
                
                .linha-mobile.expandida .detalhes-linha-mobile {
                    display: grid;
                }
                
                .item-detalhe-mobile {
                    display: flex;
                    flex-direction: column;
                }
                
                .rotulo-mobile {
                    font-size: 0.75rem;
                    color: var(--texto-p);
                }
            }
            
            @media (min-width: 769px) {
                .tabela-mobile-wrapper {
                    display: none !important;
                }
                
                .tabela-desktop {
                    display: table !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        adicionarEstilosMobile();
        
        if (isMobile()) {
            transformarTabelasParaMobile();
            
            const observer = new MutationObserver(function(mutations) {
                if (!isMobile()) return;
                
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1 && node.querySelector('.tabela')) {
                                transformarTabelasParaMobile();
                            }
                        });
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (isMobile()) {
                    transformarTabelasParaMobile();
                }
            }, 100);
        });
    }

    setTimeout(init, 50);
    
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 300);
    }
});