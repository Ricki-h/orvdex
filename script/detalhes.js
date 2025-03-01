const api = 'https://orvapi.onrender.com'
const params = new URLSearchParams(window.location.search)
const character_id = params.get('id')   

const detalhes = document.getElementById('detalhes-character')

async function fetchcharacter() {
    if(!character_id) {
        detalhes.innerHTML = '<h1>Personagem não encontrado</h1>'
        return
    }

    try {
        let response = await fetch(`${api}/characters/${character_id}`)
        let character = await response.json()

        if(!character.name) {
            detalhes.innerHTML = '<h1>Personagem não encontrado</h1>'
            return
        }

        detalhes.innerHTML = `
        <div id="card2">
            <img src="${character.img1}" alt="${character.name}1">
            <div id="textos">
                <h1>Nome: <b style="color: #5674FF;">${character.name}</b></h1>
                <p><strong>Raça:</strong> ${character.race}</p>
                <p><strong>Patrocinador:</strong> ${character.constellation}</p>
                <p><strong>Descrição:</strong> ${character.description}</p>
            </div>
        </div>`
    }
    catch (error) {
        console.error(error);
        detalhes.innerHTML = '<h1>Erro ao carregar os detalhes.</h1>';
    }
}

window.onload = fetchcharacter()