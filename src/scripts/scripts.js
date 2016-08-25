if (window.parent !== window) {
  if (document.body.classList) {
    document.body.classList.add("tpl--compact");
  } else {
    document.body.className += " tpl--compact";
  }
}

document.addEventListener("DOMContentLoaded", function() {

  // console.log "السلام عليكم"

  renderDrops();
  renderFoldCards();
  renderFoldSwiper();
  renderHead();
  renderMenu();
  renderOverlay();
  renderPanels();
  renderPage();
  renderSides();
  renderMultiples();
  setSharePath();

  window.onresize = throttle(function(event) {
    renderOverlay();
    renderFoldCards();
    renderMultiples();
    return renderSides();
  }
  , 350);

  window.onscroll = throttle(event => toggleHead()
  , 350);

  return window.addEventListener("load", (() => FastClick.attach(document.body)), false);
}
);