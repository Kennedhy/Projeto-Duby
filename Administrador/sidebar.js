document.addEventListener('DOMContentLoaded', function() {
    // Verifica se a sidebar já existe para não criar duplicatas
    if (document.querySelector('.barraLateral')) return;
    
    // Cria o elemento da sidebar
    const sidebar = document.createElement('aside');
    sidebar.className = 'barraLateral';
    
    // HTML da Sidebar com ícones Lucide
    sidebar.innerHTML = `
      <div class="barraLateralCabecalho">
        <div class="barraLateralLogo">
          <img src="logo-duby.svg" alt="Logo Duby">
        </div>
        <div class="barraLateralPesquisa">
          <i data-lucide="search"></i>
          <input type="text" placeholder="Buscar...">
        </div>
      </div>
      
      <div class="barraLateralConteudo">
        <div class="barraLateralGrupo">
          <h3 class="barraLateralGrupoTitulo">Administração</h3>
          <ul class="barraLateralMenu">
            <li class="barraLateralItem">
              <a href="index.html" class="barraLateralBotao" data-page="index">
                <i data-lucide="home"></i>
                <span>Início</span>
              </a>
            </li>
            <li class="barraLateralItem">
              <a href="clientes.html" class="barraLateralBotao" data-page="clientes">
                <i data-lucide="users"></i>
                <span>Clientes</span>
              </a>
            </li>
            <li class="barraLateralItem">
              <a href="relatorios.html" class="barraLateralBotao" data-page="relatorios">
                <i data-lucide="file-text"></i>
                <span>Relatórios</span>
              </a>
            </li>
            <li class="barraLateralItem">
              <a href="planos.html" class="barraLateralBotao" data-page="planos">
                <i data-lucide="layers"></i>
                <span>Planos</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="barraLateralRodape">
        <div class="barraLateralUsuario">
          <div class="barraLateralAvatar">A</div>
          <div class="barraLateralUsuarioInfo">
            <p>Admin</p>
            <p>admin@exemplo.com</p>
          </div>
          <i data-lucide="settings"></i>
        </div>
      </div>
    `;
    
    // Adiciona a sidebar ao body
    document.body.prepend(sidebar);
    
    // Cria o container principal se não existir
    if (!document.querySelector('.conteinerPrincipal')) {
        const container = document.createElement('div');
        container.className = 'conteinerPrincipal';
        
        // Move todo o conteúdo do body para dentro do container
        while (document.body.firstChild) {
            container.appendChild(document.body.firstChild);
        }
        
        // Adiciona o container de volta ao body
        document.body.appendChild(container);
    }
    
    // CSS da Sidebar (mantido igual)
    const style = document.createElement('style');
    style.textContent = `
    :root {
      --cor-secundaria: #2c3e50;
      --cor-borda: rgba(255, 255, 255, 0.1);
      --raio-borda: 6px;
      --cor-destaque: #3498db;
      --transicao-padrao: all 0.2s ease;
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }
    
    .conteinerPrincipal {
      display: flex;
      min-height: 100vh;
      width: 100%;
    }
    
    .barraLateral {
      width: 230px;
      background-color: var(--cor-secundaria);
      border-right: 1px solid var(--cor-borda);
      display: flex;
      flex-direction: column;
      position: fixed;
      height: calc(100vh - 16px);
      top: 8px;
      left: 8px;
      border-radius: 12px;
      z-index: 50;
      color: white;
    }
    
    .barraLateralCabecalho {
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .barraLateralLogo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem;
    }
    
    .barraLateralLogo img {
      width: 170px;
    }
    
    .barraLateralPesquisa {
      display: flex;
      position: relative;
    }
    
    .barraLateralPesquisa input {
      width: 100%;
      padding: 0.5rem 0.75rem 0.5rem 2rem;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--raio-borda);
      color: white;
      font-size: 0.875rem;
    }
    
    .barraLateralPesquisa input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    .barraLateralPesquisa i {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.6);
    }
    
    .barraLateralConteudo {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }
    
    .barraLateralGrupo {
      margin-bottom: 1.5rem;
    }
    
    .barraLateralGrupoTitulo {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
    
    .barraLateralMenu {
      list-style: none;
    }
    
    .barraLateralItem {
      margin-bottom: 0.25rem;
    }
    
    .barraLateralBotao {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      width: 100%;
      border-radius: var(--raio-borda);
      transition: var(--transicao-padrao);
      font-size: 0.875rem;
      color: white;
    }
    
    .barraLateralBotao:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .barraLateralBotao.ativo {
      background-color: rgba(255, 255, 255, 0.186);
      color: white;
    }
    
    .barraLateralRodape {
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .barraLateralUsuario {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: white;
    }
    
    .barraLateralAvatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--cor-destaque);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
    }
    
    .barraLateralUsuarioInfo {
      flex: 1;
    }
    
    .barraLateralUsuarioInfo p:first-child {
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .barraLateralUsuarioInfo p:last-child {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    /* Ajuste para o conteúdo principal */
    body {
      margin-left: 246px; /* 230px (sidebar) + 8px (margin) + 8px (margin) */
      padding-top: 8px;
    }
    `;
    
    // Adiciona o CSS ao head
    document.head.appendChild(style);
    
    // Função para destacar o item ativo no menu
    function highlightActiveMenuItem() {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const menuLinks = document.querySelectorAll('.barraLateralBotao');
        
        menuLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('ativo');
            } else {
                link.classList.remove('ativo');
            }
        });
    }
    
    // Inicializa os ícones Lucide
    function initLucideIcons() {
        // Verifica se o Lucide está disponível
        if (window.lucide) {
            lucide.createIcons();
        } else {
            // Carrega o Lucide se não estiver disponível
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/lucide@latest';
            script.onload = () => lucide.createIcons();
            document.head.appendChild(script);
        }
    }
    
    // Executa as funções
    highlightActiveMenuItem();
    initLucideIcons();
    
    // Observa mudanças na URL para atualizar o item ativo
    window.addEventListener('popstate', highlightActiveMenuItem);
});