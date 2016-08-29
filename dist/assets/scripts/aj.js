let calcDim = function(els) {
  let val = undefined;
  val = 0;
  [].forEach.call(els, el => val += el.offsetWidth
  );
  return val;
};
let getCookie = function(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) { c_end = document.cookie.length; }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};
let createCookie = function(name, value, days) {
  let expires = undefined;
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  } else {
    expires = "";
  }
  return document.cookie = name + "=" + value + expires + "; path=/";
};
// ========================================== #
// Render Fold
// ========================================== #

let fitFold = function(el, child) {
  if (typeof el !== "null") {
    var windowHeight        = window.innerHeight;
    el.style.height     = windowHeight + "px";
  }
  if (typeof child !== "undefined") {
    let childHeight         = child.offsetHeight;
    let childCalcPosition   = (windowHeight - childHeight) / 2;
    return child.style.top     = childCalcPosition + "px";
  }
};
let scrollTo = function(element, to, duration) {
  let start = element.scrollTop;
  let change = to - start;
  let currentTime = 0;
  let increment = 20;
  let animateScroll = function() {
    currentTime += increment;
    let val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) { return setTimeout(animateScroll, increment); }
  };

  return animateScroll();
};
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) { return ((c / 2) * t * t) + b; }
  t--;
  return ((-c / 2) * ((t * (t - 2)) - 1)) + b;
};
// ========================================== #
// Throttle as Remy Sharp commanded:
// https://remysharp.com/2010/07/21/throttling-function-calls
// ========================================== #

let throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  let last = undefined;
  let deferTimer = undefined;
  return function() {
    let context = scope || this;
    let now = +new Date();
    let args = arguments;
    if (last && now < last + threshhold) {

      // hold on to it
      clearTimeout(deferTimer);
      return deferTimer = setTimeout(function() {
        last = now;
        return fn.apply(context, args);
      }
      , threshhold);
    } else {
      last = now;
      return fn.apply(context, args);
    }
  };
};
let toggleClass = function(el, className) {
  if (el.classList) {
    return el.classList.toggle(className);
  } else {
    let classes = el.className.split(" ");
    let existingIndex = classes.indexOf(className);
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }
    return el.className = classes.join(" ");
  }
};

let hasClass = function(el, className) {
  className = ` ${className} `;
  if ((` ${el.className} `).replace(/[\n\t]/g, " ").indexOf(className) > -1) { return true; }
  return false;
};

let addClass = function(el, className) {
  if (!hasClass(el, className)) { return el.className += ` ${className}`; }
};

let removeClass = function(el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    return el.className = el.className.replace(reg, " ");
  }
};
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
let renderHead = function() {
  let pageHead      = document.getElementById("page-head");
  if (pageHead !== null) {
    let pageHeadState = pageHead.getAttribute("data-head-state");
    if (pageHeadState === "altered") {
      return addClass(pageHead, "page-head--altered");
    } else {
      return removeClass(pageHead, "page-head--altered");
    }
  }
};

let toggleHead = function() {
  let pageHead        = document.getElementById("page-head");
  if (pageHead !== null) {
    let pageHeadPersist = pageHead.getAttribute("data-head-state-persist");
    if (pageHeadPersist !== "true") {
      if (window.pageYOffset > 30) {
        pageHead.setAttribute("data-head-state", "altered");
      } else {
        pageHead.setAttribute("data-head-state", "");
      }
      return renderHead();
    }
  }
};
let menu                  = document.getElementById("page-menu");

let menuPanes             = document.getElementsByClassName("menu__pane");
let rootPane              = document.getElementById("menu__pane--root");
let menuReset             = document.getElementById("menu-reset");

let renderMenu = function() {
  if (menu !== null) {
    let activePaneId        = menu.getAttribute("data-active-pane");
    if (activePaneId === "root") {
      let i = undefined;
      menuPanes = document.querySelectorAll(".menu__pane");
      i = 0;
      while (i < menuPanes.length) {
        addClass(menuPanes[i], "moved--right");
        ++i;
      }
      removeClass(rootPane, "moved--right");
      removeClass(rootPane, "moved--left");
      return addClass(menuReset, "moved");

    } else {
      addClass(rootPane, "moved--left");
      let activePaneEl      = document.getElementById(`menu__pane--${activePaneId}`);
      removeClass(activePaneEl, "moved--right");
      return removeClass(menuReset, "moved");
    }
  }
};

let onMenuPaneToggle = function(el) {
  let targetPaneId  = el.getAttribute("data-target-menu-pane-id");
  menu.setAttribute("data-active-pane", targetPaneId);
  return renderMenu();
};

