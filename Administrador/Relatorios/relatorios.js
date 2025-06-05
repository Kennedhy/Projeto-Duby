document.addEventListener('DOMContentLoaded', function() {
  inicializarGraficos();
  configurarFiltros();
  
  document.getElementById('seletorPeriodo').addEventListener('selecaoAlterada', function(e) {
    const periodoPersonalizado = document.getElementById('periodoPersonalizado');
    if (e.detail.valor === 'custom') {
      periodoPersonalizado.style.display = 'block';
    } else {
      periodoPersonalizado.style.display = 'none';
    }
  });
  
  document.getElementById('aplicarFiltros').addEventListener('click', function() {
    aplicarFiltros();
  });
});

function inicializarGraficos() {
  const ctxClientes = document.getElementById('graficoClientes').getContext('2d');
  new Chart(ctxClientes, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Clientes',
        data: [85, 92, 98, 105, 112, 120, 127],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: getDefaultOptions()
  });
  
  const ctxReceita = document.getElementById('graficoReceita').getContext('2d');
  new Chart(ctxReceita, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Receita (R$)',
        data: [28000, 31000, 35000, 38000, 41000, 43000, 45230],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: getDefaultOptions()
  });
  
  const ctxPlanos = document.getElementById('graficoPlanos').getContext('2d');
  new Chart(ctxPlanos, {
    type: 'doughnut',
    data: {
      labels: ['Básico', 'Padrão', 'Premium', 'Empresarial'],
      datasets: [{
        data: [32, 45, 38, 12],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#8b5cf6'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
  
  const ctxDesempenho = document.getElementById('graficoDesempenho').getContext('2d');
  new Chart(ctxDesempenho, {
    type: 'bar',
    data: {
      labels: ['Clientes', 'Receita', 'Planos', 'Atividades', 'Sessões'],
      datasets: [
        {
          label: 'Atual',
          data: [127, 45230, 4, 342, 1280],
          backgroundColor: '#3b82f6'
        },
        {
          label: 'Mês Anterior',
          data: [122, 40350, 4, 298, 1120],
          backgroundColor: '#64748b'
        }
      ]
    },
    options: getDefaultBarOptions()
  });
  
  const ctxCrescimentoClientes = document.getElementById('graficoCrescimentoClientes').getContext('2d');
  new Chart(ctxCrescimentoClientes, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Total de Clientes',
        data: [85, 92, 98, 105, 112, 120, 127],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: getDefaultOptions()
  });
  
  const ctxSegmentos = document.getElementById('graficoSegmentos').getContext('2d');
  new Chart(ctxSegmentos, {
    type: 'pie',
    data: {
      labels: ['Varejo', 'Alimentação', 'Serviços', 'Outros'],
      datasets: [{
        data: [42, 28, 18, 12],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#8b5cf6'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
  
  const ctxReceitaMensal = document.getElementById('graficoReceitaMensal').getContext('2d');
  new Chart(ctxReceitaMensal, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Receita Mensal (R$)',
        data: [28000, 31000, 35000, 38000, 41000, 43000, 45230],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: getDefaultOptions()
  });
  
  const ctxReceitaPlano = document.getElementById('graficoReceitaPlano').getContext('2d');
  new Chart(ctxReceitaPlano, {
    type: 'bar',
    data: {
      labels: ['Básico', 'Padrão', 'Premium', 'Empresarial'],
      datasets: [{
        label: 'Receita (R$)',
        data: [6400, 13500, 18810, 6520],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#8b5cf6'
        ]
      }]
    },
    options: getDefaultBarOptions()
  });
  
  const ctxReceitaMetodo = document.getElementById('graficoReceitaMetodo').getContext('2d');
  new Chart(ctxReceitaMetodo, {
    type: 'doughnut',
    data: {
      labels: ['Cartão de Crédito', 'Débito Automático', 'Boleto', 'PIX'],
      datasets: [{
        data: [55, 25, 12, 8],
        backgroundColor: [
          '#3b82f6',
          '#22c55e',
          '#f59e0b',
          '#8b5cf6'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
  
  const ctxPrevisaoReceita = document.getElementById('graficoPrevisaoReceita').getContext('2d');
  new Chart(ctxPrevisaoReceita, {
    type: 'line',
    data: {
      labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Realizado',
          data: [41000, 43000, 45230, null, null, null, null, null],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Previsão',
          data: [null, null, 45230, 48000, 51000, 54000, 57000, 60000],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderDash: [5, 5],
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: getDefaultOptions()
  });
  
  const ctxDistribuicaoPlanos = document.getElementById('graficoDistribuicaoPlanos').getContext('2d');
  new Chart(ctxDistribuicaoPlanos, {
    type: 'bar',
    data: {
      labels: ['Básico', 'Padrão', 'Premium', 'Empresarial'],
      datasets: [
        {
          label: 'Atual',
          data: [32, 45, 38, 12],
          backgroundColor: '#3b82f6'
        },
        {
          label: 'Mês Anterior',
          data: [30, 42, 35, 10],
          backgroundColor: '#64748b'
        }
      ]
    },
    options: getDefaultBarOptions()
  });
  
  const ctxConversaoPlanos = document.getElementById('graficoConversaoPlanos').getContext('2d');
  new Chart(ctxConversaoPlanos, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Upgrades',
          data: [5, 8, 6, 10, 12, 9, 11],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Downgrades',
          data: [3, 2, 4, 1, 3, 2, 1],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: getDefaultOptions()
  });
}

function getDefaultOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          callback: function(value) {
            if (value >= 1000) {
              return 'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
            return value;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
}

function getDefaultBarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          callback: function(value) {
            if (value >= 1000) {
              return 'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
            return value;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
}

function configurarFiltros() {
  document.getElementById('seletorTipoRelatorio').addEventListener('selecaoAlterada', function(e) {
    console.log('Tipo de relatório selecionado:', e.detail.valor);
  });
  
  document.getElementById('seletorPeriodo').addEventListener('selecaoAlterada', function(e) {
    console.log('Período selecionado:', e.detail.valor);
  });
}

function aplicarFiltros() {
  const tipoRelatorio = document.querySelector('#seletorTipoRelatorio').parentElement.getAttribute('data-value');
  const periodo = document.querySelector('#seletorPeriodo').parentElement.getAttribute('data-value');
  
  let dataInicial, dataFinal;
  
  if (periodo === 'custom') {
    dataInicial = document.getElementById('dataInicial').value;
    dataFinal = document.getElementById('dataFinal').value;
    
    if (!dataInicial || !dataFinal) {
      mostrarNotificacao('Por favor, selecione ambas as datas para o período personalizado.', 'alerta');
      return;
    }
  }
  
  mostrarNotificacao(`Filtros aplicados: Tipo = ${tipoRelatorio}, Período = ${periodo}`, 'sucesso');
  
  console.log('Aplicando filtros:', {
    tipoRelatorio,
    periodo,
    dataInicial,
    dataFinal
  });
  
  setTimeout(() => {
    mostrarNotificacao('Dados atualizados com sucesso!', 'sucesso');
  }, 1000);
}