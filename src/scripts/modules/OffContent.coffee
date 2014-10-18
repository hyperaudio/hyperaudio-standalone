## Toggle offblock on scroll

toggleOffCanvasBlock  = (el, state) ->
  block = el
  state = state
  if state is "on"
    block.classList.add "offblock--on"
  else
    block.classList.remove "offblock--on"

handleOffCanvasBlocks = () ->
  windowHeight        = window.innerHeight
  blockTogglePosition = pageYOffset
  i = undefined
  offCanvasBlocks = document.querySelectorAll ".offblock"
  i = 0
  while i < offCanvasBlocks.length
    @offBlock           = offCanvasBlocks[i]
    @offBlockPosition   = @offBlock.offsetTop
    @offBlockPersist    = @offBlock.getAttribute "data-persist"
    unless @offBlockPersist is "true"
      if @offBlockPosition < blockTogglePosition
        toggleOffCanvasBlock(@offBlock, "on")
        @offBlock.setAttribute "data-persist", "true"
      else
        toggleOffCanvasBlock(@offBlock, "off")
    ++i