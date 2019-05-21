import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

function u2u (params) {
  const template = {
    content: [
      {
        text: params.beneficiary_name, fontSize: 12
      },
      {
        text: `Invoice #${params.invoice_number}`, fontSize: 12
      },
      {
        margin: [0, 100, 0, 15],
        layout: 'noBorders',
        table: {

          headerRows: 0,
          widths: ['*', 130, 120],

          body: [
            [
              { text: 'Date', fontSize: 8 }
            ],
            [
              { text: params.current_date, fontSize: 10 }
            ]
          ]

        }
      },
      {
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 50],
        table: {

          headerRows: 0,
          widths: ['*', '*', '*', '*'],

          body: [
            [
              { text: 'Item name', fontSize: 8 },
              { text: 'Price', fontSize: 8 },
              { text: 'Quantity', fontSize: 8 },
              { text: 'Subtotal', fontSize: 8 }
            ],
            [
              {
                text: params.ref, fontSize: 11, bold: true, margin: [0, 6]
              },
              {
                text: params.currency + ' ' + params.amount, fontSize: 10, margin: [0, 6]
              },
              {
                text: '1', fontSize: 10, margin: [0, 6]
              },
              {
                text: params.currency + ' ' + params.amount, fontSize: 10, margin: [0, 6]
              }
            ],
            [

              null,
              null,
              { text: 'TOTAL DUE', fontSize: 10, margin: [0, 6, 0, 0] },
              {
                text: params.currency + ' ' + params.amount,
                fontSize: 12,
                margin: [0, 2, 0, 0]
              }

            ]
          ]
        }
      },

      {
        layout: 'lightHorizontalLines', // optional
        table: {

          headerRows: 0,
          widths: ['*', '*', '*'],

          body: [
            [
              {
                text: 'PAY TO :',
                fontSize: 10,
                margin: [0, 0, 0, 4]
              }, null, null],
            [
              [
                {
                  text: [
                    'Beneficiary address'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.address
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                }

              ],
              null,
              null

            ]
          ]
        }
      }
    ]
  }
  pdfMake.createPdf(template).download()
}

export default u2u
