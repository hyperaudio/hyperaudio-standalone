scrollTo = (element, to, duration) ->
  start = element.scrollTop
  change = to - start
  currentTime = 0
  increment = 20
  animateScroll = ->
    currentTime += increment
    val = Math.easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    setTimeout animateScroll, increment  if currentTime < duration

  animateScroll()
Math.easeInOutQuad = (t, b, c, d) ->
  t /= d / 2
  return c / 2 * t * t + b  if t < 1
  t--
  -c / 2 * (t * (t - 2) - 1) + b