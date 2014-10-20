renderFoldCards = () ->
  foldCards     = document.querySelectorAll ".foldcard"
  [].forEach.call foldCards, (foldCard) ->
    foldCardEl  = foldCard.querySelectorAll(".foldcard__el")[0]
    foldCardFit = foldCard.getAttribute "data-fit"
    if foldCardFit is "true"
      fitFold foldCard, foldCardEl