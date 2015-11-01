calcDim = (els) ->
  val = undefined
  val = 0
  [].forEach.call els, (el) ->
    val += el.offsetWidth
  val
getCookie = (c_name) ->
  if document.cookie.length > 0
    c_start = document.cookie.indexOf(c_name + "=")
    unless c_start is -1
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(";", c_start)
      c_end = document.cookie.length  if c_end is -1
      return unescape(document.cookie.substring(c_start, c_end))
  ""
createCookie = (name, value, days) ->
  expires = undefined
  if days
    date = new Date()
    date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toGMTString()
  else
    expires = ""
  document.cookie = name + "=" + value + expires + "; path=/"
# ========================================== #
# Render Fold
# ========================================== #

fitFold = (el, child) ->
  unless typeof el is "null"
    windowHeight        = window.innerHeight
    el.style.height     = windowHeight + "px"
  unless typeof child is "undefined"
    childHeight         = child.offsetHeight
    childCalcPosition   = (windowHeight - childHeight) / 2
    child.style.top     = childCalcPosition + "px"
scrollTo = (element, to, duration) ->
  start = element.scrollTop
  change = to - start
  currentTime = 0
  increment = 20
  animateScroll = ->
    currentTime += increment
    val = Math.easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    setTimeout animateScroll, increment  if currentTime < duration

  animateScroll()
Math.easeInOutQuad = (t, b, c, d) ->
  t /= d / 2
  return c / 2 * t * t + b  if t < 1
  t--
  -c / 2 * (t * (t - 2) - 1) + b
# ========================================== #
# Throttle as Remy Sharp commanded:
# https://remysharp.com/2010/07/21/throttling-function-calls
# ========================================== #

throttle = (fn, threshhold, scope) ->
  threshhold or (threshhold = 250)
  last = undefined
  deferTimer = undefined
  ->
    context = scope or this
    now = +new Date
    args = arguments
    if last and now < last + threshhold

      # hold on to it
      clearTimeout deferTimer
      deferTimer = setTimeout(->
        last = now
        fn.apply context, args
      , threshhold)
    else
      last = now
      fn.apply context, args
toggleClass = (el, className) ->
  if el.classList
    el.classList.toggle className
  else
    classes = el.className.split(" ")
    existingIndex = classes.indexOf(className)
    if existingIndex >= 0
      classes.splice existingIndex, 1
    else
      classes.push className
    el.className = classes.join(" ")

