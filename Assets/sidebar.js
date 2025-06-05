document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'barraLateral';
    
    sidebar.innerHTML = `
                <div class="logo">
                    <img src="../Assets/imgs/logo-duby.svg" alt="duby">
                </div>
                <nav class="menuNav">
                    <ul>
                        <li class="itemMenu">
                            <a href="../Dashboard/dashboard.html" data-page="dashboard.html">
                                <i class="menuIcone" data-lucide="layout-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Conciliacao/conciliacao.html" data-page="conciliacao.html">
                                <i class="menuIcone" data-lucide="clipboard-check"></i>
                                <span>Conciliação</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Usuarios/usuarios.html" data-page="usuarios.html">
                                <i class="menuIcone" data-lucide="users"></i>
                                <span>Usuários</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Relatorios/relatorios.html" data-page="relatorios.html">
                                <i class="menuIcone" data-lucide="file-text"></i>
                                <span>Relatórios</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Graficos/graficos.html" data-page="graficos.html">
                                <i class="menuIcone" data-lucide="pie-chart"></i>
                                <span>Gráficos</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Contas/contas.html" data-page="contas.html">
                                <i class="menuIcone" data-lucide="building-2"></i>
                                <span>Contas Bancárias</span>
                            </a>
                        </li>
                        <li class="itemMenu">
                            <a href="../Adquirentes/adquirentes.html" data-page="adquirentes.html">
                                <i class="menuIcone" data-lucide="credit-card"></i>
                                <span>Adquirentes</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="rodapeBarra">
                    <div class="itemMenu rodape">
                        <a class="tema">
                            <i class="menuIcone" data-lucide="moon"></i>
                        </a>
                    </div>
                    <div class="itemMenu rodape">
                        <a href="../Configuracoes/configuracoes.html" data-page="configuracoes.html">
                            <i class="menuIcone" data-lucide="settings"></i>
                        </a>
                    </div>
                    <div class="itemMenu rodape">
                        <a href="../Ajuda/ajuda.html" data-page="ajuda.html">
                            <i class="menuIcone" data-lucide="help-circle"></i>
                        </a>
                    </div>
                    <div class="itemMenu rodape">
                        <a href="../index.html" data-page="index.html">
                            <i class="menuIcone" data-lucide="log-out"></i>
                        </a>
                    </div>
                </div>
    `;
    
    document.body.appendChild(sidebar);
    
    function highlightActiveMenuItem() {
        const currentPage = window.location.pathname.split('/').pop();
        const menuLinks = document.querySelectorAll('.itemMenu a');
        
        menuLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('ativo');
            } else {
                link.classList.remove('ativo');
            }
        });
    }
    
    highlightActiveMenuItem();
    
    const themeButton = document.querySelector('.tema');
    if (themeButton) {

        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
        }
        
        themeButton.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }

        body {
            font-family: 'TT Commons', sans-serif;
            margin-left: calc(230px + 8px);
        }

        .barraLateral {
            color: white;
            padding: 1.5rem 0.75rem;
            display: flex;
            position: fixed;
            flex-direction: column;
            height: calc(100vh - 16px);
            top: 8px;
            bottom: 8px;
            left: 8px;
            width: 230px;
            border-radius: 12px;
            z-index: 1;
        }

        .logo {
            margin-top: 1rem;
            margin-bottom: 2rem;
            display: flex;
            justify-content: center;
        }
        .logo img {
            width: 150px;
        }

        .menuNav ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            margin-top: 1.5rem;
        }

        .itemMenu a {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.7rem;
            border-radius: 8px;
            color: white;
            text-decoration: none;
            width: 100%;
        }

        .itemMenu a:hover {
            background: rgba(246, 246, 246, 0.050);
        }

        .itemMenu a.ativo {
            background: rgba(246, 246, 246, 0.120);
        }

        .itemMenu span {
            font-size: 0.875rem;
            font-weight: 500;
        }

        .rodapeBarra {
            margin-top: auto;
            margin-bottom: -10px;
            display: flex;
            justify-content: center;
            gap: 0.5rem;
        }

        .rodapeBarra .menuIcone {
            width: 1.1rem;
            stroke-width: 2.5px;
        }

        .menuIcone {
            width: 1.2rem;
            stroke-width: 2.5px;
        }
    `;
    
    document.head.appendChild(style);
    
    if (window.lucide) {
        lucide.createIcons();
    }
});