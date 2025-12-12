export function sendResponse(res,statusCode,contentType,content)
{
  console.log(statusCode)
  res.statusCode = statusCode
  res.setHeader('Content-Type',contentType)
  res.end(content)
}