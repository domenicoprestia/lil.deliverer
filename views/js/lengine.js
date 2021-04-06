const maker = document.getElementById('food-maker');
const lover = document.getElementById('food-lover');
const main = document.getElementById('main');
var check = 'false';

maker.addEventListener('click', function() {
   console.log('maker :)')
   main.innerHTML= formL
   var loginMaker = document.getElementById('login');
   check = 'true';
   loginMaker.addEventListener('click', (event) => {
       event.preventDefault()
       const error = document.getElementById('error')
       error.innerHTML = ''
      /* if(user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email'){
        main.innerHTML = formMInfos
       }
       else error.innerHTML = user*/
    })
});

lover.addEventListener('click', function() { 
   console.log('lover :)')
   main.innerHTML= formL
   var loginLover = document.getElementById('login');
   loginLover.addEventListener('click', (event) => { 
       event.preventDefault()
       const error = document.getElementById('error')
       error.innerHTML = ''
      /* if(user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email'){
        main.innerHTML = formLInfos
       }
       else error.innerHTML = user*/
    })
   
});

//#region items
const formL = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign in!</h1>
        <form>
        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="username"
            placeholder="Username" />
        <input 
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="password"
            placeholder="Password" />
            <label class="text-red-500" for="registrationlover" id="error"></label>
            <input type="submit" value="Login" class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="login">
        </form>
   </div>
</div>` 
//#endregion