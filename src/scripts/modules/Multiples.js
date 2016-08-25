let onMultipleSelect = function(el, cat, key) {
  let elParent    = el.parentNode;
  let elSiblings  = elParent.getElementsByClassName("multiple__item");
  [].forEach.call(elSiblings, aSibling => removeClass(aSibling, "multiple__item--selected")
  );
  toggleClass(el, "multiple__item--selected");

  return console.log(`category: ${cat} key: ${key}`);
};

let renderMultiples = function() {
  let hMultiple     = document.querySelectorAll(".multiple--horizontal");
  [].forEach.call(hMultiple, function(multiple) {
    let category    = multiple.getAttribute("data-category");
    if (category !== null) {
      let multipleToggles = multiple.querySelectorAll(".multiple__item");
      return [].forEach.call(multipleToggles, el =>
        el.addEventListener("click", function(e) {
          el        = e.currentTarget;
          let key       = el.getAttribute("data-search-tag");
          return onMultipleSelect(el, category, key);
        }
        )
      
      );
    }
  }
  );

  return [].forEach.call(hMultiple, function(multiple) {
    let centered    = multiple.getAttribute("data-centered");
    let slideDef    = multiple.getAttribute("data-init-slide");
    let width       = multiple.offsetWidth;
    let items       = multiple.querySelectorAll(".multiple__item");
    let widths      = calcDim(items);

    if (centered === "true" && widths > width) {
      let multipleSwiper;
      addClass(multiple, "multiple--centered");
      if (slideDef === null) {
        items     = multiple.querySelectorAll(".multiple__item");
        var initSlide = Math.round(items.length / 2) - 1;
      } else {
        var initSlide = slideDef;
      }

      return multipleSwiper        = new Swiper(multiple, {
        mode                : "horizontal",
        initialSlide        : initSlide,
        loop                : false,
        autoplay            : false,

        wrapperClass        : "multiple__wrapper",
        slideClass          : "multiple__item",
        slideActiveClass    : "multiple__item--active",
        slideElement        : "a",

        cssWidthAndHeight   : "height",
        slidesPerView       : "auto",
        slidesPerViewFit    : false,
        resizeReInit        : true,
        preventLinks        : true,
        centeredSlides      : true,
        onSlideClick() {
          let i   = multipleSwiper.clickedSlideIndex;
          slideDef = i;
          return multipleSwiper.swipeTo(i);
        }
      }
      );
    }
  }
  );
};