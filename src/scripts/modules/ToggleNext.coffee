nextTogglers = document.querySelectorAll ".toggleNext"
[].forEach.call nextTogglers, (el) ->
  el.addEventListener "click", (e) ->
    thisEl      = e.currentTarget
    nextEl      = thisEl.nextElementSibling
    className   = "shown"
    if nextEl.classList
      nextEl.classList.toggle className
    else
      classes = nextEl.className.split " "
      existingIndex = classes.indexOf className
      if existingIndex >= 0
        classes.splice existingIndex, 1
      else
        classes.push className
      nextEl.className = classes.join " "