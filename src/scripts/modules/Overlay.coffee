# renderOverlay = () ->
#   pageOverlay       = document.getElementById("page-overlay")
#   unless pageOverlay is null
#     pageOverlayState  = pageOverlay.getAttribute "data-overlay-state"
#     if pageOverlayState is "cover-left"
#       addClass pageOverlay, "cover-left"
#       removeClass pageOverlay, "hide"
#     else if pageOverlayState is "cover-right"
#       addClass pageOverlay, "cover-right"
#       removeClass pageOverlay, "hide"
#     else if pageOverlayState is "cover-all"
#       addClass pageOverlay, "cover-all"
#       removeClass pageOverlay, "hide"
#     else
#       addClass pageOverlay, "hide"
#       removeClass pageOverlay, "cover-all"
#       removeClass pageOverlay, "cover-right"
#       removeClass pageOverlay, "cover-left"
#     fitFold(pageOverlay)
#
# toggleOverlay = (state) ->
#   pageOverlay       = document.getElementById("page-overlay")
#   unless pageOverlay is null
#     pageOverlay.setAttribute "data-overlay-state", state
#     renderOverlay()
