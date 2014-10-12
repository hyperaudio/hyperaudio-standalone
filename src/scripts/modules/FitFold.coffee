# ========================================== #
# Render Fold
# ========================================== #

renderFold = () ->
  fold                = $("[data-fold]")
  foldHeight          = $(window).height()
  foldEl              = $(fold).find("[data-fold-el]")
  foldElHeight        = $(foldEl).height()
  foldDeliverable     = (foldHeight - foldElHeight) / 2
  $(fold).css
    "height": foldHeight
  $(foldEl).css
    "top": foldDeliverable