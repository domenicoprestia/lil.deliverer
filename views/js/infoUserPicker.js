let loggedUser = JSON.parse(sessionStorage.getItem("logged"))


document.getElementById("name").innerHTML = String(loggedUser.fullname)
document.getElementById("email").innerHTML = String(loggedUser.email)
document.getElementById("username").innerHTML = String(loggedUser.username)
document.getElementById("cardname").innerHTML = String(loggedUser.payment.cardName)
document.getElementById("cardnumber").innerHTML = String(loggedUser.fullname)