hasClass = (el, className) ->
  className = " " + className + " "
  return true if (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1
  false

addClass = (el, className) ->
  el.className += " " + className  unless hasClass(el, className)

removeClass = (el, className) ->
  if hasClass(el, className)
    reg = new RegExp("(\\s|^)" + className + "(\\s|$)")
    el.className = el.className.replace(reg, " ")
# renderDrops       = () ->
#   drops           = document.getElementsByClassName("drop")
#   [].forEach.call drops, (drop) ->
#     dropTarget    = drop.getElementsByClassName("drop__toggle")[0]
#     dropPosition  = drop.getAttribute "data-drop-position"
#     shareable     = new Drop
#       target                  : dropTarget
#       content                 : ->
#         return this.target.nextElementSibling.innerHTML
#       position                : dropPosition
#       openOn                  : 'hover'
#       constrainToWindow       : true
#       constrainToScrollParent : true
#       remove                  : true
#     window.addEventListener "click", () ->
#       shareable.close()
#     dropTarget.addEventListener "click", () ->
#       shareable.toggle()
#       event.stopPropagation()

# renderFoldSwiper = () ->
#   foldSwipers     = document.querySelectorAll ".foldswiper"
#   [].forEach.call foldSwipers, (foldSwiper) ->
#     togglePrev      = document.getElementById "slide-prev"
#     toggleNext      = document.getElementById "slide-next"
#
#     swipaa                = new Swiper foldSwiper,
#       wrapperClass        : "foldswiper__wrapper"
#       slideClass          : "foldswiper__item"
#       slideActiveClass    : "foldswiper__item--active"
#       noSwipingClass      : "disable-swiper"
#       slideElement        : "div"
#
#       pagination          : ".foldswiper__pager"
#       paginationClickable : true
#       createPagination    : true
#       paginationElement   : "span"
#       paginationElementClass : "pager__item"
#       paginationActiveClass  : "pager__item--active"
#       paginationVisibleClass : "pager__item--visible"
#
#       mode                : "horizontal"
#       loop                : true
#       autoplay            : 10000
#       speed               : 750
#       noSwiping           : true
#       mousewheelControl   : true
#       mousewheelControlForceToAxis: true
#
#       moveStartThreshold  : 20 # in pixels
#       cssWidthAndHeight   : "height"
#       DOMAnimation        : false
#       resizeReInit        : true
#       # onSlideChangeEnd    : ->
#       #   swipaa.stopAutoplay()
#
#     togglePrev.addEventListener "click", (e) ->
#       swipaa.swipePrev()
#
#     toggleNext.addEventListener "click", (e) ->
#       swipaa.swipeNext()

# renderFoldCards = () ->
#   foldCards     = document.querySelectorAll ".foldcard"
#   [].forEach.call foldCards, (foldCard) ->
#     foldCardEl  = foldCard.querySelectorAll(".foldcard__el")[0]
#     foldCardFit = foldCard.getAttribute "data-fit"
#     if foldCardFit is "true"
#       fitFold foldCard, foldCardEl

# renderHead = () ->
#   pageHead      = document.getElementById "page-head"
#   unless pageHead is null
#     pageHeadState = pageHead.getAttribute "data-head-state"
#     if pageHeadState is "altered"
#       addClass(pageHead, "page-head--altered")
#     else
#       removeClass(pageHead, "page-head--altered")
#
# toggleHead = ->
#   pageHead        = document.getElementById "page-head"
#   unless pageHead is null
#     pageHeadPersist = pageHead.getAttribute "data-head-state-persist"
#     unless pageHeadPersist is "true"
#       if window.pageYOffset > 30
#         pageHead.setAttribute "data-head-state", "altered"
#       else
#         pageHead.setAttribute "data-head-state", ""
#       renderHead()

# menu                  = document.getElementById "page-menu"
#
# menuPanes             = document.getElementsByClassName "menu__pane"
# rootPane              = document.getElementById "menu__pane--root"
# menuReset             = document.getElementById "menu-reset"
#
# renderMenu = () ->
#   unless menu is null
#     activePaneId        = menu.getAttribute "data-active-pane"
#     if activePaneId is "root"
#       i = undefined
#       menuPanes = document.querySelectorAll ".menu__pane"
#       i = 0
#       while i < menuPanes.length
#         addClass menuPanes[i], "moved--right"
#         ++i
#       removeClass rootPane, "moved--right"
#       removeClass rootPane, "moved--left"
#       addClass menuReset, "moved"
#
#     else
#       addClass rootPane, "moved--left"
#       activePaneEl      = document.getElementById "menu__pane--" + activePaneId
#       removeClass activePaneEl, "moved--right"
#       removeClass menuReset, "moved"
#
# onMenuPaneToggle = (el) ->
#   targetPaneId  = el.getAttribute "data-target-menu-pane-id"
#   menu.setAttribute "data-active-pane", targetPaneId
#   renderMenu()
#
# # Bind Clicks
# menuToggles = document.querySelectorAll ".toggleMenuPane"
# [].forEach.call menuToggles, (el) ->
#   el.addEventListener "click", (e) ->
#     onMenuPaneToggle(e.currentTarget)

# onMultipleSelect = (el, cat, key) ->
#   elParent    = el.parentNode
#   elSiblings  = elParent.getElementsByClassName "multiple__item"
#   [].forEach.call elSiblings, (aSibling) ->
#     removeClass aSibling, "multiple__item--selected"
#   toggleClass el, "multiple__item--selected"
#
#   console.log "category: " + cat + " key: " + key
#
# renderMultiples = () ->
#   hMultiple     = document.querySelectorAll ".multiple--horizontal"
#   [].forEach.call hMultiple, (multiple) ->
#     category    = multiple.getAttribute "data-category"
#     unless category is null
#       multipleToggles = multiple.querySelectorAll ".multiple__item"
#       [].forEach.call multipleToggles, (el) ->
#         el.addEventListener "click", (e) ->
#           el        = e.currentTarget
#           key       = el.getAttribute "data-search-tag"
#           onMultipleSelect el, category, key
#
#   [].forEach.call hMultiple, (multiple) ->
#     centered    = multiple.getAttribute "data-centered"
#     slideDef    = multiple.getAttribute "data-init-slide"
#     width       = multiple.offsetWidth
#     items       = multiple.querySelectorAll ".multiple__item"
#     widths      = calcDim items
#
#     if centered is "true" and widths > width
#       addClass multiple, "multiple--centered"
#       if slideDef is null
#         items     = multiple.querySelectorAll ".multiple__item"
#         initSlide = Math.round(items.length / 2) - 1
#       else
#         initSlide = slideDef
#
#       multipleSwiper        = new Swiper multiple,
#         mode                : "horizontal"
#         initialSlide        : initSlide
#         loop                : false
#         autoplay            : false
#
#         wrapperClass        : "multiple__wrapper"
#         slideClass          : "multiple__item"
#         slideActiveClass    : "multiple__item--active"
#         slideElement        : "a"
#
#         cssWidthAndHeight   : "height"
#         slidesPerView       : "auto"
#         slidesPerViewFit    : false
#         resizeReInit        : true
#         preventLinks        : true
#         centeredSlides      : true
#         onSlideClick        : ->
#           i   = multipleSwiper.clickedSlideIndex
#           slideDef = i
#           multipleSwiper.swipeTo i

renderOverlay = () ->
  pageOverlay       = document.getElementById("page-overlay")
  unless pageOverlay is null
    pageOverlayState  = pageOverlay.getAttribute "data-overlay-state"
    if pageOverlayState is "cover-left"
      addClass pageOverlay, "cover-left"
      removeClass pageOverlay, "hide"
    else if pageOverlayState is "cover-right"
      addClass pageOverlay, "cover-right"
      removeClass pageOverlay, "hide"
    else if pageOverlayState is "cover-all"
      addClass pageOverlay, "cover-all"
      removeClass pageOverlay, "hide"
    else
      addClass pageOverlay, "hide"
      removeClass pageOverlay, "cover-all"
      removeClass pageOverlay, "cover-right"
      removeClass pageOverlay, "cover-left"
    fitFold(pageOverlay)

toggleOverlay = (state) ->
  pageOverlay       = document.getElementById("page-overlay")
  unless pageOverlay is null
    pageOverlay.setAttribute "data-overlay-state", state
    renderOverlay()

defaultOptions =
  # How long should it take for the bar to animate to a new
  # point after receiving it
  catchupTime: 100

  # How quickly should the bar be moving before it has any progress
  # info from a new source in %/ms
  initialRate: .03

  # What is the minimum amount of time the bar should be on the
  # screen.  Irrespective of this number, the bar will always be on screen for
  # 33 * (100 / maxProgressPerFrame) + ghostTime ms.
  minTime: 250

  # What is the minimum amount of time the bar should sit after the last
  # update before disappearing
  ghostTime: 100

  # Its easy for a bunch of the bar to be eaten in the first few frames
  # before we know how much there is to load.  This limits how much of
  # the bar can be used per frame
  maxProgressPerFrame: 20

  # This tweaks the animation easing
  easeFactor: 1.25

  # Should pace automatically start when the page is loaded, or should it wait for `start` to
  # be called?  Always false if pace is loaded with AMD or CommonJS.
  startOnPageLoad: true

  # Should we restart the browser when pushState or replaceState is called?  (Generally
  # means ajax navigation has occured)
  restartOnPushState: true

  # Should we show the progress bar for every ajax request (not just regular or ajax-y page
  # navigation)? Set to false to disable.
  #
  # If so, how many ms does the request have to be running for before we show the progress?
  restartOnRequestAfter: 500

  # What element should the pace element be appended to on the page?
  target: 'body'

  elements:
    # How frequently in ms should we check for the elements being tested for
    # using the element monitor?
    checkInterval: 100

    # What elements should we wait for before deciding the page is fully loaded (not required)
    selectors: ['body']

  eventLag:
    # When we first start measuring event lag, not much is going on in the browser yet, so it's
    # not uncommon for the numbers to be abnormally low for the first few samples.  This configures
    # how many samples we need before we consider a low number to mean completion.
    minSamples: 10

    # How many samples should we average to decide what the current lag is?
    sampleCount: 3

    # Above how many ms of lag is the CPU considered busy?
    lagThreshold: 3

  ajax:
    # Which HTTP methods should we track?
    trackMethods: ['GET']

    # Should we track web socket connections?
    trackWebSockets: true

    # A list of regular expressions or substrings of URLS we should ignore (for both tracking and restarting)
    ignoreURLs: []

now = ->
  performance?.now?() ? +new Date

requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or
                        window.webkitRequestAnimationFrame or window.msRequestAnimationFrame

cancelAnimationFrame = window.cancelAnimationFrame or window.mozCancelAnimationFrame

if not requestAnimationFrame?
  requestAnimationFrame = (fn) ->
    setTimeout fn, 50

  cancelAnimationFrame = (id) ->
    clearTimeout id

runAnimation = (fn) ->
  last = now()
  tick = ->
    diff = now() - last

    if diff >= 33
      # Don't run faster than 30 fps

      last = now()
      fn diff, ->
        requestAnimationFrame tick
    else
      setTimeout tick, (33 - diff)

  tick()

result = (obj, key, args...) ->
  if typeof obj[key] is 'function'
    obj[key](args...)
  else
    obj[key]

extend = (out, sources...) ->
  for source in sources when source
    for own key, val of source
      if out[key]? and typeof out[key] is 'object' and val? and typeof val is 'object'
        extend(out[key], val)
      else
        out[key] = val
  out

avgAmplitude = (arr) ->
  sum = count = 0
  for v in arr
    sum += Math.abs(v)
    count++

  sum / count

getFromDOM = (key='options', json=true) ->
  el = document.querySelector "[data-pace-#{ key }]"

  return unless el

  data = el.getAttribute "data-pace-#{ key }"

  return data if not json

  try
    return JSON.parse data
  catch e
    console?.error "Error parsing inline pace options", e

class Evented
  on: (event, handler, ctx, once=false) ->
    @bindings ?= {}
    @bindings[event] ?= []
    @bindings[event].push {handler, ctx, once}

  once: (event, handler, ctx) ->
    @on(event, handler, ctx, true)

  off: (event, handler) ->
    return unless @bindings?[event]?

    if not handler?
      delete @bindings[event]
    else
      i = 0
      while i < @bindings[event].length
        if @bindings[event][i].handler is handler
          @bindings[event].splice i, 1
        else
          i++

  trigger: (event, args...) ->
    if @bindings?[event]
      i = 0
      while i < @bindings[event].length
        {handler, ctx, once} = @bindings[event][i]

        handler.apply(ctx ? @, args)

        if once
          @bindings[event].splice i, 1
        else
          i++

Pace = window.Pace or {}
window.Pace = Pace

extend Pace, Evented::

options = Pace.options = extend {}, defaultOptions, window.paceOptions, getFromDOM()

for source in ['ajax', 'document', 'eventLag', 'elements']
  # true enables them without configuration, so we grab the config from the defaults
  if options[source] is true
    options[source] = defaultOptions[source]

class NoTargetError extends Error

class Bar
  constructor: ->
    @progress = 0

  getElement: ->
    if not @el?
      targetElement = document.querySelector options.target

      if not targetElement
        throw new NoTargetError

      @el = document.createElement 'div'
      @el.className = "pace pace-active"

      document.body.className = document.body.className.replace /pace-done/g, ''
      document.body.className += ' pace-running'

      @el.innerHTML = '''
      <div class="pace-progress">
        <div class="pace-progress-inner"></div>
      </div>
      <div class="pace-activity"></div>
      '''
      if targetElement.firstChild?
        targetElement.insertBefore @el, targetElement.firstChild
      else
        targetElement.appendChild @el

    @el

  finish: ->
    el = @getElement()

    el.className = el.className.replace 'pace-active', ''
    el.className += ' pace-inactive'

    document.body.className = document.body.className.replace 'pace-running', ''
    document.body.className += ' pace-done'

  update: (prog) ->
    @progress = prog

    do @render

  destroy: ->
    try
      @getElement().parentNode.removeChild(@getElement())
    catch NoTargetError

    @el = undefined

  render: ->
    if not document.querySelector(options.target)?
      return false

    el = @getElement()

    transform = "translate3d(#{ @progress }%, 0, 0)"
    for key in ['webkitTransform', 'msTransform', 'transform']
      el.children[0].style[key] = transform

    if not @lastRenderedProgress or @lastRenderedProgress|0 != @progress|0
      # The whole-part of the number has changed

      el.children[0].setAttribute 'data-progress-text', "#{ @progress|0 }%"

      if @progress >= 100
        # We cap it at 99 so we can use prefix-based attribute selectors
        progressStr = '99'
      else
        progressStr = if @progress < 10 then "0" else ""
        progressStr += @progress|0

      el.children[0].setAttribute 'data-progress', "#{ progressStr }"

    @lastRenderedProgress = @progress

  done: ->
    @progress >= 100

class Events
  constructor: ->
    @bindings = {}

  trigger: (name, val) ->
    if @bindings[name]?
      for binding in @bindings[name]
        binding.call @, val

  on: (name, fn) ->
    @bindings[name] ?= []
    @bindings[name].push fn

_XMLHttpRequest = window.XMLHttpRequest
_XDomainRequest = window.XDomainRequest
_WebSocket = window.WebSocket

extendNative = (to, from) ->
  for key of from::
    try
      val = from::[key]

      if not to[key]? and typeof val isnt 'function'
        to[key] = val
    catch e

ignoreStack = []

Pace.ignore = (fn, args...) ->
  ignoreStack.unshift 'ignore'
  ret = fn(args...)
  ignoreStack.shift()
  ret

Pace.track = (fn, args...) ->
  ignoreStack.unshift 'track'
  ret = fn(args...)
  ignoreStack.shift()
  ret

shouldTrack = (method='GET') ->
  if ignoreStack[0] is 'track'
    return 'force'

  if not ignoreStack.length and options.ajax
    if method is 'socket' and options.ajax.trackWebSockets
      return true
    else if method.toUpperCase() in options.ajax.trackMethods
      return true

  return false

# We should only ever instantiate one of these
class RequestIntercept extends Events
  constructor: ->
    super

    monitorXHR = (req) =>
      _open = req.open
      req.open = (type, url, async) =>
        if shouldTrack(type)
          @trigger 'request', {type, url, request: req}

        _open.apply req, arguments

    window.XMLHttpRequest = (flags) ->
      req = new _XMLHttpRequest(flags)

      monitorXHR req

      req

    try
      extendNative window.XMLHttpRequest, _XMLHttpRequest

    if _XDomainRequest?
      window.XDomainRequest = ->
        req = new _XDomainRequest

        monitorXHR req

        req

      try
        extendNative window.XDomainRequest, _XDomainRequest

    if _WebSocket? and options.ajax.trackWebSockets
      window.WebSocket = (url, protocols) =>
        if protocols?
          req = new _WebSocket(url, protocols)
        else
          req = new _WebSocket(url)

        if shouldTrack('socket')
          @trigger 'request', {type: 'socket', url, protocols, request: req}

        req

      try
        extendNative window.WebSocket, _WebSocket

_intercept = null
getIntercept = ->
  if not _intercept?
    _intercept = new RequestIntercept
  _intercept

shouldIgnoreURL = (url) ->
  for pattern in options.ajax.ignoreURLs
    if typeof pattern is 'string'
      if url.indexOf(pattern) isnt -1
        return true

    else
      if pattern.test(url)
        return true

  return false

# If we want to start the progress bar
# on every request, we need to hear the request
# and then inject it into the new ajax monitor
# start will have created.

getIntercept().on 'request', ({type, request, url}) ->
  return if shouldIgnoreURL(url)

  if not Pace.running and (options.restartOnRequestAfter isnt false or shouldTrack(type) is 'force')
    args = arguments

    after = options.restartOnRequestAfter or 0
    if typeof after is 'boolean'
      after = 0

    setTimeout ->
      if type is 'socket'
        stillActive = request.readyState < 2
      else
        stillActive = 0 < request.readyState < 4

      if stillActive
        Pace.restart()

        for source in Pace.sources
          if source instanceof AjaxMonitor
            source.watch args...
            break
    , after

class AjaxMonitor
  constructor: ->
    @elements = []

    getIntercept().on 'request', => @watch arguments...

  watch: ({type, request, url}) ->
    return if shouldIgnoreURL(url)

    if type is 'socket'
      tracker = new SocketRequestTracker(request)
    else
      tracker = new XHRRequestTracker(request)

    @elements.push tracker

class XHRRequestTracker
  constructor: (request) ->
    @progress = 0

    if window.ProgressEvent?
      # We're dealing with a modern browser with progress event support

      size = null
      request.addEventListener 'progress', (evt) =>
        if evt.lengthComputable
          @progress = 100 * evt.loaded / evt.total
        else
          # If it's chunked encoding, we have no way of knowing the total length of the
          # response, all we can do is increment the progress with backoff such that we
          # never hit 100% until it's done.
          @progress = @progress + (100 - @progress) / 2
      , false

      for event in ['load', 'abort', 'timeout', 'error']
        request.addEventListener event, =>
          @progress = 100
        , false

    else
      _onreadystatechange = request.onreadystatechange
      request.onreadystatechange = =>
        if request.readyState in [0, 4]
          @progress = 100
        else if request.readyState is 3
          @progress = 50

        _onreadystatechange?(arguments...)

class SocketRequestTracker
  constructor: (request) ->
    @progress = 0

    for event in ['error', 'open']
      request.addEventListener event, =>
        @progress = 100
      , false

class ElementMonitor
  constructor: (options={}) ->
    @elements = []

    options.selectors ?= []
    for selector in options.selectors
      @elements.push new ElementTracker selector

class ElementTracker
  constructor: (@selector) ->
    @progress = 0

    @check()

  check: ->
    if document.querySelector(@selector)
      @done()
    else
      setTimeout (=> @check()),
        options.elements.checkInterval

  done: ->
    @progress = 100

class DocumentMonitor
  states:
    loading: 0
    interactive: 50
    complete: 100

  constructor: ->
    @progress = @states[document.readyState] ? 100

    _onreadystatechange = document.onreadystatechange
    document.onreadystatechange = =>
      if @states[document.readyState]?
        @progress = @states[document.readyState]

      _onreadystatechange?(arguments...)

class EventLagMonitor
  constructor: ->
    @progress = 0

    avg = 0

    samples = []

    points = 0
    last = now()
    interval = setInterval =>
      diff = now() - last - 50
      last = now()

      samples.push diff

      if samples.length > options.eventLag.sampleCount
        samples.shift()

      avg = avgAmplitude samples

      if ++points >= options.eventLag.minSamples and avg < options.eventLag.lagThreshold
        @progress = 100

        clearInterval interval
      else
        @progress = 100 * (3 / (avg + 3))

    , 50

class Scaler
  constructor: (@source) ->
    @last = @sinceLastUpdate = 0
    @rate = options.initialRate
    @catchup = 0
    @progress = @lastProgress = 0

    if @source?
      @progress = result(@source, 'progress')

  tick: (frameTime, val) ->
    val ?= result(@source, 'progress')

    if val >= 100
      @done = true

    if val == @last
      @sinceLastUpdate += frameTime
    else
      if @sinceLastUpdate
        @rate = (val - @last) / @sinceLastUpdate

      @catchup = (val - @progress) / options.catchupTime

      @sinceLastUpdate = 0
      @last = val

    if val > @progress
      # After we've got a datapoint, we have catchupTime to
      # get the progress bar to reflect that new data
      @progress += @catchup * frameTime

    scaling = (1 - Math.pow(@progress / 100, options.easeFactor))

    # Based on the rate of the last update, we preemptively update
    # the progress bar, scaling it so it can never hit 100% until we
    # know it's done.
    @progress += scaling * @rate * frameTime

    @progress = Math.min(@lastProgress + options.maxProgressPerFrame, @progress)

    @progress = Math.max(0, @progress)
    @progress = Math.min(100, @progress)

    @lastProgress = @progress

    @progress

sources = null
scalers = null
bar = null
uniScaler = null
animation = null
cancelAnimation = null
Pace.running = false

handlePushState = ->
  if options.restartOnPushState
    Pace.restart()

# We reset the bar whenever it looks like an ajax navigation has occured.
if window.history.pushState?
  _pushState = window.history.pushState
  window.history.pushState = ->
    handlePushState()

    _pushState.apply window.history, arguments

if window.history.replaceState?
  _replaceState = window.history.replaceState
  window.history.replaceState = ->
    handlePushState()

    _replaceState.apply window.history, arguments

SOURCE_KEYS =
  ajax: AjaxMonitor
  elements: ElementMonitor
  document: DocumentMonitor
  eventLag: EventLagMonitor

do init = ->
  Pace.sources = sources = []

  for type in ['ajax', 'elements', 'document', 'eventLag']
    if options[type] isnt false
      sources.push new SOURCE_KEYS[type](options[type])

  for source in options.extraSources ? []
    sources.push new source(options)

  Pace.bar = bar = new Bar

  # Each source of progress data has it's own scaler to smooth its output
  scalers = []

  # We have an extra scaler for the final output to keep things looking nice as we add and
  # remove sources
  uniScaler = new Scaler

Pace.stop = ->
  Pace.trigger 'stop'
  Pace.running = false

  bar.destroy()

  # Not all browsers support cancelAnimationFrame
  cancelAnimation = true

  if animation?
    cancelAnimationFrame? animation
    animation = null

  init()

Pace.restart = ->
  Pace.trigger 'restart'
  Pace.stop()
  Pace.start()

Pace.go = ->
  Pace.running = true

  bar.render()

  start = now()

  cancelAnimation = false
  animation = runAnimation (frameTime, enqueueNextFrame) ->
    # Every source gives us a progress number from 0 - 100
    # It's up to us to figure out how to turn that into a smoothly moving bar
    #
    # Their progress numbers can only increment.  We try to interpolate
    # between the numbers.

    remaining = 100 - bar.progress

    count = sum = 0
    done = true
    # A source is composed of a bunch of elements, each with a raw, unscaled progress
    for source, i in sources
      scalerList = scalers[i] ?= []

      elements = source.elements ? [source]

      # Each element is given it's own scaler, which turns its value into something
      # smoothed for display
      for element, j in elements
        scaler = scalerList[j] ?= new Scaler element

        done &= scaler.done

        continue if scaler.done

        count++
        sum += scaler.tick(frameTime)

    avg = sum / count

    bar.update uniScaler.tick(frameTime, avg)

    if bar.done() or done or cancelAnimation
      bar.update 100

      Pace.trigger 'done'

      setTimeout ->
        bar.finish()

        Pace.running = false

        Pace.trigger 'hide'
      , Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0))
    else
      enqueueNextFrame()

