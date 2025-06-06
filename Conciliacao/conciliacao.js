document.addEventListener("DOMContentLoaded", function () {
    lucide.createIcons();

    const btnLimpar = document.getElementById('btnLimpar');
    const filtroData = document.getElementById('filtroData');
    const filtroAdquirente = document.getElementById('filtroAdquirente');
    const filtroBanco = document.getElementById('filtroBanco');
    const filtroStatus = document.getElementById('filtroStatus');
    const pesquisaGeral = document.getElementById('pesquisaGeral');
    const tabelaCorpo = document.querySelector('.tabelaCorpo');
    const cardsResumo = document.querySelector('.cardsResumo');

    document.getElementById('btnFiltrar').style.display = 'none';

    function formatData(dataStr) {
        if (!dataStr) return "";
        if (dataStr.includes("/")) return dataStr.split(" ")[0];
        return `${dataStr.substring(6, 8)}/${dataStr.substring(4, 6)}/${dataStr.substring(0, 4)}`;
    }

    function parseFloatBR(valor) {
        if (!valor) return 0;
        return parseFloat(valor.replace(".", "").replace(",", "."));
    }

    function formatValor(valor) {
        const n = parseFloat(valor);
        return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    function atualizarCardsResumo() {
        if (!cardsResumo || !tabelaCorpo) return;

        const linhasVisiveis = Array.from(tabelaCorpo.querySelectorAll('tr')).filter(tr => 
            tr.style.display !== 'none'
        );

        const totalTransacoes = linhasVisiveis.length;
        let totalValor = 0;
        let conciliados = 0;
        let pendentes = 0;
        let divergentes = 0;
        let valorConciliado = 0;
        let valorPendente = 0;
        let valorDivergente = 0;

        linhasVisiveis.forEach(linha => {
            const valorTexto = linha.cells[4].textContent.replace(/[^\d,-]/g, '').replace(',', '.');
            const valor = parseFloat(valorTexto);
            totalValor += valor;

            const status = linha.cells[7].querySelector('.tag').textContent.trim();
            
            if (status === "Conciliado") {
                conciliados++;
                valorConciliado += valor;
            } else if (status === "Pendente") {
                pendentes++;
                valorPendente += valor;
            } else if (status === "Divergente") {
                divergentes++;
                valorDivergente += valor;
            }
        });

        const percentConciliado = totalTransacoes > 0 ? Math.round((conciliados / totalTransacoes) * 100) : 0;
        const percentPendente = totalTransacoes > 0 ? Math.round((pendentes / totalTransacoes) * 100) : 0;
        const percentDivergente = totalTransacoes > 0 ? Math.round((divergentes / totalTransacoes) * 100) : 0;

        const cards = cardsResumo.querySelectorAll('.card');
        
        cards[0].querySelector('.valor').textContent = totalTransacoes;
        cards[0].querySelector('.subTexto').textContent = formatValor(totalValor);
        
        cards[1].querySelector('.valor').textContent = `${percentConciliado}%`;
        cards[1].querySelector('.subTexto').textContent = 
            `${conciliados} transações • ${formatValor(valorConciliado)}`;
        
        cards[2].querySelector('.valor').textContent = `${percentPendente}%`;
        cards[2].querySelector('.subTexto').textContent = 
            `${pendentes} transações • ${formatValor(valorPendente)}`;
        
        cards[3].querySelector('.valor').textContent = `${percentDivergente}%`;
        cards[3].querySelector('.subTexto').textContent = 
            `${divergentes} transações • ${formatValor(valorDivergente)}`;
    }

    function atualizarOpcoesFiltros() {
        const linhas = tabelaCorpo.querySelectorAll('tr');
        if (linhas.length === 0) return;

        const adquirentes = new Set();
        const bancos = new Set();
        const statusList = new Set();

        linhas.forEach(linha => {
            adquirentes.add(linha.cells[2].textContent.trim());
            bancos.add(linha.cells[3].textContent.trim());
            statusList.add(linha.cells[7].querySelector('.tag').textContent.trim());
        });

        atualizarSelect(filtroAdquirente, adquirentes, 'Todos os Adquirentes');
        atualizarSelect(filtroBanco, bancos, 'Todos os Bancos');
        atualizarSelect(filtroStatus, statusList, 'Todos os Status');
    }

    function atualizarSelect(select, valores, textoPadrao) {
        const valorAtual = select.value;
        select.innerHTML = `<option value="todos">${textoPadrao}</option>`;
        Array.from(valores).sort().forEach(valor => {
            if (valor) {
                const option = document.createElement('option');
                option.value = valor;
                option.textContent = valor;
                select.appendChild(option);
            }
        });
        if (valorAtual && Array.from(valores).includes(valorAtual)) {
            select.value = valorAtual;
        }
    }

    function aplicarFiltros() {
        const linhas = tabelaCorpo.querySelectorAll('tr');
        if (linhas.length === 0) return;

        const dataSelecionada = filtroData.value;
        const adquirenteSelecionado = filtroAdquirente.value;
        const bancoSelecionado = filtroBanco.value;
        const statusSelecionado = filtroStatus.value;
        const termoPesquisa = pesquisaGeral.value.toLowerCase();

        linhas.forEach(linha => {
            const colData = linha.cells[0].textContent.trim();
            const colAdquirente = linha.cells[2].textContent.trim();
            const colBanco = linha.cells[3].textContent.trim();
            const colStatus = linha.cells[7].querySelector('.tag').textContent.trim();
            const textoLinha = linha.textContent.toLowerCase();

            let deveMostrar = true;

            if (dataSelecionada) {
                const dataFormatada = formatarDataParaComparacao(colData);
                const dataSelecionadaFormatada = formatarDataISO(dataSelecionada);
                if (dataFormatada !== dataSelecionadaFormatada) {
                    deveMostrar = false;
                }
            }

            if (adquirenteSelecionado !== 'todos' && colAdquirente !== adquirenteSelecionado) {
                deveMostrar = false;
            }

            if (bancoSelecionado !== 'todos' && colBanco !== bancoSelecionado) {
                deveMostrar = false;
            }

            if (statusSelecionado !== 'todos' && colStatus !== statusSelecionado) {
                deveMostrar = false;
            }

            if (termoPesquisa && !textoLinha.includes(termoPesquisa)) {
                deveMostrar = false;
            }

            linha.style.display = deveMostrar ? '' : 'none';
        });

        atualizarCardsResumo();
    }

    function formatarDataParaComparacao(dataDDMMAAAA) {
        const [dia, mes, ano] = dataDDMMAAAA.split('/');
        return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }

    function formatarDataISO(dataISO) {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    function limparFiltros() {
        filtroData.value = '';
        filtroAdquirente.value = 'todos';
        filtroBanco.value = 'todos';
        filtroStatus.value = 'todos';
        pesquisaGeral.value = '';
        aplicarFiltros();
    }

    filtroData.addEventListener('change', aplicarFiltros);
    filtroAdquirente.addEventListener('change', aplicarFiltros);
    filtroBanco.addEventListener('change', aplicarFiltros);
    filtroStatus.addEventListener('change', aplicarFiltros);
    pesquisaGeral.addEventListener('input', aplicarFiltros);
    btnLimpar.addEventListener('click', limparFiltros);

    const observer = new MutationObserver(function () {
        if (tabelaCorpo.querySelector('tr')) {
            atualizarOpcoesFiltros();
            aplicarFiltros();
        }
    });

    if (tabelaCorpo) {
        observer.observe(tabelaCorpo, {
            childList: true,
            subtree: true
        });
    }

    if (tabelaCorpo && tabelaCorpo.querySelector('tr')) {
        atualizarOpcoesFiltros();
        aplicarFiltros();
    }
});