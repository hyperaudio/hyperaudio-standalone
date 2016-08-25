let renderFoldCards = function() {
  let foldCards     = document.querySelectorAll(".foldcard");
  return [].forEach.call(foldCards, function(foldCard) {
    let foldCardEl  = foldCard.querySelectorAll(".foldcard__el")[0];
    let foldCardFit = foldCard.getAttribute("data-fit");
    if (foldCardFit === "true") {
      return fitFold(foldCard, foldCardEl);
    }
  }
  );
};