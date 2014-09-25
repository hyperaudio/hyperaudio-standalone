# ========================================== #
# FitFold
# ========================================== #

# _ = require "underscore"
# $ = require "jquery"

# module.exports = ->

#   # Define Magic
#   # ------------------------------------------ #
#   fitFold = () ->
#     @fold               = $("[data-fold]")
#     foldHeight          = $(window).height()
#     $(@fold).css
#       "height": foldHeight

#   # Call the function where needed
#   # ------------------------------------------ #
#   $(window).resize _.throttle(fitFold(), 500)
#   fitFold()