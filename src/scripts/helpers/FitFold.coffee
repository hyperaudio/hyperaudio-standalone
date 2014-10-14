# ========================================== #
# Render Fold
# ========================================== #

fitFold = (el, child) ->
  unless typeof el is "null"
    windowHeight        = window.innerHeight
    el.style.height     = windowHeight + "px"
  unless typeof child is "undefined"
    childHeight         = child.offsetHeight
    childCalcPosition   = (windowHeight - childHeight) / 2
    child.style.top     = childCalcPosition + "px"