const setTheme = (theme) => {
  localStorage.setItem('theme', theme)
  return theme
}

let theme = localStorage.getItem('theme')

if (!theme) {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    theme = setTheme('dark')
  } else {
    theme = setTheme('light')
  }
}

document.documentElement.setAttribute('data-theme', theme)

const toogleTheme = () => {
  theme =
    localStorage.getItem('theme') === 'dark'
      ? setTheme('light')
      : setTheme('dark')

  document.documentElement.setAttribute('data-theme', theme)
}

export { toogleTheme, theme }
