## Toggle Swiper on .foldswiper elements

renderFoldSwiper = () ->
  i = undefined
  foldSwipers = document.getElementsByClassName "foldswiper"
  i = 0
  while i < foldSwipers.length
    @foldSwiperHolder     = foldSwipers[i]
    @foldSwiper           = new Swiper @foldSwiperHolder,
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
    ++i