const maker = document.getElementById('food-maker');
const lover = document.getElementById('food-lover');
const main = document.getElementById('main');
var check = 'false';

maker.addEventListener('click', function() {
   console.log('maker :)')
   main.innerHTML= formM;
   var registrationMaker = document.getElementById('registrationmaker');
   check = 'true';
   registrationMaker.addEventListener('click', (event) => {
       event.preventDefault()
       user = validator()
       const error = document.getElementById('error')
       error.innerHTML = ''
       if(user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email'){

       }
       else error.innerHTML = user
    })
});

lover.addEventListener('click', function() { 
   console.log('lover :)')
   main.innerHTML= formL
   var registrationLover = document.getElementById('registrationlover');
   registrationLover.addEventListener('click', (event) => { 
       event.preventDefault()
       user = validator()
       const error = document.getElementById('error')
       error.innerHTML = ''
       if(user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email'){

       }
       else error.innerHTML = user
    })
   
});


//#region functions
function validator(){
    console.log('aaaa')
    let username = document.getElementById('username').value
    let fullname = document.getElementById('fullname').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let confirmed_password = document.getElementById('confirm_password').value
    if(username.length > 3 && fullname.length > 3 && email.includes('@')){
        if(password.length >= 8 && password == confirmed_password)
        {
            return user = {
            username : username,             
            fullname : fullname,
            email : email,
            password : password,
            maker : check
            }
        }else{return 'check your password, it must be the same of confirm password and at least 8 char long'}
    }else{return 'insert valid username and email'}
}

function openDB(type){
    console.log('trying...')
    var db
    var DBOpenRequest = window.indexedDB.open('lil.deliverer', 4)
    DBOpenRequest.onerror = () => {
    }

    DBOpenRequest.onsuccess = () => {
        db = DBOpenRequest.result
    }
}
//#endregion
//#region items 
const formL = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up food-lover!</h1>
        <form>
        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="username"
            placeholder="Username" />
        
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
            <label class="text-red-500" for="registrationlover" id="error"></label>
            <input type="submit" value="Register" class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationlover">
        </form>
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

const formM = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up food-maker!</h1>
        <form>
        <input 
        type="text"
        class="block border border-grey-light w-full p-3 rounded mb-4"
        id="username"
        placeholder="Username" />

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
            <label class="text-red-500" for="registrationmaker" id="error"></label>
            <input type="submit" value="Register" class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationmaker">
        </form>
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
        <a class="no-underline border-b border-blue text-blue hover:text-purple-600" href="./login.html">
            Log in
        </a>.
    </div>
</div>
</div>`

const formP = ``
//#endregion