export function getPrice()
{
   const price = 3600+Math.random()*500
   return price.toFixed(2)
}