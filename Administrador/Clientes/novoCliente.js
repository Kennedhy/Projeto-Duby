document.addEventListener('DOMContentLoaded', function() {
  inicializarSeletores();
  inicializarAbas();
  
  const formulario = document.getElementById('formNovoCliente');
  if (formulario) {
    formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      salvarCliente();
    });
  }
});

function salvarCliente() {
  const botaoSalvar = document.getElementById('botaoSalvar');
  botaoSalvar.disabled = true;
  botaoSalvar.textContent = 'Salvando...';
  
  const dadosCliente = {
    nomeEmpresa: document.getElementById('nomeEmpresa').value,
    nomeFantasia: document.getElementById('nomeFantasia').value,
    cnpj: document.getElementById('cnpj').value,
    tipoEmpresa: document.querySelector('#seletorTipoEmpresa').parentNode.getAttribute('data-value') || '',
    descricao: document.getElementById('descricao').value,
    
    nomeContato: document.getElementById('nomeContato').value,
    cargoContato: document.getElementById('cargoContato').value,
    emailContato: document.getElementById('emailContato').value,
    telefoneContato: document.getElementById('telefoneContato').value,
    endereco: document.getElementById('endereco').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
    cep: document.getElementById('cep').value,
    
    plano: document.querySelector('#seletorPlano').parentNode.getAttribute('data-value') || '',
    cicloFaturamento: document.querySelector('#seletorCiclo').parentNode.getAttribute('data-value') || '',
    valor: document.getElementById('valor').value,
    desconto: document.getElementById('desconto').value,
    metodoPagamento: document.querySelector('#seletorMetodoPagamento').parentNode.getAttribute('data-value') || '',
    
    statusConta: document.querySelector('#seletorStatus').parentNode.getAttribute('data-value') || '',
    nivelAcesso: document.querySelector('#seletorNivelAcesso').parentNode.getAttribute('data-value') || '',
    maxUsuarios: document.getElementById('maxUsuarios').value,
    armazenamento: document.getElementById('armazenamento').value,
    observacoes: document.getElementById('observacoes').value
  };
  
  if (!dadosCliente.nomeEmpresa || !dadosCliente.cnpj || !dadosCliente.emailContato) {
    mostrarNotificacao('Por favor, preencha os campos obrigatórios.', 'erro');
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = 'Salvar Cliente';
    return;
  }
  
  setTimeout(function() {
    mostrarNotificacao(`Cliente ${dadosCliente.nomeEmpresa} criado com sucesso!`, 'sucesso');
    
    setTimeout(function() {
      window.location.href = 'clientes.html';
    }, 1500);
  }, 2000);
}


function inicializarAbas() {
  const botoes = document.querySelectorAll('.abaBotao');
  
  botoes.forEach(botao => {
    botao.addEventListener('click', function() {
      const aba = this.getAttribute('data-aba');
      
      document.querySelectorAll('.abaBotao').forEach(item => {
        item.classList.remove('ativo');
      });
      
      document.querySelectorAll('.abaConteudo').forEach(item => {
        item.classList.remove('ativo');
      });
      
      this.classList.add('ativo');
      document.getElementById('aba' + aba.charAt(0).toUpperCase() + aba.slice(1)).classList.add('ativo');
    });
  });
}

function inicializarSeletores() {
  const seletores = document.querySelectorAll('.seletorBotao');
  
  seletores.forEach(seletor => {
    seletor.addEventListener('click', function(event) {
      event.preventDefault();
      const opcoes = this.nextElementSibling;
      
      document.querySelectorAll('.seletorOpcoes.aberto').forEach(item => {
        if (item !== opcoes) {
          item.classList.remove('aberto');
        }
      });
      
      opcoes.classList.toggle('aberto');
    });
  });
  
  const opcoes = document.querySelectorAll('.seletorOpcao');
  opcoes.forEach(opcao => {
    opcao.addEventListener('click', function() {
      const valor = this.getAttribute('data-value');
      const texto = this.textContent;
      const seletor = this.closest('.seletor');
      const botao = seletor.querySelector('.seletorBotao span');
      
      botao.textContent = texto;
      seletor.setAttribute('data-value', valor);
      this.closest('.seletorOpcoes').classList.remove('aberto');
    });
  });
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.seletor')) {
      document.querySelectorAll('.seletorOpcoes.aberto').forEach(item => {
        item.classList.remove('aberto');
      });
    }
  });
}