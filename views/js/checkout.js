let orders = document.getElementById('order')
let totalPrice = document.getElementById('totalPrice')
let totalTime = document.getElementById('totalTime')
let checkout = document.getElementById('checkout')
let delivery = document.getElementById('delivery')
let withdrawal = document.getElementById('withdrawal')
let deleteButtons

let order = { 
   orders: []
}

document.addEventListener('DOMContentLoaded', event => {
   checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
   if(checkoutN.innerHTML == 0){
      document.getElementById('formCont').innerHTML = ``
      document.getElementById('title').textContent = 'Your checkout is empty! 😢'
   }
})

displayOrders()

checkout.addEventListener('click', async event => {
   if(delivery.checked || withdrawal.checked){
      
      
      async function distanceCalculater(recipientAddress, senderAddress){


         r = recipientAddress.split(',')
         r.splice(r.length, 1)
         
         recipientAddress = r.join(',')

         s = senderAddress.split(',')
         s.splice(r.length, 1)
         
         senderAddress = s.join(',')

         console.log(recipientAddress, senderAddress)

         var rGeo = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${recipientAddress.trim()}&key=AIzaSyBIOSNb4gExHID1PWV07r94LXUF8Y7saAg`).then(response => response.json()).then(data => {return data})
         var sGeo = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${senderAddress.trim()}&key=AIzaSyBIOSNb4gExHID1PWV07r94LXUF8Y7saAg`).then(response => response.json()).then(data => {return data})


         let rLat = rGeo.results[0].geometry.location.lat
         let rLon = rGeo.results[0].geometry.location.lng

         let sLat = sGeo.results[0].geometry.location.lat
         let sLon = sGeo.results[0].geometry.location.lng


         const matrix = new google.maps.DistanceMatrixService();
         var d = $.Deferred();
         
         matrix.getDistanceMatrix({
         origins: [new google.maps.LatLng(rLat, rLon)],
         destinations: [new google.maps.LatLng(sLat, sLon)],
         travelMode: google.maps.TravelMode.DRIVING,
         }, function(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {     //OK == HTTP status 200 != OK means 400/500/300
               d.reject(status);
            } else {
               d.resolve(response);
            }
         });

         return d.promise()
      }

      var recipientAddress = `${JSON.parse(sessionStorage.getItem('logged')).address.position}, ${JSON.parse(sessionStorage.getItem('logged')).address.civic}`
      var senderAddress = sessionStorage.getItem('restuarantAddress')
      let data = await distanceCalculater(recipientAddress, senderAddress)

      if(data.rows[0].elements[0].distance != undefined){
      tmpDistanceArr = data.rows[0].elements[0].distance.text.split(' ')
      tmpDistanceArr.splice(tmpDistanceArr.length, 1)
      tmpDistanceArr[0].replace(',','.')

      let deliveryPrice

      if(Number(tmpDistanceArr[0] < 50)){
      tmpDistanceArr[0] = parseFloat(tmpDistanceArr[0])
      deliveryPrice = parseFloat(tmpDistanceArr[0]*0.3).toFixed(2)}
      else{
         deliveryPrice = 0
      }

      if(Number(tmpDistanceArr[0]) > 50 && delivery.checked){
         withdrawal.checked = true
         delivery.disabled = true
         document.getElementById("distanceError").innerHTML = "home delivery is possible only for distance under 50 km"
      }
      else{
         
         if(delivery.checked){
            deliverType = delivery.value
         }
         else{
            deliverType = withdrawal.value
         }
      }


      if(!JSON.parse(localStorage.getItem('ordersInQue')))
      {

         let ordersArr = []
         order.totalPrice = totalPrice.innerHTML
         order.deliveryPrice = deliveryPrice
         order.preparationTime = totalTime.innerHTML
         order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
         order.recipientAddress = recipientAddress
         order.sender = sessionStorage.getItem('restaurantName')
         order.senderAddress = senderAddress
         order.deliverType = deliverType

         order.trackTime = data.rows[0].elements[0].duration.text
         order.totalDistance = data.rows[0].elements[0].distance.text
         

         console.log(order)
         ordersArr.push(order)

         localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))


         }else{
            let ordersArr = JSON.parse(localStorage.getItem('ordersInQue'))
            let timeQue = 0

            let n = sessionStorage.getItem('restaurantName')
            let a = sessionStorage.getItem('restuarantAddress')

            

            

            ordersArr.forEach(ord => {
               if(ord.sender == n && ord.senderAddress == a){
                  timeQue += 10
               }
            })

            order.totalPrice = totalPrice.innerHTML
            order.deliveryPrice = deliveryPrice
            order.preparationTime = totalTime.innerHTML + `+ ${timeQue} mins of que`
            order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
            order.recipientAddress = recipientAddress
            order.sender = sessionStorage.getItem('restaurantName')
            order.senderAddress = senderAddress
            order.deliverType = deliverType

            order.trackTime = data.rows[0].elements[0].duration.text
            order.totalDistance = data.rows[0].elements[0].distance.text
            
            console.log(order)

            ordersArr.push(order)
            localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))
      }

      sessionStorage.removeItem('checkout')
      sessionStorage.removeItem('restaurantName')
      sessionStorage.removeItem('checkoutN')
      sessionStorage.removeItem('restaurantAddress')
      

      window.location.replace('/views/main/orders.html')
   }
   else{
      document.getElementById("distanceError").innerHTML = "the service of this restaurant is not aviabile in your location"
   }
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
         <button class="delete bg-purple-600 hover:bg-purple-800 text-white font-bold px-2 py-1 rounded mb-2">🗑️</button>
      </div>
      <hr class="mx-10">`

      order.orders.push(ordine)

      totalPrice.innerHTML = (Number(totalPrice.innerText) + Number(ordine.price.replace('€', '').trim())).toFixed(2)
      totalTime.innerHTML = Number(totalTime.innerText) + Number(ordine.minutes.replace(' mins', ''))
   });
   
   totalPrice.innerHTML += '€'
   totalTime.innerHTML += ' mins'
   
   deleteButtons = document.getElementsByClassName("delete")
   console.log(deleteButtons)
   Array.from(deleteButtons).forEach(button => {
   button.addEventListener("click", event => {
      let name = event.target.parentNode.children[0].textContent
      let plates = JSON.parse(sessionStorage.getItem("checkout"))
      let newPlates = []
      let check = false
      plates.forEach(plate => {
         if(name == plate.name && !check){
            check = true
         }else{
            newPlates.push(plate)
         }
      })
      sessionStorage.setItem("checkout", JSON.stringify(newPlates))
      let n = sessionStorage.getItem("checkoutN")
      n--
      sessionStorage.setItem("checkoutN", n)
      if(n == 0){
         sessionStorage.removeItem("checkout")
         sessionStorage.removeItem("checkoutN")
         sessionStorage.removeItem("restaurantName")
      }
      window.location.reload()
   })
})

}
//#endregion