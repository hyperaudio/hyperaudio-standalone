window.onload = ->
  mySwiper = new Swiper(".swipe-list",

    #Your options here:
    mode: "horizontal"
    loop: false
    wrapperClass: "swipe-list__wrapper"
    slideClass: "swipe-list__item"
    slideActiveClass: "swipe-list__item--active"
    slideElement: "li"
    createPagination: false
    moveStartThreshold: 20 # in pixels
    simulateTouch: true
    useCSS3Transforms: true
    centeredSlides: true
    resizeReInit: true
    DOMAnimation: true
    calculateHeight: true
    preventLinks: true
    slidesPerView: "auto"
    roundLengths: true
    watchActiveIndex: true
    autoResize: true
  )