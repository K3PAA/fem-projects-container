import './style.css'
import data from '/src/data.json'
import logoLight from '/assets/images/logo-light.svg'
import logoDark from '/assets/images/logo-dark.svg'
import sun from '/assets/images/icon-sun.svg'
import moon from '/assets/images/icon-moon.svg'

import { toogleTheme, theme } from './theme'

document.querySelector('#app').innerHTML = `
  <header class="content-wrapper">
      <img src="${
        theme === 'light' ? logoDark : logoLight
      }" class="logo" alt="Vite logo" />   

      <button class="theme">
        <img src="${theme === 'light' ? moon : sun}" alt="theme icon"/>
      </button>

  </header>

  <main class="content-wrapper">
    <section class="extensions-bar">
      <h1>Extensions List</h1>
      <div class="filter-buttons">
        <button class="filter-button">All</button>
        <button class="filter-button">Active</button>
        <button class="filter-button">Inactive</button>
      <div>
    </section>
  
    <section class="extensions | grid-responsive-container">
    </section>
  </main>
`

const extensionsData = data

const extensionsElement = document.querySelector('.extensions')

const createTextElement = (el, text) => {
  const element = document.createElement(el)
  element.textContent = text

  return element
}
const createCard = (element) => {
  const card = document.createElement('div')
  card.classList.add('card')

  const textWrapper = document.createElement('div')
  textWrapper.append(createTextElement('h2', element.name))
  textWrapper.append(createTextElement('p', element.description))

  const topCardWrapper = document.createElement('div')
  topCardWrapper.classList.add('card-top')
  const bottomCardWrapper = document.createElement('div')
  bottomCardWrapper.classList.add('card-bottom')

  const logo = document.createElement('img')
  logo.src = element.logo
  topCardWrapper.append(logo)

  topCardWrapper.append(textWrapper)

  const button = document.createElement('button')
  button.textContent = 'remove'
  bottomCardWrapper.append(button)

  const toggleButton = document.createElement('button')
  if (element.isActive) toggleButton.classList.add('active')
  const toggleCircle = document.createElement('div')

  toggleCircle.classList.add('toggle-circle')
  toggleButton.classList.add('toggle')
  toggleButton.appendChild(toggleCircle)

  bottomCardWrapper.append(toggleButton)

  card.append(topCardWrapper)
  card.append(bottomCardWrapper)

  return card
}

extensionsData.forEach((element) => {
  extensionsElement.append(createCard(element))
})

const renderContent = (type) => {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card, i) => {
    if (type === 'inactive') {
      if (extensionsData[i].isActive) card.classList.add('hidden')
      else card.classList.remove('hidden')
    } else if (type === 'active') {
      if (!extensionsData[i].isActive) card.classList.add('hidden')
      else card.classList.remove('hidden')
    } else {
      card.classList.remove('hidden')
    }
  })
}

const filterButtons = document.querySelectorAll('.filter-button')

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let remove = button.classList.contains('active')
    filterButtons.forEach((b) => {
      if (b.classList.contains('active')) b.classList.remove('active')
    })
    renderContent(remove ? '' : button.textContent.toLowerCase())
    if (!remove) button.classList.add('active')
  })
})

const toggleElements = document.querySelectorAll('.toggle')

toggleElements.forEach((element, i) => {
  element.addEventListener('click', () => {
    element.classList.toggle('active')
    extensionsData[i].isActive = !extensionsData[i].isActive
  })
})

const themeButton = document.querySelector('.theme')
const themeIcon = themeButton.querySelector('img')
const logo = document.querySelector('.logo')

themeButton.addEventListener('click', () => {
  toogleTheme()
  themeIcon.src = theme === 'dark' ? sun : moon
  logo.src = theme === 'dark' ? logoLight : logoDark
})
