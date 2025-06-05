(function () {
  const STORAGE_CSV = "dadosCSV";
  const STORAGE_OFX = "dadosOFX";
  const concTabelaBody = document.querySelector(".tabelaCorpo");
  const path = window.location.pathname;
  const csvTabelaBody = path.includes("adquirentes") ? document.querySelector("#aba3 tbody") : null;
  const ofxTabelaBody = path.includes("contas") ? document.querySelector("#aba3 tbody") : null;

  function formatValor(valor) {
    const n = parseFloat(
      typeof valor === "string"
        ? valor.replace(/\./g, "").replace(",", ".")
        : valor
    );
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatData(dataStr) {
    if (!dataStr) return "";
    if (dataStr.includes("/")) return dataStr.split(" ")[0];
    return `${dataStr.substring(6, 8)}/${dataStr.substring(4, 6)}/${dataStr.substring(0, 4)}`;
  }

  function parseFloatBR(valor) {
    if (!valor) return 0;
    return parseFloat(valor.replace(".", "").replace(",", "."));
  }

  function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines.shift().split(";").map(h => h.trim());
    return lines.map(line => {
      const values = line.split(";").map(v => v.trim());
      return headers.reduce((obj, key, i) => {
        obj[key] = values[i] || "";
        return obj;
      }, {});
    });
  }

  function parseOFX(text) {
    const transacoes = [];
    const tags = text.split("<STMTTRN>").slice(1);
    tags.forEach(tag => {
      const tipo = tag.match(/<TRNTYPE>([^<]+)/)?.[1] || "OUTRO";
      const data = tag.match(/<DTPOSTED>([^<]+)/)?.[1].substring(0, 8) || "";
      const valor = tag.match(/<TRNAMT>([^<]+)/)?.[1] || "0";
      const id = tag.match(/<FITID>([^<]+)/)?.[1] || "";
      const memo = tag.match(/<MEMO>([^<]+)/)?.[1] || "";
      transacoes.push({ type: tipo, date: data, amount: valor, id, memo });
    });
    return transacoes;
  }

  function conciliar(dadosCSV, dadosOFX) {
    const resultados = [];
    dadosCSV.forEach((venda, index) => {
      const dataVenda = formatData(venda["DATA DE VENCIMENTO"]);
      const valorEsperado = parseFloatBR(venda["VALOR LÍQUIDO"]);
      const adquirente = venda["BANDEIRA"] || "-";
      const transacao = dadosOFX.find((t) => {
        const ofxDate = formatData(t.date);
        const valorRecebido = parseFloat(t.amount);
        return ofxDate === dataVenda && Math.abs(valorRecebido - valorEsperado) < 1;
      });
      let status = "Pendente";
      let valorRecebido = 0;
      if (transacao) {
        valorRecebido = parseFloat(transacao.amount);
        status = Math.abs(valorRecebido - valorEsperado) < 0.01 ? "Conciliado" : "Divergente";
      }
      const diferenca = valorEsperado - valorRecebido;
      resultados.push({ data: dataVenda, transacao: `Venda #${index + 1}`, adquirente, banco: "-", esperado: valorEsperado, recebido: valorRecebido, diferenca, status });
    });
    if (concTabelaBody) {
      concTabelaBody.innerHTML = "";
      resultados.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.data}</td>
          <td>${item.transacao}</td>
          <td>${item.adquirente}</td>
          <td>${item.banco}</td>
          <td>${formatValor(item.esperado)}</td>
          <td>${formatValor(item.recebido)}</td>
          <td>${formatValor(Math.abs(item.diferenca))}</td>
          <td><span class="tag ${getStatusCor(item.status)}">${item.status}</span></td>
          <td><button>Conciliar</button></td>
        `;
        concTabelaBody.appendChild(tr);
      });
    }
  }

  function renderCSVTable(dados, redirect = false) {
    if (!csvTabelaBody) return;
    csvTabelaBody.innerHTML = "";
    dados.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatData(item["DATA DA VENDA"])}</td>
        <td>${formatValor(item["VALOR BRUTO"])}</td>
        <td>${item["BANDEIRA"]}</td>
        <td>${item["PRODUTO"]}</td>
        <td>${item["QTD DE PARCELAS"]}</td>
        <td>${formatValor(item["DESCONTO DE MDR"])}</td>
        <td>${formatValor(item["VALOR LÍQUIDO"])}</td>
        <td>${item["DATA DE VENCIMENTO"]}</td>
      `;
      csvTabelaBody.appendChild(tr);
    });
    if (redirect) document.querySelector('[data-relatorio="aba3"]')?.click();
  }

  function renderOFXTable(dados, redirect = false) {
    if (!ofxTabelaBody) return;
    ofxTabelaBody.innerHTML = "";
    dados.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${formatData(item.date)}</td>
        <td>${formatValor(item.amount)}</td>
        <td>${item.type}</td>
        <td>${item.memo}</td>
        <td>${item.id}</td>
      `;
      ofxTabelaBody.appendChild(tr);
    });
    if (redirect) document.querySelector('[data-relatorio="aba3"]')?.click();
  }

  function getStatusCor(status) {
    switch (status) {
      case "Conciliado": return "verde";
      case "Divergente": return "amarelo";
      case "Pendente": return "azul";
      default: return "";
    }
  }

  function salvar(key, dados) {
    localStorage.setItem(key, JSON.stringify(dados));
  }

  function carregar(key) {
    const dados = localStorage.getItem(key);
    return dados ? JSON.parse(dados) : [];
  }

  function init() {
    const inputCSV = document.getElementById("csv");
    const inputOFX = document.getElementById("ofx");

    if (inputCSV) {
      inputCSV.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file || !file.name.endsWith(".csv")) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const dadosCSV = parseCSV(e.target.result);
          salvar(STORAGE_CSV, dadosCSV);
          renderCSVTable(dadosCSV, true);
        };
        reader.readAsText(file);
      });
    }

    if (inputOFX) {
      inputOFX.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file || !file.name.endsWith(".ofx")) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const dadosOFX = parseOFX(e.target.result);
          salvar(STORAGE_OFX, dadosOFX);
          renderOFXTable(dadosOFX, true);
        };
        reader.readAsText(file);
      });
    }

    if (path.includes("adquirentes")) {
      const csv = carregar(STORAGE_CSV);
      if (csv.length) renderCSVTable(csv, false);
    }
    if (path.includes("contas")) {
      const ofx = carregar(STORAGE_OFX);
      if (ofx.length) renderOFXTable(ofx, false);
    }
    if (path.includes("consiliacao")) {
      const csv = carregar(STORAGE_CSV);
      const ofx = carregar(STORAGE_OFX);
      if (csv.length && ofx.length) conciliar(csv, ofx);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();