document.addEventListener "DOMContentLoaded", ->

  console.log "السلام عليكم"

  renderFoldCards()
  renderFoldSwiper()
  renderHead()
  renderMenu()
  renderOverlay()
  renderPanels()
  renderPage()
  renderSides()

window.onresize = throttle((event) ->
  renderOverlay()
  renderFoldCards()
, 350)

window.onscroll = throttle((event) ->
  toggleHead()
, 350)