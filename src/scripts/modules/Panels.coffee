renderPanels        = () ->
  page              = document.body
  panels            = document.querySelectorAll ".panel"
  states            = []

  # Populate states array with states of all panels
  # Toggle visibility classes on panels according to the data attributes
  [].forEach.call panels, (panel) ->
    panelState      = panel.getAttribute "data-panel-state"
    states.push(panelState)
    if panelState is "active"
      panel.classList.add "panel--active"
    else
      panel.classList.remove "panel--active"

  # See if there are any panels open and, if so, toggle overlay and clip body
  if states.indexOf("active") is -1
    page.setAttribute "data-page-state", ""
    toggleOverlay "cover-none"
  else
    page.setAttribute "data-page-state", "clipped"
    toggleOverlay("cover-all")

# Alters target panel's state and/or disables all panels when page-overlay was clicked
alterPanelState     = (targetPanelId) ->
  panels            = document.querySelectorAll ".panel"
  if targetPanelId is "all"
    [].forEach.call panels, (panel) ->
      panel.setAttribute "data-panel-state", "inactive"
  else
    targetPanel       = document.getElementById "panel--" + targetPanelId
    targetPanelState  = targetPanel.getAttribute "data-panel-state"
    if targetPanelState is "active"
      targetPanel.setAttribute "data-panel-state", "inactive"
    else
      targetPanel.setAttribute "data-panel-state", "active"
  renderPanels()

# Launch on click methods
onPanelToggle    = (el) ->
  targetPanelId  = el.getAttribute "data-panel-target"
  alterPanelState(targetPanelId)
  renderPanels()

# Bind clicks
panelTogglers = document.querySelectorAll ".togglePanel"
[].forEach.call panelTogglers, (el) ->
  el.addEventListener "click", (e) ->
    onPanelToggle(e.currentTarget)