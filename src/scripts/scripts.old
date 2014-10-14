$(document).ready ->
  console.log "السلام عليكم"

  # Render
  renderSidebar()
  renderToolbar()
  renderSwipeList()
  renderBody()
  renderFold()

  $(window).resize throttle((event) ->
    renderFold()
  , 500)