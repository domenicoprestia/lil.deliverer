let loggedUser = sessionStorage.getItem('logged')
let restaurantContainer = document.getElementById('container')
let platesContainer = document.getElementById('plates')
let checkoutN = document.getElementById('checkoutN')
let checkoutLink = document.getElementById('checkoutLink')

let restaurantName 
let restaurantAddress
let piatti

checkoutLink.addEventListener('click', event => {
   sessionStorage.setItem('checkoutN', checkoutN.innerHTML)
})

document.addEventListener('DOMContentLoaded', event => {
   checkoutN.innerHTML = sessionStorage.getItem('checkoutN')
})


displayRestaurants()


let restaurants = document.getElementsByClassName('rest')

Array.from(restaurants).forEach(element => {
   element.addEventListener('click',async event => {

      let element = event.target
      platesContainer.innerHTML = ''

      if(!String(event.target).includes('Div')) element = event.target.parentElement

      let username = element.children[3].innerHTML
      
      let makers = await JSON.parse(localStorage.getItem('users'))

      makers.forEach(maker => {if(maker.username == username)
         {
         platesContainer.innerHTML = `<h1 class="text-4xl mt-4 text-purple-600 text-center">${maker.restaurant.nome}</h1>`
         restaurantName = maker.restaurant.nome
         restaurantAddress = maker.restaurant.address
         displayPlates(maker.restaurant.piatti_ordinabili)
         piatti = maker.restaurant.piatti_ordinabili
      }})
         
         let buttons = document.getElementsByClassName('addBtn')

      Array.from(buttons).forEach(button => {
         button.addEventListener('click', async event => { 

         let platesArr = []


         if(JSON.parse(sessionStorage.getItem('checkout')) && sessionStorage.getItem('restaurantName') == restaurantName){
         JSON.parse(sessionStorage.getItem('checkout')).forEach(plt => {platesArr.push(plt)})
         
         let choosenPlate

         piatti.forEach(p => {
            if(p.nome_piatto == event.target.parentNode.children[0].textContent){
               choosenPlate = p
            }

         })
         

         let plate = {
            name: choosenPlate.nome_piatto,
            minutes: choosenPlate.tempo_preparazione,
            price: choosenPlate.prezzo
            }

         console.log(plate)

         platesArr.push(plate)

         sessionStorage.setItem('checkout', JSON.stringify(platesArr))

         checkoutN.innerHTML = Number(checkoutN.innerHTML) + 1
         
         }
         else if(sessionStorage.getItem('restaurantName') != restaurantName && sessionStorage.getItem('restaurantName') != undefined){
            alert('Choose plates of the same restaurant')
         }
         else{
            let platesArr = []

            let plate = {
               name: event.target.parentNode.children[0].textContent,
               minutes: event.target.parentNode.children[3].textContent,
               price: event.target.parentNode.children[4].textContent
               }

            platesArr.push(plate)

            sessionStorage.setItem('restaurantName', restaurantName)
            sessionStorage.setItem('restuarantAddress', restaurantAddress)
            sessionStorage.setItem('checkout', JSON.stringify(platesArr))
            
            checkoutN.innerHTML = Number(checkoutN.innerHTML) + 1

            }
         })
      })

   });
 });

//#region slider 
const slider = document.querySelector('#container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; 
  slider.scrollLeft = scrollLeft - walk;
});

//#endregion
//#region functions 
function displayPlates(plates){
   let veg = ''
   let bio = ''
   plates.forEach(plate => {
      if(plate.nome_piatto != undefined){

         if(plate.vegetariano) veg = 'veg'
         if(plate.biologico) bio = 'bio'

      platesContainer.innerHTML += `
      <div class="flex mt-10 mx-10">
         <p class="flex-1 text-2xl">${plate.nome_piatto}</p>
         <p class="w-1/6 text-l text-green-600">${veg}</p>
         <p class="w-1/6 text-l text-green-600">${bio}</p>
         <p class="w-1/6 text-l text-gray-600">${plate.tempo_preparazione} <span>mins</span></p>
         <p class="w-1/10 mr-5 text-2xl">${plate.prezzo}€</p>
         <button class="bg-purple-600 hover:bg-purple-800 text-white font-bold px-2 py-1 rounded mb-2 addBtn">Add</button>
      </div>
      <hr class="mx-10">`
      veg = ''
      bio = ''
      }else{
         platesContainer.innerHTML += `
      <div class="flex mt-10 mx-10">
         <p class="flex-1 text-2xl">No plates yet</p>
      </div>
      <hr class="mx-10">`
      }
   })
}

function displayRestaurants(){
   let data = JSON.parse(localStorage.getItem('users'))
   let ordersInQue = JSON.parse(localStorage.getItem('ordersInQue'))
   let timeQue = 0

   let makers = []
   data.forEach(maker => {
      if(maker.maker) makers.push(maker)
   })

   makers.map(maker => {

      if(ordersInQue){
         ordersInQue.forEach(order => {
            if(order.sender == maker.restaurant.nome && order.senderAddress == maker.restaurant.address){
               timeQue += 10
            }
         })
      }

      if(maker.restaurant.description == undefined) maker.restaurant.description = ""
   card = `<div>
            <div class="card rest p-3 shadow" style="width: 18rem; margin-right: 20px; margin-left: 20px ; max-height: 200px; height: 200px;">
               <div class="card-body">
                  <h5 class="card-title text-2xl" id='name'}>${maker.restaurant.nome}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${maker.restaurant.address}</h6>
                  <p class="card-text">${maker.restaurant.description}</p>
                  <p class="card-text" id="user">${maker.username}</p>
                  <p class="card-text">average ${timeQue} mins of waiting</p>
            </div>
         </div>`
   restaurantContainer.innerHTML += card
   timeQue = 0
   })}




//#endregion

