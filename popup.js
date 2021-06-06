const nameDOM = document.querySelector('.user .name')
const loginNameDOM = document.querySelector('.user .loginName')
const profileImageDOM = document.querySelector('.user div img')
const reposDOM = document.querySelector('.repos')
const form = document.querySelector('form')
const input = document.querySelector('form input')

let user = 'fedeperin'

if(!localStorage.getItem('user')) {
    localStorage.setItem('user', user)
}else {
    user = localStorage.getItem('user')
    input.value = user
}

function showRepos(repos) {
    repos.forEach(repo => {
        let repoCont = document.createElement('div')
        repoCont.classList.add('repo')

        let repoName = document.createElement('h3')
        repoName.textContent = repo.name

        let repoDescription = document.createElement('p')
        repoDescription.classList.add('description')
        repoDescription.textContent = repo.description

        let repoStars = document.createElement('p')
        repoStars.classList.add('small')
        repoStars.textContent = `Stars: ${repo.stargazers_count}`

        let repoForks = document.createElement('p')
        repoForks.classList.add('small')
        repoForks.textContent = `Forks: ${repo.forks}`

        let repoLanguage = document.createElement('p')
        repoLanguage.classList.add('small')
        repoLanguage.textContent = `Principal language: ${repo.language}`

        repoCont.appendChild(repoName)
        repoCont.appendChild(repoDescription)
        repoCont.appendChild(repoStars)
        repoCont.appendChild(repoForks)
        repoCont.appendChild(repoLanguage)
        reposDOM.appendChild(repoCont)

        repoCont.addEventListener('click', () => {
            window.open(repo.html_url)
        })
    })
}

function fetchData() {
    reposDOM.innerHTML = ''
    localStorage.setItem('user', user)
    fetch(`https://api.github.com/users/${user}`)
        .then((res) => res.json())
        .then((data) => {
            
            profileImageDOM.setAttribute('src', data.avatar_url)
            profileImageDOM.addEventListener('click', () => {
                window.open(data.html_url)
            })
            nameDOM.textContent = data.name
            nameDOM.setAttribute('href', data.html_url)
            loginNameDOM.textContent = data.login
    
            fetch(`https://api.github.com/users/${user}/repos`)
                .then((res) => res.json())
                .then((data) => {
                    showRepos(data)
                })
                .catch((e) => console.log(e));
            })
        .catch((e) => console.log(e));
}

fetchData()

form.addEventListener('submit', e => {
    e.preventDefault()
    localStorage.setItem('user', user)
    user = input.value
    fetchData()
})