 import http from 'node:http'
 import {serveStatic} from './utils/serveStatic.js'
 import {handlePost, handlePrice} from './handlers/routeHandlers.js'

 const PORT = 8000

 const __dirname = import.meta.dirname

const server = http.createServer(async(req,res)=>{
  if(req.url==='/api')
  {
    if(req.method=='POST')
    {
      handlePost(req,res)   
    }  
  }
  else if(req.url==='/api/price')
  {
    return await handlePrice(req,res)
  }
  else if(!req.url.startsWith('/api'))
  {
    return await serveStatic(req,res,__dirname)
  }
})
server.listen(PORT,()=>console.log(`Server listening on PORT ${PORT}`))