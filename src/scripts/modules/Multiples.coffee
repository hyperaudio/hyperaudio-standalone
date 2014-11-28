onMultipleSelect = (el, cat, key) ->
  elParent    = el.parentNode
  elSiblings  = elParent.getElementsByClassName "multiple__item"
  [].forEach.call elSiblings, (aSibling) ->
    removeClass aSibling, "multiple__item--selected"
  toggleClass el, "multiple__item--selected"

  console.log "category: " + cat + " key: " + key

renderMultiples = () ->
  hMultiple     = document.querySelectorAll ".multiple--horizontal"
  [].forEach.call hMultiple, (multiple) ->
    category    = multiple.getAttribute "data-category"
    unless category is null
      multipleToggles = multiple.querySelectorAll ".multiple__item"
      [].forEach.call multipleToggles, (el) ->
        el.addEventListener "click", (e) ->
          el        = e.currentTarget
          key       = el.getAttribute "data-search-tag"
          onMultipleSelect el, category, key

  [].forEach.call hMultiple, (multiple) ->
    centered    = multiple.getAttribute "data-centered"
    slideDef    = multiple.getAttribute "data-init-slide"
    width       = multiple.offsetWidth
    items       = multiple.querySelectorAll ".multiple__item"
    widths      = calcDim items

    if centered is "true" and widths > width
      addClass multiple, "multiple--centered"
      if slideDef is null
        items     = multiple.querySelectorAll ".multiple__item"
        initSlide = Math.round(items.length / 2) - 1
      else
        initSlide = slideDef

      multipleSwiper        = new Swiper multiple,
        mode                : "horizontal"
        initialSlide        : initSlide
        loop                : false
        autoplay            : false

        wrapperClass        : "multiple__wrapper"
        slideClass          : "multiple__item"
        slideActiveClass    : "multiple__item--active"
        slideElement        : "a"

        cssWidthAndHeight   : "height"
        slidesPerView       : "auto"
        slidesPerViewFit    : false
        resizeReInit        : true
        preventLinks        : true
        centeredSlides      : true
        onSlideClick        : ->
          i   = multipleSwiper.clickedSlideIndex
          slideDef = i
          multipleSwiper.swipeTo i