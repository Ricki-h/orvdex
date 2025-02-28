const api = 'https://orvapi.onrender.com'
const btn_personagens = document.getElementById('mostra-personagens')

btn_personagens.addEventListener('click', async function() {
    const cards = document.getElementById('cards')
    cards.innerHTML = ''
    const quantidade = parseInt(document.getElementById('quantidade').value)
    try {
        let response = await fetch(`${api}/characters`)
        let characters = await response.json()
        if(characters.length == 0) {
            cards.innerHTML = '<h1>Nenhum Personagem encontrado</h1>'
        }

        characters.slice(0, quantidade).forEach(c => {
            let card = `
            <div class="card">
                <div class="imagens">
                    <img src="assets/fogoazul.gif" alt="fuego" class="foguinho"">
                    <img src="${c.img1}" alt="${c.name}1" class="img1">
                    <img src="${c.img2}" alt="${c.name}2" class="img2">
                </div>
                <span style="color: #161E43;">Nome: <b style="color: #5674FF;">${c.name}</b></span>
                <span style="font-size: 16px; color: #161E43;">Raça: ${c.race}</span>
                <span style="font-size: 16px; color: #161E43;">Patrocinador: ${c.constellation}</span>
            </div>
            `
            cards.innerHTML += card
        });
    }
    catch(error) {
        console.error(error);
    };
})