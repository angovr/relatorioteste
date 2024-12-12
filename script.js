// Função para gerar o PDF
function gerarPDF() {
    const { jsPDF } = window.jspdf; // Importando jsPDF
    const doc = new jsPDF(); // Criando um novo documento PDF

    // Selecionar o formulário e capturar os dados
    const form = document.getElementById('relatorioForm');
    if (!form) {
        console.error('Formulário com id "relatorioForm" não encontrado.');
        return;
    }
    const formData = new FormData(form);

    let y = 20; // Posição inicial no PDF

    // Título no PDF
    doc.setFontSize(16);
    doc.text("Relatório de Passagem de Turno", 10, y);
    y += 10; // Avança para a próxima linha

    // Adicionando os dados do formulário no PDF
    doc.setFontSize(12);
    for (const [key, value] of formData.entries()) {
        doc.text(`${key}: ${value}`, 10, y);
        y += 10;

        // Adiciona uma nova página, caso chegue ao final
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
    }

    // Baixar o PDF com o nome especificado
    doc.save('relatorio_passagem_turno.pdf');
}

// Adiciona o evento de clique ao botão após a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('btnGerarPDF');
    if (!button) {
        console.error('Botão com id "btnGerarPDF" não encontrado.');
        return;
    }
    button.addEventListener('click', gerarPDF);
});


