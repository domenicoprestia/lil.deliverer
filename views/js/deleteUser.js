let del = document.getElementById("deleteAccount")

del.addEventListener("click", () => {
    var confermation = confirm("do you really want to delete your account?")

    if(confermation){
        usersArr = JSON.parse(localStorage.getItem("users"))
        currentUsers = JSON.parse(sessionStorage.getItem("logged"))
        usersArr.forEach((user, index) => {if(user.username == currentUsers.username) usersArr.splice(index, 1)})
        localStorage.setItem("users", JSON.stringify(usersArr))
        sessionStorage.removeItem("logged")
        location.replace("../index.html")
    }
})

    