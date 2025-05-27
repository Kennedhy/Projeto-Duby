document.addEventListener('DOMContentLoaded', function() {
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


document.addEventListener('DOMContentLoaded', function() {

    const botoesAbas = document.querySelectorAll('.botaoAba[data-relatorio]');
    const conteudosRelatorios = document.querySelectorAll('.conteudoRelatorio');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const relatorioId = this.getAttribute('data-relatorio');
            
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            conteudosRelatorios.forEach(c => c.classList.remove('ativo'));
            
            this.classList.add('ativo');
            document.getElementById(relatorioId).classList.add('ativo');
        });
    });

    if (!document.querySelector('.botaoAba.ativo')) {
        botoesAbas[0].classList.add('ativo');
        conteudosRelatorios[0].classList.add('ativo');
    }
});


function preencherConteudoAbas() {
    return new Promise((resolve) => {

        const abaTaxas = document.getElementById('taxas');
        if (abaTaxas) {
            abaTaxas.innerHTML = `
                <section class="secaoGraficos">
                    <h2>Gráficos De Taxas</h2>
                    <div class="containerGraficos">
                        <div class="cartaoGrafico">
                            <div class="cabecalhoGrafico">
                                <h3>Comparativo de Taxas por Adquirente</h3>
                                <p>Taxas aplicadas por cada adquirente por método de pagamento</p>
                            </div>
                            <div class="grafico">
                                <canvas id="graficoTaxasAdquirente"></canvas>
                            </div>
                        </div>
                        <div class="cartaoGrafico">
                            <div class="cabecalhoGrafico">
                                <h3>Distribuição de Taxas por Método</h3>
                                <p>Taxas médias aplicadas por método de pagamento</p>
                            </div>
                            <div class="grafico">
                                <canvas id="graficoTaxasMetodo"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="cartaoGrafico larguraTotal">
                        <div class="cabecalhoGrafico">
                            <h3>Evolução das Taxas ao Longo do Tempo</h3>
                            <p>Variação das taxas nos últimos 12 meses</p>
                        </div>
                        <div class="grafico">
                            <canvas id="graficoEvolucaoTaxas"></canvas>
                        </div>
                    </div>
                    <div class="cartaoGrafico larguraTotal">
                        <div class="cabecalhoGrafico">
                            <h3>Impacto das Taxas na Receita</h3>
                            <p>Comparação entre valores brutos, taxas e valores líquidos</p>
                        </div>
                        <div class="grafico">
                            <canvas id="graficoImpactoTaxas"></canvas>
                        </div>
                    </div>
                </section>

                <section class="secaoTransacoes">
                    <h2>Taxas Das Adquirentes</h2>
                    <div class="cartaoTabela">
                        <div class="cabecalhoTabela">
                            <h3>Principais Taxas</h3>
                            <button class="botaoAdicionar">
                                <i class="iconeTabela" data-lucide="plus"></i>
                                Adicionar Taxa
                            </button>
                        </div>
                        <div class="tabelaContainer">
                            <table class="tabela">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Pix</th>
                                        <th>Débito</th>
                                        <th>Taxa De Liberação</th>
                                        <th>Crédito À Vista</th>
                                        <th>Taxa De Parcelamento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Stone</td>
                                        <td>0%</td>
                                        <td>1,48%</td>
                                        <td>0%</td>
                                        <td>3,45%</td>
                                        <td>0%</td>
                                        <td><span class="badge completo">Atualizado</span></td>
                                    </tr>
                                    <tr>
                                        <td>Cielo</td>
                                        <td>0%</td>
                                        <td>1,99%</td>
                                        <td>0%</td>
                                        <td>3,99%</td>
                                        <td>0%</td>
                                        <td><span class="badge completo">Atualizado</span></td>
                                    </tr>
                                    <tr>
                                        <td>Rede</td>
                                        <td>0%</td>
                                        <td>1,89%</td>
                                        <td>0%</td>
                                        <td>3,79%</td>
                                        <td>0%</td>
                                        <td><span class="badge completo">Atualizado</span></td>
                                    </tr>
                                    <tr>
                                        <td>GetNet</td>
                                        <td>0%</td>
                                        <td>1,79%</td>
                                        <td>0%</td>
                                        <td>3,89%</td>
                                        <td>0%</td>
                                        <td><span class="badge completo">Atualizado</span></td>
                                    </tr>
                                    <tr>
                                        <td>PagSeguro</td>
                                        <td>0%</td>
                                        <td>1,95%</td>
                                        <td>0%</td>
                                        <td>4,10%</td>
                                        <td>0%</td>
                                        <td><span class="badge completo">Atualizado</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            `;
        }



        inicializarGraficosPagamentos();
        inicializarGraficosTaxas();
        inicializarGraficosDivergencias();
        
        resolve();
    });
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'R$ ' + context.raw.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                    backgroundColor: ['#12283F', '#322871','#89eb88', '#ddede0',  ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position:'left',
                        labels: {
                            boxWidth: 12,
                            padding: 16,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (R$ ${(value * 1000).toLocaleString('pt-BR')})`;
                            }
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
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 16,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${(value / 1000).toFixed(0)}k`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                        borderRadius: {
                            topLeft: 1,
                            topRight: 1,
                            bottomLeft: 0,
                            bottomRight: 0
                        },
                        barPercentage: 0.6
                    },
                    {
                        label: 'Mastercard',
                        data: [5300, 6400, 7300, 6000, 5300, 7200, 7300, 8400, 7300, 7000, 7300, 8400],
                        backgroundColor: '#89eb88',
                        borderRadius: 0,
                        barPercentage: 0.6
                    },
                    {
                        label: 'Outras',
                        data: [3000, 3600, 4700, 4000, 3700, 4800, 4700, 4600, 3700, 4000, 4700, 5600],
                        backgroundColor: '#ddede0',
                        borderRadius: {
                            topLeft: 0,
                            topRight: 0,
                            bottomLeft: 4,
                            bottomRight: 4
                        },
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 16,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${(value / 1000).toFixed(0)}k`;
                            }
                        }
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'R$ ' + context.raw.toLocaleString('pt-BR');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (R$ ${(value * 500).toLocaleString('pt-BR')})`;
                            }
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
                        borderRadius: 4,
                        barThickness: 15
                    },
                    {
                        label: 'Funcionários',
                        data: [2800, 2800, 2800, 2800, 2800, 2800, 3000, 3000, 3000, 3000, 3000, 3200],
                        backgroundColor: '#89eb88',
                        borderRadius: 4,
                        barThickness: 15
                    },
                    {
                        label: 'Impostos',
                        data: [1500, 1600, 2400, 2000, 1400, 1900, 2000, 2200, 2100, 1900, 2000, 2500],
                        backgroundColor: '#262756',
                        borderRadius: 4,
                        barThickness: 15
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${(value / 1000).toFixed(0)}k`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                        backgroundColor: '#262756',
                        barPercentage: 0.6
                    },
                    {
                        label: 'Boleto',
                        data: [2000, 2200, 2500, 2200, 2000, 2400, 2700, 2800, 2500, 2300, 2600, 2800],
                        backgroundColor: '#89eb88',
                        borderRadius: 0,
                        barPercentage: 0.6
                    },
                    {
                        label: 'Outros',
                        data: [1000, 1000, 1500, 1500, 1000, 1000, 1000, 1300, 1200, 1400, 1000, 1200],
                        backgroundColor: '#ddede0',
                        borderRadius: {
                            topLeft: 0,
                            topRight: 0,
                            bottomLeft: 4,
                            bottomRight: 4
                        },
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${(value / 1000).toFixed(0)}k`;
                            }
                        }
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

