let logout = document.getElementById("logout")

logout.addEventListener("click", () => {
    sessionStorage.removeItem("logged");
})