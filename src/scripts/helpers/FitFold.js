// ========================================== #
// Render Fold
// ========================================== #

let fitFold = function(el, child) {
  if (typeof el !== "null") {
    var windowHeight        = window.innerHeight;
    el.style.height     = windowHeight + "px";
  }
  if (typeof child !== "undefined") {
    let childHeight         = child.offsetHeight;
    let childCalcPosition   = (windowHeight - childHeight) / 2;
    return child.style.top     = childCalcPosition + "px";
  }
};