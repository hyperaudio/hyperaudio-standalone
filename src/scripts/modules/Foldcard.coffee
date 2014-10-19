renderFoldCards = () ->
  i = undefined
  foldCards = document.querySelectorAll ".foldcard"
  i = 0
  while i < foldCards.length
    @foldCard   = foldCards[i]
    @foldCardEl = @foldCard.querySelectorAll(".foldcard__el")[0]
    fitFold(@foldCard, @foldCardEl)
    fitFold(@foldCard, @foldCardEl)
    ++i