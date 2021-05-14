const keys = document.querySelectorAll("[data-action='keys']");
const operator = document.querySelectorAll("[data-action='operator']");
const display_principal = document.querySelector("#display_principal");
const display_secundario = document.querySelector("#display_secundario");
const calculadora = document.querySelector("#calculadora");

// criando historico
const historico = document.querySelector("#historico");

// Funcao que adiciona linha ao historico (lista) com os valores contidos nos vetores.
function Historico_li() {
  const li = document.createElement("li");
  li.textContent = `${Valores[Valores.length - 3]} ${Historico_de_operacoes[Historico_de_operacoes.length - 1]} ${Valores[Valores.length - 2]} = ${Valores[Valores.length - 1]}`;
  historico.appendChild(li);
}
// Vetores para armazenar os numeros e operacoes
let Valores = [],
  Historico_de_operacoes = [],
  contador1 = 0,
  contador2 = 0;

// Adicionando EventListener a todos os botoes
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", numeros);
}

// Adicionando EventListener a todos as operacoes
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", operacao);
}

// Adicionando EventListener de keydown para tela toda
window.addEventListener("keydown", Keyboard);

// Funcao que referencia o keydown ao botao e realiza um click
function Keyboard(e) {
  let keyCode = e.key;
  // console.log(keyCode);
  const key = document.querySelector(`[data-key="${keyCode}"]`);

  // Caso uma key digitada nao exista, retorne;
  const cantFoundAnyKey = !key;

  if (cantFoundAnyKey) {
    return;
  }

  //Caso a key exista, realize um click!
  key.click();
}

//funcao para os botoes numericos
function numeros(e) {
  const botao = e.target.textContent;
  const conteudo_display_principal = display_principal.textContent;
  const tecla_anterior = calculadora.dataset.tecla_anterior;

  if (conteudo_display_principal === "0" || tecla_anterior === "operator") {
    display_principal.textContent = botao;
    delete calculadora.dataset.tecla_anterior;
    display_principal.removeAttribute("class");
  } else {
    display_principal.textContent = conteudo_display_principal + botao;
  }
}

//Funcao para os botoes com operacoes
function operacao(e) {
  const btn_operacao = e.target.id;
  console.log(btn_operacao);
  //Detecta qual o id da operacao
  if (
    btn_operacao === "soma" ||
    btn_operacao === "subtracao" ||
    btn_operacao === "multiplicacao" ||
    btn_operacao === "divisao"
  ) {
    calculadora.dataset.tecla_anterior = "operator";
    calculadora.dataset.operacao = btn_operacao;
    Valores[contador1] = display_principal.textContent;
    display_secundario.textContent = `${Valores[contador1]}  ${e.target.textContent}`;
    contador1++;

    //gravar o tipo de operacao
    Historico_de_operacoes[contador2] = e.target.innerHTML;
    contador2++;
  }
  //Chama a funcao 'calcular' e mostra os resultado no display principal;
  if (btn_operacao === "igual") {
    Valores[contador1] = display_principal.textContent;
    display_secundario.textContent = `${display_secundario.textContent} ${Valores[contador1]} =`;

    const operacao = calculadora.dataset.operacao;
    const n1 = Number(Valores[Valores.length - 2]);
    const n2 = Number(Valores[Valores.length - 1]);
    display_principal.textContent = calcular(n1, operacao, n2);
    contador1++;
    Valores[contador1] = display_principal.textContent;
    Historico_li();
    console.log(Valores);
    console.log(Historico_de_operacoes);
    //Deixar o display pulsante quando display for igual a '0'
    if (display_principal.textContent === "0") {
      display_principal.setAttribute("class", "animate-pulse");
    }
  }
  // transforma o display em negativo ou positivo
  if (btn_operacao === "transformar") {
    const texto = display_principal.textContent;
    if (!texto.includes("-")) {
      display_principal.textContent = `-${texto}`;
    } else {
      display_principal.textContent = texto.slice(1);
    }
  }

  //Zera o display
  if (btn_operacao === "ac") {
    display_principal.textContent = "0";
    display_secundario.textContent = "";

    //Deixar o display pulsante quando display for igual a '0'
    display_principal.setAttribute("class", "animate-pulse");
  }
  //Deletar a ultimo digito do display;
  if (btn_operacao === "del") {
    const remove = display_principal.textContent;
    display_principal.textContent = remove.slice(0, -1);
    if (display_principal.textContent === "") {
      display_principal.textContent = "0";
      display_principal.setAttribute("class", "animate-pulse");
    }
  }
  if (btn_operacao === "btn_historico") {
    if (historico.hidden === true) {
      historico.hidden = false;
    } else {
      historico.hidden = true;
    }
  }
}
//Funcao com todos os calculos matematicos
function calcular(n1, operacao, n2) {
  let resultado = "";

  if (operacao === "soma") {
    resultado = n1 + n2;
  } else if (operacao === "subtracao") {
    resultado = n1 - n2;
  } else if (operacao === "multiplicacao") {
    resultado = n1 * n2;
  } else if (operacao === "divisao") {
    resultado = n1 / n2;
  } else if (operacao === "potencia") {
    resultado = Math.pow(n1, n2);
  } else if (operacao === "raiz") {
    resultado = Math.sqrt(n1, n2);
  }

  return resultado;
}
