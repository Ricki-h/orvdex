const api = 'https://orvapi.onrender.com'
const btn_personagens = document.getElementById('mostra-personagens')

let page_atual = 1
let characters = []
let quantidade = 3

btn_personagens.addEventListener('click', async function() {
    const cards = document.getElementById('cards')
    const paginas = document.getElementById('pages')
    cards.innerHTML = ''
    quantidade = parseInt(document.getElementById('quantidade').value)
    try {
        let response = await fetch(`${api}/characters`)
        characters = await response.json()
        if(characters.length == 0) {
            cards.innerHTML = '<h1>Nenhum Personagem encontrado</h1>'
        }
        page_atual = 1
        rendercards()
    }
    catch(error) {
        console.error(error);
    };
})


function rendercards() {
    const cards = document.getElementById('cards')
    cards.innerHTML = ''

    let comeco = (page_atual - 1) * quantidade
    let fim = comeco + quantidade

    characters.slice(comeco, fim).forEach(c => {
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
    renderpages()
}

function renderpages() {
    const paginas = document.getElementById('pages')
    paginas.innerHTML = ''

    let totalpages = Math.ceil(characters.length / quantidade)

    if(totalpages > 1) {
        for(let i = 1; i <= totalpages; i++) {
            let btn = document.createElement('button')
            btn.classList.add('btn-page')
            btn.innerText = i
            btn.addEventListener('click', () => {
                page_atual = i
                rendercards()
            })
            if(i == page_atual) {
                btn.style.backgroundColor = '#DDE0ED'
            }
            paginas.appendChild(btn)
        }
    }
}