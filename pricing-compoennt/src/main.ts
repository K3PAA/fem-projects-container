import './style.css'
const BILLING = { ANNUALY: 0, MONTHLY: 1 } as const
const cardsDisplay = document.querySelector('.cards') as HTMLElement
const billingDisplay = document.querySelector('.billing-display') as HTMLElement

type ListElements = [string, string, string]
type Card = {
  title: string
  price: [string, string]
  list: ListElements
  special: boolean
}
const cards: Card[] = [
  {
    title: 'Basic',
    price: ['$199.99', '$19.99'],
    list: ['500 GB Storage', '2 Users Allowed', 'Send up to 3 GB'],
    special: false,
  },
  {
    title: 'Professional',
    price: ['$249.99', '$24.99'],
    list: ['1 TB Storage', '5 Users Allowed', 'Send up to 10 GB'],
    special: true,
  },
  {
    title: 'Master',
    price: ['$399.99', '$39.99'],
    list: ['2 TB Storage', '10 Users Allowed', 'Send up to 20 GB'],
    special: false,
  },
]

const createCard = (element: Card) => {
  const card = document.createElement('section')
  card.classList.add('card')

  if (element.special) {
    card.style.setProperty('--card-padding', '3rem 2rem 3.5rem 2rem ')
    card.style.setProperty(
      '--clr-bg-card',
      'linear-gradient(var(--clr-primary-400), var(--clr-primary-700))'
    )
    card.style.setProperty('--clr-text-card', 'var(--clr-white)')
    card.style.setProperty('--card-radius', '10px')
  }

  const title = document.createElement('h3')
  title.textContent = element.title

  const price = document.createElement('p')
  price.classList.add('price')
  price.textContent = element.price[BILLING.ANNUALY]
  if (element.special) price.style.setProperty('--price-top', '2rem')

  const list = createList(element.list, element.special)

  const button = document.createElement('button')
  button.textContent = 'Learn more'

  if (element.special) {
    button.style.setProperty('--clr-bg-button', 'var(--clr-white')
    button.style.setProperty('--clr-button', 'var(--clr-primary-700)')
  }

  card.appendChild(title)
  card.appendChild(price)
  card.appendChild(list)
  card.appendChild(button)

  return card
}

const createList = (elements: ListElements, special: boolean) => {
  const list = document.createElement('ul')
  list.role = 'list'

  for (const element of elements) {
    const li = document.createElement('li')
    if (special) {
      li.style.setProperty('--clr-list', 'var(--clr-white)')
      li.style.setProperty('--clr-border-list', 'rgba(255,255,255,0.25)')
    }
    li.textContent = element

    list.appendChild(li)
  }

  return list
}

for (const data of cards) {
  const card = createCard(data)
  cardsDisplay.appendChild(card)
}

const updateCards = (billing: number) => {
  const prices = document.querySelectorAll('.price')

  cards.forEach((card, i) => {
    prices[i].textContent = card.price[billing]
  })
}

billingDisplay.addEventListener('click', (e) => {
  const dot = billingDisplay.querySelector('.billing-dot') as HTMLElement
  if (dot.classList.contains('monthly')) {
    dot.classList.remove('monthly')
    updateCards(BILLING.ANNUALY)
  } else {
    dot.classList.add('monthly')
    updateCards(BILLING.MONTHLY)
  }
})
