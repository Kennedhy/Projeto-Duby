document.addEventListener('DOMContentLoaded', function() {
    let categoriaAtiva = 'recebimentos';
    let relatorioAtivo = 'resumo-vendas';

    const seletorCategoria = document.getElementById('seletorCategoria');
    const opcoesCategoria = document.getElementById('opcoesCategoria');
    const categoriaAtualTexto = document.getElementById('categoriaAtual');
    const cartoes = document.querySelectorAll('.cartao');

    const relatoriosPorCategoria = {
        'recebimentos': ['resumo-vendas', 'vendas-metodo', 'comparativo-vendas'],
        'divergencias': ['resumo-divergencias'],
        'taxas': ['resumo-taxas'],
        'financeiro': ['fluxo-caixa', 'resumo-financeiro'],
        'conciliacao': ['conciliacao-bancaria']
    };

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

    document.querySelectorAll('.seletorOpcao').forEach(opcao => {
        opcao.addEventListener('click', function() {
            const novaCategoria = this.getAttribute('data-valor');
            categoriaAtualTexto.textContent = this.textContent;
            opcoesCategoria.classList.remove('ativo');
            trocarCategoria(novaCategoria);
        });
    });

    cartoes.forEach(cartao => {
        cartao.addEventListener('click', function() {
            const novoRelatorio = this.getAttribute('data-relatorio');
            trocarRelatorio(novoRelatorio);
        });
    });

    function trocarCategoria(novaCategoria) {
        document.querySelectorAll('[class*="cartoes"]').forEach(el => {
            el.classList.add('oculto');
        });

        document.querySelector(`.cartoes${novaCategoria.charAt(0).toUpperCase() + novaCategoria.slice(1)}`).classList.remove('oculto');

        categoriaAtiva = novaCategoria;
        trocarRelatorio(relatoriosPorCategoria[novaCategoria][0]);
    }

    function trocarRelatorio(novoRelatorio) {
        document.querySelectorAll('.cartao').forEach(cartao => {
            cartao.classList.remove('cartaoAtivo');
        });

        const cartaoAtivo = document.querySelector(`.cartao[data-relatorio="${novoRelatorio}"]`);
        if (cartaoAtivo) {
            cartaoAtivo.classList.add('cartaoAtivo');
        }

        document.querySelectorAll('[class*="relatorio"]').forEach(rel => {
            if (rel.classList.contains('relatorio')) {
                rel.classList.add('oculto');
            }
        });

        const classeRelatorio = novoRelatorio.split('-').map((word, index) => {
            return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');

        const relatorioSelecionado = document.querySelector(`.relatorio${classeRelatorio.charAt(0).toUpperCase() + classeRelatorio.slice(1)}`);
        if (relatorioSelecionado) {
            relatorioSelecionado.classList.remove('oculto');
        }

        relatorioAtivo = novoRelatorio;
    }

    trocarCategoria(categoriaAtiva);
});