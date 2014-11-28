toggleClass = (el, className) ->
  if el.classList
    el.classList.toggle className
  else
    classes = el.className.split(" ")
    existingIndex = classes.indexOf(className)
    if existingIndex >= 0
      classes.splice existingIndex, 1
    else
      classes.push className
    el.className = classes.join(" ")

hasClass = (el, className) ->
  className = " " + className + " "
  return true if (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
  false