let catwayNumberSelected = null

const newCatwayBtn = document.querySelector('.newCatway-js')
const ranges = document.querySelectorAll('tbody tr')
const deleteBtn = document.querySelector('#catwaysForm input[type="button"]')
const catwaysForm = document.querySelector('#catwaysForm')
const info = document.querySelector('#info-catwaysForm')
const createCatwayForm = document.getElementById('createCatwayForm')

newCatwayBtn.addEventListener('click', displayNewCatwayForm)
ranges.forEach(range => range.addEventListener('click', handleClickRange))
deleteBtn.addEventListener('click', handleDeleteBtn)
catwaysForm.addEventListener('submit', handleSubmit)
createCatwayForm.addEventListener('submit', handleSubmitcreateCatway)


function displayNewCatwayForm() {
    const newCatwayForm = document.querySelector('.newCatwayForm')
    
    newCatwayForm.toggleAttribute("hidden")
    const values = document.querySelectorAll("tbody td:first-child")
    let max = 0
    for(let i = 0; i < values.length; i++) {
        const value = parseInt(values[i].innerText)
        if(value > max) {
            max = value
        }
    }
    
    if(newCatwayForm.hasAttribute("hidden")) {
        newCatwayBtn.textContent = 'Ajouter un nouveau Catway'
        
    } else {
        newCatwayForm.querySelector('#createCatwayNumber').value = max + 1
        newCatwayBtn.textContent = 'Masquer le formulaire'
    }
}


function handleClickRange(e) {
    const target = e.target
    catwayNumberSelected = Number.parseInt(target.closest('tr').querySelector('td:nth-of-type(1)').innerText)

    const catwayForm = document.querySelector('.catwayForm')
    if(catwayForm.hasAttribute('hidden')) catwayForm.removeAttribute('hidden')

    fetch(`/catways/${catwayNumberSelected}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('.card h3 span').innerText = data.catwayNumber
        document.querySelector('#catwayStateUpdate').value = data.catwayState
    })
    .catch(err => {
        console.error(err)
        info.innerText = err.message 
    })
}

function handleDeleteBtn() {

    fetch(`/catways/${catwayNumberSelected}`, {
        method: "DELETE"
    })
    .then(window.location.reload())
    .catch(err => {
        console.error(err)
        info.innerText = err.message 
    })
}

function handleSubmitcreateCatway(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(createCatwayForm))
    playload.catwayNumber = playload.catwayNumber
    console.log(playload)

    fetch(`/catways`,{ 
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    .then(window.location.reload())
    .catch(err => info.innerText = err.message )
 
}


function handleSubmit(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(catwaysForm))

    fetch(`/catways/${catwayNumberSelected}`,{ 
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    .then(window.location.reload())
    .catch(err => info.innerText = err.message )
}