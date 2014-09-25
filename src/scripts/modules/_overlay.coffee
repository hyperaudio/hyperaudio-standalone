# ========================================== #
# Overlay
# ========================================== #

# @overlay              = $(".page-overlay")

# $(@overlay).on "data-attribute-changed", ->
#   renderOverlay()

# toggleOverlay = (state) ->
#   @state = $(@overlay).data "state"
#   if @state is "active"
#     $(@overlay).data "state", "inactive"
#   else
#     $(@overlay).data "state", "active"

# renderOverlay = ->
#   @overlayState       = $(@overlay).data("state")
#   if @overlayState is "active"
#     @pageOver.removeClass "hide"
#     @pageOver.addClass    "show"
#   else
#     @pageOver.removeClass "show"
#     @pageOver.addClass    "hide"