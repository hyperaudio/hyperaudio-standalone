let renderFoldSwiper = function() {
  let foldSwipers     = document.querySelectorAll(".foldswiper");
  return [].forEach.call(foldSwipers, function(foldSwiper) {
    let togglePrev      = document.getElementById("slide-prev");
    let toggleNext      = document.getElementById("slide-next");

    let swipaa                = new Swiper(foldSwiper, {
      wrapperClass        : "foldswiper__wrapper",
      slideClass          : "foldswiper__item",
      slideActiveClass    : "foldswiper__item--active",
      noSwipingClass      : "disable-swiper",
      slideElement        : "div",

      pagination          : ".foldswiper__pager",
      paginationClickable : true,
      createPagination    : true,
      paginationElement   : "span",
      paginationElementClass : "pager__item",
      paginationActiveClass  : "pager__item--active",
      paginationVisibleClass : "pager__item--visible",

      mode                : "horizontal",
      loop                : true,
      autoplay            : 10000,
      speed               : 750,
      noSwiping           : true,
      mousewheelControl   : true,
      mousewheelControlForceToAxis: true,

      moveStartThreshold  : 20, // in pixels
      cssWidthAndHeight   : "height",
      DOMAnimation        : false,
      resizeReInit        : true
    }
    );
      // onSlideChangeEnd    : ->
      //   swipaa.stopAutoplay()

    togglePrev.addEventListener("click", e => swipaa.swipePrev()
    );

    return toggleNext.addEventListener("click", e => swipaa.swipeNext()
    );
  }
  );
};