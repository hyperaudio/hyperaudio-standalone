let renderSides         = function() {

  let page              = document.body;
  let sides             = document.querySelectorAll(".page-side");
  let head              = document.getElementById("page-head");
  let body              = document.getElementById("page-body");
  let states            = [];

  if (hasClass(page, "tpl--responsive")) {
    let leftSide          = document.getElementById("page-side--left");
    let windowWidth       = window.innerWidth;
    if (windowWidth > 1024) {
      leftSide.setAttribute("data-side-state", "active");
      leftSide.setAttribute("data-side-state-persist", "true");
      addClass(leftSide, "page-side--persistent");
    } else {
      leftSide.setAttribute("data-side-state-persist", "");
      removeClass(leftSide, "page-side--persistent");
    }
  }

  // Populate states array with states of all sides
  // Toggle visibility classes on panels according to the data attributes
  [].forEach.call(sides, function(side) {
    let sideState       = side.getAttribute("data-side-state");
    let sideDirection   = side.getAttribute("data-side-push");
    let persistAttr     = side.getAttribute("data-side-state-persist");
    if (persistAttr !== "true") {
      states.push(sideState);
      if (sideState === "active") {
        addClass(body, `moved--${sideDirection}`);
        addClass(head, `moved--${sideDirection}`);
        removeClass(side, "moved");
        if (sideDirection === "left") {
          return toggleOverlay("cover-left");
        } else {
          return toggleOverlay("cover-right");
        }
      } else {
        removeClass(body, `moved--${sideDirection}`);
        removeClass(head, `moved--${sideDirection}`);
        return addClass(side, "moved");
      }
    }
  }
  );

  // See if there are any panels open and, if so, toggle overlay and clip body
  if (states.indexOf("active") === -1) {
    page.setAttribute("data-page-state", "");
    // toggleOverlay "cover-none"
  } else {
    page.setAttribute("data-page-state", "clipped");
  }
  return renderPage();
};

// Alters target side's state and/or disables all panels when page-overlay was clicked
let alterSideState    = function(targetSideId) {
  let sides           = document.querySelectorAll(".page-side");
  if (targetSideId === "all") {
    [].forEach.call(sides, function(side) {
      let persistAttr = side.getAttribute("data-side-state-persist");
      if (persistAttr !== "true") {
        return side.setAttribute("data-side-state", "inactive");
      }
    }
    );
  } else {
    let targetSide      = document.getElementById(`page-side--${targetSideId}`);
    let targetSideState = targetSide.getAttribute("data-side-state");
    let persistAttr     = targetSide.getAttribute("data-side-state-persist");
    if (persistAttr !== "true") {
      if (targetSideState === "active") {
        targetSide.setAttribute("data-side-state", "inactive");
      } else {
        targetSide.setAttribute("data-side-state", "active");
      }
    }
  }
  return renderSides();
};

let onSideToggle    = function(el) {
  let targetSideId  = el.getAttribute("data-side-target");
  return alterSideState(targetSideId);
};

// Bind clicks
let sideTogglers = document.querySelectorAll(".toggleSide");
[].forEach.call(sideTogglers, el =>
  el.addEventListener("click", e => onSideToggle(e.currentTarget)
  )

);