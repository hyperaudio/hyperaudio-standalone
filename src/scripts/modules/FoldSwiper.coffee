renderFoldSwiper = () ->
  foldSwipers     = document.querySelectorAll ".foldswiper"
  [].forEach.call foldSwipers, (foldSwiper) ->
    swiper                = new Swiper foldSwiper,
      wrapperClass        : "foldswiper__wrapper"
      slideClass          : "foldswiper__item"
      slideActiveClass    : "foldswiper__item--active"
      slideElement        : "div"

      mode                : "horizontal"
      loop                : true
      autoplay            : 5000
      speed               : 500

      moveStartThreshold  : 20 # in pixels
      cssWidthAndHeight   : "height"
      DOMAnimation        : false