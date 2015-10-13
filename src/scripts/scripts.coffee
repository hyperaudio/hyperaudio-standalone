unless window.parent is window
  if document.body.classList
    document.body.classList.add "tpl--compact"
  else
    document.body.className += " tpl--compact"

document.addEventListener "DOMContentLoaded", ->

  renderDrops()
  renderFoldCards()
  renderFoldSwiper()
  renderHead()
  renderMenu()
  renderOverlay()
  renderPanels()
  renderPage()
  renderSides()
  renderMultiples()
  setSharePath()

  window.onresize = throttle((event) ->
    renderOverlay()
    renderFoldCards()
    renderMultiples()
    renderSides()
  , 350)

  window.onscroll = throttle((event) ->
    toggleHead()
  , 350)

  window.addEventListener "load", (->
    FastClick.attach document.body
  ), false
