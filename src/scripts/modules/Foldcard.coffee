renderFoldCards = () ->
  i = undefined
  foldCards = document.querySelectorAll ".fold-card"
  i = 0
  while i < foldCards.length
    @foldCard   = foldCards[i]
    @foldCardEl = @foldCard.querySelectorAll(".fold-card-el")[0]
    fitFold(@foldCard, @foldCardEl)
    ++i