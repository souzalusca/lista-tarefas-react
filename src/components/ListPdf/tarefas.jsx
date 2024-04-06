import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function tarefasPDF(tarefas) {
    if (!Array.isArray(tarefas)) {
        console.error('Erro: tarefas não é uma matriz.');
        return;
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [
        {
            text: 'Tarefas',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 25], // left, top, right, bottom
        }
    ];

    const dados = tarefas.map((tarefa) => {
        return [
            { text: tarefa.nomedaTarefa, fontSize: 10 },
            { text: tarefa.importancia, fontSize: 10 },
            { text: tarefa.limitedAt, fontSize: 10 },
            { text: tarefa.createdAt, fontSize: 10 },
        ];
    });

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                    [
                        { text: 'Tarefas', style: 'tableHeader', fontSize: 10 },
                        { text: 'Importância', style: 'tableHeader', fontSize: 10 },
                        { text: 'Data Limite', style: 'tableHeader', fontSize: 10 },
                        { text: 'Data Criada', style: 'tableHeader', fontSize: 10 },
                    ],
                    ...dados
                ]
            },
            layout: 'headerLineOnly'
        }
    ];

    function Rodape(CurrentPage, pageCount) {
        return [
            {
                text: CurrentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0] // left, top, right, bottom
            }
        ];
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: reportTitle,
        content: details,
        footer: Rodape
    };

    pdfMake.createPdf(docDefinition).download();
}

export default tarefasPDF;
