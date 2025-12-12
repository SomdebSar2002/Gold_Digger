import pdf from 'pdfkit'
import fs from 'node:fs/promises'
import fsu from 'node:fs'
import path from 'node:path'
export async function createPDF(invested)
{
  //take invested as well optional
  const doc = new pdf()
  const date = new Date().toISOString().replace(/[:,.,-]/g,'_')
  const baseDir = import.meta.dirname
  const dataDir = path.join(baseDir,'..','data','data.txt')
  const pdfDir = path.join(baseDir,'..','pdfs',`transactions_${date}.pdf`)
  const textContent = await fs.readFile(dataDir,'utf-8')
  doc.pipe(fsu.createWriteStream(pdfDir)) 
  doc.fontSize(12).text(textContent,50,50)
  doc.end()
  console.log(`PDF generated at: /pdfs/transactions_${date}.pdf`)
}