function inicializarGraficosTaxas() {
    const ctxTaxasMetodo = document.getElementById('graficoTaxasMetodo');
    if (ctxTaxasMetodo) {
        new Chart(ctxTaxasMetodo.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Débito', 'Crédito à Vista', 'Crédito 2-6x', 'Crédito 7-12x', 'Pix'],
                datasets: [{
                    data: [1.8, 3.7, 4.5, 5.2, 0.2],
                    backgroundColor: ['#60A5FA', '#4338CA', '#818CF8', '#C7D2FE', '#34D399'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    inicializarOutrosGraficosTaxas();
}

function inicializarOutrosGraficosTaxas() {
    const ctxTaxasAdquirente = document.getElementById('graficoTaxasAdquirente');
    if (ctxTaxasAdquirente) {
        new Chart(ctxTaxasAdquirente.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Stone', 'Cielo', 'Rede', 'GetNet', 'PagSeguro'],
                datasets: [
                    {
                        label: 'Débito',
                        data: [1.48, 1.99, 1.89, 1.79, 1.95],
                        backgroundColor: '#60A5FA',
                        borderRadius: 4,
                        barThickness: 15
                    },
                    {
                        label: 'Crédito à Vista',
                        data: [3.45, 3.99, 3.79, 3.89, 4.1],
                        backgroundColor: '#4338CA',
                        borderRadius: 4,
                        barThickness: 15
                    },
                    {
                        label: 'Crédito Parcelado',
                        data: [4.25, 4.89, 4.69, 4.79, 4.95],
                        backgroundColor: '#818CF8',
                        borderRadius: 4,
                        barThickness: 15
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return `${value}%`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    const ctxEvolucaoTaxas = document.getElementById('graficoEvolucaoTaxas');
    if (ctxEvolucaoTaxas) {
        new Chart(ctxEvolucaoTaxas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Débito',
                        data: [1.55, 1.53, 1.52, 1.5, 1.49, 1.48, 1.48, 1.48, 1.47, 1.47, 1.46, 1.45],
                        borderColor: '#60A5FA',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 2
                    },
                    {
                        label: 'Crédito à Vista',
                        data: [3.6, 3.58, 3.55, 3.52, 3.5, 3.48, 3.47, 3.46, 3.45, 3.44, 3.43, 3.42],
                        borderColor: '#4338CA',
                        backgroundColor: 'rgba(67, 56, 202, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 2
                    },
                    {
                        label: 'Crédito Parcelado',
                        data: [4.4, 4.38, 4.35, 4.33, 4.3, 4.28, 4.27, 4.26, 4.25, 4.24, 4.23, 4.22],
                        borderColor: '#818CF8',
                        backgroundColor: 'rgba(129, 140, 248, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return `${value}%`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    const ctxImpactoTaxas = document.getElementById('graficoImpactoTaxas');
    if (ctxImpactoTaxas) {
        new Chart(ctxImpactoTaxas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Valor Bruto',
                        data: [100000, 120000, 110000, 130000, 125000, 140000],
                        backgroundColor: '#4338CA',
                        borderRadius: {
                            topLeft: 4,
                            topRight: 4,
                            bottomLeft: 0,
                            bottomRight: 0
                        },
                        barPercentage: 0.6
                    },
                    {
                        label: 'Taxas',
                        data: [3500, 4200, 3850, 4550, 4375, 4900],
                        backgroundColor: '#EF4444',
                        borderRadius: 0,
                        barPercentage: 0.6
                    },
                    {
                        label: 'Valor Líquido',
                        data: [96500, 115800, 106150, 125450, 120625, 135100],
                        backgroundColor: '#10B981',
                        borderRadius: {
                            topLeft: 0,
                            topRight: 0,
                            bottomLeft: 4,
                            bottomRight: 4
                        },
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${value / 1000}k`;
                            }
                        }
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
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
                    data: [80, 14, 6],
                    backgroundColor: [
                        '#4ADE80',
                        '#F87171',
                        '#FBBF24'
                    ],
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} divergências`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            stepSize: 10
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 10,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${percentage}% (${value} ocorrências)`;
                            }
                        }
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
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value) {
                                return value === 0 ? '0' : `R$ ${(value / 1000).toFixed(0)}k`;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
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
                    {
                        label: 'Não Recebido',
                        data: [18, 15, 12, 10, 14],
                        backgroundColor: '#12283F',
                        barPercentage: 0.7
                    },
                    {
                        label: 'Taxa Incorreta',
                        data: [12, 10, 8, 7, 9],
                        backgroundColor: '#322871',
                        barPercentage: 0.7
                    },
                    {
                        label: 'Valor Incorreto',
                        data: [6, 5, 4, 3, 5],
                        backgroundColor: '#89eb88',
                        barPercentage: 0.7
                    },
                    {
                        label: 'Duplicidade',
                        data: [4, 3, 2, 2, 3],
                        backgroundColor: '#ddede0', 
                        barPercentage: 0.7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 8,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw} ocorrências`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            stepSize: 10
                        }
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openOverlay');
    const closeBtn = document.getElementById('closeOverlay');
    
    openBtn.addEventListener('click', function() {
        overlay.classList.add('active');
    });
    
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});




    const seletorCategoria = document.getElementById('seletorCategoria');
    const opcoesCategoria = document.getElementById('opcoesCategoria');

    seletorCategoria.addEventListener('click', function(e) {
        e.stopPropagation();
        opcoesCategoria.classList.toggle('ativo');
    });

    document.addEventListener('click', function() {
        opcoesCategoria.classList.remove('ativo');
    });

    opcoesCategoria.addEventListener('click', function(e) {
        e.stopPropagation();
    });


