const linkContainer = Array.from(document.querySelector('header > nav').children)
const buttonsContainer = Array.from(document.querySelector('.planetDescription .buttonsContainer').children)
const headerElement = document.querySelector('header')
const startupPlanet = 'mercury'

initializeEvents()

setStartupData()

function initializeEvents() {
    linkContainer.forEach(el => {
        el.addEventListener('click', () => {
            linkContainer.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
            getPlanetData(el.getAttribute('value'))
        })
    });
    
    buttonsContainer.forEach(el => {
        el.addEventListener('click', () => {
            buttonsContainer.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
        })
    });
}

function setStartupData() {
    linkContainer.find(el => el.getAttribute('value') === startupPlanet).classList.add('active')
    getPlanetData(startupPlanet)
}

async function getPlanetData(value) {
    let res;

    await fetch('data.json')
    .then(response => response.json())
    .then(data => {
        res = data[value]
    }) 
    .catch(error => console.error('Error fetching data:', error));

    setHTMLData(res)
}

function setHTMLData(data) {
    Object.keys(data).forEach(el => {
        document.querySelector(`#${el}`).innerText = data[el]
    })
    document.querySelector(`#imageSrc`).src = `./assets/planets/${data.title}/${data.title}.png`

    let buttonsContainer = document.querySelector('.planetDescription .buttonsContainer')
    let classToDelete = Array.from(buttonsContainer.classList).filter(className => className !== 'buttonsContainer')
    classToDelete.length > 0 && buttonsContainer.classList.remove(Array.from(buttonsContainer.classList).filter(className => className !== 'buttonsContainer'))
    buttonsContainer.classList.add(data.title)
}