Pace.start = (_options) ->
  extend options, _options

  Pace.running = true

  try
    bar.render()
  catch NoTargetError

  # It's usually possible to render a bit before the document declares itself ready
  if not document.querySelector('.pace')
    setTimeout Pace.start, 50
  else
    Pace.trigger 'start'
    Pace.go()

if typeof define is 'function' and define.amd
  # AMD
  define ['pace'], -> Pace
else if typeof exports is 'object'
  # CommonJS
  module.exports = Pace
else
  # Global
  if options.startOnPageLoad
    Pace.start()

# renderPage = () ->
#   page      = document.body
#   pageState = page.getAttribute "data-page-state"
#
#   if pageState is "clipped"
#     addClass page, "clipped"
#   else
#     removeClass page, "clipped"

renderPanels        = () ->
  page              = document.body
  panels            = document.querySelectorAll ".panel"
  states            = []

  # Populate states array with states of all panels
  # Toggle visibility classes on panels according to the data attributes
  [].forEach.call panels, (panel) ->
    panelState      = panel.getAttribute "data-panel-state"
    states.push(panelState)
    if panelState is "active"
      addClass panel, "panel--active"
    else
      removeClass panel, "panel--active"

  # See if there are any panels open and, if so, toggle overlay and clip body
  if states.indexOf("active") is -1
    page.setAttribute "data-page-state", ""
    toggleOverlay "cover-none"
  else
    page.setAttribute "data-page-state", "clipped"
    toggleOverlay("cover-all")

