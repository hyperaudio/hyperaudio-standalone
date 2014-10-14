renderSidebar       = () ->
  page              = document.body
  pageSides         = document.getElementsByClassName "page-side"
  pageBody          = document.getElementById "page-body"
  pageHead          = document.getElementById "page-head"

  states = []

  [].forEach.call pageSides, (el) ->
    target          = el
    state           = el.getAttribute "data-side-state"
    direction       = el.getAttribute "data-side-push"
    states.push(state)

    if state is "active"
      pageBody.classList.add "moved--" + direction
      pageHead.classList.add "moved--" + direction
      target.classList.remove "moved"
    else
      pageBody.classList.remove "moved--" + direction
      pageHead.classList.remove "moved--" + direction
      target.classList.add "moved"

  if states.indexOf("active") is -1
    page.setAttribute "data-page-state", ""
  else
    page.setAttribute "data-page-state", "clipped"

alterSidebarState   = (target) ->
  pageSides         = document.getElementsByClassName "page-side"
  [].forEach.call pageSides, (el) ->
    el.setAttribute "data-side-state", "inactive"

  unless target is "all"
    targetSide = document.getElementById "pageSide--" + target
    state      = targetSide.getAttribute "data-side-state"
    if state is "active"
      targetSide.setAttribute "data-side-state", "inactive"
    else
      targetSide.setAttribute "data-side-state", "active"
  renderSidebar()

onSidebarToggle    = (target) ->
  alterSidebarState(target)
  toggleOverlay(target)
  renderPage()

# Bind Clicks

addEvent window, "load", ->
  i = 0
  pageSideTogglers = document.getElementsByClassName "toggleSide"
  l = pageSideTogglers.length
  while i < l
    addEvent pageSideTogglers[i], "click", (e) ->
      thisToggle = e.currentTarget
      toggleTarget = thisToggle.getAttribute "data-side-target"
      onSidebarToggle(toggleTarget)
      e.returnValue = false
      e.preventDefault()  if e.preventDefault
      false
    ++i