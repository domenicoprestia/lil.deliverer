let loggedUser = JSON.parse(sessionStorage.getItem("logged"))

var exists = document.getElementById("modifyPartOne") 

var oldUsername = loggedUser.username


if(exists){
    document.getElementById("username").value = String(loggedUser.username)
    document.getElementById("fullname").value = String(loggedUser.fullname)
    document.getElementById("email").value = String(loggedUser.email)
    document.getElementById("password").value = String(loggedUser.password)
    document.getElementById("confirm_password").value = String(loggedUser.password)
}

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

async function storeLog(user){
    sessionStorage.setItem('logged', JSON.stringify(user))
}

async function storeUser(user){
    let usersArr 
    if(localStorage.getItem('users') === null){
            usersArr = [];
    }else{
        usersArr = JSON.parse(localStorage.getItem('users'))     //converte da json a js object
    }
    
   usersArr.forEach((user, index) => 
   {
        console.log(user.username)
        if(user.username == oldUsername){
            usersArr.splice(index, 1)
        } 
    })
   
    usersArr.push(user)
    localStorage.setItem('users', JSON.stringify(usersArr))     //converte da js object a json 
}

let modifyButton = document.getElementById("modifylover")

modifyButton.addEventListener('click', () => {

    
    event.preventDefault()
    check = false
    userm = validatorProfile()
    const error = document.getElementById('error')
    error.innerHTML = ''
    if (userm != 'check your password, it must be the same of confirm password and at least 8 char long' && userm != 'insert valid username and email' && userm != 'This username already exists') {
        main.innerHTML = formLInfos
        
        document.getElementById("address").value = String(loggedUser.address.position)
        document.getElementById("civic").value = String(loggedUser.address.civic)
        document.getElementById("cardName").value = String(loggedUser.payment.cardName)
        document.getElementById("cardNumber").value = String(loggedUser.payment.cardNumber)
        document.getElementById("cardCvv").value = String(loggedUser.payment.cardCvv)
            
        addressMaps();

            registrationLover = document.getElementById('registrationlover2')
            registrationLover.addEventListener('click', async event => {
                event.preventDefault()
                await validatorLover(userm)
                if(userm.address.position){
                await storeUser(userm)
                await storeLog(userm)
                window.location.replace('../main/main.html')
            }
            })
        } else error.innerHTML = userm
    })     

    
    function validatorProfile() {
        let username = document.getElementById('username').value
        let fullname = document.getElementById('fullname').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let confirmed_password = document.getElementById('confirm_password').value
       //let usersArr = JSON.parse(localStorage.getItem('users'))
        
            if (username.length > 3 && fullname.length > 3 && email.includes('@')) {
                if (password.length >= 8 && password == confirmed_password) {
                    return userm = {
                        username: username,
                        fullname: fullname,
                        email: email,
                        password: password,
                        maker: check,
                        payment: {},
                        address: {coordinate: {}},
                        privacy: {
                            offerte_personalizzate: document.getElementById('advertisement').checked,
                            consenso_privacy: document.getElementById('privacy').checked
                        }
                    }
                } else { return 'check your password, it must be the same of confirm password and at least 8 char long' }
            } else { return 'insert valid username and email' }
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

const formLInfos = `<div class="bg-grey-lighter min-h-screen flex flex-col" style="width: 500px;">
<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up food-lover!</h1>
        <form>
        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="address"
            placeholder="new Address" />

            <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="civic"
            placeholder="new civic number" />

        <input 
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            id="cardNumber"
            placeholder="new Card number" />
            <input 
                type="text"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                id="cardCvv"
                placeholder="new cvv" />
                <input 
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    id="cardName"
                    placeholder="new Name on the card" />

                
            

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