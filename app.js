const linkContainer = Array.from(document.querySelector('header > nav').children)
const buttonsContainer = Array.from(document.querySelector('.planetDescription .buttonsContainer').children)
const headerElement = document.querySelector('header')
const startupPlanet = 'mercury'
const imageContainer = document.querySelector('.imageContainer')
const burgerIcon = document.querySelector('.burgerIcon')

let planetsData = {

}

initializeEvents()

setStartupData()

function initializeEvents() {
    linkContainer.forEach(el => {
        el.addEventListener('click', () => {
            linkContainer.forEach(el => el.classList.remove('active'))
            el.classList.add('active')
            if(el.getAttribute('value') === 'saturn') {
                imageContainer.classList.add('isSaturn')
            } else {
                imageContainer.classList.remove('isSaturn')
            }
            getPlanetData(el.getAttribute('value'))

            buttonsContainer.forEach(el => el.classList.remove('active'))
            buttonsContainer[0].classList.add('active')

            document.querySelector('header > nav').classList.remove('visible')
        })
    });
    
    buttonsContainer.forEach(el => {
        el.addEventListener('click', () => {
            buttonsContainer.forEach(el => el.classList.remove('active'))
            el.classList.add('active')

            document.querySelector('#description').innerText = planetsData.description[el.id]

            let classToDelete = Array.from(imageContainer.classList).filter(className => className !== 'imageContainer' && className !== 'isSaturn')
            classToDelete.length > 0 && imageContainer.classList.remove(classToDelete)
            imageContainer.classList.add(el.id)
        })
    });

    burgerIcon.addEventListener('click', () => {
        let linkContainer = document.querySelector('header > nav')

        if(!linkContainer.classList.contains('visible')) {
            linkContainer.classList.add('visible')
        } else {
            linkContainer.classList.remove('visible')
        }
    })
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
    planetsData = data
    Object.keys(data).forEach(el => {
        if(el === 'description') {
            document.querySelector(`#${el}`).innerText = data[el]['overview']
        } else {
            document.querySelector(`#${el}`).innerText = data[el]
        }
    })

    document.querySelector(`#imageSrc`).src = `./assets/planets/${data.title}/${data.title}.png`
    document.querySelector(`#imageSrcHalf`).src = `./assets/planets/${data.title}/${data.title}Half.png`
    document.querySelector(`#imageSrcSurface`).src = `./assets/planets/${data.title}/${data.title}Surface.png`

    let buttonsContainer = document.querySelector('.planetDescription .buttonsContainer')
    let classToDelete = Array.from(buttonsContainer.classList).filter(className => className !== 'buttonsContainer')
    classToDelete.length > 0 && buttonsContainer.classList.remove(classToDelete)
    buttonsContainer.classList.add(data.title)

    let classToDelete1 = Array.from(imageContainer.classList).filter(className => className !== 'imageContainer' && className !== 'isSaturn')
    classToDelete1.length > 0 && imageContainer.classList.remove(classToDelete1)
    imageContainer.classList.add('overview')
}


