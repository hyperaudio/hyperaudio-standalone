# ========================================== #
# Overlay
# ========================================== #

overlay              = $(".page-overlay")

renderOverlay = ->
  @overlayState      = $(overlay).data("state")
  if @overlayState is "active"
    $(overlay).removeClass "hide"
    $(overlay).addClass    "show"
  else
    $(overlay).removeClass "show"
    $(overlay).addClass    "hide"

toggleOverlay = (state) ->
  $(overlay).data "state", state
  renderOverlay()