renderNext          = () ->

# Bind Clicks

addEvent window, "load", ->
  i = 0
  nextTogglers = document.getElementsByClassName "toggleNext"
  l = nextTogglers.length
  while i < l
    addEvent nextTogglers[i], "click", (e) ->
      @thisToggle = e.currentTarget
      @nextEl     = @thisToggle.nextElementSibling
      className   = "shown"

      if @nextEl.classList
        @nextEl.classList.toggle className
      else
        classes = @nextEl.className.split(" ")
        existingIndex = classes.indexOf(className)
        if existingIndex >= 0
          classes.splice existingIndex, 1
        else
          classes.push className
        @nextEl.className = classes.join(" ")
      e.returnValue = false
      e.preventDefault()  if e.preventDefault
      false
    ++i