# Alters target panel's state and/or disables all panels when page-overlay was clicked
alterPanelState     = (targetPanelId) ->
  panels            = document.querySelectorAll ".panel"
  if targetPanelId is "all"
    [].forEach.call panels, (panel) ->
      panel.setAttribute "data-panel-state", "inactive"
  else
    targetPanel       = document.getElementById "panel--" + targetPanelId
    targetPanelState  = targetPanel.getAttribute "data-panel-state"
    if targetPanelState is "active"
      targetPanel.setAttribute "data-panel-state", "inactive"
    else
      targetPanel.setAttribute "data-panel-state", "active"
  renderPanels()

# Launch on click methods
onPanelToggle    = (el) ->
  targetPanelId  = el.getAttribute "data-panel-target"
  alterPanelState(targetPanelId)
  renderPanels()

# Bind clicks
panelTogglers = document.querySelectorAll ".togglePanel"
[].forEach.call panelTogglers, (el) ->
  el.addEventListener "click", (e) ->
    onPanelToggle(e.currentTarget)

# Load search index
index = undefined # we will load the index in here
titles = {} # we will load the titles in here
searchPath = SEARCH #"/AJE/PalestineRemix/transcripts"
# searchPath = "http://10.24.21.20/~laurian/PALESTINE%20PROJECT/DATA/MEDIA/SEARCH"

