let orders = document.getElementById('order')
let totalPrice = document.getElementById('totalPrice')
let totalTime = document.getElementById('totalTime')
let checkout = document.getElementById('checkout')

let order = { 
   orders: []
}

document.addEventListener('DOMContentLoaded', event => {
   checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
})

displayOrders()

checkout.addEventListener('click', event => {
   
   if(!JSON.parse(localStorage.getItem('ordersInQue')))
   {

      let ordersArr = []
   order.totalPrice = totalPrice.innerHTML.trim('€','')
   order.totalTime = totalTime.innerHTML.trim(' mins', '')
   order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
   order.recipientAddress = `${JSON.parse(sessionStorage.getItem('logged')).address.position}, ${JSON.parse(sessionStorage.getItem('logged')).address.civic}`
   order.sender = sessionStorage.getItem('restaurantName')
   order.senderAddress = sessionStorage.getItem('restuarantAddress')
   ordersArr.push(order)
   localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))

   }else{

      let ordersArr = JSON.parse(localStorage.getItem('ordersInQue'))
      order.totalPrice = totalPrice.innerHTML.trim('€','')
      order.totalTime = totalTime.innerHTML.trim(' mins', '')
      order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
      order.recipientAddress = `${JSON.parse(sessionStorage.getItem('logged')).address.position}, ${JSON.parse(sessionStorage.getItem('logged')).address.civic}`
      order.sender = sessionStorage.getItem('restaurantName')
      order.senderAddress = sessionStorage.getItem('restuarantAddress')
      ordersArr.push(order)
      localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))

   }

})

//#region functions
function displayOrders(){
   let ordersArr = JSON.parse(sessionStorage.getItem('checkout'))
   ordersArr.forEach(ordine => {
      orders.innerHTML += `
      <div class="flex mt-10 mx-10">
         <p class="flex-1 text-2xl">${ordine.name}</p>
         <p class="w-1/6 text-l text-gray-600">${ordine.minutes}</p>
         <p class="w-1/10 mr-5 text-2xl">${ordine.price}</p>
      </div>
      <hr class="mx-10">`

      order.orders.push(ordine)

      totalPrice.innerHTML = (Number(totalPrice.innerText) + Number(ordine.price.replace('€', '').trim())).toFixed(2)
      totalTime.innerHTML = Number(totalTime.innerText) + Number(ordine.minutes.replace(' mins', ''))
   });
   totalPrice.innerHTML += '€'
   totalTime.innerHTML += ' mins'


}
//#endregion