// Bind Clicks
let menuToggles = document.querySelectorAll(".toggleMenuPane");
[].forEach.call(menuToggles, el =>
  el.addEventListener("click", e => onMenuPaneToggle(e.currentTarget)
  )

);
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
let renderOverlay = function() {
  let pageOverlay       = document.getElementById("page-overlay");
  if (pageOverlay !== null) {
    let pageOverlayState  = pageOverlay.getAttribute("data-overlay-state");
    if (pageOverlayState === "cover-left") {
      addClass(pageOverlay, "cover-left");
      removeClass(pageOverlay, "hide");
    } else if (pageOverlayState === "cover-right") {
      addClass(pageOverlay, "cover-right");
      removeClass(pageOverlay, "hide");
    } else if (pageOverlayState === "cover-all") {
      addClass(pageOverlay, "cover-all");
      removeClass(pageOverlay, "hide");
    } else {
      addClass(pageOverlay, "hide");
      removeClass(pageOverlay, "cover-all");
      removeClass(pageOverlay, "cover-right");
      removeClass(pageOverlay, "cover-left");
    }
    return fitFold(pageOverlay);
  }
};

let toggleOverlay = function(state) {
  let pageOverlay       = document.getElementById("page-overlay");
  if (pageOverlay !== null) {
    pageOverlay.setAttribute("data-overlay-state", state);
    return renderOverlay();
  }
};
let renderPage = function() {
  let page      = document.body;
  let pageState = page.getAttribute("data-page-state");

  if (pageState === "clipped") {
    return addClass(page, "clipped");
  } else {
    return removeClass(page, "clipped");
  }
};
let renderPanels        = function() {
  let page              = document.body;
  let panels            = document.querySelectorAll(".panel");
  let states            = [];

  // Populate states array with states of all panels
  // Toggle visibility classes on panels according to the data attributes
  [].forEach.call(panels, function(panel) {
    let panelState      = panel.getAttribute("data-panel-state");
    states.push(panelState);
    if (panelState === "active") {
      return addClass(panel, "panel--active");
    } else {
      return removeClass(panel, "panel--active");
    }
  }
  );

  // See if there are any panels open and, if so, toggle overlay and clip body
  if (states.indexOf("active") === -1) {
    page.setAttribute("data-page-state", "");
    return toggleOverlay("cover-none");
  } else {
    page.setAttribute("data-page-state", "clipped");
    return toggleOverlay("cover-all");
  }
};

// Alters target panel's state and/or disables all panels when page-overlay was clicked
let alterPanelState     = function(targetPanelId) {
  let panels            = document.querySelectorAll(".panel");
  if (targetPanelId === "all") {
    [].forEach.call(panels, panel => panel.setAttribute("data-panel-state", "inactive")
    );
  } else {
    let targetPanel       = document.getElementById(`panel--${targetPanelId}`);
    let targetPanelState  = targetPanel.getAttribute("data-panel-state");
    if (targetPanelState === "active") {
      targetPanel.setAttribute("data-panel-state", "inactive");
    } else {
      targetPanel.setAttribute("data-panel-state", "active");
    }
  }
  return renderPanels();
};

// Launch on click methods
let onPanelToggle    = function(el) {
  let targetPanelId  = el.getAttribute("data-panel-target");
  alterPanelState(targetPanelId);
  return renderPanels();
};

// Bind clicks
let panelTogglers = document.querySelectorAll(".togglePanel");
[].forEach.call(panelTogglers, el =>
  el.addEventListener("click", e => onPanelToggle(e.currentTarget)
  )

);
// Load search index
let index = undefined; // we will load the index in here
let titles = {}; // we will load the titles in here
let searchPath = "data/search/";
// searchPath = "http://10.24.21.20/~laurian/PALESTINE%20PROJECT/DATA/MEDIA/SEARCH"

let request0 = new XMLHttpRequest();
request0.open("GET", TRANSCRIPTS + "list.json", true);
request0.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      let _titles = JSON.parse(this.responseText);
      // console.log(_titles)
      let i = 0;
      while (i < _titles.length) {
        titles[`${_titles[i]._id}`] = _titles[i].label;
        i++;
      }

      let request = new XMLHttpRequest();
      request.open("GET", searchPath + "index.json", true);
      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            index = lunr.Index.load(JSON.parse(this.responseText));
            let listingSearchInput = document.getElementById("search");
            let dispatch = true;
            if (listingSearchInput === null) {
              listingSearchInput = document.getElementById("HAP-search");
              dispatch = false;
            }
            if (listingSearchInput !== null) {
              listingSearchInput.addEventListener("change", doSearch);
              if (getParameterByName("search")) { listingSearchInput.setAttribute("value", getParameterByName("search")); }
              if (dispatch) {
                let event = document.createEvent("HTMLEvents");
                event.initEvent("change", true, false);
                return listingSearchInput.dispatchEvent(event);
              }
            }
          }
        }
      };
          // else
          //   console.log("Silent Error")

      request.send();
      return request = null;
    }
  }
};