# request0 = new XMLHttpRequest()
# request0.open "GET", searchPath + "/html/" + L + "/list.json", true
# request0.onreadystatechange = ->
#   if @readyState is 4
#     if @status >= 200 and @status < 400
#       _titles = JSON.parse(@responseText)
#       # console.log(_titles)
#       i = 0
#       while i < _titles.length
#         titles["" + _titles[i]._id] = _titles[i].label
#         i++
#
#       request = new XMLHttpRequest()
#       request.open "GET", searchPath + "/data/" + L + "/index.json", true
#       request.onreadystatechange = ->
#         if @readyState is 4
#           if @status >= 200 and @status < 400
#             index = lunr.Index.load(JSON.parse(@responseText))
#             listingSearchInput = document.getElementById("search")
#             dispatch = true
#             if listingSearchInput is null
#               listingSearchInput = document.getElementById("HAP-search")
#               dispatch = false
#             unless listingSearchInput is null
#               listingSearchInput.addEventListener "change", doSearch
#               listingSearchInput.setAttribute "value", getParameterByName("search") if getParameterByName("search")
#               if dispatch
#                 event = document.createEvent("HTMLEvents")
#                 event.initEvent "change", true, false
#                 listingSearchInput.dispatchEvent event
#           # else
#           #   console.log("Silent Error")
#
#       request.send()
#       request = null

