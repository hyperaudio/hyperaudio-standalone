renderOverlay = () ->
  pageOverlay       = document.getElementById("page-overlay")
  pageOverlayState  = pageOverlay.getAttribute "data-overlay-state"
  if pageOverlayState is "left"
    pageOverlay.classList.add "shown-left"
    pageOverlay.classList.remove "hide"
  else if pageOverlayState is "right"
    pageOverlay.classList.add "shown-right"
    pageOverlay.classList.remove "hide"
  else
    pageOverlay.classList.add "hide"
    pageOverlay.classList.remove "shown-right"
    pageOverlay.classList.remove "shown-left"
  fitFold(pageOverlay)

toggleOverlay = (dir) ->
  pageOverlay = document.getElementById("page-overlay")
  pageOverlay.setAttribute "data-overlay-state", dir
  renderOverlay()