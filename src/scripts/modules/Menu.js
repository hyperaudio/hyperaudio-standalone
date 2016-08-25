let menu                  = document.getElementById("page-menu");

let menuPanes             = document.getElementsByClassName("menu__pane");
let rootPane              = document.getElementById("menu__pane--root");
let menuReset             = document.getElementById("menu-reset");

let renderMenu = function() {
  if (menu !== null) {
    let activePaneId        = menu.getAttribute("data-active-pane");
    if (activePaneId === "root") {
      let i = undefined;
      menuPanes = document.querySelectorAll(".menu__pane");
      i = 0;
      while (i < menuPanes.length) {
        addClass(menuPanes[i], "moved--right");
        ++i;
      }
      removeClass(rootPane, "moved--right");
      removeClass(rootPane, "moved--left");
      return addClass(menuReset, "moved");

    } else {
      addClass(rootPane, "moved--left");
      let activePaneEl      = document.getElementById(`menu__pane--${activePaneId}`);
      removeClass(activePaneEl, "moved--right");
      return removeClass(menuReset, "moved");
    }
  }
};

let onMenuPaneToggle = function(el) {
  let targetPaneId  = el.getAttribute("data-target-menu-pane-id");
  menu.setAttribute("data-active-pane", targetPaneId);
  return renderMenu();
};

// Bind Clicks
let menuToggles = document.querySelectorAll(".toggleMenuPane");
[].forEach.call(menuToggles, el =>
  el.addEventListener("click", e => onMenuPaneToggle(e.currentTarget)
  )

);