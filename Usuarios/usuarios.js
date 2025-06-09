const btnOpen = document.getElementById('btnOpenForm');
const overlay = document.getElementById('addUsuario');
const btnCancel = document.getElementById('btnCancel');
const form = document.getElementById('formAddUsuario');
const nome = document.getElementById('nomeUsuario');
const email = document.getElementById('emailUsuario');
const senha = document.getElementById('senhaUsuario');
const confirmarSenha = document.getElementById('confirmarSenhaUsuario');

btnOpen.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

btnCancel.addEventListener('click', () => {
  overlay.style.display = 'none';
});

function adicionarUsuarioNaTabela(nome, email, funcao, permissao) {
  const tabela = document.getElementById('usuariosTabela');
  const novaLinha = document.createElement('tr');

  // Define a classe do span conforme a função escolhida
  let classeFuncao = '';
  switch (funcao.toLowerCase()) {
    case 'administrador':
      classeFuncao = 'tag admin';
      break;
    case 'gerente':
      classeFuncao = 'tag gerente';
      break;
    case 'analista':
      classeFuncao = 'tag analista';
      break;
    case 'operador':
      classeFuncao = 'tag operador';
      break;
    default:
      classeFuncao = 'tag';
  }

  novaLinha.innerHTML = `
    <td>${nome}</td>
    <td>${email}</td>
    <td><span class="${classeFuncao}">${funcao}</span></td>
    <td>${permissao}</td>
  `;
  tabela.appendChild(novaLinha);

  // Adicione o evento de clique APENAS para a nova linha
  novaLinha.onclick = function() {
    const tds = this.querySelectorAll('td');
    if (tds.length >= 3) {
      const nome = tds[0].textContent;
      const email = tds[1].textContent;
      const funcaoHtml = tds[2].innerHTML;
      atualizarPerfilUsuario(nome, email, funcaoHtml);
    }
  };
}

// Atualize o submit do formulário:
form.addEventListener('submit', function(e) {
  let mensagem = '';
  if (!nome.value.trim()) {
    mensagem += 'Nome é obrigatório.\n';
  }
  if (!email.value.trim() || !email.value.includes('@')) {
    mensagem += 'E-mail válido é obrigatório.\n';
  }
  if (!senha.value.trim() || senha.value.length < 6) {
    mensagem += 'Senha deve ter pelo menos 6 caracteres.\n';
  }
  if (senha.value !== confirmarSenha.value) {
    mensagem += 'As senhas não coincidem.\n';
  }
  if (mensagem) {
    alert(mensagem);
    e.preventDefault();
  } else {
    // Pegue os valores dos campos adicionais
    const funcao = document.getElementById('funcaoUsuario').value;
    const permissao = document.getElementById('permissaoUsuario').value;
    adicionarUsuarioNaTabela(nome.value, email.value, funcao, permissao);

    // Limpa o formulário e fecha o modal
    form.reset();
    overlay.style.display = 'none';
    e.preventDefault();
  }
});

function atualizarPerfilUsuario(nome, email, funcaoHtml) {
  document.getElementById('perfilNome').textContent = nome;
  document.getElementById('perfilEmail').textContent = email;
  document.getElementById('perfilFuncao').innerHTML = funcaoHtml;
}

function adicionarEventoCliqueNasLinhas() {
  const linhas = document.querySelectorAll('#usuariosTabela tr');
  linhas.forEach(linha => {
    linha.onclick = function() {
      const tds = this.querySelectorAll('td');
      if (tds.length >= 3) {
        const nome = tds[0].textContent;
        const email = tds[1].textContent;
        const funcaoHtml = tds[2].innerHTML; // pega o span com a classe
        atualizarPerfilUsuario(nome, email, funcaoHtml);
      }
    };
  });
}

// Chame essa função após inserir ou atualizar a tabela:
adicionarEventoCliqueNasLinhas();
