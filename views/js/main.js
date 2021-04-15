let loggedUser = sessionStorage.getItem('logged')
let restaurantContainer = document.getElementById('container')
let platesContainer = document.getElementById('plates')
let checkoutN = document.getElementById('checkoutN')
let checkoutLink = document.getElementById('checkoutLink')

let restaurantName 

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
         displayPlates(maker.restaurant.piatti_ordinabili)}})
         let buttons = document.getElementsByClassName('addBtn')
      
      Array.from(buttons).forEach(button => {
         button.addEventListener('click', async event => { 

         let platesArr = []


         if(JSON.parse(sessionStorage.getItem('checkout')) && sessionStorage.getItem('restaurantName') == restaurantName){
         JSON.parse(sessionStorage.getItem('checkout')).forEach(plt => {platesArr.push(plt)})
         

         

         let plate = {
            name: event.target.parentNode.children[0].textContent,
            minutes: event.target.parentNode.children[1].textContent,
            price: event.target.parentNode.children[2].textContent
            }


         platesArr.push(plate)
         sessionStorage.setItem('checkout', JSON.stringify(platesArr))

         checkoutN.innerHTML = Number(checkoutN.innerHTML) + 1
         
         }
         else if(sessionStorage.getItem('restaurantName') != restaurantName && sessionStorage.getItem('restaurantName') != undefined){
            alert('Scegli piatti dello stesso ristorante')
         }
         else{
            let platesArr = []

            let plate = {
               name: event.target.parentNode.children[0].textContent,
               minutes: event.target.parentNode.children[1].textContent,
               price: event.target.parentNode.children[2].textContent
               }

            platesArr.push(plate)

            sessionStorage.setItem('restaurantName', restaurantName)
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
   plates.forEach(plate => {
      platesContainer.innerHTML += `
      <div class="flex mt-10 mx-10">
         <p class="flex-1 text-2xl">${plate.nome_piatto}</p>
         <p class="w-1/6 text-l text-gray-600">${plate.tempo_preparazione} <span>mins</span></p>
         <p class="w-1/10 mr-5 text-2xl">${plate.prezzo}€</p>
         <button class="bg-purple-600 hover:bg-purple-800 text-white font-bold px-2 py-1 rounded mb-2 addBtn">Add</button>
      </div>
      <hr class="mx-10">`
   })
}

function displayRestaurants(){
   let data = JSON.parse(localStorage.getItem('users'))
   let makers = []
   data.forEach(maker => {
      if(maker.maker) makers.push(maker)
   })

   makers.map(maker => {
      if(maker.restaurant.description == undefined) maker.restaurant.description = ""
   card = `<div>
            <div class="card rest p-3 shadow" style="width: 18rem; margin-right: 20px; margin-left: 20px">
               <div class="card-body">
                  <h5 class="card-title text-2xl" id='name'}>${maker.restaurant.nome}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${maker.restaurant.address}</h6>
                  <p class="card-text">${maker.restaurant.description}</p>
                  <p class="card-text" id="user">${maker.username}</p>
            </div>
         </div>`
   restaurantContainer.innerHTML += card
   })}




//#endregion

