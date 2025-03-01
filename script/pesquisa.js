const api = 'https://orvapi.onrender.com'
const search = document.getElementById('search')
const buscar = document.getElementById('busca')

let characters = []
let characters_filtro = []

buscar.addEventListener('click', async function() {
    const cards = document.getElementById('cards')
    cards.innerHTML = ''
    try {
        let response = await fetch(`${api}/characters`)
        characters = await response.json()
        if(characters.length == 0) {
            cards.innerHTML = '<h1>Nenhum Personagem encontrado</h1>'
        }
        const pesquisa = search.value.toLowerCase()
        characters_filtro = characters.filter(c => c.name.toLowerCase().includes(pesquisa))
        renderpesquisa()
    }
    catch(error) {
        console.error(error);
    };
})
buscar.addEventListener('input', function() {
    const pesquisa = search.value.toLowerCase()
    characters_filtro = characters.filter(c => c.name.toLowerCase().includes(pesquisa))
    renderpesquisa()
})
function renderpesquisa() {
    const cards = document.getElementById('cards')
    cards.innerHTML = ''
    const pesquisa = search.value.toLowerCase()
    characters_filtro = characters.filter(c => c.name.toLowerCase().includes(pesquisa))
    characters_filtro.forEach(c => {
        let card = `
        <div class="card" onclick="window.location.href='detalhes.html?id=${c.id}'">
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
    })
}