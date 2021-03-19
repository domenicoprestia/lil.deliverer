const maker = document.getElementById('food-maker');
const lover = document.getElementById('food-lover');
const main = document.getElementById('main');

maker.addEventListener('click', function() {
   console.log('maker :)')
   main.innerHTML= `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
   <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
       <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
           <h1 class="mb-8 text-3xl text-center">Sign up food-maker!</h1>
           <input 
               type="text"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="fullname"
               placeholder="Full Name" />

           <input 
               type="text"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="email"
               placeholder="Email" />

           <input 
               type="password"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="password"
               placeholder="Password" />
           <input 
               type="password"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="confirm_password"
               placeholder="Confirm Password" />

               <a class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationmaker">Register</a>

           <div class="text-center text-sm text-grey-dark mt-4">
               By signing up, you agree to the 
               <a class="no-underline border-b border-grey-dark text-grey-dark hover:text-purple-600" href="#">
                   Terms of Service
               </a> and 
               <a class="no-underline border-b border-grey-dark text-grey-dark hover:text-purple-600" href="#">
                   Privacy Policy
               </a>
           </div>
       </div>

       <div class="text-grey-dark mt-6">
           Already have an account? 
           <a class="no-underline border-b border-blue text-blue hover:text-purple-600" href="../login/">
               Log in
           </a>.
       </div>
   </div>
</div>`
var registrationMaker = document.getElementById('registrationmaker');
registrationMaker.addEventListener('click', function(){
   console.log('A greedy bitch has registered');
   
})
});

lover.addEventListener('click', function() {
   console.log('lover :)')
   main.innerHTML= `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
   <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
       <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
           <h1 class="mb-8 text-3xl text-center">Sign up food-lover!</h1>
           <input 
               type="text"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="fullname"
               placeholder="Full Name" />

           <input 
               type="text"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="email"
               placeholder="Email" />

           <input 
               type="password"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="password"
               placeholder="Password" />
           <input 
               type="password"
               class="block border border-grey-light w-full p-3 rounded mb-4"
               id="confirm_password"
               placeholder="Confirm Password" />

               <a class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationlover">Register</a>

           <div class="text-center text-sm text-grey-dark mt-4">
               By signing up, you agree to the 
               <a class="no-underline border-b border-grey-dark text-grey-dark hover:text-purple-600" href="#">
                   Terms of Service
               </a> and 
               <a class="no-underline border-b border-grey-dark text-grey-dark hover:text-purple-600" href="#">
                   Privacy Policy
               </a>
           </div>
       </div>

       <div class="text-grey-dark mt-6">
           Already have an account? 
           <a class="no-underline border-b border-blue text-blue hover:text-purple-600" href="../login/">
               Log in
           </a>.
       </div>
   </div>
</div>`
var registrationLover = document.getElementById('registrationlover');
registrationLover.addEventListener('click', function(){
   console.log('A fat bitch has registered');
})

});