# request0 = new XMLHttpRequest()
# request0.open "GET", searchPath + "/html/" + L + "/list.json", true
# request0.onreadystatechange = ->
#   if @readyState is 4
#     if @status >= 200 and @status < 400
_titles = FILMS
# console.log(_titles)
i = 0
while i < _titles.length
  titles["" + _titles[i]._id] = _titles[i].label
  i++

request = new XMLHttpRequest()
request.open "GET", searchPath + "/data/" + L + "/index.json", true
request.onreadystatechange = ->
  if @readyState is 4
    if @status >= 200 and @status < 400
      index = lunr.Index.load(JSON.parse(@responseText))
      listingSearchInput = document.getElementById("search")
      dispatch = true
      if listingSearchInput is null
        listingSearchInput = document.getElementById("HAP-search")
        dispatch = false
      unless listingSearchInput is null
        listingSearchInput.addEventListener "change", doSearch
        listingSearchInput.setAttribute "value", getParameterByName("search") if getParameterByName("search")
        if dispatch
          event = document.createEvent("HTMLEvents")
          event.initEvent "change", true, false
          listingSearchInput.dispatchEvent event
    # else
    #   console.log("Silent Error")

request.send()
request = null

# Parse URL and populate search input with parameters
getParameterByName = (name) ->
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  results = regex.exec(window.top.location.search)
  (if results is null then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

# Do the magic
doSearch = ->
  # clean-up
  insideHAP = false
  if document.querySelectorAll(".listing").length > 0
    resultsContainer = document.querySelectorAll(".listing")[0]
  if document.querySelectorAll(".HAP-listing").length > 0
    resultsContainer = document.querySelectorAll(".HAP-listing")[0]
    insideHAP = true

  resultsContainer.removeChild resultsContainer.firstChild  while resultsContainer.firstChild
  searchEl = document.getElementById("search")
  if searchEl is null
    searchEl = document.getElementById("HAP-search")
  query = searchEl.value.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace('،', ' ').replace(/\n/, ' ').replace(/\s+/g, ' ').trim()
  results = index.search(query)
  # if results.length is 0
  #   console.log("no results for: " + query)
  r = 0
  _length = results.length
  if _length > 200
    _length = 200
  while r < _length
    # don't ask
    (->
      # video-paragraph-timecode
      idParts = results[r].ref.split("-")
      id = idParts[0] + "-" + (parseInt(idParts[1]) + 0)
      second = parseInt(idParts[2] / 1000)
      second = 1 if second is 0
      el = document.createElement("div")
      # el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><a class=\"thumbnail tile__thumbnail\"><img src=\"http://10.24.21.20/~laurian/PALESTINE PROJECT/DATA/MEDIA/SEARCH/images/" + idParts[0] + "/E/p/img" + second + ".jpg\" class=\"thumbnail__image\"></a><div class=\"tile__body\"><p class=\"tile__transcript\">loading…</p></div></div></li>"
      title = titles[idParts[0]]
      if insideHAP
        el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><div class=\"tile__body\"><p class=\"tile__transcript hap\">loading…</p><p class=\"tile__title\"><a href=\"#/" + idParts[0] + "/" + idParts[2] + "\">" + title + "</a></p></div></div></li>"
        # el.querySelector('a').addEventListener('click', function() {});
      else
        el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><a class=\"tile\" href=\"../remix/view/#/" + idParts[0] + "/" + idParts[2] + "\"><div class=\"thumbnail tile__thumbnail\"><img src=\"http://interactive.aljazeera.com/aje/PalestineRemix/transcripts/images/" + idParts[0] + "/" + L + "/p/img" + second + ".jpg\" class=\"thumbnail__image\"></div><div class=\"tile__body\"><p class=\"tile__transcript nohap\">loading…</p><p class=\"tile__title\">" + title + "</p></div></a></li>"

      result = el.children[0]
      resultsContainer.appendChild result
      # AJAX
      request = new XMLHttpRequest()
      request.open "GET", searchPath + "/text/" + L + "/" + id + ".txt", true
      request.onreadystatechange = ->
        if @readyState is 4
          if @status >= 200 and @status < 400
            search = query.split(" ")
            sentences = @responseText.split(".") # meh
            resultSentences = []
            s = 0
            while s < sentences.length
              match = 0
              words = sentences[s].split(" ")
              i = 0
              while i < search.length
                keyword = lunr.stemmer(search[i].toLowerCase()) if L == 'E'
                keyword = lunr.stemmer(search[i].toLowerCase()) if L == 'B'
                keyword = lunr.ar.stemmer(search[i].toLowerCase()) if L == 'A'
                keyword = lunr.tr.stemmer(search[i].toLowerCase()) if L == 'T'

                j = 0
                while j < words.length
                  sword = lunr.stemmer(words[j].toLowerCase()) if L == 'E'
                  sword = lunr.stemmer(words[j].toLowerCase()) if L == 'B'
                  sword = lunr.ar.stemmer(words[j].toLowerCase()) if L == 'A'
                  sword = lunr.tr.stemmer(words[j].toLowerCase()) if L == 'T'
                  if sword.indexOf(keyword) > -1
                    if insideHAP
                      words[j] = "<a class=\"highlight\" href=\"#/" + idParts[0] + "/" + idParts[2] + "\">" + words[j] + "</a>"
                    else
                      words[j] = "<a class=\"highlight\" href=\"../remix/view/#/" + idParts[0] + "/" + idParts[2] + "\">" + words[j] + "</a>"
                    match++
                  j++
                i++
              if match > 0
                sentences[s] = words.join(" ")
                resultSentences.push sentences[s]
              else
                resultSentences = sentences
              s++
            document.querySelectorAll("#r" + id + " .tile__transcript")[0].innerHTML = resultSentences.join(". ") + "."

            ev = document.createEvent("Event")
            ev.initEvent "searchresult", true, true
            document.querySelectorAll("#r" + id + " .tile__transcript")[0].dispatchEvent ev

      request.send()
      request = null
    )()
    r++

  ev = document.createEvent("Event")
  ev.initEvent "searchresults", true, true
  document.dispatchEvent ev

# request0.send()
# request0 = null

setSharePath = () ->
  thisPageURL = window.top.location.href
  shareLinks  = document.querySelectorAll ".jsSetSharePath"
  [].forEach.call shareLinks, (shareLink) ->
    shareLinkHref   = shareLink.getAttribute "href"
    shareLinkNuHref = shareLinkHref.replace "UURRLL", encodeURIComponent(thisPageURL)
    shareLink.setAttribute "href", shareLinkNuHref
# renderSides         = () ->
#
#   page              = document.body
#   sides             = document.querySelectorAll ".page-side"
#   head              = document.getElementById "page-head"
#   body              = document.getElementById "page-body"
#   states            = []
#
#   if hasClass(page, "tpl--responsive")
#     leftSide          = document.getElementById "page-side--left"
#     windowWidth       = window.innerWidth
#     if windowWidth > 1024
#       leftSide.setAttribute "data-side-state", "active"
#       leftSide.setAttribute "data-side-state-persist", "true"
#       addClass leftSide, "page-side--persistent"
#     else
#       leftSide.setAttribute "data-side-state-persist", ""
#       removeClass leftSide, "page-side--persistent"
#
#   # Populate states array with states of all sides
#   # Toggle visibility classes on panels according to the data attributes
#   [].forEach.call sides, (side) ->
#     sideState       = side.getAttribute "data-side-state"
#     sideDirection   = side.getAttribute "data-side-push"
#     persistAttr     = side.getAttribute "data-side-state-persist"
#     unless persistAttr is "true"
#       states.push(sideState)
#       if sideState is "active"
#         addClass body, "moved--" + sideDirection
#         addClass head, "moved--" + sideDirection
#         removeClass side, "moved"
#         if sideDirection is "left"
#           toggleOverlay "cover-left"
#         else
#           toggleOverlay "cover-right"
#       else
#         removeClass body, "moved--" + sideDirection
#         removeClass head, "moved--" + sideDirection
#         addClass side, "moved"
#
#   # See if there are any panels open and, if so, toggle overlay and clip body
#   if states.indexOf("active") is -1
#     page.setAttribute "data-page-state", ""
#     # toggleOverlay "cover-none"
#   else
#     page.setAttribute "data-page-state", "clipped"
#   renderPage()
#
# # Alters target side's state and/or disables all panels when page-overlay was clicked
# alterSideState    = (targetSideId) ->
#   sides           = document.querySelectorAll ".page-side"
#   if targetSideId is "all"
#     [].forEach.call sides, (side) ->
#       persistAttr = side.getAttribute "data-side-state-persist"
#       unless persistAttr is "true"
#         side.setAttribute "data-side-state", "inactive"
#   else
#     targetSide      = document.getElementById "page-side--" + targetSideId
#     targetSideState = targetSide.getAttribute "data-side-state"
#     persistAttr     = targetSide.getAttribute "data-side-state-persist"
#     unless persistAttr is "true"
#       if targetSideState is "active"
#         targetSide.setAttribute "data-side-state", "inactive"
#       else
#         targetSide.setAttribute "data-side-state", "active"
#   renderSides()
#
# onSideToggle    = (el) ->
#   targetSideId  = el.getAttribute "data-side-target"
#   alterSideState(targetSideId)
#
# # Bind clicks
# sideTogglers = document.querySelectorAll ".toggleSide"
# [].forEach.call sideTogglers, (el) ->
#   el.addEventListener "click", (e) ->
#     onSideToggle(e.currentTarget)

# unless window.parent is window
#   if document.body.classList
#     document.body.classList.add "tpl--compact"
#   else
#     document.body.className += " tpl--compact"

document.addEventListener "DOMContentLoaded", ->

  # renderDrops()
  # renderFoldCards()
  # renderFoldSwiper()
  # renderHead()
  # renderMenu()
  renderOverlay()
  renderPanels()
  # renderPage()
  # renderSides()
  # renderMultiples()
  # setSharePath()

  window.onresize = throttle((event) ->
    renderOverlay()
    # renderFoldCards()
    # renderMultiples()
    # renderSides()
  , 350)

  # window.onscroll = throttle((event) ->
  #   toggleHead()
  # , 350)

  window.addEventListener "load", (->
    FastClick.attach document.body
  ), false

# runHAPTour = (stepIndex) ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "Svoj Remix vrlo jednostavno možete napraviti samo u šest koraka."
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "Prvo, izaberite film ili pronađite određenu riječ."
#     attachTo: "#panel-media right"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "Kao drugi korak, pratite film, a tekst ispod će biti označavan."
#     attachTo: "#source-canvas bottom"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "Treće, kliknite na riječ koju želite i video će se nastaviti od tog dijela."
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step4",
#     title: "Zatim će te željeti napraviti svoj remix. Izaberite dio iz teksta i prenesite u drugi dio ekrana.  <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "Vrlo jednostavno!"
#       action: tour.next
#      ]
#   tour.addStep "step5",
#     title: "Ako se predomislite vratite ga nazad."
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step6",
#     title: "Peti korak Vam dopušta da dodate naslove i efekte. "
#     attachTo: "#effects top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step7",
#     title: "Odaberite drugi film i ponovite korake za novi tekst."
#     attachTo: "#panel-media right"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step8",
#     title: "Došli ste do šestog, posljednjeg koraka; podijelite Remix sa svojim prijateljima!"
#     attachTo: "#HAP-share-bttn top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   if stepIndex is undefined
#     tour.addStep "step9",
#       title: "Vaš remix se automatski spašava. "
#       buttons: [
#         classes: "sec-button"
#         text: "ODLIČNO"
#         action: tour.cancel
#        ]
#   else
#     tour.addStep "step9",
#       title: "Vaš remix se automatski spašava. "
#       buttons: [
#         classes: "sec-button"
#         text: "ODLIČNO"
#         action: tour.next
#        ]
#   tour.addStep "step10",
#     title: "Ukoliko Vam upustvo sljedeći put zatreba, pronađite ga ovdje."
#     attachTo: '#HAP-helper left',
#     buttons: [
#       classes: "sec-button"
#       text: "Ok, hvala!"
#       action: tour.cancel
#      ]
#   if stepIndex is undefined
#     tour.start()
#   else
#     tour.start()
#     tour.show("step" + stepIndex)
#   createCookie("HAPtourStatus", "done", 30)
#
# toggleHAPTour = () ->
#   tourStatus  = getCookie("HAPtourStatus")
#   unless tourStatus is "done"
#     runHAPTour(0)
#
#   HAPhelper = document.getElementById "HAP-helper"
#   HAPhelper.addEventListener "click", (e) ->
#     ShepherdCheck = Shepherd.activeTour
#     if ShepherdCheck is null
#       runHAPTour()
#     else if ShepherdCheck is undefined
#       runHAPTour()

# runHAVTour = ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "Pratite film, tekst će biti podvlačen kako se video nastavlja."
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Pokaži mi kako ću se napraviti"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "Film će ovdje biti prikazan, čekajte."
#     attachTo: "#source-canvas bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "Kako bi vidjeli cijeli tekst pokrenite kursor na dole. Kliknite na bilo koju riječ i video će se nastaviti od tog dijela."
#     attachTo: "#source-transcript top"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "Ukoliko Vam upustvo sljedeći put zatreba, pronađite ga ovdje."
#     attachTo: "#HAP-helper bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Ok, hvala!"
#       action: tour.next
#      ]
#   tour.start()
#   createCookie("HAVtourStatus", "done", 30)
#
# toggleHAVTour = () ->
#   tourStatus  = getCookie("HAVtourStatus")
#   unless tourStatus is "done"
#     runHAVTour(0)
#
#   HAPhelper = document.getElementById "HAP-helper"
#   HAPhelper.addEventListener "click", (e) ->
#     ShepherdCheck = Shepherd.activeTour
#     if ShepherdCheck is null
#       runHAVTour()
#     else if ShepherdCheck is undefined
#       runHAVTour()
