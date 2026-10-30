// DADOS FICTÍCIOS PADRONIZADOS — 9º ANO
// Frequência geral fictícia de 92% apenas para demonstração visual nesta versão.
const dadosBoletim = [
  { disciplina: "Língua Portuguesa", tri1: 78, tri2: "8,2", tri3: 8.6, faltas: [2, 2, 1] },
  { disciplina: "Matemática", tri1: 55, tri2: "5,4", tri3: null, faltas: [3, 2, 2] },
  { disciplina: "Ciências", tri1: 84, tri2: 7.9, tri3: "8,3", faltas: [1, 1, 1] },
  { disciplina: "História", tri1: "7,1", tri2: 82, tri3: null, faltas: [1, 2, 1] },
  { disciplina: "Geografia", tri1: 69, tri2: "7,5", tri3: 7.8, faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 88, tri2: 8.4, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Arte", tri1: "9,2", tri2: 87, tri3: 9.0, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 96, tri2: "9,3", tri3: null, faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 91, tri2: 8.9, tri3: "9,4", faltas: [1, 1, 0] },
  { disciplina: "Educação Financeira", tri1: 76, tri2: "7,2", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Rec. Aprend. Matemática", tri1: 58, tri2: "5,9", tri3: 6.2, faltas: [2, 2, 1] },
  { disciplina: "Leitura Rec. Aprend. Lingua Portuguesa", tri1: 72, tri2: "7,6", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 49, tri2: 5.5, tri3: "5,8", faltas: [2, 2, 2] },
  { disciplina: "Literatura Arte e Movimento", tri1: "8,0", tri2: 84, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Práticas Experimentais", tri1: 64, tri2: "6,6", tri3: 7.0, faltas: [1, 1, 1] }
];

// Função para normalizar as notas para a escala de 0 a 10
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null; // Nota ausente
  }

  // Converte texto com vírgula para número com ponto
  if (typeof valor === 'string') {
    valor = parseFloat(valor.replace(',', '.'));
  }

  if (isNaN(valor)) {
    return null; // Valor inválido
  }

  // Regra de conversão para escala 0 a 10
  if (valor >= 0 && valor <= 10) {
    return valor;
  } else if (valor > 10 && valor <= 100) {
    return valor / 10;
  } else {
    return null; // Fora das regras
  }
}

// Função para formatar exibição da nota
function formatarNotaExibicao(nota) {
  if (nota === null) {
    return "—";
  }
  return nota.toFixed(1).replace('.', ',');
}

// Função para calcular a média de uma disciplina
function calcularMedia(notas) {
  const notasValidas = notas.filter(n => n !== null);
  if (notasValidas.length === 0) {
    return null;
  }
  const soma = notasValidas.reduce((acc, curr) => acc + curr, 0);
  return soma / notasValidas.length;
}

// Função principal que preenche o boletim
function renderizarBoletim() {
  const corpoTabela = document.getElementById('corpo-tabela');
  corpoTabela.innerHTML = ''; // Limpa a tabela

  let somaMediasGerais = 0;
  let qtdDisciplinasComMedia = 0;
  let totalFaltasGeral = 0;
  let qtdBomDesempenho = 0;
  let qtdAtencao = 0;

  dadosBoletim.forEach(item => {
    // Normaliza notas dos 3 trimestres
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula média e faltas
    const media = calcularMedia([n1, n2, n3]);
    const totalFaltas = item.faltas.reduce((acc, f) => acc + f, 0);
    totalFaltasGeral += totalFaltas;

    // Define situação
    let situacaoTexto = "Nota ainda não disponível";
    let classeSituacao = "nota-indisponivel";

    if (media !== null) {
      somaMediasGerais += media;
      qtdDisciplinasComMedia++;

      if (media >= 6.0) {
        situacaoTexto = "Bom desempenho";
        classeSituacao = "bom-desempenho";
        qtdBomDesempenho++;
      } else {
        situacaoTexto = "Atenção";
        classeSituacao = "atencao";
        qtdAtencao++;
      }
    }

    // Cria a linha na tabela via DOM
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.disciplina}</td>
      <td>${formatarNotaExibicao(n1)}</td>
      <td>${formatarNotaExibicao(n2)}</td>
      <td>${formatarNotaExibicao(n3)}</td>
      <td><strong>${formatarNotaExibicao(media)}</strong></td>
      <td>${totalFaltas}</td>
      <td class="${classeSituacao}">${situacaoTexto}</td>
    `;
    corpoTabela.appendChild(tr);
  });

  // Atualiza os Cards de Resumo via DOM
  const mediaGeral = qtdDisciplinasComMedia > 0 ? (somaMediasGerais / qtdDisciplinasComMedia).toFixed(1).replace('.', ',') : "—";
  
  document.getElementById('card-media-geral').textContent = mediaGeral;
  document.getElementById('card-total-faltas').textContent = totalFaltasGeral;
  document.getElementById('card-bom-desempenho').textContent = qtdBomDesempenho;
  document.getElementById('card-atencao').textContent = qtdAtencao;
}

// Executa a função assim que a página carrega
document.addEventListener('DOMContentLoaded', renderizarBoletim);