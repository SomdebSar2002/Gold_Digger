export async function parseBody(req){
  let body = ''
  for await (const chunk of req){
    body+=chunk
  }
  try{
    console.log("body = ",body)
    return body
  }catch(err){
    throw new Error(`Invalid format: ${err}`)
  }
}