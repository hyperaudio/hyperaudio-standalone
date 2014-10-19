renderPanels       = () ->
  page              = document.body
  panels            = document.getElementsByClassName "panel"

  states = []

  [].forEach.call panels, (el) ->
    target          = el
    state           = el.getAttribute "data-panel-state"
    states.push(state)

    if state is "active"
      target.classList.add "panel--active"
    else
      target.classList.remove "panel--active"

  if states.indexOf("active") is -1
    page.setAttribute "data-page-state", ""
  else
    page.setAttribute "data-page-state", "clipped"

alterPanelState   = (target) ->
  targetPanel     = document.getElementById "panel--" + target
  state           = targetPanel.getAttribute "data-panel-state"
  if state is "active"
    targetPanel.setAttribute "data-panel-state", "inactive"
  else
    targetPanel.setAttribute "data-panel-state", "active"
  console.log(state)
  renderPanels()

onPanelToggle    = (target) ->
  alterPanelState(target)
  # toggleOverlay(target)

# Bind Clicks

addEvent window, "load", ->
  i = 0
  panelTogglers = document.getElementsByClassName "togglePanel"
  l = panelTogglers.length
  while i < l
    addEvent panelTogglers[i], "click", (e) ->
      thisToggle = e.currentTarget
      toggleTarget = thisToggle.getAttribute "data-panel-target"
      onPanelToggle(toggleTarget)
      e.returnValue = false
      e.preventDefault()  if e.preventDefault
      false
    ++i