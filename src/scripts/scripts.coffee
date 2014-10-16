document.addEventListener "DOMContentLoaded", ->

  console.log "السلام عليكم"

  renderCover()
  renderHeader()
  renderOverlay()
  renderPage()
  renderSidebar()
  renderFoldCards()

window.onresize = throttle((event) ->
  renderCover()
  renderOverlay()
, 250)

window.onscroll = throttle((event) ->
  toggleHead()
, 250)