menu                  = document.getElementById "page-menu"

menuPanes             = document.getElementsByClassName "menu__pane"
rootPane              = document.getElementById "menu__pane--root"
menuReset             = document.getElementById "menu-reset"

renderMenu = () ->
  unless menu is null
    activePaneId        = menu.getAttribute "data-active-pane"
    if activePaneId is "root"
      i = undefined
      menuPanes = document.querySelectorAll ".menu__pane"
      i = 0
      while i < menuPanes.length
        addClass menuPanes[i], "moved--right"
        ++i
      removeClass rootPane, "moved--right"
      removeClass rootPane, "moved--left"
      addClass menuReset, "moved"

    else
      addClass rootPane, "moved--left"
      activePaneEl      = document.getElementById "menu__pane--" + activePaneId
      removeClass activePaneEl, "moved--right"
      removeClass menuReset, "moved"

onMenuPaneToggle = (el) ->
  targetPaneId  = el.getAttribute "data-target-menu-pane-id"
  menu.setAttribute "data-active-pane", targetPaneId
  renderMenu()

# Bind Clicks
menuToggles = document.querySelectorAll ".toggleMenuPane"
[].forEach.call menuToggles, (el) ->
  el.addEventListener "click", (e) ->
    onMenuPaneToggle(e.currentTarget)