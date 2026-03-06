const form = document.querySelector('form')
const info = document.querySelector('.info-js')

form.addEventListener("submit", handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    info.textContent = ""

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
        const res = await fetch('/api/login', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        const result = await res.json()

        if(!res.ok) {
            info.textContent = result.message
            return
        }

        window.location.href = "/dashboard"



    } catch (error) {
        console.error(error)
        info.textContent = "Erreur serveur, réessayez plus tard"
    }
}