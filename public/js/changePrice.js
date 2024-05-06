const chegada = document.getElementById("chegada");
const partida = document.getElementById("partida");
const preco = document.getElementById("preco");
const valor = document.getElementById("valor");
const valorDia = parseFloat(document.getElementById("valorDia").value);

// Função para calcular a diferença de dias e exibir o resultado
function calcularDiferenca() {
    // Transforma as datas em objetos Date
    const dataChegada = new Date(chegada.value);
    const dataPartida = new Date(partida.value);

    // Calcula a diferença em milissegundos
    const diferencaEmMilissegundos = Math.abs(dataPartida - dataChegada);

    // Converte a diferença de milissegundos para dias
    const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    // Exibe o resultado no parágrafo
    const total = (diferencaEmDias  * valorDia) + valorDia
    preco.textContent = `Total: `+ total;
    valor.value = total
}

// Adiciona o evento de mudança aos campos de entrada
chegada.addEventListener("change", calcularDiferenca);
partida.addEventListener("change", calcularDiferenca);
