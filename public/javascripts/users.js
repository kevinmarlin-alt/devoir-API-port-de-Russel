
console.log("hello world !")
const newUserBtn = document.getElementById('newUserBtn')

const newUserForm = document.querySelector('form')

const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

const ranges = document.querySelectorAll('tbody a')
console.log(ranges)
ranges.forEach(range => range.addEventListener('click', handleSelectRange))




newUserForm.addEventListener('submit', async(e) =>  {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(newUserForm))
    console.log("Submit", playload.email)

    //const response = await fetch(`/users`, {
    //    method: "GET"
    //})
    //if(response.ok) {
    //    console.log(response)
    //    
    //}

    await fetch(`/users/${playload.email}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    
    window.location.reload()

})
newUserBtn.addEventListener('click', diqplayNewUserForm)
usernameInput.addEventListener('input', checkUsername)
emailInput.addEventListener('focusout', checkEmail)
passwordInput.addEventListener('input', checkPassword)

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


async function handleSelectRange(e) {
    //e.preventDefault()
    const target = e.target
    const rangeParent = target.closest('tr')
    const email = rangeParent.querySelector('td:nth-of-type(2)').innerText
    console.log(email)

    try {
        const response = await fetch(`/users/${email}`, {
            method: 'GET'
        })



    } catch (error) {
        console.log(error.message)
    }

    return

  

}