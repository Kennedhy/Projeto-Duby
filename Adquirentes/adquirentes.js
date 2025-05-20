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

      document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
        });
      });