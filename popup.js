const nombreDOM = document.querySelector('.usuario .nombre')
const nombreLoginDOM = document.querySelector('.usuario .nombreLogin')
const imagenPerfilDOM = document.querySelector('.usuario div img')
const reposDOM = document.querySelector('.repos')
const form = document.querySelector('form')
const input = document.querySelector('form input')

let usuario = 'fedeperin'

if(!localStorage.getItem('usuario')) {
    localStorage.setItem('usuario', usuario)
}else {
    usuario = localStorage.getItem('usuario')
    input.value = usuario
}

function mostrarRepos(repos) {
    repos.forEach(repo => {
        let repoCont = document.createElement('div')
        repoCont.classList.add('repo')

        let repoNombre = document.createElement('h3')
        repoNombre.textContent = repo.name

        let repoDescripcion = document.createElement('p')
        repoDescripcion.classList.add('descripcion')
        repoDescripcion.textContent = repo.description

        let repoEstrellas = document.createElement('p')
        repoEstrellas.classList.add('chico')
        repoEstrellas.textContent = `Estrellas: ${repo.stargazers_count}`

        let repoForks = document.createElement('p')
        repoForks.classList.add('chico')
        repoForks.textContent = `Forks: ${repo.forks}`

        let repoLenguaje = document.createElement('p')
        repoLenguaje.classList.add('chico')
        repoLenguaje.textContent = `Lenguaje principal: ${repo.language}`

        repoCont.appendChild(repoNombre)
        repoCont.appendChild(repoDescripcion)
        repoCont.appendChild(repoEstrellas)
        repoCont.appendChild(repoForks)
        repoCont.appendChild(repoLenguaje)
        reposDOM.appendChild(repoCont)

        repoCont.addEventListener('click', () => {
            window.open(repo.html_url)
        })
    })
}

function fetchData() {
    reposDOM.innerHTML = ''
    fetch(`https://api.github.com/users/${usuario}`)
        .then((res) => res.json())
        .then((data) => {
            
            imagenPerfilDOM.setAttribute('src', data.avatar_url)
            imagenPerfilDOM.addEventListener('click', () => {
                window.open(data.html_url)
            })
            nombreDOM.textContent = data.name
            nombreDOM.setAttribute('href', data.html_url)
            nombreLoginDOM.textContent = data.login
    
            fetch(`https://api.github.com/users/${usuario}/repos`)
                .then((res) => res.json())
                .then((data) => {
                    mostrarRepos(data)
                })
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
}

fetchData()

form.addEventListener('submit', e => {
    e.preventDefault()
    localStorage.setItem('usuario', usuario)
    usuario = input.value
    fetchData()
})