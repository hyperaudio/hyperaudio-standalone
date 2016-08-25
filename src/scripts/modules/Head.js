let renderHead = function() {
  let pageHead      = document.getElementById("page-head");
  if (pageHead !== null) {
    let pageHeadState = pageHead.getAttribute("data-head-state");
    if (pageHeadState === "altered") {
      return addClass(pageHead, "page-head--altered");
    } else {
      return removeClass(pageHead, "page-head--altered");
    }
  }
};

let toggleHead = function() {
  let pageHead        = document.getElementById("page-head");
  if (pageHead !== null) {
    let pageHeadPersist = pageHead.getAttribute("data-head-state-persist");
    if (pageHeadPersist !== "true") {
      if (window.pageYOffset > 30) {
        pageHead.setAttribute("data-head-state", "altered");
      } else {
        pageHead.setAttribute("data-head-state", "");
      }
      return renderHead();
    }
  }
};