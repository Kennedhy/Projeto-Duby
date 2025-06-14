document.addEventListener('DOMContentLoaded', function() {

    const botoesAbas = document.querySelectorAll('.botaoAba[data-relatorio]');
    const conteudosAbas = document.querySelectorAll('.trocaDeAbas');

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

document.addEventListener('DOMContentLoaded', function() {

    const botoesAbas = document.querySelectorAll('.botaoDados[data-relatorio]');
    const conteudosRelatorios = document.querySelectorAll('.conteudoImportar');

    botoesAbas.forEach(botao => {
        botao.addEventListener('click', function() {
            const relatorioId = this.getAttribute('data-relatorio');
            
            botoesAbas.forEach(b => b.classList.remove('ativo'));
            conteudosRelatorios.forEach(c => c.classList.remove('ativo'));
            
            this.classList.add('ativo');
            document.getElementById(relatorioId).classList.add('ativo');
        });
    });

    if (!document.querySelector('.botaoDados.ativo')) {
        botoesAbas[0].classList.add('ativo');
        conteudosRelatorios[0].classList.add('ativo');
    }
});

//abrir overlay cartão//
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    const botaoAbrirModal = document.getElementById('abrir-modal-cartao');
    const fundoModal = document.getElementById('fundo-modal');
    const botaoCancelar = document.getElementById('botao-cancelar');

    if (botaoAbrirModal && fundoModal && botaoCancelar) {
      botaoAbrirModal.addEventListener('click', function () {
        fundoModal.classList.remove('escondido');
      });

      botaoCancelar.addEventListener('click', function () {
        fundoModal.classList.add('escondido');
      });
    } else {
      console.error('Erro: Elementos do modal não encontrados.');
    }
  });

// Função de bandeira (coloque antes do submit)
var tgdeveloper = {
    getCardFlag: function(cardnumber) {
        var cardnumber = cardnumber.replace(/[^0-9]+/g, '');
        var cards = {
            visa      : /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard : /^5[1-5][0-9]{14}/,
            amex      : /^3[47][0-9]{13}/,
            hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
        };
        for (var flag in cards) {
            if(cards[flag].test(cardnumber)) {
                return flag;
            }
        }
        return false;
    }
};

// Mapeamento das bandeiras
const bandeiras = {
  visa:       { nome: "Visa",        img: "https://cdn.brandfetch.io/idhem73aId/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B" },
  mastercard: { nome: "Mastercard",  img: "https://cdn.brandfetch.io/idFw8DodCr/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" },
  amex:       { nome: "Amex",        img: "https://cdn.brandfetch.io/id5WXF6Iyd/theme/dark/idAyOxP8-l.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  hipercard:  { nome: "Hipercard",   img: "https://banner2.cleanpng.com/20190126/zue/kisspng-hipercard-credit-card-banco-itaucard-logo-hipercard-controle-seu-carto-android-market-da-5c4c805d60eab2.705576851548517469397.jpg" },
  elo:        { nome: "Elo",         img: "https://cdn.brandfetch.io/idT3-XCDJD/w/200/h/200/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B" }
};

// Funções auxiliares para valores aleatórios
function bancoAleatorio() {
  const bancos = [
    { nome: "Itaú"},
    { nome: "Bradesco"},
    { nome: "Santander"},
    { nome: "Banco do Brasil"},
    { nome: "Caixa"},
    { nome: "Nubank"}
  ];
  return bancos[Math.floor(Math.random() * bancos.length)];
}

function gerarLimite() {
  // Limite entre 1.000 e 30.000
  return Math.floor(Math.random() * 29000) + 1000;
}

function gerarFatura(limite) {
  // Fatura entre 0 e o limite
  return Math.floor(Math.random() * (limite + 1));
}

function gerarStatus() {
  const status = ["Ativo", "Bloqueado", "Cancelado"];
  return status[Math.floor(Math.random() * status.length)];
}

// Validação e criação da linha na tabela
document.getElementById('formulario-cartao').addEventListener('submit', function (event) {
  event.preventDefault();

  const numero = document.getElementById('numero-cartao').value.replace(/\D/g, '');
  const validade = document.getElementById('validade').value.trim();
  const titular = document.getElementById('nome-titular').value.trim(); // Adicione esse campo no formulário!
  const cvv = document.getElementById('codigo-seguranca').value.trim();

  // Validação do número do cartão (16 dígitos)
  if (!/^\d{16}$/.test(numero)) {
    alert('Número do cartão inválido. Deve conter exatamente 16 dígitos numéricos.');
    return;
  }

  // Validação da validade (MM/AA)
  if (!/^\d{2}\/\d{2}$/.test(validade)) {
    alert('Validade inválida. Use o formato MM/AA.');
    return;
  }
  const [mes, ano] = validade.split('/').map(Number);
  const dataAtual = new Date();
  const anoAtual = Number(dataAtual.getFullYear().toString().slice(-2));
  const mesAtual = dataAtual.getMonth() + 1;
  if (mes < 1 || mes > 12) {
    alert('Mês de validade inválido.');
    return;
  }
  if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
    alert('Cartão expirado.');
    return;
  }

  // Validação do CVV (3 ou 4 dígitos)
  if (!/^\d{3,4}$/.test(cvv)) {
    alert('Código de segurança inválido. Deve conter 3 ou 4 dígitos.');
    return;
  }

  // Bandeira
  const flag = tgdeveloper.getCardFlag(numero);
  const bandeira = bandeiras[flag] || { nome: "Cartão", img: "Assets/imgs/Bandeiras/cartao-generico.svg" };

  // Banco aleatório
  const banco = bancoAleatorio();

  // Número formatado
  const ultimos4 = numero.slice(-4);
  const numeroFormatado = `•••• ${ultimos4}`;

// Limite e fatura aleatórios
const limiteValor = gerarLimite();
const faturaValor = gerarFatura(limiteValor);

const limite = "R$ " + limiteValor.toLocaleString('pt-BR');
const fatura = "R$ " + faturaValor.toLocaleString('pt-BR');
  const status = gerarStatus();

  // Cria a linha da tabela
  const tr = document.createElement('tr');
  tr.innerHTML = `
  <td class="celula-bandeira">
    <div class="bandeira-flex">
      <img src="${bandeira.img}" alt="${bandeira.nome}" class="img-bandeira">
      <span class="nome-bandeira">${bandeira.nome}</span>
    </div>
  </td>
  <td><alt="${banco.nome}" width="32"> ${banco.nome}</td>
  <td>${numeroFormatado}</td>
  <td>${titular}</td>
  <td>${validade}</td>
  <td>${limite}</td>
  <td>${fatura}</td>
  <td>${status}</td>
`;

  document.getElementById('corpo-tabela-cartoes').appendChild(tr);

  this.reset();
});