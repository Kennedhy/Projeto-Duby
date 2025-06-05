document.addEventListener('DOMContentLoaded', function() {
  inicializarSeletores();
  inicializarAbas();
  
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    adicionarControleBarraLateral();
  }
});

function inicializarSeletores() {
  const seletores = document.querySelectorAll('.seletorBotao');
  
  seletores.forEach(seletor => {
    seletor.addEventListener('click', function() {
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
      
      const evento = new CustomEvent('selecaoAlterada', {
        detail: { valor: valor, texto: texto }
      });
      seletor.dispatchEvent(evento);
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

function adicionarControleBarraLateral() {
  const toggleButton = document.createElement('button');
  toggleButton.className = 'menuToggle';
  toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.appendChild(toggleButton);
  
  toggleButton.addEventListener('click', function() {
    const barraLateral = document.querySelector('.barraLateral');
    barraLateral.classList.toggle('aberta');
  });
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.barraLateral') && !event.target.closest('.menuToggle')) {
      const barraLateral = document.querySelector('.barraLateral');
      barraLateral.classList.remove('aberta');
    }
  });
}