// Parse URL and populate search input with parameters
var getParameterByName = function(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  let results = regex.exec(window.top.location.search);
  (results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")));
};

// Do the magic
var doSearch = function() {
  // clean-up
  let insideHAP = false;
  if (document.querySelectorAll(".listing").length > 0) {
    var resultsContainer = document.querySelectorAll(".listing")[0];
  }
  if (document.querySelectorAll(".HAP-listing").length > 0) {
    var resultsContainer = document.querySelectorAll(".HAP-listing")[0];
    insideHAP = true;
  }

  while (resultsContainer.firstChild) { resultsContainer.removeChild(resultsContainer.firstChild); }
  let searchEl = document.getElementById("search");
  if (searchEl === null) {
    searchEl = document.getElementById("HAP-search");
  }
  let query = searchEl.value.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace('،', ' ').replace(/\n/, ' ').replace(/\s+/g, ' ').trim();
  let results = index.search(query);
  // if results.length is 0
  //   console.log("no results for: " + query)
  let r = 0;
  let _length = results.length;
  if (_length > 20) {
    _length = 20;
  }
  while (r < _length) {
    // don't ask
    (function() {
      // video-paragraph-timecode
      let idParts = results[r].ref.split("-");
      let id = idParts[0] + "-" + (parseInt(idParts[1]) + 0);
      let second = parseInt(idParts[2] / 1000);
      if (second === 0) { second = 1; }
      let el = document.createElement("div");
      // el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><a class=\"thumbnail tile__thumbnail\"><img src=\"http://10.24.21.20/~laurian/PALESTINE PROJECT/DATA/MEDIA/SEARCH/images/" + idParts[0] + "/E/p/img" + second + ".jpg\" class=\"thumbnail__image\"></a><div class=\"tile__body\"><p class=\"tile__transcript\">loading…</p></div></div></li>"
      let title = titles[idParts[0]];
      if (insideHAP) {
        el.innerHTML = `<li id=r${id} class="listing__item"><div class="tile"><div class="tile__body"><p class="tile__transcript">loading…</p><p class="tile__title"><a href="#/${idParts[0]}/${idParts[2]}">${title}</a></p></div></div></li>`;
        // el.querySelector('a').addEventListener('click', function() {});
      } else {
        el.innerHTML = `<li id=r${id} class="listing__item"><a class="tile" href="../remix/view/#/${idParts[0]}/${idParts[2]}"><div class="thumbnail tile__thumbnail"><img src="http://interactive.aljazeera.com/aje/PalestineRemix/transcripts/images/${idParts[0]}/${L}/p/img${second}.jpg" class="thumbnail__image"></div><div class="tile__body"><p class="tile__transcript">loading…</p><p class="tile__title">${title}</p></div></a></li>`;
      }

      let result = el.children[0];
      resultsContainer.appendChild(result);
      // AJAX
      let request = new XMLHttpRequest();
      request.open("GET", searchPath + "/text/" + L + "/" + id + ".txt", true);
      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            let search = query.split(" ");
            let sentences = this.responseText.split("."); // meh
            let resultSentences = [];
            let s = 0;
            while (s < sentences.length) {
              let match = 0;
              let words = sentences[s].split(" ");
              let i = 0;
              while (i < search.length) {
                if (L === 'E') { var keyword = lunr.stemmer(search[i].toLowerCase()); }
                if (L === 'B') { var keyword = lunr.stemmer(search[i].toLowerCase()); }
                if (L === 'A') { var keyword = lunr.ar.stemmer(search[i].toLowerCase()); }
                if (L === 'T') { var keyword = lunr.tr.stemmer(search[i].toLowerCase()); }

                let j = 0;
                while (j < words.length) {
                  if (L === 'E') { var sword = lunr.stemmer(words[j].toLowerCase()); }
                  if (L === 'B') { var sword = lunr.stemmer(words[j].toLowerCase()); }
                  if (L === 'A') { var sword = lunr.ar.stemmer(words[j].toLowerCase()); }
                  if (L === 'T') { var sword = lunr.tr.stemmer(words[j].toLowerCase()); }
                  if (sword.indexOf(keyword) > -1) {
                    if (insideHAP) {
                      words[j] = `<a class="highlight" href="#/${idParts[0]}/${idParts[2]}">${words[j]}</a>`;
                    } else {
                      words[j] = `<a class="highlight" href="../remix/view/#/${idParts[0]}/${idParts[2]}">${words[j]}</a>`;
                    }
                    match++;
                  }
                  j++;
                }
                i++;
              }
              if (match > 0) {
                sentences[s] = words.join(" ");
                resultSentences.push(sentences[s]);
              } else {
                resultSentences = sentences;
              }
              s++;
            }
            document.querySelectorAll(`#r${id} .tile__transcript`)[0].innerHTML = resultSentences.join(". ") + ".";

            let ev = document.createEvent("Event");
            ev.initEvent("searchresult", true, true);
            return document.querySelectorAll(`#r${id} .tile__transcript`)[0].dispatchEvent(ev);
          }
        }
      };

      request.send();
      return request = null;
    })();
    r++;
  }

  let ev = document.createEvent("Event");
  ev.initEvent("searchresults", true, true);
  return document.dispatchEvent(ev);
};

