menu                = document.getElementById("page-menu")
menuLvlRoot         = document.getElementById("page-menu-root")
menuLvl1            = document.getElementsByClassName("menu__pane--lvl-1")
menuToggles         = document.getElementsByClassName("toggleMenuPane")

# Define Magic
# ------------------------------------------ #

renderMenuPane      = (dir, id) ->
  targetMenuPane    = menu.getAttribute "data-active-pane"
  if dir is "drillup"
    menuLvlRoot.classList.remove "moved--left"
    [].forEach.call menuLvl1, (el) ->
      el.classList.add "moved--right"
  else if dir is "drilldown"
    menuLvlRoot.classList.add "moved--left"
    document.getElementById("menu__pane--" + id).classList.remove "moved--right"

alterMenuPaneState    = (lvl, id) ->
  currentMenuPane     = menu.getAttribute "data-active-pane"
  targetMenuPaneLvl   = lvl

  if currentMenuPane == targetMenuPaneLvl
  else if currentMenuPane > targetMenuPaneLvl
    menu.setAttribute "data-active-pane", targetMenuPaneLvl
    renderMenuPane "drillup", id
  else if currentMenuPane < targetMenuPaneLvl
    menu.setAttribute "data-active-pane", targetMenuPaneLvl
    renderMenuPane "drilldown", id

onMenuPaneToggle    = (lvl, id) ->
  alterMenuPaneState(lvl, id)

# Bind Clicks

addEvent window, "load", ->
  i = 0
  menuToggles = document.getElementsByClassName("toggleMenuPane")
  l = menuToggles.length
  while i < l
    addEvent menuToggles[i], "click", (e) ->
      thisToggle    = e.currentTarget
      targetPane    = thisToggle.getAttribute "data-menu-pane-target"
      targetPaneId  = thisToggle.getAttribute "data-menu-pane-target-id"
      onMenuPaneToggle(targetPane, targetPaneId)
      e.returnValue = false
      e.preventDefault() if e.preventDefault
      false
    ++i