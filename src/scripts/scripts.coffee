document.addEventListener "DOMContentLoaded", ->

  # console.log "السلام عليكم"

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
  , 350)

  window.onscroll = throttle((event) ->
    toggleHead()
  , 350)

  window.addEventListener "load", (->
    FastClick.attach document.body
  ), false