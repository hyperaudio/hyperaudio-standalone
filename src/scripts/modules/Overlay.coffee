renderOverlay = () ->
  pageOverlay       = document.getElementById("page-overlay")
  unless pageOverlay is null
    pageOverlayState  = pageOverlay.getAttribute "data-overlay-state"
    if pageOverlayState is "cover-left"
      pageOverlay.classList.add "cover-left"
      pageOverlay.classList.remove "hide"
    else if pageOverlayState is "cover-right"
      pageOverlay.classList.add "cover-right"
      pageOverlay.classList.remove "hide"
    else if pageOverlayState is "cover-all"
      pageOverlay.classList.add "cover-all"
      pageOverlay.classList.remove "hide"
    else
      pageOverlay.classList.add "hide"
      pageOverlay.classList.remove "cover-all"
      pageOverlay.classList.remove "cover-right"
      pageOverlay.classList.remove "cover-left"
    fitFold(pageOverlay)

toggleOverlay = (state) ->
  pageOverlay       = document.getElementById("page-overlay")
  unless pageOverlay is null
    pageOverlay.setAttribute "data-overlay-state", state
    renderOverlay()