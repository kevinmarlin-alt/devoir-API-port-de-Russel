const catwaySelect = document.getElementById('catwaySelect');
//const form = document.getElementById('reservationForm');

/* ======================
   CHARGER CATWAYS
====================== */
async function loadCatways() {
    
  const res = await fetch('/catways/all', { method: "GET" });
  const catways = await res.json();

  catwaySelect.innerHTML = '';
  catways.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.catwayNumber;
    opt.textContent = `Catway ${c.catwayNumber}`;
    catwaySelect.appendChild(opt);
  });

 
}

const loadResaBtn = document.getElementById('loadReservations')
const resaCard = document.querySelector('.resaCard')
const newResaBtn = document.querySelector('.newResa-js')
const newResaCard = document.querySelector('.newResaCard')
const newResaForm = document.querySelector('#newResaForm')

newResaBtn.addEventListener('click', handleDisplayNewResaForm)
newResaForm.addEventListener('submit', handleSubmitNewResaForm)
loadResaBtn.addEventListener('click', loadReservations);
let selectedCatway = null;



function handleSubmitNewResaForm(e) {
  e.preventDefault()
  const playload = Object.fromEntries(new FormData(newResaForm))
  playload.catwayNumber = selectedCatway
  console.log(playload)

  fetch(`/catways/${selectedCatway}/reservations`, {
    method: "POST",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(playload)
  })
  .then(window.location.reload())
  .catch(err => document.querySelector('.info-newResa').innerText = "Erreur lors de la création de la réservation.")
  
}

function handleDisplayNewResaForm(e) {
  e.preventDefault()

  newResaCard.toggleAttribute('hidden')
  newResaCard.hasAttribute('hidden') ? 
    newResaBtn.innerText = "Ajouter une nouvelle réservation" :
    newResaBtn.innerText = "Masquer le formulaire" 

}

/* ======================
   CHARGER RÉSERVATIONS
====================== */
async function loadReservations() {

  const cardHeader = document.querySelector('.card-header')
  
  resaCard.setAttribute('hidden', "")
  newResaCard.setAttribute('hidden', "")
  
  newResaBtn.innerText = "Ajouter une nouvelle réservation"
  
  selectedCatway = catwaySelect.value;
  cardHeader.innerHTML = `CATWAY n° ${selectedCatway}`
  
  const res = await fetch(`/catways/${selectedCatway}/reservations`, {
    method: "GET"
  });
  
  const reservations = await res.json();
  
  const table = document.querySelector('table')
  const infoResa = document.querySelector('#info-resa')
  const reservationsTable = document.getElementById('reservationsTable');

  if(reservations.length > 0) {
    table.removeAttribute('hidden')
    infoResa.innerText = ""
    reservationsTable.innerHTML = '';

    reservations.forEach(r => {
      const tr = document.createElement('tr');
      
      tr.setAttribute('id', `${r._id}`)
      tr.innerHTML = `
        <td>${r.clientName}</td>
        <td>${r.boatName}</td>
        <td>${new Date(r.startDate).toLocaleDateString()}</td>
        <td>${new Date(r.endDate).toLocaleDateString()}</td>
      `;

      reservationsTable.appendChild(tr);
    });

    const ranges = table.querySelectorAll('tbody tr')
    ranges.forEach(range => range.addEventListener('click', handleDisplayResaInfo))

  } else {
    reservationsTable.innerHTML = '';
    infoResa.innerText = "Aucune réservation pour le momment."
    table.setAttribute('hidden', "")
    resaCard.setAttribute('hidden', "")
  }

}

const resaForm = document.getElementById('resaForm')
const resaFormDelete = document.getElementById('resaFormDelete')
resaForm.addEventListener('submit', handleSubmitResaForm)

resaFormDelete.addEventListener('click', handleDeleteResa)


let resaSelected = null
function handleDisplayResaInfo(e) {
  const target = e.target
  resaSelected = target.closest('tr').getAttribute('id')
  

  if(resaCard.hasAttribute('hidden')) resaCard.removeAttribute('hidden')

  fetch(`/catways/${selectedCatway}/reservations/${resaSelected}`, {
    method: "GET"
  })
  .then(res => res.json())
  .then(data => {
    

    resaForm.querySelector('#reservationId').value = data._id
    resaForm.querySelector('#clientNameUpdate').value = data.clientName
    resaForm.querySelector('#boatNameUpdate').value = data.boatName
    resaForm.querySelector('#startDateUpdate').value = data.startDate.split('T')[0]
    resaForm.querySelector('#endDateUpdate').value = data.endDate.split('T')[0]

  })
}

function handleSubmitResaForm(e) {
  e.preventDefault()
  const playload = Object.fromEntries(new FormData(resaForm))
  console.log(`/catways/${selectedCatway}/reservations/${resaSelected}`)
  
  fetch(`/catways/${selectedCatway}/reservations/${resaSelected}`, {
    method: "PUT",
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(playload)
  })
  .then(window.location.reload())
  .catch(err => document.querySelector('.info-newResa').innerText = "Erreur lors de la création de la réservation.")
  
}

function handleDeleteResa() {

  fetch(`/catways/${selectedCatway}/reservations/${resaSelected}`, {
    method: "DELETE"
  })
  .then(window.location.reload())
  
}

loadCatways();