// Lista de números possíveis
var numeros = ["12345", "54321", "67890", "09876", "24680"];

// Escolher um número aleatório
var numero_secreto = numeros[Math.floor(Math.random() * numeros.length)];

// Inicializar o jogo
var tentativas_restantes = 6;

// Criar o elemento div com o ID "root"
var rootElemento = document.createElement("div");
rootElemento.id = "root";
document.body.appendChild(rootElemento);


var css = `
#root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.numero {
    font-size: 24px;
    margin-bottom: 10px;
}

.tentativas {
    font-size: 20px;
    margin-bottom: 20px;
}

.input-container {
    display: flex;
    justify-content: center;
}

.input {
    font-size: 20px;
    padding: 5px;
    margin: 0 5px;
    text-align: center;
    width: 40px;
}

.bloco {
    width: 50px;
    height: 50px;
    margin: 5px;
    display: inline-block;
    border: 1px solid black;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
}

.verde {
    background-color: #4CAF50;
    color: white;
}

.amarelo {
    background-color: #FFFF00;
}

.vermelho {
    background-color: #FF0000;
    color: white;
}
`;

// Criar o elemento de estilo
var styleElemento = document.createElement("style");
styleElemento.textContent = css;
document.head.appendChild(styleElemento);

// Elementos HTML para exibir o número e as tentativas restantes
var numeroElemento = document.createElement("div");
numeroElemento.className = "numero";
numeroElemento.textContent = "Número: " + numero_secreto.replace(/[0-9]/g, "*");
rootElemento.appendChild(numeroElemento);

var tentativasElemento = document.createElement("div");
tentativasElemento.className = "tentativas";
tentativasElemento.textContent = "Tentativas restantes: " + tentativas_restantes;
rootElemento.appendChild(tentativasElemento);

var inputContainerElemento = document.createElement("div");
inputContainerElemento.className = "input-container";
rootElemento.appendChild(inputContainerElemento);

// Gerar 5 campos de entrada
var inputs = [];
for (var i = 0; i < 5; i++) {
    var inputElemento = document.createElement("input");
    inputElemento.className = "input";
    inputElemento.placeholder = i + 1;
    inputElemento.maxLength = 1;
    inputs.push(inputElemento);
    inputContainerElemento.appendChild(inputElemento);
}

var botaoElemento = document.createElement("button");
botaoElemento.className = "botao";
botaoElemento.textContent = "Enviar";
botaoElemento.onclick = function() {
    var tentativa = inputs.map(input => input.value).join("");
    if (!tentativa || tentativa.length !== 5 || isNaN(parseInt(tentativa))) {
        alert("Por favor, digite um número válido de 5 dígitos.");
        return;
    }

    var tentativa_correta = [];
    var numeros_corretos = [];

    // Verificar os dígitos da tentativa
    for (var i = 0; i < 5; i++) {
        if (numero_secreto[i] === tentativa[i]) {
            tentativa_correta.push("verde");
        } else if (numero_secreto.includes(tentativa[i])) {
            tentativa_correta.push("amarelo");
        } else {
            tentativa_correta.push("vermelho");
        }
        if (numero_secreto.includes(tentativa[i])) {
            numeros_corretos.push(tentativa[i]);
        }
    }

    // Remover duplicatas dos números corretos
    numeros_corretos = numeros_corretos.filter((valor, indice) => numeros_corretos.indexOf(valor) === indice);

    // Aplicar cores aos blocos
    for (var i = 0; i < 5; i++) {
        var blocoElemento = document.createElement("div");
        blocoElemento.className = "bloco " + tentativa_correta[i];
        blocoElemento.textContent = tentativa[i];
        rootElemento.appendChild(blocoElemento);
    }

    // Verificar se a tentativa é correta
    if (tentativa === numero_secreto) {
        alert("Parabéns! Você descobriu o número secreto: " + numero_secreto);
        return;
    }

    // Atualizar as tentativas restantes
    tentativas_restantes -= 1;
    tentativasElemento.textContent = "Tentativas restantes: " + tentativas_restantes;

    // Se o jogador perdeu
    if (tentativas_restantes === 0) {
        alert("Você perdeu! O número secreto era: " + numero_secreto);
    }
};
rootElemento.appendChild(botaoElemento);
