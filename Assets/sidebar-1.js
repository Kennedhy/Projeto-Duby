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
                        <i data-lucide="layout-dashboard"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="itemMenu">
                    <a href="../Usuarios/usuarios.html" data-page="usuarios.html">
                        <i data-lucide="users"></i>
                        <span>Usuários</span>
                    </a>
                </li>
                <li class="itemMenu">
                    <a href="../Relatorios/relatorios.html" data-page="relatorios.html">
                        <i data-lucide="file-text"></i>
                        <span>Relatórios</span>
                    </a>
                </li>
                <li class="itemMenu">
                    <a href="../Graficos/graficos.html" data-page="graficos.html">
                        <i data-lucide="pie-chart"></i>
                        <span>Gráficos</span>
                    </a>
                </li>
                <li class="itemMenu">
                    <a href="../Contas/contas.html" data-page="contas.html">
                        <i data-lucide="building-2"></i>
                        <span>Contas Bancárias</span>
                    </a>
                </li>
                <li class="itemMenu">
                    <a href="../Adquirentes/adquirentes.html" data-page="adquirentes.html">
                        <i data-lucide="credit-card"></i>
                        <span>Adquirentes</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="rodapeBarra">
            <div class="itemMenu">
                <a href="../Configuracoes/configuracoes.html" data-page="configuracoes.html">
                    <i data-lucide="settings"></i>
                    <span>Configurações</span>
                </a>
            </div>
            <div class="itemMenu">
                <a href="../Ajuda/ajuda.html" data-page="ajuda.html">
                    <i data-lucide="help-circle"></i>
                    <span>Ajuda</span>
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
    
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primario: #412884;
            --primario-escuro: #312E81;
            --primario-claro: #818CF8;
            --primario-muito-claro: #C7D2FE;
            --cinza-100: #F3F4F6;
            --cinza-200: #E5E7EB;
            --cinza-300: #D1D5DB;
            --cinza-500: #6B7280;
            --cinza-700: #374151;
            --cinza-800: #1F2937;
            --largura-barra: 230px;
        }
        
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        body {
            font-family: 'TT Commons', sans-serif;
            font-weight: 400;
            background-color: #F6F6F6;
            color: var(--cinza-800);
            line-height: 1.5;
            margin-left: calc(var(--largura-barra) + 8px);
        }
        
        .barraLateral {
            background-color: var(--primario);
            color: white;
            padding: 1.5rem 1rem;
            display: flex;
            position: fixed;
            flex-direction: column;
            height: calc(100vh - 16px);
            top: 8px;
            bottom: 8px;
            left: 8px;
            width: var(--largura-barra);
            border-radius: 12px;
            z-index: 1000;
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
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .itemMenu a {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: 8px;
            color: white;
            text-decoration: none;
            width: 100%;
        }
        
        .itemMenu a:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .itemMenu a.ativo {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .itemMenu span {
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .rodapeBarra {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    `;
    
    document.head.appendChild(style);
    
    if (window.lucide) {
        lucide.createIcons();
    }
});