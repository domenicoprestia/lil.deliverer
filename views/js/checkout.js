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

checkout.addEventListener('click', async event => {

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
         if (status != google.maps.DistanceMatrixStatus.OK) {
            d.reject(status);
         } else {
            d.resolve(response);
         }
      });

      return d.promise()
   }

   if(!JSON.parse(localStorage.getItem('ordersInQue')))
   {

   let ordersArr = []
   order.totalPrice = totalPrice.innerHTML.trim('€','')
   order.totalTime = totalTime.innerHTML.trim(' mins', '')
   order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
   order.recipientAddress = `${JSON.parse(sessionStorage.getItem('logged')).address.position}, ${JSON.parse(sessionStorage.getItem('logged')).address.civic}`
   order.sender = sessionStorage.getItem('restaurantName')
   order.senderAddress = sessionStorage.getItem('restuarantAddress')

   let data = await distanceCalculater(order.recipientAddress, order.senderAddress)
   order.totalTime = Number(order.totalTime) + Number(data.rows[0].elements[0].duration.text.trim().replace('min', ''))
   order.totalDistance = data.rows[0].elements[0].distance.text
   order.totalTime += ' mins'

   console.log(order)

   ordersArr.push(order)
   localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))


   }else{
      let ordersArr = JSON.parse(localStorage.getItem('ordersInQue'))
      order.totalPrice = totalPrice.innerHTML.replace('€','')
      order.totalTime = totalTime.innerHTML.replace(' mins', '')
      order.recipient = JSON.parse(sessionStorage.getItem('logged')).username
      order.recipientAddress = `${JSON.parse(sessionStorage.getItem('logged')).address.position}, ${JSON.parse(sessionStorage.getItem('logged')).address.civic}`
      order.sender = sessionStorage.getItem('restaurantName')
      order.senderAddress = sessionStorage.getItem('restuarantAddress')

      let data = await distanceCalculater(order.recipientAddress, order.senderAddress)
      order.totalTime = Number(order.totalTime) + Number(data.rows[0].elements[0].duration.text.trim().replace('min', '')) 
      order.totalTime += ' mins'
      order.totalDistance = data.rows[0].elements[0].distance.text
      
      console.log(order)

      ordersArr.push(order)
      localStorage.setItem('ordersInQue', JSON.stringify(ordersArr))
   }

   sessionStorage.removeItem('checkout')
   sessionStorage.removeItem('restaurantName')
   sessionStorage.removeItem('checkoutN')
   sessionStorage.removeItem('restaurantAddress')
   

   window.location.replace('/views/main/main.html')

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