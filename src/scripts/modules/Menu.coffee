menu                  = document.getElementById "page-menu"
menuPanes             = document.getElementsByClassName "menu__pane"
rootPane              = document.getElementById "menu__pane--root"
menuReset             = document.getElementById "menu-reset"

renderMenu = () ->
  activePaneId        = menu.getAttribute "data-active-pane"
  if activePaneId is "root"
    i = undefined
    menuPanes = document.querySelectorAll ".menu__pane"
    i = 0
    while i < menuPanes.length
      menuPanes[i].classList.add "moved--right"
      ++i
    rootPane.classList.remove "moved--right"
    rootPane.classList.remove "moved--left"
    menuReset.classList.add "moved"

  else
    rootPane.classList.add "moved--left"
    activePaneEl      = document.getElementById "menu__pane--" + activePaneId
    activePaneEl.classList.remove "moved--right"
    menuReset.classList.remove "moved"

# Bind Clicks

addEvent window, "load", ->
  i = 0
  menuToggles = document.getElementsByClassName("toggleMenuPane")
  l = menuToggles.length
  while i < l
    addEvent menuToggles[i], "click", (e) ->
      thisToggle    = e.currentTarget
      targetPaneId  = thisToggle.getAttribute "data-target-menu-pane-id"
      menu.setAttribute "data-active-pane", targetPaneId
      renderMenu()
      e.returnValue = false
      e.preventDefault() if e.preventDefault
      false
    ++i

# menu                = document.getElementById("page-menu")
# menuReset           = document.getElementById("menu-reset")
# menuLvlRoot         = document.getElementById("page-menu-root")
# menuLvl1            = document.getElementsByClassName("menu__pane--1")
# menuToggles         = document.getElementsByClassName("toggleMenuPane")

# # Define Magic
# # ------------------------------------------ #

# renderMenuPane      = (dir, id) ->
#   targetMenuPane    = menu.getAttribute "data-active-pane"
#   if dir is "drillup"
#     menuLvlRoot.classList.remove "moved--left"
#     menuReset.classList.add "moved"
#     [].forEach.call menuLvl1, (el) ->
#       el.classList.add "moved--right"
#   else if dir is "drilldown"
#     menuLvlRoot.classList.add "moved--left"
#     menuReset.classList.remove "moved"
#     document.getElementById("menu__pane--" + id).classList.remove "moved--right"

# alterMenuPaneState    = (lvl, id) ->
#   currentMenuPane     = menu.getAttribute "data-active-pane"
#   targetMenuPaneLvl   = lvl

#   if currentMenuPane == targetMenuPaneLvl
#   else if currentMenuPane > targetMenuPaneLvl
#     menu.setAttribute "data-active-pane", targetMenuPaneLvl
#     renderMenuPane "drillup", id
#   else if currentMenuPane < targetMenuPaneLvl
#     menu.setAttribute "data-active-pane", targetMenuPaneLvl
#     renderMenuPane "drilldown", id

# onMenuPaneToggle    = (lvl, id) ->
#   alterMenuPaneState(lvl, id)
