renderPage = () ->
  page      = document.body
  pageState = page.getAttribute "data-page-state"
  if pageState is "clipped"
    page.classList.add "clipped"
  else
    page.classList.remove "clipped"