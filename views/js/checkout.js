let orders = document.getElementById('order')

document.addEventListener('DOMContentLoaded', event => {
   checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
})

displayOrders()


//#region functions
function displayOrders(){
   let ordersArr = JSON.parse(sessionStorage.getItem('checkout'))
   ordersArr.forEach(element => {
      
   });
}
//#endregion