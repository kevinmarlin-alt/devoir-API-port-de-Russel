const newUserBtn = document.getElementById('newUserBtn')
const newUserForm = document.querySelector('form')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const ranges = document.querySelectorAll('tbody tr')
const userForm = document.getElementById('userForm')
const suppBtn = document.querySelector('form input[type="button"]')


ranges.forEach(range => range.addEventListener('click', handleSelectRange))
newUserForm.addEventListener('submit', handleSubmit)
newUserBtn.addEventListener('click', diqplayNewUserForm)
usernameInput.addEventListener('input', checkUsername)
emailInput.addEventListener('focusout', checkEmail)
passwordInput.addEventListener('input', checkPassword)
userForm.addEventListener('submit', handleModifyUser)
suppBtn.addEventListener('click', handleSuppBtn)

function handleSuppBtn() {
    console.log("test")
    const email = document.querySelector("form h2 span").innerHTML
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

function handleModifyUser(e) {
    e.preventDefault()
    
    const playload = {}
    const formData = new FormData(userForm)
    for(let [key, value] of formData) {
        if(value !== "") {
            playload[key] = value
        }
    }
    const email = document.querySelector("form h2 span").innerHTML
    playload["email"] = email
    
    fetch(`/users/${email}`, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
        
    })  
    .catch(err => {
        const infoMessage = document.getElementById('info-userForm')
        infoMessage.innerText = err.message
        setTimeout(() => {
            infoMessage.innerText = ""
            window.location.reload()
        },2000)
        
    })

}

 async function handleSelectRange(e) {
    e.preventDefault()
    const target = e.target
    const rangeParent = target.closest('tr')
    const email = rangeParent.querySelector('td:nth-of-type(2)').innerText
    console.log(email)

   
    fetch(`/users/${email}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('data-username').value = data.user.username
        document.querySelector("form h2 span").innerText = data.user.email

    })
    .catch(err => console.error(err.message))
}

async function handleSubmit(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(newUserForm))

    await fetch(`/users/${playload.email}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    
    window.location.reload()
}

/**
 * 
 * @param {Event} event 
 */
function checkPassword(event) {
    console.log("test")
    const regexSpecial = /[#?!@$%^&*-]/
    const regexUpper = /[A-Z]/
    const regexNumber = /[0-9]/

    const hasSpecial = passwordInput.value.match(regexSpecial)
    const hasUpper = passwordInput.value.match(regexUpper)
    const hasNumber = passwordInput.value.match(regexNumber)
    console.log(hasSpecial, hasUpper)

    const infoMaxChar = event.target.parentNode.querySelector('li:nth-of-type(1)')
    passwordInput.value.length > 8 ? infoMaxChar.style.color = "green" : infoMaxChar.style.color = "black"
    
    const infoHasSpecial = event.target.parentNode.querySelector('li:nth-of-type(2)')
    hasSpecial !== null ? infoHasSpecial.style.color = "green" : infoHasSpecial.style.color = "black"
    
    const infoHasUpper = event.target.parentNode.querySelector('li:nth-of-type(3)')
    hasUpper !== null ? infoHasUpper.style.color = "green" : infoHasUpper.style.color = "black"
    
    const infoHasNumber = event.target.parentNode.querySelector('li:nth-of-type(4)')
    hasNumber !== null ? infoHasNumber.style.color = "green" : infoHasNumber.style.color = "black"

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

function diqplayNewUserForm(e) {
    e.preventDefault()
    const newUserForm = document.querySelector('form')
    newUserForm.style.display = "block"
}


