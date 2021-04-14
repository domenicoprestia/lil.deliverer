let loggedUser = sessionStorage.getItem('logged')
let restaurantContainer = document.getElementById('container')

displayRestaurants()
let restaurants = document.getElementsByClassName('rest')

Array.from(restaurants).forEach(element => {
   element.addEventListener('click', event => {
      let element = event.target

      if(!String(event.target).includes('Div')) element = event.target.parentElement

      console.log(element.children)

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

function displayRestaurants(){
   let data = JSON.parse(localStorage.getItem('users'))
   let makers = []
   data.forEach(maker => {
      if(maker.maker) makers.push(maker)
   })

   makers.map(maker => {
      if(maker.restaurant.description == undefined) maker.restaurant.description = ""
   card = `<div>
            <div class="card rest p-3" style="width: 18rem; margin-right: 20px; margin-left: 20px">
               <div class="card-body">
                  <h5 class="card-title text-2xl" id='name'}>${maker.restaurant.nome}</h5>
                     <h6 class="card-subtitle mb-2 text-muted">${maker.restaurant.address}</h6>
                  <p class="card-text">${maker.restaurant.description}</p>
                  <p class="card-text" id="username">${maker.username}</p>
            </div>
         </div>`
   restaurantContainer.innerHTML += card
   })}




//#endregion

