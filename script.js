<script>
    document.addEventListener('DOMContentLoaded', () => {
        const buttonPrintPDF = document.getElementById('btnGerarPDF');

        // Função para gerar PDF com captura de tela (imagem do site)
        function gerarPDFPorPrint() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('landscape');

            // Usando html2canvas para capturar a tela
            html2canvas(document.body).then((canvas) => {
                const imgData = canvas.toDataURL('image/png'); // Converter o canvas para imagem PNG
                const pageWidth = pdf.internal.pageSize.getWidth(); // Largura da página do PDF
                const pageHeight = pdf.internal.pageSize.getHeight(); // Altura da página do PDF
                const imgWidth = canvas.width; // Largura da imagem capturada
                const imgHeight = canvas.height; // Altura da imagem capturada

                // Calcular a escala para ajustar a imagem ao tamanho da página
                const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                const imgScaledWidth = imgWidth * ratio;
                const imgScaledHeight = imgHeight * ratio;

                // Verificar se a altura da imagem escalada é maior que a altura da página e ajustar
                if (imgScaledHeight > pageHeight) {
                    const heightRatio = pageHeight / imgHeight;
                    imgScaledHeight = pageHeight;
                    imgScaledWidth = imgWidth * heightRatio;
                }

                // Adiciona a imagem capturada ao PDF
                pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight);
                pdf.save('relatorio_print.pdf'); // Salva o PDF gerado
            });
        }

        // Função para gerar PDF com base nos dados do formulário
        function gerarPDFPorFormulario() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const form = document.getElementById('relatorioForm');
            if (!form) {
                console.error('Formulário com id "relatorioForm" não encontrado.');
                return;
            }

            const formData = new FormData(form); // Coleta os dados do formulário

            let y = 20;
            doc.setFontSize(16);
            doc.text("Relatório de Passagem de Turno", 10, y); // Título do relatório
            y += 10;

            doc.setFontSize(12);
            // Itera pelos dados do formulário e adiciona ao PDF
            for (const [key, value] of formData.entries()) {
                doc.text(`${key}: ${value}`, 10, y); // Adiciona cada campo do formulário
                y += 10;

                // Se o conteúdo ultrapassar a página, adiciona uma nova página
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            }

            doc.save('relatorio_passagem_turno.pdf'); // Salva o PDF gerado
        }

        // Evento para gerar PDF quando o botão for clicado
        if (buttonPrintPDF) {
            buttonPrintPDF.addEventListener('click', () => {
                // Pergunta ao usuário se ele deseja gerar o PDF como captura de tela ou com base nos dados do formulário
                const gerarComoPrint = confirm(
                    'Deseja gerar o PDF como uma captura de tela do site? Escolha OK para captura ou Cancelar para basear nos dados do formulário.'
                );
                if (gerarComoPrint) {
                    gerarPDFPorPrint(); // Chama a função para gerar o PDF por captura de tela
                } else {
                    gerarPDFPorFormulario(); // Chama a função para gerar o PDF com os dados do formulário
                }
            });
        }

        // Configurar a data padrão do campo de data
        const dataInput = document.getElementById('data');
        if (dataInput) {
            const today = new Date().toISOString().split('T')[0]; // Pega a data atual no formato YYYY-MM-DD
            dataInput.value = today;
        }

        // Configurar as opções do campo de turno
        const turnoInput = document.getElementById('turno');
        if (turnoInput) {
            turnoInput.innerHTML = `
                <option value="">Selecione o Turno</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            `;
        }
    });
</script>