request0.send();
request0 = null;

let setSharePath = function() {
  let thisPageURL = window.top.location.href;
  let shareLinks  = document.querySelectorAll(".jsSetSharePath");
  return [].forEach.call(shareLinks, function(shareLink) {
    let shareLinkHref   = shareLink.getAttribute("href");
    let shareLinkNuHref = shareLinkHref.replace("UURRLL", encodeURIComponent(thisPageURL));
    return shareLink.setAttribute("href", shareLinkNuHref);
  }
  );
};
let renderSides         = function() {

  let page              = document.body;
  let sides             = document.querySelectorAll(".page-side");
  let head              = document.getElementById("page-head");
  let body              = document.getElementById("page-body");
  let states            = [];

  if (hasClass(page, "tpl--responsive")) {
    let leftSide          = document.getElementById("page-side--left");
    let windowWidth       = window.innerWidth;
    if (windowWidth > 1024) {
      leftSide.setAttribute("data-side-state", "active");
      leftSide.setAttribute("data-side-state-persist", "true");
      addClass(leftSide, "page-side--persistent");
    } else {
      leftSide.setAttribute("data-side-state-persist", "");
      removeClass(leftSide, "page-side--persistent");
    }
  }

  // Populate states array with states of all sides
  // Toggle visibility classes on panels according to the data attributes
  [].forEach.call(sides, function(side) {
    let sideState       = side.getAttribute("data-side-state");
    let sideDirection   = side.getAttribute("data-side-push");
    let persistAttr     = side.getAttribute("data-side-state-persist");
    if (persistAttr !== "true") {
      states.push(sideState);
      if (sideState === "active") {
        addClass(body, `moved--${sideDirection}`);
        addClass(head, `moved--${sideDirection}`);
        removeClass(side, "moved");
        if (sideDirection === "left") {
          return toggleOverlay("cover-left");
        } else {
          return toggleOverlay("cover-right");
        }
      } else {
        removeClass(body, `moved--${sideDirection}`);
        removeClass(head, `moved--${sideDirection}`);
        return addClass(side, "moved");
      }
    }
  }
  );

  // See if there are any panels open and, if so, toggle overlay and clip body
  if (states.indexOf("active") === -1) {
    page.setAttribute("data-page-state", "");
    // toggleOverlay "cover-none"
  } else {
    page.setAttribute("data-page-state", "clipped");
  }
  return renderPage();
};

// Alters target side's state and/or disables all panels when page-overlay was clicked
let alterSideState    = function(targetSideId) {
  let sides           = document.querySelectorAll(".page-side");
  if (targetSideId === "all") {
    [].forEach.call(sides, function(side) {
      let persistAttr = side.getAttribute("data-side-state-persist");
      if (persistAttr !== "true") {
        return side.setAttribute("data-side-state", "inactive");
      }
    }
    );
  } else {
    let targetSide      = document.getElementById(`page-side--${targetSideId}`);
    let targetSideState = targetSide.getAttribute("data-side-state");
    let persistAttr     = targetSide.getAttribute("data-side-state-persist");
    if (persistAttr !== "true") {
      if (targetSideState === "active") {
        targetSide.setAttribute("data-side-state", "inactive");
      } else {
        targetSide.setAttribute("data-side-state", "active");
      }
    }
  }
  return renderSides();
};

let onSideToggle    = function(el) {
  let targetSideId  = el.getAttribute("data-side-target");
  return alterSideState(targetSideId);
};

// Bind clicks
let sideTogglers = document.querySelectorAll(".toggleSide");
[].forEach.call(sideTogglers, el =>
  el.addEventListener("click", e => onSideToggle(e.currentTarget)
  )

);
if (window.parent !== window) {
  if (document.body.classList) {
    document.body.classList.add("tpl--compact");
  } else {
    document.body.className += " tpl--compact";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  renderDrops();
  renderFoldCards();
  renderFoldSwiper();
  renderHead();
  renderMenu();
  renderOverlay();
  renderPanels();
  renderPage();
  renderSides();
  renderMultiples();
  setSharePath();

  window.onresize = throttle(function(event) {
    renderOverlay();
    renderFoldCards();
    renderMultiples();
    return renderSides();
  }
  , 350);

  window.onscroll = throttle(event => toggleHead()
  , 350);

  // return window.addEventListener("load", (() => FastClick.attach(document.body)), false);
}
);
