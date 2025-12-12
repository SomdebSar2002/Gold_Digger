import {sendResponse} from '../utils/sendResponse.js'
import {parseBody} from '../utils/parseBody.js'
import {addNewInvestment } from '../utils/addNewInvestment.js'
import {investmentEvents} from '../events/investmentEvents.js'
import {getPrice} from '../utils/getPrice.js'


export async function handlePost(req,res){
  try{
    const parsedBody = await parseBody(req)
    await addNewInvestment(parsedBody)
    await investmentEvents.emit('money-invested',parsedBody)
    sendResponse(res,201,'text/html',parsedBody)
  }
  catch(err){
    sendResponse(res,400,'application/json',JSON.stringify({error: err}))
  }
}
export async function handlePrice(req,res){
  res.statusCode = 200
  res.setHeader('Content-Type','text/event-stream')
  res.setHeader('Cache-Control','no-cache')
  res.setHeader('Connection','keep-alive')
  setInterval(() =>{
    const price = getPrice()
    res.write(`data: ${JSON.stringify({event:'price-updated',price:price})}\n\n`)
  },2000)
}