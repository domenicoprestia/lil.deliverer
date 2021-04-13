document.addEventListener('DOMContentLoaded', async event => {
  
   const currentUsers = JSON.parse(localStorage.getItem('users'))
   
   const usersArr= []

   console.log(currentUsers)

    await fetch('../data/users.json').then(response => response.json()).then(data => {
        data.users.forEach(user => {user.maker = false; usersArr.push(user)})})

    await fetch('../data/makers.json').then(response => response.json()).then(data => {
        data.makers.forEach(maker => {maker.maker = true; usersArr.push(maker)})})

    currentUsers.forEach(user => {usersArr.forEach((userF, index) => {if(user.username == userF.username) usersArr.splice(index, 1)})})

    console.log(currentUsers)

    if(usersArr.length > 0) usersArr.forEach(user => {currentUsers.push(user)})

    localStorage.setItem('users', JSON.stringify(currentUsers))
})