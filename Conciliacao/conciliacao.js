document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons();
    
    const btnFiltrar = document.getElementById('btnFiltrar');
    const btnLimpar = document.getElementById('btnLimpar');
    const filtroData = document.getElementById('filtroData');
    const filtroAdquirente = document.getElementById('filtroAdquirente');
    const filtroBanco = document.getElementById('filtroBanco');
    const filtroStatus = document.getElementById('filtroStatus');
    const pesquisaGeral = document.getElementById('pesquisaGeral');
    const tabela = document.querySelector('.tabela');
    
    // Observador de mutação para detectar quando a tabela é populada
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                iniciarFiltros();
            }
        });
    });
    
    // Começa a observar a tabela
    observer.observe(tabela.querySelector('tbody'), {
        childList: true,
        subtree: true
    });
    
    // Inicia os filtros imediatamente se a tabela já tiver dados
    if (tabela.querySelector('tbody tr')) {
        iniciarFiltros();
    }
    
    function iniciarFiltros() {
        const linhasTabela = tabela.querySelectorAll('tbody tr');
        
        function aplicarFiltros() {
            const dataSelecionada = filtroData.value;
            const adquirenteSelecionado = filtroAdquirente.value;
            const bancoSelecionado = filtroBanco.value;
            const statusSelecionado = filtroStatus.value;
            const termoPesquisa = pesquisaGeral.value.toLowerCase();
            
            linhasTabela.forEach(linha => {
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
            
            linhasTabela.forEach(linha => {
                linha.style.display = '';
            });
        }
        
        // Configura os event listeners
        btnFiltrar.addEventListener('click', aplicarFiltros);
        btnLimpar.addEventListener('click', limparFiltros);
        pesquisaGeral.addEventListener('input', aplicarFiltros);
        filtroAdquirente.addEventListener('change', aplicarFiltros);
        filtroBanco.addEventListener('change', aplicarFiltros);
        filtroStatus.addEventListener('change', aplicarFiltros);
        filtroData.addEventListener('change', aplicarFiltros);
        
        // Mostra o botão de filtrar
        btnFiltrar.style.display = 'block';
    }
});