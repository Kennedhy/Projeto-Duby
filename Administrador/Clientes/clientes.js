document.addEventListener('DOMContentLoaded', function() {
  inicializarSeletores();
  carregarClientes();
  
  const botaoNovoCliente = document.getElementById('botaoNovoCliente');
  if (botaoNovoCliente) {
    botaoNovoCliente.addEventListener('click', function() {
      window.location.href = 'clientes-novo.html';
    });
  }
  
  const campoPesquisa = document.getElementById('pesquisaClientes');
  if (campoPesquisa) {
    campoPesquisa.addEventListener('input', function() {
      filtrarClientes();
    });
  }
});

function inicializarSeletores() {
  const seletorStatus = document.querySelector('.seletor');
  if (seletorStatus) {
    const seletorBotao = seletorStatus.querySelector('.seletorBotao');
    const opcoesStatus = seletorStatus.querySelector('.seletorOpcoes');
    const opcoes = opcoesStatus.querySelectorAll('.seletorOpcao');
    
    seletorBotao.addEventListener('click', function(e) {
      e.stopPropagation();
      opcoesStatus.classList.toggle('aberto');
    });
    
    opcoes.forEach(opcao => {
      opcao.addEventListener('click', function() {
        const valor = this.getAttribute('data-value');
        seletorStatus.setAttribute('data-value', valor);
        seletorBotao.querySelector('span').textContent = this.textContent;
        opcoesStatus.classList.remove('aberto');
        filtrarClientes();
      });
    });
    
    document.addEventListener('click', function() {
      opcoesStatus.classList.remove('aberto');
    });
  }
}

const clientes = [
  {
    id: 1,
    nome: "Supermercado ABC",
    email: "contato@abc.com.br",
    telefone: "(11) 98765-4321",
    status: "active",
    data: "12/04/2023",
  },
  {
    id: 2,
    nome: "Farmácia Saúde",
    email: "admin@farmaciasaude.com.br",
    telefone: "(21) 98765-4321",
    status: "active",
    data: "05/04/2023",
  },
  {
    id: 3,
    nome: "Restaurante Sabor",
    email: "financeiro@sabor.com.br",
    telefone: "(31) 98765-4321",
    status: "pending",
    data: "01/04/2023",
  },
  {
    id: 4,
    nome: "Loja de Roupas Fashion",
    email: "contato@fashion.com.br",
    telefone: "(41) 98765-4321",
    status: "active",
    data: "28/03/2023",
  },
  {
    id: 5,
    nome: "Posto de Gasolina Rápido",
    email: "atendimento@rapido.com.br",
    telefone: "(51) 98765-4321",
    status: "inactive",
    data: "15/03/2023",
  },
  {
    id: 6,
    nome: "Padaria Delícia",
    email: "contato@padariadelicia.com.br",
    telefone: "(61) 98765-4321",
    status: "active",
    data: "10/03/2023",
  },
  {
    id: 7,
    nome: "Hotel Conforto",
    email: "reservas@hotelconforto.com.br",
    telefone: "(71) 98765-4321",
    status: "active",
    data: "05/03/2023",
  },
  {
    id: 8,
    nome: "Academia Fitness",
    email: "contato@academiafitness.com.br",
    telefone: "(81) 98765-4321",
    status: "pending",
    data: "01/03/2023",
  },
];

function carregarClientes(clientesFiltrados = null) {
  const tabela = document.getElementById('tabelaClientes');
  if (!tabela) return;
  
  const tbody = tabela.querySelector('tbody');
  tbody.innerHTML = '';
  
  const dadosClientes = clientesFiltrados || clientes;
  
  if (dadosClientes.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="6" class="tabelaCelula" style="text-align: center;">
        Nenhum cliente encontrado.
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }
  
  dadosClientes.forEach(cliente => {
    const tr = document.createElement('tr');
    tr.className = 'tabelaLinha';
    
    let statusTexto = 'Ativo';
    let statusClasse = 'badgeSucesso';
    
    if (cliente.status === 'pending') {
      statusTexto = 'Pendente';
      statusClasse = 'badgeAlerta';
    } else if (cliente.status === 'inactive') {
      statusTexto = 'Inativo';
      statusClasse = 'badgeInativo';
    }
    
    tr.innerHTML = `
      <td class="tabelaCelula">${cliente.nome}</td>
      <td class="tabelaCelula">${cliente.email}</td>
      <td class="tabelaCelula">${cliente.telefone}</td>
      <td class="tabelaCelula">
        <span class="badge ${statusClasse}">${statusTexto}</span>
      </td>
      <td class="tabelaCelula">${cliente.data}</td>
      <td class="tabelaCelula" style="text-align: right;">
        <a href="clientes-detalhes.html?id=${cliente.id}" class="botao botaoSecundario">Ver detalhes</a>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

function filtrarClientes() {
  const termoPesquisa = document.getElementById('pesquisaClientes').value.toLowerCase();
  const seletorStatus = document.querySelector('.seletor');
  const statusFiltro = seletorStatus.getAttribute('data-value') || 'all';
  
  const clientesFiltrados = clientes.filter(cliente => {
    const correspondeTermoPesquisa = 
      cliente.nome.toLowerCase().includes(termoPesquisa) ||
      cliente.email.toLowerCase().includes(termoPesquisa);
    
    const correspondeStatus = statusFiltro === 'all' || cliente.status === statusFiltro;
    
    return correspondeTermoPesquisa && correspondeStatus;
  });
  
  carregarClientes(clientesFiltrados);
}