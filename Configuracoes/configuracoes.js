document.addEventListener('DOMContentLoaded', function() {

    const botoesAbas = document.querySelectorAll('.botaoAba[data-relatorio]');
    const conteudosAbas = document.querySelectorAll('.trocaDeAbas');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const abasId = this.getAttribute('data-relatorio');
            
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            conteudosAbas.forEach(c => c.classList.remove('ativo'));
            
            this.classList.add('ativo');
            document.getElementById(abasId).classList.add('ativo');
        });
    });

    if (!document.querySelector('.botaoAba.ativo')) {
        botoesAbas[0].classList.add('ativo');
        conteudosAbas[0].classList.add('ativo');
    }
});

document.querySelectorAll('.botao-dicionar').forEach(botao => {
  botao.addEventListener('click', function() {
    document.getElementById('fundo-modal').classList.remove('escondido');
  });
});

document.getElementById('botao-cancelar').addEventListener('click', function () {
  document.getElementById('fundo-modal').classList.add('escondido');
});

document.getElementById('formulario-cartao').addEventListener('submit', function (event) {
  event.preventDefault();

  const numero = document.getElementById('numero-cartao').value;
  const validade = document.getElementById('validade').value;

  // Formata: •••• 1234 (só os 4 últimos dígitos)
  const ultimos4 = numero.slice(-4);
  const numeroFormatado = `•••• ${ultimos4}`;

  // Cria a div do cartão
  function criarDivCartao() {
    const div = document.createElement('div');
    div.className = 'cartao-adicionado';
    div.innerHTML = `
      <strong>${numeroFormatado}</strong><br>
      Expira em: ${validade}
    `;
    return div;
  }

  // Adiciona nas abas Planos e Integrações, se existirem
  const listaPlanos = document.getElementById('cartoes-lista-planos');
  const listaIntegracoes = document.getElementById('cartoes-lista-integracoes');
  if (listaPlanos) listaPlanos.appendChild(criarDivCartao());
  if (listaIntegracoes) listaIntegracoes.appendChild(criarDivCartao());

  this.reset();
  document.getElementById('fundo-modal').classList.add('escondido');
});


      document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
        });
      });