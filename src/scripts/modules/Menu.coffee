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

onMenuPaneToggle = (el) ->
  targetPaneId  = el.getAttribute "data-target-menu-pane-id"
  menu.setAttribute "data-active-pane", targetPaneId
  renderMenu()

# Bind Clicks
menuToggles = document.querySelectorAll ".toggleMenuPane"
[].forEach.call menuToggles, (el) ->
  el.addEventListener "click", (e) ->
    onMenuPaneToggle(e.currentTarget)