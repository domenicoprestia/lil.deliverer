let orders = document.getElementById('order')
let totalPrice = document.getElementById('totalPrice')
let totalTime = document.getElementById('totalTime')

document.addEventListener('DOMContentLoaded', event => {
   checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
})

displayOrders()


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

     

      totalPrice.innerHTML = Number(totalPrice.innerText) + Number(ordine.price.replace('€', '').trim())
      totalTime.innerHTML = Number(totalTime.innerText) + Number(ordine.minutes.replace(' mins', ''))
   });
   totalPrice.innerHTML += '€'
   totalTime.innerHTML += ' mins'
}
//#endregion