# ========================================== #
# ClipBody
# ========================================== #

# Name Elements
# ------------------------------------------ #

@pageBody             = $(".page-body")

# Define Magic
# ------------------------------------------ #

unclipBody = () ->
  $(@pageBody).removeClass("clipped")

clipBody = () ->
  $(@pageBody).addClass("clipped")

renderBody = () ->
  @state              = $(@pageBody).data("body-state")
  if @state is "clipped"
    clipBody()
  else
    unclipBody()