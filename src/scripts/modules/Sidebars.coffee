renderSides         = () ->

  leftSide          = document.getElementById "page-side--left"
  windowWidth       = window.innerWidth
  if windowWidth > 1024
    leftSide.setAttribute "data-side-state", "active"
    leftSide.setAttribute "data-side-state-persist", "true"
    leftSide.classList.add "page-side--persistent"
  else
    leftSide.setAttribute "data-side-state-persist", ""
    leftSide.classList.remove "page-side--persistent"

  page              = document.body
  sides             = document.querySelectorAll ".page-side"
  head              = document.getElementById "page-head"
  body              = document.getElementById "page-body"
  states            = []

  # Populate states array with states of all sides
  # Toggle visibility classes on panels according to the data attributes
  [].forEach.call sides, (side) ->
    sideState       = side.getAttribute "data-side-state"
    sideDirection   = side.getAttribute "data-side-push"
    persistAttr     = side.getAttribute "data-side-state-persist"
    unless persistAttr is "true"
      states.push(sideState)
      if sideState is "active"
        body.classList.add "moved--" + sideDirection
        head.classList.add "moved--" + sideDirection
        side.classList.remove "moved"
        if sideDirection is "left"
          toggleOverlay "cover-left"
        else
          toggleOverlay "cover-right"
      else
        body.classList.remove "moved--" + sideDirection
        head.classList.remove "moved--" + sideDirection
        side.classList.add "moved"

  # See if there are any panels open and, if so, toggle overlay and clip body
  if states.indexOf("active") is -1
    page.setAttribute "data-page-state", ""
    # toggleOverlay "cover-none"
  else
    page.setAttribute "data-page-state", "clipped"
  renderPage()

# Alters target side's state and/or disables all panels when page-overlay was clicked
alterSideState    = (targetSideId) ->
  sides           = document.querySelectorAll ".page-side"
  if targetSideId is "all"
    [].forEach.call sides, (side) ->
      persistAttr = side.getAttribute "data-side-state-persist"
      unless persistAttr is "true"
        side.setAttribute "data-side-state", "inactive"
  else
    targetSide      = document.getElementById "page-side--" + targetSideId
    targetSideState = targetSide.getAttribute "data-side-state"
    persistAttr     = targetSide.getAttribute "data-side-state-persist"
    unless persistAttr is "true"
      if targetSideState is "active"
        targetSide.setAttribute "data-side-state", "inactive"
      else
        targetSide.setAttribute "data-side-state", "active"
  renderSides()

onSideToggle    = (el) ->
  targetSideId  = el.getAttribute "data-side-target"
  alterSideState(targetSideId)

# Bind clicks
sideTogglers = document.querySelectorAll ".toggleSide"
[].forEach.call sideTogglers, (el) ->
  el.addEventListener "click", (e) ->
    onSideToggle(e.currentTarget)