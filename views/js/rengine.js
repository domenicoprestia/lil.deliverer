const maker = document.getElementById('food-maker');
const lover = document.getElementById('food-lover');
const main = document.getElementById('main');
var check = false;

function addressMaps(){
    //#region mapsApi

        
    let autocomplete;
    let address;

    function initAutocomplete() {
    address = document.querySelector("#address");

    autocomplete = new google.maps.places.Autocomplete(address, {
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    address.focus();
    
    autocomplete.addListener("place_changed", fillInAddress);
    }

    function fillInAddress() {
    
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";

    
    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
        case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
        }

        case "route": {
            address1 += component.short_name;
            break;
        }

        case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
        }

        case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
        }
        case "locality":
            address1 += component.long_name;
            break;

        case "administrative_area_level_1": {
            address1 += component.short_name;
            break;
        }
        case "country":
            address1 += component.long_name;
            break;
        }
    }
    
    }
        initAutocomplete();
        //#endregion
}

maker.addEventListener('click', function() {
    console.log('maker :)')
    main.innerHTML = formM;
    var registrationMaker = document.getElementById('registrationmaker');
    check = true;
    registrationMaker.addEventListener('click', (event) => {
        event.preventDefault()
        user = validatorProfile()
        const error = document.getElementById('error')
        error.innerHTML = ''
        if (user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email' && user != 'This username already exists') {
            main.innerHTML = formMInfos

            addressMaps();

            registrationMaker = document.getElementById('registrationmaker2')
            registrationMaker.addEventListener('click', async event => {
                event.preventDefault()
                validatorMaker(user)
                await validatorMaker(user)
                if(user.restaurant.restaurantLocation){
                await storeUser(user)
                window.location.replace('../main/main.html')
            }

            })
        } else error.innerHTML = user
    })
});

lover.addEventListener('click', function() {
    console.log('lover :)')
    main.innerHTML = formL
    var registrationLover = document.getElementById('registrationlover');
    registrationLover.addEventListener('click', event => {
        event.preventDefault()
        user = validatorProfile()
        const error = document.getElementById('error')
        error.innerHTML = ''
        if (user != 'check your password, it must be the same of confirm password and at least 8 char long' && user != 'insert valid username and email' && user != 'This username already exists') {
            main.innerHTML = formLInfos

            addressMaps();

            registrationLover = document.getElementById('registrationlover2')
            registrationLover.addEventListener('click', async event => {
                event.preventDefault()
                await validatorLover(user)
                if(user.address.position){
                await storeUser(user)
                window.location.replace('../main/main.html')
            }
            })
        } else error.innerHTML = user
    })

});


//#region functions
function storeUser(user){
    let usersArr 
    if(localStorage.getItem('users') === null){
        usersArr = [];
    }else{
        usersArr = JSON.parse(localStorage.getItem('users'))     //converte da json a js object
    }

    usersArr.push(user)
    localStorage.setItem('users', JSON.stringify(usersArr))     //converte da js object a json 
}

function validatorProfile() {
    let username = document.getElementById('username').value
    let fullname = document.getElementById('fullname').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let confirmed_password = document.getElementById('confirm_password').value
    let usersArr = JSON.parse(localStorage.getItem('users'))
    let same = false
    
    usersArr.map(utente => {if(utente.username == String(username)) {same = true} })

    if(!same){
    if (username.length > 3 && fullname.length > 3 && email.includes('@')) {
        if (password.length >= 8 && password == confirmed_password) {
            if (!check) {
                return user = {
                    username: username,
                    fullname: fullname,
                    email: email,
                    password: password,
                    maker: check,
                    payment: {},
                    address: {}
                }
            }

            if (check) {
                return user = {
                    username: username,
                    fullname: fullname,
                    email: email,
                    password: password,
                    maker: check,
                    restaurant: {},
                }
            }

        } else { return 'check your password, it must be the same of confirm password and at least 8 char long' }
    } else { return 'insert valid username and email' }
}else {return 'This username already exists'}
}

async function validatorLover(user) {
    const error = document.getElementById('errorL2')
    const cardNumber = document.getElementById('cardNumber').value
    const cardCvv = document.getElementById('cardCvv').value
    const cardName = document.getElementById('cardName').value
    const position = document.getElementById('address').value
    const civic = document.getElementById('civic').value
    

    if (position && cardNumber && cardCvv && cardName && civic) {
        if (Number(cardNumber.length) <= 16 && Number(cardNumber.length) >= 13 && Number(cardCvv.length) == 3) {
            user.payment.cardNumber = cardNumber
            user.payment.cardCvv = cardCvv
            user.payment.cardName = cardName
            user.address.position = position 
            user.address.civic = civic

        } else { error.innerHTML = 'Please fill every single field correctly' }
    } else { error.innerHTML = 'Please fill every single field' }
}

async function validatorMaker() {
    const error = document.getElementById('errorM2')
    const restaurantName = document.getElementById('restaurantName').value
    const restaurantDescription = document.getElementById('restaurantDescription').value
    const restaurantLocation = document.getElementById('address').value

    if (restaurantName && Number(restaurantName.length) > 3 && restaurantDescription && Number(restaurantDescription.length) > 10 && Number(restaurantDescription.length) < 256 && restaurantLocation) {
        user.restaurant.restaurantName = restaurantName
        user.restaurant.restaurantDescription = restaurantDescription
        user.restaurant.restaurantLocation = restaurantLocation
        
    } else { error.innerHTML = 'Please fill every single field properly' }
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

const formMInfos = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up food-maker!</h1>
        <form>
        <input 
        type="text"
        class="block border border-grey-light w-full p-3 rounded mb-4"
        id="restaurantName"
        placeholder="Restaurant name" />

        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="restaurantDescription"
            placeholder="Restaurant description" />

        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="address"
            placeholder="Restaurant location" />


            <label class="text-red-500" for="registrationlover2" id="errorM2"></label>
            <input type="submit" value="Proceed" class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationmaker2">
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

const formLInfos = `<div class="bg-grey-lighter min-h-screen flex flex-col wrapper-registration" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up food-lover!</h1>
        <form>
        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="address"
            placeholder="Address" />

            <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="civic"
            placeholder="civic number" />

        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="cardNumber"
            placeholder="Card number" />
            <input 
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                id="cardCvv"
                placeholder="cvv" />
                <input 
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    id="cardName"
                    placeholder="Name on the card" />


            <label class="text-red-500" for="registrationlover2" id="errorL2"></label>
            <input type="submit" value="Proceed" class="btn text-black text-2xl bg-purple-600 border-purple-900 hover:bg-white hover:border-purple-600 cursor-pointer" style="width: 246px;" id="registrationlover2">
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

//#endregion