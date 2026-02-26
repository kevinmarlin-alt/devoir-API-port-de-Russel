
/* Liste des utilisateurs */ 
const newUserBtn = document.getElementById('newUserBtn')
newUserBtn.addEventListener('click', diqplayNewUserForm)

function diqplayNewUserForm(e) {
    e.preventDefault()
    const newUserCard = document.querySelector('.newUserForm')
    newUserCard.toggleAttribute('hidden')

    if(newUserCard.hasAttribute("hidden")) {
        newUserBtn.textContent = 'Ajouter un utilisateur'
        
    } else {
        newUserBtn.textContent = 'Masquer le formulaire'
    }
}

const ranges = document.querySelectorAll('tbody tr')
ranges.forEach(range => range.addEventListener('click', handleSelectRange))

 async function handleSelectRange(e) {
    const target = e.target
    const rangeParent = target.closest('tr')
    const email = rangeParent.querySelector('td:nth-of-type(2)').innerText

    const userForm = document.querySelector('.userForm')
    if(userForm.hasAttribute('hidden')) userForm.removeAttribute('hidden')

   
    fetch(`/users/${email}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('data-username').value = data.username
        document.querySelector("h3 span").innerText = data.email

    })
    .catch(err => console.error(err.message))
}

/* Formulaire de création d'un utilisteur */ 
const createUserForm = document.querySelector('#createUserForm')
const usernameInput = document.getElementById('usernameCreate')
const emailInput = document.getElementById('emailCreate')
const passwordInput = document.getElementById('passwordCreate')

createUserForm.addEventListener('submit', handleSubmit)
usernameInput.addEventListener('input', checkUsername)
emailInput.addEventListener('focusout', checkEmail)
passwordInput.addEventListener('input', checkPassword)


function handleSubmit(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(createUserForm))

    fetch(`/users/${playload.email}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    .then(window.location.reload())
        
}

function checkUsername(event) {
    const regex = /[0-9]/
    const containNumber = usernameInput.value.match(regex)
    const info = event.target.parentNode.querySelector('p')
    
    if(containNumber !== null) {
        info.style.display = "block"
    } else {
        info.style.display = "none"
    }

}  

function checkEmail(event) {
    const regex = /^[a-zA-Z0-9._%+-]+@russell-port\.fr$/
    const containNumber = emailInput.value.match(regex)
    const info = event.target.parentNode.querySelector('p')
    
    if(containNumber === null) {
        info.style.display = "block"
    } else {
        info.style.display = "none"
    }
}

/**
 * 
 * @param {Event} event 
 */
function checkPassword(event) {

    const input = event.target
    const regexSpecial = /[#?!@$%^&*-]/
    const regexUpper = /[A-Z]/
    const regexNumber = /[0-9]/

    const hasSpecial = input.value.match(regexSpecial)
    const hasUpper = input.value.match(regexUpper)
    const hasNumber = input.value.match(regexNumber)

    const infoMaxChar = event.target.parentNode.querySelector('li:nth-of-type(1)')
    input.value.length > 8 ? infoMaxChar.style.color = "green" : infoMaxChar.style.color = "black"
    
    const infoHasSpecial = event.target.parentNode.querySelector('li:nth-of-type(2)')
    hasSpecial !== null ? infoHasSpecial.style.color = "green" : infoHasSpecial.style.color = "black"
    
    const infoHasUpper = event.target.parentNode.querySelector('li:nth-of-type(3)')
    hasUpper !== null ? infoHasUpper.style.color = "green" : infoHasUpper.style.color = "black"
    
    const infoHasNumber = event.target.parentNode.querySelector('li:nth-of-type(4)')
    hasNumber !== null ? infoHasNumber.style.color = "green" : infoHasNumber.style.color = "black"

}

/* Formulaire d'information d'un utilisateur */
const userForm = document.getElementById('userForm')
const suppBtn = document.querySelector('form input[type="button"]')
const passwordInputUser = userForm.querySelector('form input[type="password"]')

userForm.addEventListener('submit', handleModifyUser)
suppBtn.addEventListener('click', handleSuppBtn)
passwordInputUser.addEventListener('input', checkPassword)


function handleModifyUser(e) {
    e.preventDefault()
    
    const playload = {}
    const formData = new FormData(userForm)
    for(let [key, value] of formData) {
        if(value !== "") {
            playload[key] = value
        }
    }
    const email = document.querySelector('.card-header span')
    playload["email"] = email.innerText

    fetch(`/users`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
        
    })  
    .then(res => res.json())
    .then(data => {
        const infoMessage = document.getElementById('info-userForm')
        infoMessage.innerText = "Modification enregistré"
        setTimeout(() => {
            infoMessage.innerText = ""
            window.location.reload()
        },2000)
    })

}

function handleSuppBtn() {
    const email = document.querySelector("h3 span").innerHTML
    fetch(`/users/${email}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        const infoMessage = document.getElementById('info-userForm')
        infoMessage.innerText = data.message
        setTimeout(() => {
            infoMessage.innerText = ""
            window.location.reload()
        },2000)
    })
}