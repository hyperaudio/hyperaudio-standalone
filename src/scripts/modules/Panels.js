let renderPanels        = function() {
  let page              = document.body;
  let panels            = document.querySelectorAll(".panel");
  let states            = [];

  // Populate states array with states of all panels
  // Toggle visibility classes on panels according to the data attributes
  [].forEach.call(panels, function(panel) {
    let panelState      = panel.getAttribute("data-panel-state");
    states.push(panelState);
    if (panelState === "active") {
      return addClass(panel, "panel--active");
    } else {
      return removeClass(panel, "panel--active");
    }
  }
  );

  // See if there are any panels open and, if so, toggle overlay and clip body
  if (states.indexOf("active") === -1) {
    page.setAttribute("data-page-state", "");
    return toggleOverlay("cover-none");
  } else {
    page.setAttribute("data-page-state", "clipped");
    return toggleOverlay("cover-all");
  }
};

// Alters target panel's state and/or disables all panels when page-overlay was clicked
let alterPanelState     = function(targetPanelId) {
  let panels            = document.querySelectorAll(".panel");
  if (targetPanelId === "all") {
    [].forEach.call(panels, panel => panel.setAttribute("data-panel-state", "inactive")
    );
  } else {
    let targetPanel       = document.getElementById(`panel--${targetPanelId}`);
    let targetPanelState  = targetPanel.getAttribute("data-panel-state");
    if (targetPanelState === "active") {
      targetPanel.setAttribute("data-panel-state", "inactive");
    } else {
      targetPanel.setAttribute("data-panel-state", "active");
    }
  }
  return renderPanels();
};

// Launch on click methods
let onPanelToggle    = function(el) {
  let targetPanelId  = el.getAttribute("data-panel-target");
  alterPanelState(targetPanelId);
  return renderPanels();
};

// Bind clicks
let panelTogglers = document.querySelectorAll(".togglePanel");
[].forEach.call(panelTogglers, el =>
  el.addEventListener("click", e => onPanelToggle(e.currentTarget)
  )

);