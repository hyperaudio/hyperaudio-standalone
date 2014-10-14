# ========================================== #
# Add Events as per:
# http://stackoverflow.com/a/854819
# ========================================== #

addEvent = (obj, type, fn) ->
  if obj.addEventListener
    obj.addEventListener type, fn, false
  else if obj.attachEvent
    obj.attachEvent "on" + type, ->
      fn.apply obj, [ window.event ]