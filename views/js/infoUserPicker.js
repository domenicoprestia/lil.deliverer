let loggedUser = JSON.parse(sessionStorage.getItem("logged"))

document.getElementById("name").innerHTML = String(loggedUser.fullname)
document.getElementById("email").innerHTML = String(loggedUser.email)
document.getElementById("username").innerHTML = String(loggedUser.username)
document.getElementById("cardname").innerHTML = String(loggedUser.payment.cardName)

let cardNumber =  String(loggedUser.payment.cardNumber)
let splittedCardNumber = cardNumber.split('') 

if(cardNumber.length == 13){
    cardNumber = "**********" + splittedCardNumber[10] + splittedCardNumber[11] + splittedCardNumber[12]     
}
else{
    cardNumber = "*************" + splittedCardNumber[13] + splittedCardNumber[14] + splittedCardNumber[15]
}

document.getElementById("cardnumber").innerHTML = cardNumber

let position = String(loggedUser.address.position)
let positionSplitted = position.split(',')

document.getElementById("town").innerHTML = positionSplitted[1] + ", " + positionSplitted[2] + ", " + positionSplitted[3]

positionSplitted.splice(1, 3)

let arrayUnito = positionSplitted.join(',')

console.log(arrayUnito)

document.getElementById("address").innerHTML = arrayUnito + ", " + loggedUser.address.civic

