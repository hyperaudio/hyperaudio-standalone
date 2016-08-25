let renderOverlay = function() {
  let pageOverlay       = document.getElementById("page-overlay");
  if (pageOverlay !== null) {
    let pageOverlayState  = pageOverlay.getAttribute("data-overlay-state");
    if (pageOverlayState === "cover-left") {
      addClass(pageOverlay, "cover-left");
      removeClass(pageOverlay, "hide");
    } else if (pageOverlayState === "cover-right") {
      addClass(pageOverlay, "cover-right");
      removeClass(pageOverlay, "hide");
    } else if (pageOverlayState === "cover-all") {
      addClass(pageOverlay, "cover-all");
      removeClass(pageOverlay, "hide");
    } else {
      addClass(pageOverlay, "hide");
      removeClass(pageOverlay, "cover-all");
      removeClass(pageOverlay, "cover-right");
      removeClass(pageOverlay, "cover-left");
    }
    return fitFold(pageOverlay);
  }
};

let toggleOverlay = function(state) {
  let pageOverlay       = document.getElementById("page-overlay");
  if (pageOverlay !== null) {
    pageOverlay.setAttribute("data-overlay-state", state);
    return renderOverlay();
  }
};