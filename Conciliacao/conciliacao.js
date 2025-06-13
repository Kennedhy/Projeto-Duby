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






// Responsividade para dispositivos móveis - Versão modificada
(function() {
    const MOBILE_BREAKPOINT = 768;
    // Colunas modificadas conforme solicitado
    const MAIN_COLUMNS = ['Transação', 'Status', 'Valor']; // Removida 'Data' e adicionado 'Valor'
    
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function criarLinhaMobile(linhaOriginal) {
        const celulas = linhaOriginal.querySelectorAll('td');
        if (celulas.length === 0) return null;

        const linhaMobile = document.createElement('div');
        linhaMobile.className = 'linha-mobile';

        // Cabeçalho modificado
        const cabecalho = document.createElement('div');
        cabecalho.className = 'linha-mobile-cabecalho';
        
        // Mapeamento das células originais para as novas colunas
        const celulasOriginais = {
            'Transação': celulas[1]?.textContent || '', // Coluna original da Transação
            'Status': celulas[7]?.textContent.trim() || '', // Coluna original do Status
            'Valor': celulas[4]?.textContent || '' // Coluna original do Valor Esperado
        };

        // Adicionar células principais modificadas
        MAIN_COLUMNS.forEach(coluna => {
            const celula = document.createElement('div');
            celula.className = `linha-mobile-celula ${coluna.toLowerCase()}`;
            
            // Formatação especial para status
            if (coluna === 'Status') {
                const status = celulasOriginais[coluna];
                celula.innerHTML = `<span class="tag ${getStatusCor(status)}">${status}</span>`;
            } 
            // Formatação especial para valor monetário
            else if (coluna === 'Valor') {
                celula.innerHTML = `<span class="valor-mobile">${celulasOriginais[coluna]}</span>`;
            } 
            else {
                celula.textContent = celulasOriginais[coluna];
            }
            
            cabecalho.appendChild(celula);
        });

        linhaMobile.appendChild(cabecalho);

        // Corpo expansível (sem alterações)
        const corpo = document.createElement('div');
        corpo.className = 'linha-mobile-corpo';

        // Obter cabeçalhos da tabela
        const cabecalhos = Array.from(document.querySelectorAll('.tabelaCabecalho th'))
            .map(th => th.textContent);

        // Adicionar células secundárias (incluindo a data agora no corpo)
        celulas.forEach((celula, index) => {
            // Pular colunas já mostradas no cabeçalho
            if (['Transação', 'Status', 'Valor'].some(c => cabecalhos[index]?.includes(c))) return;

            const grupo = document.createElement('div');
            grupo.className = 'linha-mobile-grupo';

            const rotulo = document.createElement('span');
            rotulo.className = 'linha-mobile-rotulo';
            rotulo.textContent = cabecalhos[index] || '';

            const valor = document.createElement('span');
            valor.className = 'linha-mobile-valor';
            valor.textContent = celula.textContent;

            if (['Esperado', 'Recebido', 'Diferença'].includes(cabecalhos[index])) {
                valor.classList.add('destaque-monetario');
            }

            grupo.append(rotulo, valor);
            corpo.appendChild(grupo);
        });

        linhaMobile.appendChild(corpo);

        // Evento de clique modificado (sem botão de seta)
        cabecalho.addEventListener('click', function() {
            const estaExpandida = linhaMobile.classList.toggle('expandida');
            corpo.style.display = estaExpandida ? 'block' : 'none';
        });

        return linhaMobile;
    }

    // Função auxiliar para cor do status
    function getStatusCor(status) {
        if (!status) return '';
        status = status.trim();
        switch (status) {
            case "Conciliado": return "verde";
            case "Divergente": return "amarelo";
            case "Pendente": return "azul";
            default: return "";
        }
    }

    // Restante do código permanece igual (transformarTabelaParaMobile, observarTabela, adicionarEstilos, initMobile)
    function transformarTabelaParaMobile() {
        const tabela = document.querySelector('.tabela');
        if (!tabela) return;

        const containerMobile = document.createElement('div');
        containerMobile.className = 'tabela-mobile-container';

        const linhas = tabela.querySelectorAll('.tabelaCorpo tr');
        linhas.forEach(linha => {
            const linhaMobile = criarLinhaMobile(linha);
            if (linhaMobile) {
                containerMobile.appendChild(linhaMobile);
            }
        });

        const cartaoTabela = document.querySelector('.cartaoTabela');
        if (cartaoTabela) {
            cartaoTabela.insertBefore(containerMobile, tabela);
            tabela.classList.add('tabela-desktop');
        }
    }

    function observarTabela() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length && isMobile()) {
                    const containerMobile = document.querySelector('.tabela-mobile-container');
                    if (!containerMobile) return;

                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.tagName === 'TR') {
                            const linhaMobile = criarLinhaMobile(node);
                            if (linhaMobile) {
                                containerMobile.appendChild(linhaMobile);
                            }
                        }
                    });
                }
            });
        });

        const tabelaCorpo = document.querySelector('.tabelaCorpo');
        if (tabelaCorpo) {
            observer.observe(tabelaCorpo, {
                childList: true,
                subtree: false
            });
        }
    }

    function adicionarEstilos() {
        if (document.getElementById('estilos-tabela-mobile')) return;

        const style = document.createElement('style');
        style.id = 'estilos-tabela-mobile';
        style.textContent = `
            .tabela-mobile-container {
                display: none;
            }
            
            .linha-mobile {
                background: var(--cartoes);
                border-radius: 8px;
                margin-bottom: 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                overflow: hidden;
            }
            
            .linha-mobile-cabecalho {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                cursor: pointer;
                gap: 10px;
            }
            
            .linha-mobile-celula {
                flex: 1;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
            }
            
            .linha-mobile-celula.transacao {
                font-weight: 600;
                min-width: 100px;
            }
            
            .linha-mobile-celula.status {
                min-width: 90px;
                justify-content: center;
            }
            
            .linha-mobile-celula.valor {
                min-width: 80px;
                justify-content: flex-end;
                font-weight: 600;
                color: var(--primario);
            }
            
            .valor-mobile {
                white-space: nowrap;
            }
            
            .linha-mobile-corpo {
                display: none;
                padding: 12px 15px;
                border-top: 1px solid var(--borda);
                background-color: var(--tr);
            }
            
            .linha-mobile-grupo {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            
            .linha-mobile-rotulo {
                font-size: 0.8rem;
                color: var(--texto-p);
            }
            
            .linha-mobile-valor {
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .linha-mobile-valor.destaque-monetario {
                font-weight: 600;
                color: var(--primario);
            }
            
            .linha-mobile.expandida .linha-mobile-corpo {
                display: block;
            }
            
            /* Tags de status */
            .tag {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .tag.verde {
                background-color: #e6f7e6;
                color: #2e7d32;
            }
            
            .tag.amarelo {
                background-color: #fff8e6;
                color: #ff8f00;
            }
            
            .tag.azul {
                background-color: #e6f3ff;
                color: #1565c0;
            }
            
            @media (max-width: ${MOBILE_BREAKPOINT}px) {
                .tabela-mobile-container {
                    display: block;
                }
                
                .tabela-desktop {
                    display: none;
                }
            }
            
            @media (min-width: ${MOBILE_BREAKPOINT + 1}px) {
                .tabela-mobile-container {
                    display: none !important;
                }
                
                .tabela-desktop {
                    display: table !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function initMobile() {
        adicionarEstilos();
        
        if (isMobile()) {
            transformarTabelaParaMobile();
            observarTabela();
        }
        
        window.addEventListener('resize', function() {
            if (isMobile() && !document.querySelector('.tabela-mobile-container')) {
                transformarTabelaParaMobile();
            }
        });
    }

    // Modificar a função conciliar original para incluir a transformação mobile
    const originalConciliar = window.conciliar;
    window.conciliar = function(dadosCSV, dadosOFX) {
        originalConciliar(dadosCSV, dadosOFX);
        if (isMobile()) {
            setTimeout(() => {
                transformarTabelaParaMobile();
            }, 100);
        }
    };

    // Iniciar após um pequeno delay para garantir que os dados foram carregados
    setTimeout(initMobile, 300);
})();