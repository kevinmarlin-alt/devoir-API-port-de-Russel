const API_URL = '/catways';

const catwaySelect = document.getElementById('catwaySelect');
const reservationsTable = document.getElementById('reservationsTable');
const form = document.getElementById('reservationForm');

let selectedCatway = null;

/* ======================
   CHARGER CATWAYS
====================== */
async function loadCatways() {
    try {
        const res = await fetch(API_URL, { method: "GET" });
        const catways = await res.json();
        console.log("-->>>", catways)
      
        catwaySelect.innerHTML = '';
        catways.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.catwayNumber;
          opt.textContent = `Catway ${c.catwayNumber}`;
          catwaySelect.appendChild(opt);
        });

    } catch (error) {
        document.getElementById('catways-info').innerText = error.message
    }
}

/* ======================
   CHARGER RÉSERVATIONS
====================== */
async function loadReservations() {
  selectedCatway = catwaySelect.value;

  const res = await fetch(`/catways/${selectedCatway}/reservations`, {
    method: "GET"
  });

  const reservations = await res.json();
  reservationsTable.innerHTML = '';

  reservations.forEach(r => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${r.clientName}</td>
      <td>${r.boatName}</td>
      <td>${new Date(r.startDate).toLocaleDateString()}</td>
      <td>${new Date(r.endDate).toLocaleDateString()}</td>
      <td>
        <button onclick="editReservation('${r._id}')">✏️</button>
        <button onclick="deleteReservation('${r._id}')">🗑️</button>
      </td>
    `;

    reservationsTable.appendChild(tr);
  });
}

/* ======================
   SUBMIT FORM
====================== */
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('reservationId').value;

  const data = {
    clientName: clientName.value,
    boatName: boatName.value,
    startDate: startDate.value,
    endDate: endDate.value
  };

  let url = `/catways/${selectedCatway}/reservations`;
  let method = 'POST';

  if (id) {
    url += `/${id}`;
    method = 'PUT';
  }

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  form.reset();
  reservationId.value = '';
  loadReservations();
});

/* ======================
   EDIT
====================== */
async function editReservation(id) {
  const res = await fetch(
    `/catways/${selectedCatway}/reservations/${id}`
  );
  const r = await res.json();
  console.log(r)
  reservationId.value = r._id;
  clientName.value = r.clientName;
  boatName.value = r.boatName;
  startDate.value = r.startDate.split('T')[0];
  endDate.value = r.endDate.split('T')[0];
}

/* ======================
   DELETE
====================== */
async function deleteReservation(id) {
  if (!confirm('Supprimer cette réservation ?')) return;

  await fetch(
    `/catways/${selectedCatway}/reservations/${id}`,
    { method: 'DELETE' }
  );

  loadReservations();
}

document.getElementById('loadReservations').addEventListener('click', loadReservations);

loadCatways();