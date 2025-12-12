import path from 'node:path'
import fs from 'node:fs/promises'
export async function addNewInvestment(investment){
  try{
    const pathtxt = path.join('data','data.txt')
    investment+='\n'
    await fs.appendFile(pathtxt,investment)
  }
  catch(err){
    throw new Error(err)
  }
}