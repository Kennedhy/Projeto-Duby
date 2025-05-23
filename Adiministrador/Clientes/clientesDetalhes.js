document.addEventListener('DOMContentLoaded', function() {
  inicializarAbas();
  
  const urlParams = new URLSearchParams(window.location.search);
  const clienteId = urlParams.get('id');
  
  if (clienteId) {
    carregarDadosCliente(clienteId);
  } else {
    window.location.href = 'clientes.html';
  }
  
  document.getElementById('botaoExcluir').addEventListener('click', function() {
    abrirModalExclusao(clienteId);
  });
  
  document.getElementById('botaoEditar').addEventListener('click', function() {
    window.location.href = `clientes-editar.html?id=${clienteId}`;
  });
  
  document.getElementById('cancelarExclusao').addEventListener('click', fecharModalExclusao);
  document.getElementById('confirmarExclusao').addEventListener('click', function() {
    excluirCliente(clienteId);
  });
  
  document.querySelectorAll('.fecharModal').forEach(botao => {
    botao.addEventListener('click', fecharModalExclusao);
  });
});

function obterDadosCliente(id) {
  return {
    id: id,
    nome: "Supermercado ABC",
    nomeFantasia: "ABC Comércio de Alimentos",
    cnpj: "12.345.678/0001-90",
    tipo: "Varejo",
    status: "active",
    dataCadastro: "12/04/2023",
    contato: {
      nome: "João Silva",
      cargo: "Diretor Financeiro",
      email: "joao.silva@abc.com.br",
      telefone: "(11) 98765-4321",
    },
    endereco: {
      rua: "Av. Paulista, 1000",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01310-100",
    },
    faturamento: {
      plano: "Premium",
      ciclo: "Mensal",
      valor: "R$ 499,00",
      metodoPagamento: "Cartão de Crédito",
      proximoFaturamento: "15/05/2023",
    },
    configuracoes: {
      maxUsuarios: 10,
      armazenamento: "50GB",
      nivelAcesso: "Administrador",
    },
    usuarios: [
      {
        nome: "João Silva",
        email: "joao.silva@abc.com.br",
        cargo: "Administrador",
        ultimoAcesso: "Hoje, 10:45",
      },
      {
        nome: "Maria Santos",
        email: "maria.santos@abc.com.br",
        cargo: "Gerente",
        ultimoAcesso: "Ontem, 15:30",
      },
      {
        nome: "Carlos Oliveira",
        email: "carlos.oliveira@abc.com.br",
        cargo: "Operador",
        ultimoAcesso: "20/04/2023",
      },
    ],
    adquirentes: [
      {
        nome: "Cielo",
        codigo: "CIE001",
        status: "active",
        ultimaAtualizacao: "Hoje, 08:30",
      },
      {
        nome: "Rede",
        codigo: "RED002",
        status: "active",
        ultimaAtualizacao: "Ontem, 14:15",
      },
      {
        nome: "Stone",
        codigo: "STO003",
        status: "pending",
        ultimaAtualizacao: "19/04/2023",
      },
    ],
    contas: [
      {
        banco: "Banco do Brasil",
        agencia: "1234-5",
        conta: "12345-6",
        tipo: "Corrente",
        status: "active",
      },
      {
        banco: "Itaú",
        agencia: "4321-0",
        conta: "54321-7",
        tipo: "Corrente",
        status: "active",
      },
    ],
    historico: [
      {
        data: "Hoje, 10:45",
        acao: "Login realizado",
        descricao: "João Silva fez login no sistema",
      },
      {
        data: "Ontem, 15:30",
        acao: "Relatório gerado",
        descricao: "Maria Santos gerou um relatório de conciliação",
      },
      {
        data: "20/04/2023",
        acao: "Arquivo importado",
        descricao: "Carlos Oliveira importou arquivo da Cielo",
      },
      {
        data: "19/04/2023",
        acao: "Configuração alterada",
        descricao: "João Silva alterou as configurações de conciliação",
      },
    ],
  };
}

function carregarDadosCliente(id) {
  const cliente = obterDadosCliente(id);
  
  document.getElementById('nomeCliente').textContent = cliente.nome;
  document.getElementById('dataCliente').textContent = `Cliente desde ${cliente.dataCadastro}`;
  
  document.getElementById('nomeEmpresa').textContent = cliente.nome;
  document.getElementById('nomeFantasia').textContent = cliente.nomeFantasia;
  document.getElementById('cnpjEmpresa').textContent = `CNPJ: ${cliente.cnpj}`;
  document.getElementById('tipoEmpresa').textContent = `Tipo: ${cliente.tipo}`;
  document.getElementById('enderecoEmpresa').textContent = cliente.endereco.rua;
  document.getElementById('cidadeEstadoEmpresa').textContent = `${cliente.endereco.cidade}, ${cliente.endereco.estado} - ${cliente.endereco.cep}`;
  
  const statusElement = document.getElementById('statusEmpresa');
  if (cliente.status === 'active') {
    statusElement.textContent = 'Ativo';
    statusElement.className = 'badge badgeSucesso';
  } else if (cliente.status === 'pending') {
    statusElement.textContent = 'Pendente';
    statusElement.className = 'badge badgeAlerta';
  } else {
    statusElement.textContent = 'Inativo';
    statusElement.className = 'badge badgeInativo';
  }
  
  document.getElementById('nomeContato').textContent = cliente.contato.nome;
  document.getElementById('cargoContato').textContent = cliente.contato.cargo;
  document.getElementById('emailContato').textContent = cliente.contato.email;
  document.getElementById('telefoneContato').textContent = cliente.contato.telefone;
  
  document.getElementById('planoCliente').textContent = cliente.faturamento.plano;
  document.getElementById('cicloFaturamento').textContent = cliente.faturamento.ciclo;
  document.getElementById('valorFaturamento').textContent = cliente.faturamento.valor;
  document.getElementById('metodoFaturamento').textContent = cliente.faturamento.metodoPagamento;
  document.getElementById('proximoFaturamento').textContent = cliente.faturamento.proximoFaturamento;
  
  carregarUsuarios(cliente.usuarios);
  carregarAdquirentes(cliente.adquirentes);
  carregarContas(cliente.contas);
  carregarHistorico(cliente.historico);
}

