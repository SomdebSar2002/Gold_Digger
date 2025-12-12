const eventSource = new EventSource("/api/price")

const liveprice = document.querySelector(".price")
const status_update = document.querySelector(".status")
const amount = document.getElementById('investment-amount')
const dg = document.querySelector("dialog")
const pid = document.getElementById("investment-summary")
const dg_btn = document.querySelector("dialog button")
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  status_update.textContent = "Live Prices 🟢"
  const price = data.price
  liveprice.textContent = price
}
eventSource.onerror = () => {
  status_update.textContent = "Disconnected 🔴"
  liveprice.textContent = "____.__"
}
dg_btn.addEventListener('click',()=>{
  dg.close()
})
document.querySelector('form').addEventListener("submit", async function (event) {
  event.preventDefault()
  const amount_paid = parseFloat(amount.value)
  const live_price = parseFloat(liveprice.textContent)
  const weight = (amount_paid/live_price).toFixed(3)
  const date = new Date()
  let txt = `${date.toISOString()}, amount paid: £${amount_paid}, price per Oz: £${live_price}, gold sold: ${weight} Oz`
  document.querySelector('form').reset()
  try {
    const response = await fetch('/api', {
      method: "POST",
      headers: {
        "Content-Type": "text/html"
      },
      body: txt
    })
    if (response.ok) {
      dg.showModal()
      pid.textContent = `You just bought ${weight} ounces (ozt) for £${amount_paid}. \n You will receive documentation shortly.`
    }
    else {
      dg.showModal()
      pid.textContent = 'Sorry your transaction can\'t be completed.Please try again. no'
      console.error("Server Error", response.statusText)
    }
  
  }
  catch (err) {
    dg.showModal()
    pid.textContent = 'Sorry your transaction can\'t be completed.Please try again.'
    console.error("Error:", error)
  }
})