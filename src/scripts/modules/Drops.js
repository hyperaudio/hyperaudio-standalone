let renderDrops       = function() {
  let drops           = document.getElementsByClassName("drop");
  return [].forEach.call(drops, function(drop) {
    let dropTarget    = drop.getElementsByClassName("drop__toggle")[0];
    let dropPosition  = drop.getAttribute("data-drop-position");
    let shareable     = new Drop({
      target                  : dropTarget,
      content() {
        return this.target.nextElementSibling.innerHTML;
      },
      position                : dropPosition,
      openOn                  : 'hover',
      constrainToWindow       : true,
      constrainToScrollParent : true,
      remove                  : true
    });
    window.addEventListener("click", () => shareable.close()
    );
    return dropTarget.addEventListener("click", function() {
      shareable.toggle();
      return event.stopPropagation();
    }
    );
  }
  );
};