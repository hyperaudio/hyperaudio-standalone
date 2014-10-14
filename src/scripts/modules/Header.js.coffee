renderHeader = () ->
  pageHead      = document.getElementById "page-head"
  pageHeadState = pageHead.getAttribute "data-head-state"
  if pageHeadState is "altered"
    pageHead.classList.add "page-head--altered"
  else
    pageHead.classList.remove "page-head--altered"

toggleHead = ->
  pageHead      = document.getElementById "page-head"
  if window.pageYOffset > 30
    pageHead.setAttribute "data-head-state", "altered"
  else
    pageHead.setAttribute "data-head-state", ""
  renderHeader()