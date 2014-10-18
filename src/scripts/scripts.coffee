document.addEventListener "DOMContentLoaded", ->

  console.log "السلام عليكم"

  renderCover()
  renderFoldCards()
  renderHead()
  renderMenu()
  renderOverlay()
  renderPage()
  renderSidebar()

window.onresize = throttle((event) ->
  renderCover()
  renderOverlay()
, 350)

window.onscroll = throttle((event) ->
  toggleHead()
  handleOffCanvasBlocks()
, 350)