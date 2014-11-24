
renderHead = () ->
  pageHead      = document.getElementById "page-head"
  unless pageHead is null
    pageHeadState = pageHead.getAttribute "data-head-state"
    if pageHeadState is "altered"
      pageHead.classList.add "page-head--altered"
    else
      pageHead.classList.remove "page-head--altered"

toggleHead = ->
  pageHead        = document.getElementById "page-head"
  unless pageHead is null
    pageHeadPersist = pageHead.getAttribute "data-head-state-persist"
    unless pageHeadPersist is "true"
      if window.pageYOffset > 30
        pageHead.setAttribute "data-head-state", "altered"
      else
        pageHead.setAttribute "data-head-state", ""
      renderHead()