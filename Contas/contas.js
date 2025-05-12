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