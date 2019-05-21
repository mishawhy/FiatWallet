import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

function deposit (params) {
  const template = {
    content: [
      {
        text: 'Skylark', fontSize: 12
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
            [{ text: params.beneficiary_name, fontSize: 10 },
              { text: 'Issue date', fontSize: 8 }
            ],
            [{ text: params.current_address, fontSize: 9 },
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
          widths: ['*', '*', '*', '*', '*', '*'],

          body: [
            [
              { text: 'Item name', fontSize: 8 },
              { text: 'Price', fontSize: 8 },
              { text: 'VAT %', fontSize: 8 },
              { text: 'Quantity', fontSize: 8 },
              { text: 'VAT', fontSize: 8 },
              { text: 'Subtotal', fontSize: 8 }
            ],
            [
              {
                text: 'Marketplace', fontSize: 11, bold: true, margin: [0, 6]
              },
              {
                text: params.currency + ' ' + params.deposit_amount, fontSize: 10, margin: [0, 6]
              },
              {
                text: '0%', fontSize: 10, margin: [0, 6]
              },
              {
                text: '1', fontSize: 10, margin: [0, 6]
              },
              {
                text: params.currency + ' 0.00', fontSize: 10, margin: [0, 6]
              },
              {
                text: params.currency + ' ' + params.deposit_amount, fontSize: 10, margin: [0, 6]
              }
            ],
            [

              null,
              [
                { text: 'Net total :', fontSize: 10, margin: [0, 6, 0, 0] },
                {
                  text: params.currency + ' ' + params.deposit_amount,
                  fontSize: 10,
                  margin: [0, 2, 0, 0]
                }
              ],
              null,
              null,
              [
                { text: 'VAT total :', fontSize: 10, margin: [0, 6, 0, 0] },
                { text: params.currency + ' 0.00', fontSize: 10, margin: [0, 2, 0, 0] }
              ],
              [
                { text: 'TOTAL DUE', fontSize: 10, margin: [0, 6, 0, 0] },
                {
                  text: params.currency + ' ' + params.deposit_amount,
                  fontSize: 12,
                  margin: [0, 2, 0, 0]
                }
              ]
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
                    'Beneficiary name'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_name
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                },
                {
                  text: [
                    'Beneficiary address'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_address
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                }

              ],
              [
                {
                  text: [
                    'Beneficiary Account'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_account
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                },
                {
                  text: [
                    'Beneficiary Bank Swift'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_bank_swift
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                }
              ],
              [
                {
                  text: [
                    'Beneficiary Bank'
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_bank
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                },
                {
                  text: [
                    'Beneficiary Bank Address '
                  ],
                  fontSize: 8,
                  margin: [0, 6, 0, 0]

                },
                {
                  text: [
                    params.ben_bank_address
                  ],
                  fontSize: 10,
                  margin: [0, 4, 0, 0]
                }
              ]
            ]
          ]
        }
      }
    ]
  }
  pdfMake.createPdf(template).download()
}

export default deposit
