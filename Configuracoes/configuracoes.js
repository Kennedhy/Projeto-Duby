document.addEventListener('DOMContentLoaded', function() {

    const botoesAbas = document.querySelectorAll('.botaoAba[data-relatorio]');
    const conteudosAbas = document.querySelectorAll('.conteudoAbas');

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

document.getElementById('botao-adicionar-cartao').addEventListener('click', function () {
  document.getElementById('fundo-modal').classList.remove('escondido');
});

document.getElementById('botao-cancelar').addEventListener('click', function () {
  document.getElementById('fundo-modal').classList.add('escondido');
});

document.getElementById('formulario-cartao').addEventListener('submit', function (event) {
  event.preventDefault();

  const numero = document.getElementById('numero-cartao').value;
  const nome = document.getElementById('nome-titular').value;
  const validade = document.getElementById('validade').value;
  const cvv = document.getElementById('codigo-seguranca').value;

  console.log('Cartão adicionado:', { numero, nome, validade, cvv });
  this.reset();
  document.getElementById('fundo-modal').classList.add('escondido');
});


      document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
        });
      });