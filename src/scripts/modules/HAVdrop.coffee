toggleHAVDrop = (el, text, uri) ->
  console.log el
  console.log "text: " + text
  console.log "uri: " + uri

  # HAVdrop = new Drop
  #   target: ->
  #     document.createElement el
  #   content: ->
  #     return text
  #   position: 'top center'
  #   openOn: 'always'

  # drops         = document.getElementsByClassName("drop")
  # [].forEach.call drops, (drop) ->
  #   dropTarget  = drop.getElementsByClassName("drop__toggle")[0]
  #   shareable   = new Drop
  #     target                  : dropTarget
  #     content                 : ->
  #       return this.target.nextElementSibling.innerHTML
  #     position                : 'left middle'
  #     openOn                  : 'hover'
  #     constrainToWindow       : true
  #     constrainToScrollParent : true
  #     remove                  : true
  #   window.addEventListener "click", () ->
  #     shareable.close()
  #   dropTarget.addEventListener "click", () ->
  #     shareable.toggle()
  #     event.stopPropagation()