function carregarUsuarios(usuarios) {
  const tbody = document.getElementById('tabelaUsuarios');
  tbody.innerHTML = '';
  
  usuarios.forEach(usuario => {
    const tr = document.createElement('tr');
    tr.className = 'tabelaLinha';
    
    tr.innerHTML = `
      <td class="tabelaCelula">${usuario.nome}</td>
      <td class="tabelaCelula">${usuario.email}</td>
      <td class="tabelaCelula">${usuario.cargo}</td>
      <td class="tabelaCelula">${usuario.ultimoAcesso}</td>
    `;
    
    tbody.appendChild(tr);
  });
}

function carregarAdquirentes(adquirentes) {
  const tbody = document.getElementById('tabelaAdquirentes');
  tbody.innerHTML = '';
  
  adquirentes.forEach(adquirente => {
    const tr = document.createElement('tr');
    tr.className = 'tabelaLinha';
    
    let statusClasse = 'badgeSucesso';
    let statusTexto = 'Ativo';
    
    if (adquirente.status === 'pending') {
      statusClasse = 'badgeAlerta';
      statusTexto = 'Pendente';
    } else if (adquirente.status === 'inactive') {
      statusClasse = 'badgeInativo';
      statusTexto = 'Inativo';
    }
    
    tr.innerHTML = `
      <td class="tabelaCelula">${adquirente.nome}</td>
      <td class="tabelaCelula">${adquirente.codigo}</td>
      <td class="tabelaCelula">
        <span class="badge ${statusClasse}">${statusTexto}</span>
      </td>
      <td class="tabelaCelula">${adquirente.ultimaAtualizacao}</td>
    `;
    
    tbody.appendChild(tr);
  });
}

function carregarContas(contas) {
  const tbody = document.getElementById('tabelaContas');
  tbody.innerHTML = '';
  
  contas.forEach(conta => {
    const tr = document.createElement('tr');
    tr.className = 'tabelaLinha';
    
    let statusClasse = 'badgeSucesso';
    let statusTexto = 'Ativo';
    
    if (conta.status === 'pending') {
      statusClasse = 'badgeAlerta';
      statusTexto = 'Pendente';
    } else if (conta.status === 'inactive') {
      statusClasse = 'badgeInativo';
      statusTexto = 'Inativo';
    }
    
    tr.innerHTML = `
      <td class="tabelaCelula">${conta.banco}</td>
      <td class="tabelaCelula">${conta.agencia}</td>
      <td class="tabelaCelula">${conta.conta}</td>
      <td class="tabelaCelula">${conta.tipo}</td>
      <td class="tabelaCelula">
        <span class="badge ${statusClasse}">${statusTexto}</span>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

function carregarHistorico(historico) {
  const listaHistorico = document.getElementById('listaHistorico');
  listaHistorico.innerHTML = '';
  
  historico.forEach((item, index) => {
    const itemHistorico = document.createElement('div');
    itemHistorico.className = 'itemHistorico';
    
    itemHistorico.innerHTML = `
      <div class="flexCentro">
        <div class="dataHistorico">${item.data}</div>
        <div>
          <p class="textoMedio">${item.acao}</p>
          <p class="textoSecundario">${item.descricao}</p>
        </div>
      </div>
    `;
    
    listaHistorico.appendChild(itemHistorico);
    
    if (index < historico.length - 1) {
      const separador = document.createElement('div');
      separador.className = 'separador';
      listaHistorico.appendChild(separador);
    }
  });
}

function abrirModalExclusao(id) {
  const modal = document.getElementById('modalExclusao');
  modal.classList.add('aberto');
}

function fecharModalExclusao() {
  const modal = document.getElementById('modalExclusao');
  modal.classList.remove('aberto');
}

function excluirCliente(id) {
  const botaoConfirmar = document.getElementById('confirmarExclusao');
  botaoConfirmar.disabled = true;
  botaoConfirmar.textContent = 'Excluindo...';
  
  setTimeout(function() {
    mostrarNotificacao('Cliente excluído com sucesso!', 'sucesso');
    
    setTimeout(function() {
      window.location.href = 'clientes.html';
    }, 1500);
  }, 2000);
}

function mostrarNotificacao(mensagem, tipo = 'sucesso') {
  let container = document.querySelector('.notificacoesContainer');
  if (!container) {
    container = document.createElement('div');
    container.className = 'notificacoesContainer';
    document.body.appendChild(container);
  }
  
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao notificacao${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
  
  let icone = 'check-circle';
  if (tipo === 'erro') icone = 'x-circle';
  if (tipo === 'alerta') icone = 'alert-triangle';
  if (tipo === 'info') icone = 'info';
  
  notificacao.innerHTML = `
    <i class="fa-solid fa-${icone}"></i>
    <p>${mensagem}</p>
    <button class="fecharNotificacao"><i class="fa-solid fa-times"></i></button>
  `;
  
  container.appendChild(notificacao);
  
  notificacao.querySelector('.fecharNotificacao').addEventListener('click', function() {
    notificacao.remove();
  });
  
  setTimeout(() => {
    notificacao.classList.add('fechando');
    setTimeout(() => {
      notificacao.remove();
    }, 300);
  }, 5000);
}