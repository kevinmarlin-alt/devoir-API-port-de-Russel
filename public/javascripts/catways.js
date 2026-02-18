let catwaySelected = {
    catwayNumber: null,
    catwayType: null,
    catwayState: null
}

const ranges = document.querySelectorAll('tbody tr')
const form = document.querySelector('form')
const info = document.querySelector('#info-catwaysForm')


ranges.forEach(range => range.addEventListener('click', handleClickRange))
form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    const playload = Object.fromEntries(new FormData(form))

    fetch(`/catways/${catwaySelected.catwayNumber}`,{ 
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(playload)
    })
    .catch(err => info.innerText = err.message )

    window.location.reload()
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