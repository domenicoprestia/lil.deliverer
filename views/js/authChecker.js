const user = sessionStorage.getItem('logged')

if(!user){
   window.location.replace('../index.html')
}