// Lista de números possíveis
const numeros = ['12345', '54321', '67890', '09876', '24680',];

// Escolher um número aleatório
const numero_secreto = numeros[Math.floor(Math.random() * numeros.length)];

// Inicializar o jogo
const tentativas_restantes = 6;

// Criar o elemento div com o ID "root"
const rootElemento = document.createElement('div');
rootElemento.id = 'root';
document.body.appendChild(rootElemento);




// Criar o elemento de estilo
const styleElemento = document.createElement('style');
styleElemento.textContent = css;
document.head.appendChild(styleElemento);

// Elementos HTML para exibir o número e as tentativas restantes
const numeroElemento = document.createEleent('div');
numeroElemento.className = 'numero';
numeroElemento.textContent = 'Número: ' + numero_secreto.replace(/[0-9]/g, '*');
rootElemento.appendChild(numeroElemento);

const tentativasElemento = document.createElement('div');
tentativasElemento.className = 'Intentos';
tentativasElemento.textContent = 'Intentos restantes: ' + tentativas_restantes;
rootElemento.appendChild(tentativasElemento);

const inputContainerElemento = document.createElement('div');
inputContainerElemento.className = 'input-container';
rootElemento.appendChild(inputContainerElemento);

// Gerar 5 campos de entrada
const inputs = [];
for (let i = 0; i < 5; i++) {
  const inputElemento = document.createElement('input');
  inputElemento.className = 'input';
  inputElemento.placeholder = i + 1;
  inputElemento.maxLength = 1;
  inputs.push(inputElemento);
  inputContainerElemento.appendChild(inputElemento);
}

const botaoElemento = document.createElement('button');
botaoElemento.className = 'botao';
botaoElemento.textContent = 'Enviar';
botaoElemento.onclick = function () {
  const tentativa = inputs.map(input => input.value).join('');
  if (!tentativa || tentativa.length !== 5 || isNaN(parseInt(tentativa))) {
    alert('Por favor, digite um número válido de 5 dígitos.');
    return;
  }

  const tentativa_correta = [];
  const numeros_corretos = [];

  // Verificar os dígitos da tentativa
  for (let i = 0; i < 5; i++) {
    if (numero_secreto[i] === tentativa[i]) {
      tentativa_correta.push('verde');
    } else if (numero_secreto.includes(tentativa[i])) {
      tentativa_correta.push('amarelo');
    } else {
      tentativa_correta.push('vermelho');
    }
    if (numero_secreto.includes(tentativa[i])) {
      numeros_corretos.push(tentativa[i]);
    }
  }

  // Remover duplicatas dos números corretos
  numeros_corretos = numeros_corretos.filter((valor, indice) => numeros_corretos.indexOf(valor) === indice);

  // Aplicar cores aos blocos
  for (let i = 0; i < 5; i++) {
    const blocoElemento = document.createElement('div');
    blocoElemento.className = 'bloco ' + tentativa_correta[i];
    blocoElemento.textContent = tentativa[i];
    rootElemento.appendChild(blocoElemento);
  }

  // Verificar se a tentativa é correta
  if (tentativa === numero_secreto) {
    alert('Parabéns! Você descobriu o número secreto: ' + numero_secreto);
    return;
  }

  // Atualizar as tentativas restantes
  tentativas_restantes -= 1;
  tentativasElemento.textContent = 'Intentos restantes: ' + tentativas_restantes;

  // Se o jogador perdeu
  if (tentativas_restantes === 0) {
    alert('Você perdeu! O número secreto era: ' + numero_secreto);
  }
};
rootElemento.appendChild(botaoElemento);
