document.addEventListener "DOMContentLoaded", ->

  console.log "السلام عليكم"

  renderCover()
  renderFoldCards()
  renderFoldSwiper()
  renderHead()
  renderMenu()
  renderOverlay()
  renderPanels()
  renderPage()
  renderSidebar()

window.onresize = throttle((event) ->
  renderCover()
  renderOverlay()
, 350)

window.onscroll = throttle((event) ->
  toggleHead()
, 350)