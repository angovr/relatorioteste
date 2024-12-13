<script>
    document.addEventListener('DOMContentLoaded', () => {
        const buttonPrintPDF = document.getElementById('btnGerarPDF');

        // Função para gerar PDF com captura de tela
        function gerarPDFPorPrint() {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            html2canvas(document.body).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                const imgScaledWidth = imgWidth * ratio;
                const imgScaledHeight = imgHeight * ratio;

                pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight);
                pdf.save('relatorio_print.pdf');
            });
        }

        // Função para gerar PDF com base no formulário
        function gerarPDFPorFormulario() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const form = document.getElementById('relatorioForm');
            if (!form) {
                console.error('Formulário com id "relatorioForm" não encontrado.');
                return;
            }
            const formData = new FormData(form);

            let y = 20;
            doc.setFontSize(16);
            doc.text("Relatório de Passagem de Turno", 10, y);
            y += 10;

            doc.setFontSize(12);
            for (const [key, value] of formData.entries()) {
                doc.text(`${key}: ${value}`, 10, y);
                y += 10;
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
            }
            doc.save('relatorio_passagem_turno.pdf');
        }

        // Configurando eventos
        if (buttonPrintPDF) {
            buttonPrintPDF.addEventListener('click', () => {
                const gerarComoPrint = confirm(
                    'Deseja gerar o PDF como uma captura de tela do site? Escolha OK para captura ou Cancelar para basear nos dados do formulário.'
                );
                if (gerarComoPrint) {
                    gerarPDFPorPrint();
                } else {
                    gerarPDFPorFormulario();
                }
            });
        }

        // Configurar data padrão e opções de turno
        const dataInput = document.getElementById('data');
        if (dataInput) {
            const today = new Date().toISOString().split('T')[0];
            dataInput.value = today;
        }

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
