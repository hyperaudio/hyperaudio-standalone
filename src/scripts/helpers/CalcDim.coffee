calcDim = (els) ->
  val = undefined
  val = 0
  [].forEach.call els, (el) ->
    val += el.offsetWidth
  val