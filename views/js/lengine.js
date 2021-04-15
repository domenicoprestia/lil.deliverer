const maker = document.getElementById('food-maker');
const lover = document.getElementById('food-lover');
const main = document.getElementById('main');
var checkMaker = false;
let userLog



maker.addEventListener('click', function() {
   console.log('maker :)')

   main.innerHTML= form
   var loginMaker = document.getElementById('login');
   checkMaker = true;
   loginMaker.addEventListener('click', (event) => {
       event.preventDefault()
       let checkLog = loginHandler()
       console.log(checkLog)
       if(checkLog){
            storeLog(userLog)
            window.location.replace("../main/main.html")
        }
        else{
            document.getElementById("error").innerHTML = "Incorrect username or password"
        }

    })
});

lover.addEventListener('click', function() { 
   console.log('lover :)')
   
   main.innerHTML= form
   var loginLover = document.getElementById('login');
   loginLover.addEventListener('click', (event) => { 
       event.preventDefault()
       let checkLog = loginHandler()

      if(checkLog){
           storeLog(userLog)
           window.location.replace("../main/main.html")
       }
       else{
           document.getElementById("error").innerHTML = "Incorrect username or password"
       } 

    })
   
});

//#region functions

async function storeLog(user){
    sessionStorage.setItem('logged', JSON.stringify(user))
}

function loginHandler(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let checkLog = false

    
    let userArr = JSON.parse(localStorage.getItem("users"))

    if(userArr){
        userArr.forEach(user => {
            if(user.username == String(username) && user.password == String(password) && user.maker == checkMaker){
            userLog = user
            checkLog = true
            }
        })
        return checkLog
    }
}

//#endregion


//#region items
const form = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign in!</h1>
        <form>
        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="username"
            placeholder="username"/>
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