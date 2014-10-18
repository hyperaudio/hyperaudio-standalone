document.addEventListener "DOMContentLoaded", ->

  console.log "السلام عليكم"

  renderCover()
  renderHead()
  renderOverlay()
  renderPage()
  renderSidebar()
  renderFoldCards()

window.onresize = throttle((event) ->
  renderCover()
  renderOverlay()
, 350)

window.onscroll = throttle((event) ->
  toggleHead()
  handleOffCanvasBlocks()
, 350)