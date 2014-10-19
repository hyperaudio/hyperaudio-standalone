renderFoldCards = () ->
  foldCards     = document.querySelectorAll ".foldcard"
  [].forEach.call foldCards, (foldCard) ->
    foldCardEl  = foldCard.querySelectorAll(".foldcard__el")[0]
    fitFold foldCard, foldCardEl