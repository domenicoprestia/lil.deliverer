let usersArr = localStorage.getItem('users')
console.log(JSON.parse(usersArr))

let logged = sessionStorage.getItem('logged')
console.log(JSON.parse(logged))