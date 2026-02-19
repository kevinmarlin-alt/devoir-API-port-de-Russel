let catwaySelected = {
    catwayNumber: null,
    catwayType: null,
    catwayState: null
}

const ranges = document.querySelectorAll('tbody tr')
const catwaysForm = document.querySelector('#catwaysForm')
const info = document.querySelector('#info-catwaysForm')
const createCatwayForm = document.getElementById('createCatwayForm')
const deleteBtn = document.querySelector('#catwaysForm input[type="button"]')



ranges.forEach(range => range.addEventListener('click', handleClickRange))
catwaysForm.addEventListener('submit', handleSubmit)
createCatwayForm.addEventListener('submit', handleSubmitcreateCatway)
deleteBtn.addEventListener('click', handleDeleteBtn)

function handleDeleteBtn() {

    fetch(`/catways/${catwaySelected.catwayNumber}`, {
        method: "DELETE"
    })
    .then(window.location.reload())
    .catch(err => info.innerText = err.message )
}

function handleSubmitcreateCatway(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(createCatwayForm))
    playload.catwayNumber = Number.parseInt(playload.catwayNumber)
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

    fetch(`/catways/${catwaySelected.catwayNumber}`,{ 
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    .then(window.location.reload())
    .catch(err => info.innerText = err.message )

    
}

function handleClickRange(e) {
    const target = e.target
    catwaySelected.catwayNumber = Number.parseInt(target.closest('tr').querySelector('td:nth-of-type(1)').innerText)

    fetch(`/catways/${catwaySelected.catwayNumber}`, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('h2 span').innerText = data.catwayNumber
        const select = document.querySelector('select')
        for(let opt of select.options) {
            if(opt.value === data.catwayType) {
                opt.selected = true
            }
        }
   
        document.getElementById('catwayState').value = data.catwayState

    })
    .catch(err => info.innerText = err.message )

}