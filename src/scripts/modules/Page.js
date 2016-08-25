let renderPage = function() {
  let page      = document.body;
  let pageState = page.getAttribute("data-page-state");

  if (pageState === "clipped") {
    return addClass(page, "clipped");
  } else {
    return removeClass(page, "clipped");
  }
};