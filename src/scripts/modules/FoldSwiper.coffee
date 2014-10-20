renderFoldSwiper = () ->
  foldSwipers     = document.querySelectorAll ".foldswiper"
  [].forEach.call foldSwipers, (foldSwiper) ->
    swiper                = new Swiper foldSwiper,
      wrapperClass        : "foldswiper__wrapper"
      slideClass          : "foldswiper__item"
      slideActiveClass    : "foldswiper__item--active"
      noSwipingClass      : "disable-swiper"
      slideElement        : "div"

      pagination          : ".foldswiper__pager"
      paginationClickable : true
      createPagination    : true
      paginationElement   : "span"
      paginationElementClass : "pager__item"
      paginationActiveClass  : "pager__item--active"
      paginationVisibleClass : "pager__item--visible"


      mode                : "horizontal"
      loop                : true
      # autoplay            : false
      autoplay            : 5000
      speed               : 750
      noSwiping           : true

      moveStartThreshold  : 20 # in pixels
      cssWidthAndHeight   : "height"
      DOMAnimation        : false
      # mousewheelControl   : false