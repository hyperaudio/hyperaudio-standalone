# ========================================== #
# Throttle as Remy Sharp commanded:
# https://remysharp.com/2010/07/21/throttling-function-calls
# ========================================== #

throttle = (fn, threshhold, scope) ->
  threshhold or (threshhold = 250)
  last = undefined
  deferTimer = undefined
  ->
    context = scope or this
    now = +new Date
    args = arguments
    if last and now < last + threshhold

      # hold on to it
      clearTimeout deferTimer
      deferTimer = setTimeout(->
        last = now
        fn.apply context, args
      , threshhold)
    else
      last = now
      fn.apply context, args