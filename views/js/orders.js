let ordersContainer = document.getElementById('orders')
let checkoutN = document.getElementById('checkoutN')


document.addEventListener('DOMContentLoaded', event => {
    checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
 })

displayOrders()


function displayOrders(){
    let totalOrders = JSON.parse(localStorage.getItem('ordersInQue'))
    let loggedUser = JSON.parse(sessionStorage.getItem('logged'))
    let userOrders = []


    if(totalOrders == null){
        document.getElementById('title').textContent = 'You have no orders! ☁️'
    }

    totalOrders.forEach(order => {
        if(order.recipient === loggedUser.username){
            userOrders.push(order)
        }
    })

    if(userOrders.length > 0){
    userOrders.forEach(order => {
        console.log(order)

        ordersContainer.innerHTML += `
        
        <div class="flex mt-32 mx-10">
           <p class="flex-1 text-xl">Recipient: ${order.recipient}</p>
           <p class="w-1/10 text-xl">Sender: ${order.sender}</p>
        </div>
        <div class="flex mt-10 mx-10">
        <p class="flex-1 text-xl">address:${order.recipientAddress}</p>
        <p class="w-1/10 text-xl">address:${order.senderAddress}</p>
        </div>`

        order.orders.forEach(plate => {
            ordersContainer.innerHTML += `
            <div class="flex mt-10 mx-10">
            <p class="flex-1 text-2xl">${plate.name}</p>
            <p class="w-1/6 text-l text-gray-600">${plate.minutes}</p>
            <p class="w-1/10 mr-5 text-2xl">${plate.price}</p>
            </div>`
        })
        
        ordersContainer.innerHTML += `<div class="flex mt-10 mx-10">
           <p class="flex-1 text-xl">${order.deliverType}</p>
           <p class="flex-1 text-xl">${order.totalDistance}</p>
           <p class="w-1/6 text-l text-gray-600">${order.trackTime}</p>
           <p class="w-1/6 text-l text-gray-600">${order.preparationTime}</p>
           <p class="w-1/10 mr-5 text-2xl">${order.totalPrice} + ${order.deliveryPrice}€ fee </p>
        </div>
        <hr class="mx-10">`
    })
    }
    else{
        document.getElementById('title').textContent = 'You have no orders! ☁️'
    }
}
