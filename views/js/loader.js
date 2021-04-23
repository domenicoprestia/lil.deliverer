document.addEventListener('DOMContentLoaded', async event => {
  
   let registeredUsers = []
   
  if(localStorage.getItem("users") !== null){
       registeredUsers = (JSON.parse(localStorage.getItem('users')))
   }
   console.log(registeredUsers);

   
   const usersArr = []

    await fetch('data/users.json').then(response => response.json()).then(data => { 
        data.users.forEach(user => {user.maker = false; usersArr.push(user)})})

    await fetch('data/makers.json').then(response => response.json()).then(data => {
        data.makers.forEach(maker => {maker.maker = true; usersArr.push(maker)})})

        
        registeredUsers.forEach(user => {usersArr.forEach((userF, index) => {if(user.username == userF.username) usersArr.splice(index, 1)})})

        if(usersArr.length > 0) usersArr.forEach(user => {registeredUsers.push(user)})
       
        localStorage.setItem('users', JSON.stringify(registeredUsers))
        
})