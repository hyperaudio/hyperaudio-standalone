/*! hyperaudio-pad v0.6.2 ~ (c) 2012-2014 Hyperaudio Inc. <hello@hyperaud.io> (http://hyperaud.io) http://hyperaud.io/licensing/ ~ Built: 31st July 2014 17:08:04 */
/*! hyperaudio-lib v0.6.1 ~ (c) 2012-2014 Hyperaudio Inc. <hello@hyperaud.io> (http://hyperaud.io) http://hyperaud.io/licensing/ ~ Built: 31st July 2014 16:43:10 */

/**
 * The Popcorn._MediaElementProto object is meant to be used as a base
 * prototype for HTML*VideoElement and HTML*AudioElement wrappers.
 * MediaElementProto requires that users provide:
 *   - parentNode: the element owning the media div/iframe
 *   - _eventNamespace: the unique namespace for all events
 */

/*

88                                                                                        88 88
88                                                                                        88 ""
88                                                                                        88
88,dPPYba,  8b       d8 8b,dPPYba,   ,adPPYba, 8b,dPPYba, ,adPPYYba, 88       88  ,adPPYb,88 88  ,adPPYba,
88P'    "8a `8b     d8' 88P'    "8a a8P_____88 88P'   "Y8 ""     `Y8 88       88 a8"    `Y88 88 a8"     "8a
88       88  `8b   d8'  88       d8 8PP""""""" 88         ,adPPPPP88 88       88 8b       88 88 8b       d8
88       88   `8b,d8'   88b,   ,a8" "8b,   ,aa 88         88,    ,88 "8a,   ,a88 "8a,   ,d88 88 "8a,   ,a8"
88       88     Y88'    88`YbbdP"'   `"Ybbd8"' 88         `"8bbdP"Y8  `"YbbdP'Y8  `"8bbdP"Y8 88  `"YbbdP"'
                d8'     88
               d8'      88




 ,adPPYba,  ,adPPYba,  8b,dPPYba,  ,adPPYba,
a8"     "" a8"     "8a 88P'   "Y8 a8P_____88
8b         8b       d8 88         8PP"""""""
"8a,   ,aa "8a,   ,a8" 88         "8b,   ,aa
 `"Ybbd8"'  `"YbbdP"'  88          `"Ybbd8"'



*/

var HA = (function(window, document) {

/* Hyperaudio core
 *
 */

var hyperaudio = (function() {

  // jQuery 2.0.3 (c) 2013 http://jquery.com/

  var
    // [[Class]] -> type pairs
    class2type = {},
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty;

  function hyperaudio() {
    // Nada
  }

  hyperaudio.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !hyperaudio.isFunction(target) ) {
      target = {};
    }

    // extend hyperaudio itself if only one argument is passed
    if ( length === i ) {
      target = this;
      --i;
    }

    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( hyperaudio.isPlainObject(copy) || (copyIsArray = hyperaudio.isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && hyperaudio.isArray(src) ? src : [];

            } else {
              clone = src && hyperaudio.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = hyperaudio.extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  hyperaudio.extend({

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
      return hyperaudio.type(obj) === "function";
    },

    isArray: Array.isArray,

    isWindow: function( obj ) {
      return obj != null && obj === obj.window;
    },

    type: function( obj ) {
      if ( obj == null ) {
        return String( obj );
      }
      // Support: Safari <= 5.1 (functionish RegExp)
      return typeof obj === "object" || typeof obj === "function" ?
        class2type[ core_toString.call(obj) ] || "object" :
        typeof obj;
    },

    isPlainObject: function( obj ) {
      // Not plain objects:
      // - Any object or value whose internal [[Class]] property is not "[object Object]"
      // - DOM nodes
      // - window
      if ( hyperaudio.type( obj ) !== "object" || obj.nodeType || hyperaudio.isWindow( obj ) ) {
        return false;
      }

      // Support: Firefox <20
      // The try/catch suppresses exceptions thrown when attempting to access
      // the "constructor" property of certain host objects, ie. |window.location|
      // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
      try {
        if ( obj.constructor &&
            !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
          return false;
        }
      } catch ( e ) {
        return false;
      }

      // If the function hasn't returned already, we're confident that
      // |obj| is a plain object, created by {} or constructed with new Object
      return true;
    }
  });

  function isArraylike( obj ) {
    var length = obj.length,
      type = hyperaudio.type( obj );

    if ( hyperaudio.isWindow( obj ) ) {
      return false;
    }

    if ( obj.nodeType === 1 && length ) {
      return true;
    }

    return type === "array" || type !== "function" &&
      ( length === 0 ||
      typeof length === "number" && length > 0 && ( length - 1 ) in obj );
  }
  // [End jQuery code]

  // [Adapted from] jQuery 2.0.3 (c) 2013 http://jquery.com/
  // - each() : removed args parameter (was for use internal to jQuery)

  hyperaudio.extend({
    each: function( obj, callback ) {
      var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike( obj );

      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          value = callback.call( obj[ i ], i, obj[ i ] );

          if ( value === false ) {
            break;
          }
        }
      }

      return obj;
    }
  });
  // [End jQuery code]

  hyperaudio.extend({
    event: {
      ready: 'ha:ready',
      load: 'ha:load',
      save: 'ha:save',
      change: 'ha:change',
      // login: 'ha:login', // No DOM element relating to a login. It is handled by the api.signin when the stage fails to authenticate.
      unauthenticated: 'ha:unauthenticated',
      userplay: 'ha:userplay',
      userpause: 'ha:userpause',
      usercurrenttime: 'ha:usercurrenttime',
      userplayword: 'ha:userplayword',
      error: 'ha:error'
    },
    _commonMethods: {
      options: {
        DEBUG: false,
        entity: 'core'
      },
      _trigger: function(eventType, eventData) {
        var eventObject = hyperaudio.extend(true, {options: this.options}, eventData),
          event = new CustomEvent(eventType, {
            detail: eventObject,
            bubbles: true,
            cancelable: true
          });
        hyperaudio.gaEvent({
          type: this.options.entity,
          action: eventType + ' event: ' + (eventObject.msg ? eventObject.msg : '')
        });
        this.target.dispatchEvent(event);
      },
      _error: function(msg) {
        var data = {msg: this.options.entity + ' Error : ' + msg};
        this._trigger(hyperaudio.event.error, data);
      },
      _debug: function() {
        var self = this;
        hyperaudio.each(hyperaudio.event, function(eventName, eventType) {
          self.target.addEventListener(eventType, function(event) {
            console.log(self.options.entity + ' ' + eventType + ' event : %o', event);
          }, false);
        });
      }
    },
    register: function(name, module) {
      if(typeof name === 'string') {
        if(typeof module === 'function') {
          module.prototype = hyperaudio.extend({}, this._commonMethods, module.prototype);
          this[name] = function(options) {
            return new module(options);
          };
        } else if(typeof module === 'object') {
          module = hyperaudio.extend({}, this._commonMethods, module);
          this[name] = module;
        }
      }
    },
    utility: function(name, utility) {
      if(typeof name === 'string') {
        this[name] = utility;
      }
    },

    // http://stackoverflow.com/questions/1403888/get-url-parameter-with-javascript-or-jquery
    getURLParameter: function(name) {
      // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;

      // Now looks at top window (frame).
      var win = window.top;

      // See if security allowed via same domain policy.
      try {
        win.document.createElement('div');
      } catch(error) {
        win = window;
      }

      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(win.location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    },

    gaEvent: function(detail) {
      // detail: {origin, type, action}

      if(typeof detail !== 'object') {
        if(typeof detail === 'string') {
          detail = {
            type: 'message',
            action: detail
          };
        } else {
          detail = {};
        }
      }

      detail.origin = detail.origin ? detail.origin : 'Hyperaudio Lib';
      detail.type = detail.type ? detail.type : 'no type';
      detail.action = detail.action ? detail.action : 'no action';

      var event = new CustomEvent("ga", {
        detail: detail,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    },

    hasClass: function(e, c) {
      if ( !e ) return false;

      var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
      return re.test(e.className);
    },
    addClass: function(e, c) {
      if ( this.hasClass(e, c) ) {
        return;
      }

      e.className += ' ' + c;
    },
    removeClass: function (e, c) {
      if ( !this.hasClass(e, c) ) {
        return;
      }

      var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
      e.className = e.className.replace(re, ' ').replace(/\s{2,}/g, ' ');
    },
    toggleClass: function (e, c) {
      if ( this.hasClass(e, c) ) {
        this.removeClass(e, c);
      } else {
        this.addClass(e, c);
      }
    },
    empty: function(el) {
      // Empties the element... Possibly better than el.innerHTML = '';
      while(el && el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

  });

  return hyperaudio;
}());

var DragDrop = (function (window, document, hyperaudio) {

  function DragDrop (options) {

    this.options = {
      handle: null,
      dropArea: null,

      init: true,
      touch: false,
      mouse: true,
      timeout: 500,
      html: '',
      draggableClass: '',
      containerTag: 'article',
      blockTag: 'section'
    };

    for ( var i in options ) {
      this.options[i] = options[i];
    }

    this.dropArea = typeof this.options.dropArea == 'string' ? document.querySelector(this.options.dropArea) : this.options.dropArea;

    // Create the list and the placeholder
    this.list = this.dropArea.querySelector(this.options.containerTag);
    if ( !this.list ) {
      this.list = document.createElement(this.options.containerTag);
      this.dropArea.appendChild(this.list);
    }
    this.placeholder = document.createElement(this.options.blockTag);
    this.placeholder.className = 'placeholder';

    if ( this.options.init ) {
      this.handle = typeof this.options.handle == 'string' ? document.querySelector(this.options.handle) : this.options.handle;
      this.handleClassName = this.handle.className;

      // Are we reordering the list?
      this.reordering = this.handle.parentNode == this.list;

      if ( this.options.touch ) {
        this.handle.addEventListener('touchstart', this, false);
      }

      if ( this.options.mouse ) {
        this.handle.addEventListener('mousedown', this, false);
      }
    }
  }

  DragDrop.prototype.handleEvent = function (e) {
    // jshint -W086
    switch (e.type) {
      case 'mousedown':
        if ( e.which !== 1 ) {
          break;
        }
     case 'touchstart':
        this.start(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.move(e);
        break;
      case 'touchend':
      case 'mouseup':
        this.end(e);
        break;
    }
    // jshint +W086
  };

  DragDrop.prototype.start = function (e) {
    var point = e.touches ? e.touches[0] : e,
      target = e.touches ? document.elementFromPoint(point.pageX, point.pageY) : point.target;

    if ( /INPUT/.test(target.tagName) ) {
      return;
    }

    e.preventDefault();

    if ( this.options.touch ) {
      document.addEventListener('touchend', this, false);
    }

    if ( this.options.mouse ) {
      document.addEventListener('mouseup', this, false);
    }

    clearTimeout(this.dragTimeout);
    this.initiated = false;
    this.lastTarget = null;

    this.dragTimeout = setTimeout(this.init.bind(this, this.options.html || this.handle.innerHTML, e), this.options.timeout);
  };

  DragDrop.prototype.init = function (html, e) {

    if ( !this.options.init ) {
      if ( this.options.touch ) {
        document.addEventListener('touchend', this, false);
      }

      if ( this.options.mouse ) {
        document.addEventListener('mouseup', this, false);
      }
    }

    // Create draggable
    this.draggable = document.createElement('div');
    this.draggable.className = 'draggable' + ' ' + this.options.draggableClass;
    this.draggableStyle = this.draggable.style;
    this.draggableStyle.cssText = 'position:absolute;z-index:1000;pointer-events:none;left:-99999px';
    this.draggable.innerHTML = html;

    document.body.appendChild(this.draggable);

    this.draggableCenterX = Math.round(this.draggable.offsetWidth / 2);
    this.draggableCenterY = Math.round(this.draggable.offsetHeight / 2);

    this.position(e);

    if ( this.options.touch ) {
      document.addEventListener('touchmove', this, false);
    }

    if ( this.options.mouse ) {
      document.addEventListener('mousemove', this, false);
    }

    this.initiated = true;

    // If we are reordering the list, hide the current element
    if ( this.reordering ) {
      this.handle.style.display = 'none';
    }

    this.move(e);

    if ( this.options.onDragStart ) {
      this.options.onDragStart.call(this);
    }
  };

  DragDrop.prototype.position = function (e) {
    var point = e.changedTouches ? e.changedTouches[0] : e;

    this.draggableStyle.left = point.pageX - this.draggableCenterX + 'px';
    this.draggableStyle.top = point.pageY - this.draggableCenterY + 'px';
  };

  DragDrop.prototype.move = function (e) {
    e.preventDefault();
    e.stopPropagation();

    var point = e.changedTouches ? e.changedTouches[0] : e;
    var target = e.touches ? document.elementFromPoint(point.pageX, point.pageY) : point.target;

    this.position(e);

    if ( target == this.lastTarget || target == this.placeholder || target == this.list ) {
      return;
    }

    this.lastTarget = target;


    // MB hack
    if (target.tagName == "A" || target.tagName == "INPUT" || target.tagName == "LABEL") {
      target = target.parentNode.parentNode;
    }

    if (target.tagName == "P" || target.tagName == "FORM") {
      target = target.parentNode;
    }

    //

    if ( target == this.dropArea ) {
      this.list.appendChild(this.placeholder);
      return;
    }

    if ( hyperaudio.hasClass(target, 'HAP-transcript__item') ) {
      var items = this.list.querySelectorAll('.HAP-transcript__item'),
        i = 0, l = items.length;

      for ( ; i < l; i++ ) {

        if ( target == items[i] ) {

          this.list.insertBefore(this.placeholder, items[i]);
          break;
        }
      }

      return;
    }

    if ( this.list.querySelector('.placeholder') ) {
      this.placeholder.parentNode.removeChild(this.placeholder);
    }
  };

  DragDrop.prototype.end = function (e) {

    var event = document.createEvent('Event');
    event.initEvent('mixchange', true, true);

    clearTimeout(this.dragTimeout);

    document.removeEventListener('touchend', this, false);
    document.removeEventListener('mouseup', this, false);

    if ( !this.initiated ) {
      return;
    }

    document.removeEventListener('touchmove', this, false);
    document.removeEventListener('mousemove', this, false);

    var point = e.changedTouches ? e.changedTouches[0] : e;
    var target = e.touches ? document.elementFromPoint(point.pageX, point.pageY) : point.target;

    var html = this.options.html ? this.handle.innerHTML : this.draggable.innerHTML;
    this.draggable.parentNode.removeChild(this.draggable);
    this.draggable = null;

    // we dropped outside of the draggable area
    if ( !this.list.querySelector('.placeholder') ) {

      if ( this.reordering ) {
        this.handle.parentNode.removeChild(this.handle);
      }

      if ( this.options.onDrop ) {
        this.options.onDrop.call(this, null);
      }

      document.dispatchEvent(event);
      console.log('mixchange1');

      return;
    }

    var el;

    // if we are reordering, reuse the original element
    if ( this.reordering ) {
      el = this.handle;
      this.handle.style.display = '';
    } else {
      el = document.createElement(this.options.blockTag);
      el.className = this.handleClassName || 'HAP-transcript__item';
      el.innerHTML = html;
    }

    this.list.insertBefore(el, this.placeholder);
    this.placeholder.parentNode.removeChild(this.placeholder);

    if ( this.options.onDrop ) {
      this.options.onDrop.call(this, el);
    }

    document.dispatchEvent(event);
    console.log('mixchange2');
  };

  DragDrop.prototype.destroy = function () {
    document.removeEventListener('touchstart', this, false);
    document.removeEventListener('touchmove', this, false);
    document.removeEventListener('touchend', this, false);

    document.removeEventListener('mousedown', this, false);
    document.removeEventListener('mousemove', this, false);
    document.removeEventListener('mouseup', this, false);
  };

  return DragDrop;
})(window, document, hyperaudio);

var EditBlock = (function (document) {

  function EditBlock (options) {
    this.options = {};

    for ( var i in options ) {
      this.options[i] = options[i];
    }

    this.el = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;
    this.stage = this.options.stage || {dropped:function(){}};
    this.words = this.el.querySelectorAll('a');

    this.el.className += ' edit';
    this.el._tap = new Tap({el: this.el});
    this.el.addEventListener('tap', this, false);

    document.addEventListener('touchend', this, false);
    document.addEventListener('mouseup', this, false);
  }

  EditBlock.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchend':
      case 'mouseup':
        this.cancel(e);
        break;
      case 'tap':
        this.edit(e);
        break;
    }
  };

  EditBlock.prototype.cancel = function (e) {
    var target = e.target;

    if ( target == this.el || target.parentNode == this.el || target.parentNode.parentNode == this.el ) {
      return;
    }

    hyperaudio.gaEvent({
      type: 'EDITBLOCK',
      action: 'canceledit: Cancelled editing.'
    });

    this.destroy();
  };

  EditBlock.prototype.edit = function (e) {
    e.stopPropagation();

    var theCut = e.target;
    var cutPointReached;
    var wordCount = this.words.length;

    if ( theCut.tagName != 'A' || theCut == this.words[wordCount-1] ) {
      return;
    }

    // Create a new block
    //var newBlock = document.createElement('section');
    var newBlock = this.el.cloneNode(false);
    var newParagraph, prevContainer;

    newBlock.className = newBlock.className.replace(/(^|\s)edit(\s|$)/g, ' ');

    //newBlock.className = 'item';

    for ( var i = 0; i < wordCount; i++ ) {
      if ( this.words[i].parentNode != prevContainer ) {
        if ( newParagraph && cutPointReached && newParagraph.querySelector('a') ) {
          newBlock.appendChild(newParagraph);
        }

        newParagraph = document.createElement('p');
        var attribute = document.createAttribute('dir');
        attribute.value = "auto";
        newParagraph.setAttributeNode(attribute);
        prevContainer = this.words[i].parentNode;
      }

      if ( cutPointReached ) {
        newParagraph.appendChild(this.words[i]);

        if ( !prevContainer.querySelector('a') ) {
          prevContainer.parentNode.removeChild(prevContainer);
        }
      }

      if ( !cutPointReached && this.words[i] == theCut ) {
        cutPointReached = true;
      }
    }

    newBlock.appendChild(newParagraph);

    var action = document.createElement('div');
    action.className = 'actions';
    newBlock.appendChild(action);

    this.el.parentNode.insertBefore(newBlock, this.el.nextSibling);
    this.el.handleHTML = this.el.innerHTML;

    this.stage.dropped(newBlock);

    hyperaudio.gaEvent({
      type: 'EDITBLOCK',
      action: 'edit: Editted section.'
    });

    this.destroy();
  };

  EditBlock.prototype.destroy = function () {
    // Remove edit status
    this.el.className = this.el.className.replace(/(^|\s)edit(\s|$)/g, ' ');

    document.removeEventListener('touchend', this, false);
    document.removeEventListener('mouseup', this, false);

    this.el.removeEventListener('tap', this, false);
    this.el._editBlock = null;

    this.el._tap.destroy();
    this.el._tap = null;
  };

  return EditBlock;
})(document);

var fadeFX = (function (window, document) {
  var _elementStyle = document.createElement('div').style;

  var _vendor = (function () {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      transform,
      i = 0,
      l = vendors.length;

    for ( ; i < l; i++ ) {
      transform = vendors[i] + 'ransition';
      if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
    }

    return false;
  })();

  function _prefixStyle (style) {
    if ( _vendor === false ) return false;
    if ( _vendor === '' ) return style;
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  }

  var transition = _prefixStyle('transition');
  var transform = _prefixStyle('transform');

  _elementStyle = null; // free mem ???

  var fxInstance;

  function fade (options) {
    // if ( !fxInstance ) {
      var opt = {
        time: 2000,
        background: '#000000', // fade
        color: '#ffffff', // title
        text: '',
        fadeOut: false,
        fadeIn: false,
        outFirst: true // not implemented
      };

      for ( var i in options ) {
        opt[i] = options[i];
      }

      fxInstance = new TransitionFade(opt);
    // }

    return fxInstance;
  }

  function TransitionFade (options) {
    this.options = options;

    this.servo = document.getElementById('fxHelper');

    this.servo.querySelector('h2').innerHTML = this.options.text ? this.options.text : '';

    this.servo.style[transition] = 'opacity 0ms';
    this.servo.style.left = '0px';
    this.servo.style.backgroundColor = this.options.background;
    this.servo.style.color = this.options.color;


    if ( this.options.fadeOut ) {
      this.servo.style.opacity = '0';
      this.fadeOut();
    } else if ( this.options.fadeIn ) {
      this.servo.style.opacity = '1';
      this.fadeIn();
    }
  }

  TransitionFade.prototype.handleEvent = function (e) {
    switch ( e.type ) {
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this.transitionEnd(e);
        break;
//      case 'canplay':
    }
  };

  TransitionFade.prototype.fadeOut = function () {
    this.phase = 'fadeOut';

    this.servo.addEventListener('transitionend', this, false);
    this.servo.addEventListener('webkitTransitionEnd', this, false);
    this.servo.addEventListener('oTransitionEnd', this, false);
    this.servo.addEventListener('MSTransitionEnd', this, false);

    var trick = this.servo.offsetHeight;  // force refresh. Mandatory on FF

    this.servo.style[transition] = 'opacity ' + this.options.time + 'ms';

    var that = this;
    setTimeout(function () {
      that.servo.style.opacity = '1';
    }, 0);
  };

  TransitionFade.prototype.transitionEnd = function (e) {
    e.stopPropagation();

    this.servo.removeEventListener('transitionend', this, false);
    this.servo.removeEventListener('webkitTransitionEnd', this, false);
    this.servo.removeEventListener('oTransitionEnd', this, false);
    this.servo.removeEventListener('MSTransitionEnd', this, false);

    if ( this.phase == 'fadeOut' ) {
      if ( this.options.onFadeOutEnd ) {
        this.options.onFadeOutEnd.call(this);
      }
    } else if ( this.phase == 'fadeIn' ) {
      if ( this.options.onFadeInEnd ) {
        this.options.onFadeInEnd.call(this);
      }

      // Race conditions are a bitch, so taking this out for time being.
      // this.destroy();
    }
  };

  TransitionFade.prototype.fadeIn = function () {
    this.phase = 'fadeIn';

    this.servo.addEventListener('transitionend', this, false);
    this.servo.addEventListener('webkitTransitionEnd', this, false);
    this.servo.addEventListener('oTransitionEnd', this, false);
    this.servo.addEventListener('MSTransitionEnd', this, false);

    var trick = this.servo.offsetHeight;  // force refresh. Mandatory on FF

    this.servo.style[transition] = 'opacity ' + this.options.time + 'ms';

    var that = this;
    setTimeout(function () {
      that.servo.style.opacity = '0';
    }, 0);
  };

  TransitionFade.prototype.destroy = function () {
    this.servo.removeEventListener('transitionend', this, false);
    this.servo.removeEventListener('webkitTransitionEnd', this, false);
    this.servo.removeEventListener('oTransitionEnd', this, false);
    this.servo.removeEventListener('MSTransitionEnd', this, false);

    this.servo.style[transition] = 'opacity 0ms';
    this.servo.style.opacity = '0';
    this.servo.style.left = '-9999px';

    fxInstance = null;
  };

  return fade;
})(window, document);

var SideMenu = (function (document, hyperaudio) {

  function SideMenu (options) {
    this.options = {
      el: '#sidemenu',
      transcripts: '#panel-media',
      // music: '#panel-bgm',
      stage: null // Points at a Stage instance
    };

    for ( var i in options ) {
      this.options[i] = options[i];
    }

    // Might rename the transcripts and music vars/options since rather ambiguous.

    this.el = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;
    this.transcripts = typeof this.options.transcripts == 'string' ? document.querySelector(this.options.transcripts) : this.options.transcripts;
    this.music = typeof this.options.music == 'string' ? document.querySelector(this.options.music) : this.options.music;
    this.mediaCallback = this.options.callback;

    this.initTranscripts();
    // this.initMusic();
  }

  SideMenu.prototype.makeMenuFolder = function(parent, title, channel, user) {
    var li = document.createElement('li'),
      div = document.createElement('div'),
      ul = document.createElement('ul');
    hyperaudio.addClass(li, 'folder');

    div.innerHTML = title;
    li.appendChild(div);
    li.appendChild(ul);
    parent.appendChild(li);
    return ul;
  };

  SideMenu.prototype.initTranscripts = function () {

    var self = this;

    var username = '';

    xhr({
      url: HAP.options.transcripts + 'list.json',
      complete: function(event) {
        var json = JSON.parse(this.responseText);

        var alltrans = self.makeMenuFolder(self.transcripts, '');

        for(var i = 0, l = json.length; i < l; i++) {
          trans = json[i];
          list = document.createElement('li');
          anchor = document.createElement('a');
          anchor.setAttribute('data-id', trans._id);
          anchor.setAttribute('href', "#/"+trans._id);
          anchor.innerHTML = trans.label;
          anchor.addEventListener('click', function() {
            var ev = document.createEvent('Event');
            ev.initEvent('padmenuclick', true, true);
            document.dispatchEvent(ev);
          }, false);
          list.appendChild(anchor);
          alltrans.appendChild(list);
        }
      },
      error: function(event) {
        self.error = true;
      }
    });
  };

  return SideMenu;
})(document, hyperaudio);

var Tap = (function (window, document, hyperaudio) {

  function Tap (options) {
    this.options = {};

    for ( var i in options ) {
      this.options[i] = options[i];
    }

    this.el = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;

    this.el.addEventListener('touchstart', this, false);
    this.el.addEventListener('mousedown', this, false);
  }

  Tap.prototype = {
    handleEvent: function (e) {
      // jshint -W086
      switch (e.type) {
        case 'mousedown':
          if ( e.which !== 1 ) {
            break;
          }
        case 'touchstart':
          this._start(e);
          break;
        case 'touchmove':
        case 'mousemove':
          this._move(e);
          break;
        case 'touchend':
        case 'mouseup':
        case 'touchcancel':
        case 'mousecancel':
          this._end(e);
          break;
      }
      // jshint +W086
    },

    _start: function (e) {
      if ( e.touches && e.touches.length > 1 ) return;

      e.preventDefault();

      var point = e.touches ? e.touches[0] : e;

      this.moved = false;
      this.startX = point.pageX;
      this.startY = point.pageY;
      this.target = e.target;

      hyperaudio.addClass(this.target, 'tapPressed');

      /*this.el.addEventListener('touchmove', this, false);
      this.el.addEventListener('touchend', this, false);
      this.el.addEventListener('touchcancel', this, false);*/
      this.el.addEventListener('mousemove', this, false);
      this.el.addEventListener('mouseup', this, false);
      this.el.addEventListener('mousecancel', this, false);
    },

    _move: function (e) {
      var point = e.changedTouches ? e.changedTouches[0] : e,
        x = point.pageX,
        y = point.pageY;

      if ( Math.abs( x - this.startX ) > 10 || Math.abs( y - this.startY ) > 10 ) {
        hyperaudio.removeClass(this.target, 'tapPressed');
        this.moved = true;
      }
    },

    _end: function (e) {
      hyperaudio.removeClass(this.target, 'tapPressed');

      if ( !this.moved ) {
        var ev = document.createEvent('Event'),
          point = e.changedTouches ? e.changedTouches[0] : e;

        ev.initEvent('tap', true, true);
        ev.pageX = point.pageX;
        ev.pageY = point.pageY;
        this.target.dispatchEvent(ev);
      }

      this.el.removeEventListener('touchmove', this, false);
      this.el.removeEventListener('touchend', this, false);
      this.el.removeEventListener('touchcancel', this, false);
      this.el.removeEventListener('mousemove', this, false);
      this.el.removeEventListener('mouseup', this, false);
      this.el.removeEventListener('mousecancel', this, false);
    },

    destroy: function () {
      this.el.removeEventListener('touchstart', this, false);
      this.el.removeEventListener('touchmove', this, false);
      this.el.removeEventListener('touchend', this, false);
      this.el.removeEventListener('touchcancel', this, false);
      this.el.removeEventListener('mousedown', this, false);
      this.el.removeEventListener('mousemove', this, false);
      this.el.removeEventListener('mouseup', this, false);
      this.el.removeEventListener('mousecancel', this, false);
    }
  };

  return Tap;
})(window, document, hyperaudio);


var titleFX = (function (window, document) {
  var _elementStyle = document.createElement('div').style;

  var _vendor = (function () {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      transform,
      i = 0,
      l = vendors.length;

    for ( ; i < l; i++ ) {
      transform = vendors[i] + 'ransform';
      if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
    }

    return false;
  })();

  function _prefixStyle (style) {
    if ( _vendor === false ) return false;
    if ( _vendor === '' ) return style;
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  }

  var transition = _prefixStyle('transition');
  var transitionDuration = _prefixStyle('transitionDuration');
  var transform = _prefixStyle('transform');

  _elementStyle = null; // free mem ???

  var fxInstance;

  function title (options) {
    if ( !fxInstance ) {
      var opt = {
        el: null,
        text: '',
        speed: 600,
        duration: 3000,
        background: 'rgba(0,0,0,0.8)',
        color: '#ffffff'
      };

      for ( var i in options ) {
        opt[i] = options[i];
      }

      fxInstance = new TitleEffect(opt);
    }

    return fxInstance;
  }

  function TitleEffect (options) {
    this.options = options;

    this.el = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;

    this.el.innerHTML = this.options.text;
    this.el.style.backgroundColor = this.options.background;
    this.el.style.color = this.options.color;
    this.el.style.left = '0px';
    this.el.style[transform] = 'translate(0, 100%) translateZ(0)';

    this.el.addEventListener('transitionend', this, false);
    this.el.addEventListener('webkitTransitionEnd', this, false);
    this.el.addEventListener('oTransitionEnd', this, false);
    this.el.addEventListener('MSTransitionEnd', this, false);

    this.start();
  }

  TitleEffect.prototype.handleEvent = function (e) {
    switch ( e.type ) {
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this.transitionEnd(e);
        break;
    }
  };

  TitleEffect.prototype.start = function () {
    this.phase = 'start';

    var trick = this.el.offsetHeight; // force refresh. Mandatory on FF
    this.el.style[transitionDuration] = this.options.speed + 'ms';

    var that = this;
    setTimeout(function () {
      that.el.style[transform] = 'translate(0, 0) translateZ(0)';
    }, 0);
  };

  TitleEffect.prototype.transitionEnd = function (e) {
    e.stopPropagation();

    if ( this.phase == 'start' ) {
      this.phase = 'waiting';
      this.timeout = setTimeout(this.end.bind(this), this.options.duration);
      return;
    }

    if ( this.options.onEnd ) {
      this.options.onEnd.call(this);
    }

    this.destroy();
  };

  TitleEffect.prototype.end = function () {
    this.phase = 'end';
    this.el.style[transform] = 'translate(0, 100%) translateZ(0)';
  };

  TitleEffect.prototype.destroy = function () {
    clearTimeout(this.timeout);

    this.el.removeEventListener('transitionend', this, false);
    this.el.removeEventListener('webkitTransitionEnd', this, false);
    this.el.removeEventListener('oTransitionEnd', this, false);
    this.el.removeEventListener('MSTransitionEnd', this, false);

    this.el.style[transitionDuration] = '0s';
    this.el.style.left = '-9999px';

    fxInstance = null;
  };

  return title;
})(window, document);

var WordSelect = (function (window, document, hyperaudio) {

  // used just in dev environment
  function addTagHelpers (el) {
    var text = (el.innerText || el.textContent).split(' ');

    el.innerHTML = '<a>' + text.join(' </a><a>') + '</a>';
  }

  function WordSelect (options) {

    this.options = {
      el: null,
      addHelpers: false,
      touch: false,
      mouse: true,
      threshold: 10,
      timeout: 0 // 500
    };

    for ( var i in options ) {
      this.options[i] = options[i];
    }

    this.element = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;

    if ( this.options.addHelpers ) {
      addTagHelpers(this.element);
    }

    this.words = this.element.querySelectorAll('a');
    this.wordsCount = this.words.length;

    if ( this.options.touch ) {
      this.element.addEventListener('touchstart', this, false);
    }

    if ( this.options.mouse ) {
      this.element.addEventListener('mousedown', this, false);
    }
  }

  WordSelect.prototype.handleEvent = function (e) {
    // jshint -W086
    switch (e.type) {
      case 'mousedown':
        if ( e.which !== 1 ) {
          break;
        }
      case 'touchstart':
        this.start(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.move(e);
        break;
      case 'touchend':
      case 'mouseup':
        this.end(e);
        break;
    }
    // jshint +W086
  };

  WordSelect.prototype.start = function (e) {
    e.preventDefault();

    var point = e.touches ? e.touches[0] : e;

    this.selectStarted = false;
    this.startX = e.pageX;
    this.startY = e.pageY;

    if ( this.options.mouse ) {
      this.element.addEventListener('mousemove', this, false);
      window.addEventListener('mouseup', this, false);
    }

    if ( this.options.touch ) {
      this.element.addEventListener('touchmove', this, false);
      window.addEventListener('touchend', this, false);
    }

    if ( hyperaudio.hasClass(e.target, 'selected') ) {
      this.dragTimeout = setTimeout(this.dragStart.bind(this, e), this.options.timeout);
    }
  };

  WordSelect.prototype.selectStart = function (e) {
    var target = e.target,
      tmp;

    if ( target == this.element || target.tagName != 'A' ) {
      return;
    }

    this.selectStarted = true;

    this.currentWord = target;

    // WIP - Commented out, since operation conflicts with zero grab time
    // hyperaudio.removeClass(this.element.querySelector('.first'), 'first');
    // hyperaudio.removeClass(this.element.querySelector('.last'), 'last');

    if ( this.words[this.startPosition] === target ) {
      tmp = this.startPosition;
      this.startPosition = this.endPosition;
      this.endPosition = tmp;
      return;
    }

    if ( this.words[this.endPosition] === target ) {
      return;
    }

    for ( var i = 0; i < this.wordsCount; i++ ) {
      if ( this.words[i] == target ) {
        this.startPosition = i;
      }

      hyperaudio.removeClass(this.words[i], 'selected');
    }

    this.endPosition = this.startPosition;

    hyperaudio.addClass(target, 'selected');
  };

  WordSelect.prototype.move = function (e) {
    var point = e.changedTouches ? e.changedTouches[0] : e,
      target = e.touches ? document.elementFromPoint(point.pageX, point.pageY) : point.target,
      endPosition;

    if ( Math.abs(point.pageX - this.startX) < this.options.threshold &&
      Math.abs(point.pageY - this.startY) < this.options.threshold ) {
      return;
    }

    clearTimeout(this.dragTimeout);

    if ( !this.selectStarted ) {
      this.selectStart(e);
      return;
    }

    if ( target.tagName == 'P' ) {
      target = target.querySelector('a:last-child');
    }

    if ( target == this.element || target == this.currentWord || target.tagName != 'A' ) {
      return;
    }

    for ( var i = 0; i < this.wordsCount; i++ ) {
      if ( this.words[i] == target ) {
        endPosition = i;
      }

      if ( ( endPosition === undefined && i >= this.startPosition ) ||
        ( endPosition !== undefined && i <= this.startPosition ) ||
        endPosition == i ) {
        hyperaudio.addClass(this.words[i], 'selected');
      } else {
        hyperaudio.removeClass(this.words[i], 'selected');
      }
    }

    this.currentWord = target;
    this.endPosition = endPosition;
  };

  WordSelect.prototype.end = function (e) {
    clearTimeout(this.dragTimeout);

    if ( this.options.touch ) {
      this.element.removeEventListener('touchmove', this, false);
      this.element.removeEventListener('touchend', this, false);
    }

    if ( this.options.mouse ) {
      this.element.removeEventListener('mousemove', this, false);
      this.element.removeEventListener('mouseup', this, false);
    }

    if ( !this.selectStarted ) {
      if ( e.target == this.element ) {
        this.clearSelection();
      }

      return;
    }

    var start = Math.min(this.startPosition, this.endPosition),
      end = Math.max(this.startPosition, this.endPosition);

    // WIP - Commented out, since operation conflicts with zero grab time
    // hyperaudio.addClass(this.words[start], 'first');
    // hyperaudio.addClass(this.words[end], 'last');


    if ( this.options.onSelection ) {
      this.options.onSelection.call(this);
    }
  };

  WordSelect.prototype.clearSelection = function () {
    this.currentWord = null;
    this.startPosition = null;
    this.endPosition = null;

    // WIP - Commented out, since operation conflicts with zero grab time
    // hyperaudio.removeClass(this.element.querySelector('.first'), 'first');
    // hyperaudio.removeClass(this.element.querySelector('.last'), 'last');

    if ( this.options.touch ) {
      this.element.removeEventListener('touchmove', this, false);
      this.element.removeEventListener('touchend', this, false);
    }

    if ( this.options.mouse ) {
      this.element.removeEventListener('mousemove', this, false);
      this.element.removeEventListener('mouseup', this, false);
    }

    var selected = this.element.querySelectorAll('.selected');
    for ( var i = 0, l = selected.length; i < l; i++ ) {
      hyperaudio.removeClass(selected[i], 'selected');
    }

    if ( this.options.onClear ) {
      this.options.onClear.call(this);
    }
  };

  WordSelect.prototype.getSelection = function () {
    var selected = this.element.querySelectorAll('.selected');
    var prevParent;
    var html = '';
    for ( var i = 0, l = selected.length; i < l; i++ ) {
      if ( selected[i].parentNode !== prevParent ) {
        prevParent = selected[i].parentNode;
        html += ( i === 0 ? '<p dir="auto">' : '</p><p dir="auto">' );
      }
      html += selected[i].outerHTML.replace(/ class="[\d\w\s\-]*\s?"/gi, ' ');
    }

    if ( html ) {
      html += '</p>';
    }

    return html;
  };

  WordSelect.prototype.dragStart = function (e) {
    e.stopPropagation();

    if ( this.options.touch ) {
      this.element.removeEventListener('touchmove', this, false);
      this.element.removeEventListener('touchend', this, false);
    }

    if ( this.options.mouse ) {
      this.element.removeEventListener('mousemove', this, false);
      this.element.removeEventListener('mouseup', this, false);
    }

    var point = e.changedTouches ? e.changedTouches[0] : e;

    if ( this.options.onDragStart ) {
      this.options.onDragStart.call(this, e);
    }
  };

  WordSelect.prototype.destroy = function () {
    this.element.removeEventListener('touchstart', this, false);
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);

    this.element.removeEventListener('mousedown', this, false);
    this.element.removeEventListener('mousemove', this, false);
    this.element.removeEventListener('mouseup', this, false);
  };

  return WordSelect;

})(window, document, hyperaudio);

/* xhr
 *
 */

var xhr = (function(hyperaudio) {

  return function(options) {

    options = hyperaudio.extend({
      url: '',
      data: '', // Only valid for POST types
      type: 'GET',
      responseType: '',
      async: true,
      withCredentials: true, // Setting to true requires the CORS header Access-Control-Allow-Credentials on the server
      timeout: 0,
      cache: true

      // complete: function()
      // error: function()
    }, options);

    if(!options.cache) {
      options.url = options.url + ((/\?/).test(options.url) ? "&" : "?") + (new Date()).getTime();
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function(event) {
      if(200 <= this.status && this.status < 300) {
        if(typeof options.complete === 'function') {
          options.complete.call(this, event);
        }
      } else {
        if(typeof options.error === 'function') {
          options.error.call(this, event);
        }
      }
    }, false);

    if(typeof options.error === 'function') {
      xhr.addEventListener('error', function(event) {
        options.error.call(this, event);
      }, false);
      xhr.addEventListener('abort', function(event) {
        options.error.call(this, event);
      }, false);
    }

    xhr.open(options.type, options.url, options.async);
    xhr.responseType = options.responseType;
    xhr.withCredentials = options.withCredentials;
    xhr.timeout = options.timeout;

    if(options.data) {
      xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
    }

    xhr.send(options.data);

    return xhr;
  };

}(hyperaudio));


/* api
 *
 */

var api = (function(hyperaudio) {

  return {
    init: function(options) {
      this.options = hyperaudio.extend({

        // Options used to build the API url. See _updateInternals() to see how the API url is built.
        protocol: 'http://',
        org: '', // The organisations namespace / sub-domain. EG. 'chattanooga'
        api: 'api.', // The sub-domain of the API
        domain: 'hyperaud.io', // The domain of the API
        version: '/v1/', // The version of the API.

        // Command syntax
        //transcripts: transcriptsPath,
        transcripts_filter: '?type=html',
        mixes: 'mixes/',
        channels: 'channels/',
        // signin: 'login/',
        whoami: 'whoami/',
        // Specific user (bgm) for music
        bgm: 'bgm/media/'
      }, options);

      // The base url of the API
      this.url = null;
      this._updateInternals();

      // API State
      this.error = false;

      // User Properties
      this.guest = false; // False to force 1st call
      this.username = ''; // Falsey to force 1st call

      // Stored requested data
      this.transcripts = null;
      this.transcript = null;
      this.mixes = null;
      this.mix = null;
      this.bgm = null;

      this.channels = null;
    },
    option: function(options, value) {
      if(typeof options === 'string') { // Enable option to be set/get by name.
        if(typeof value !== 'undefined') {
          this.options[options] = value;
        } else {
          return this.options[options];
        }
      } else if(typeof options === 'object') { // Enable options to be set/get by object.
        hyperaudio.extend(this.options, options);
      } else {
        return hyperaudio.extend({}, this.options); // Return a copy of the options object.
      }
      this._updateInternals();
    },
    _updateInternals: function() {
      var namespace = this.options.org ? this.options.org + '.' : '';
      this.url = this.options.protocol + namespace + this.options.api + this.options.domain + this.options.version;
    },
    callback: function(callback, success) {
      if(typeof callback === 'function') {
        callback.call(this, success);
      }
    },
    getTranscript: function(id, callback, force) {

      var self = this;

      var transcriptObj;

      if (HAP.options.longformId) {
        xhr({
          url: HAP.options.transcripts + HAP.options.longformId + ".html",
          complete: function(event) {
            var html = this.responseText;
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var label = doc.getElementsByTagName('header')[0].innerHTML;

            transcriptObj = {
              _id: "",
              label: label,
              type: "html",
              owner: "",
              meta: {
                status: null,
                state: 2,
                mod9: {
                  jobid: ""
                }
              },
              content: this.responseText,
              media: {
                _id: "",
                label: "",
                desc: "",
                type: "video",
                owner: "",
                namespace: null,
                meta: "",
                channel: null,
                tags: [],
                modified : "",
                created : "",
              },
              status: "",
              modified: "",
              created: ""
            };

            if (HAP.options.mp4Compat) {
              transcriptObj.media.source = {
                mp4: {
                  type: "video/mp4",
                  url: HAP.options.longformMedia,
                  thumbnail: ""
                }
              };
            } else {
              transcriptObj.media.source = {
                youtube: {
                  type: "video/youtube",
                  url: HAP.options.longformMedia,
                  thumbnail: ""
                }
              };
            }

            //var json = JSON.parse(this.responseText);
            self.transcript = transcriptObj;
            self.callback(callback, true);
          },
          error: function(event) {
            self.error = true;
            self.callback(callback, false);
          }
        });
      } else {
        self.callback(callback, false);
      }
    },
    getMixFromUrl: function (id, callback, force) {
      var self = this;

      self.mix = {_id:"",content:HAP.options.mixHTML,created:"",desc:"",label:HAP.options.mixTitle,modified:"", namespace:null, owner: "", tags:[], type: ""};

      self.callback(callback, true);
    }
  };

}(hyperaudio));

/*
           88 88             88                                                     88
           88 ""             88                                                     88
           88                88                                                     88
 ,adPPYba, 88 88 8b,dPPYba,  88,dPPYba,   ,adPPYba,  ,adPPYYba, 8b,dPPYba,  ,adPPYb,88
a8"     "" 88 88 88P'    "8a 88P'    "8a a8"     "8a ""     `Y8 88P'   "Y8 a8"    `Y88
8b         88 88 88       d8 88       d8 8b       d8 ,adPPPPP88 88         8b       88
"8a,   ,aa 88 88 88b,   ,a8" 88b,   ,a8" "8a,   ,a8" 88,    ,88 88         "8a,   ,d88
 `"Ybbd8"' 88 88 88`YbbdP"'  8Y"Ybbd8"'   `"YbbdP"'  `"8bbdP"Y8 88          `"8bbdP"Y8
                 88
                 88


*/


/* Clipboard
 *
 */

var Clipboard = (function(hyperaudio) {

  // Following the method used by Trello
  // http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard

  var DEBUG = false;

  return {
    init: function(options) {
      var self = this;

      this.options = hyperaudio.extend({
        target: 'body',
        id_container: 'clipboard-container',
        id_clipboard: 'clipboard'
      }, options);

      // Properties
      this.value = '';
      this.target = typeof this.options.target === 'string' ? document.querySelector(this.options.target) : this.options.target;

      if(this.target) {
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.options.id_container);
        this.container.style.display = 'none';
        this.target.appendChild(this.container);
      }

      // See if security allowed via same domain policy.
      var rights = true;
      try {
        window.top.document.createElement('div');
      } catch(error) {
        rights = false;
      }

      if(rights) {
        // Handlers for top frame
        window.top.document.documentElement.addEventListener('keydown', function(event) {
          self.onKeyDown(event);
        }, false);
        window.top.document.documentElement.addEventListener('keyup', function(event) {
          self.onKeyUp(event);
        }, false);
      }

      // Handlers for this window
      document.documentElement.addEventListener('keydown', function(event) {
        self.onKeyDown(event);
      }, false);
      document.documentElement.addEventListener('keyup', function(event) {
        self.onKeyUp(event);
      }, false);

      this.enable();
    },
    enable: function(enabled) {
      enabled = typeof enabled === 'undefined' ? true : !!enabled;
      this.enabled = enabled;
    },
    disable: function(disable) {
      disable = typeof disable === 'undefined' ? true : !!disable;
      this.enable(!disable);
    },
    copy: function(value) {
      this.value = value;
    },
    clear: function() {
      this.value = '';
    },
    onKeyDown: function(event) {

      if(DEBUG) console.log('[onKeyDown] : Key pressed');

      if(!this.enabled || !this.value || !(event.ctrlKey || event.metaKey)) {
        if(DEBUG) console.log('[onKeyDown] : Exit | enabled = ' + this.enabled + ' | value = "' + this.value + '"');
        return;
      }

      // Used the activeElement code from jPlayer.

      var pageFocus = document.activeElement;
      var keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";
      var ignoreKey = false;

      if(typeof pageFocus !== 'undefined') {
        if(pageFocus !== null && pageFocus.nodeName.toUpperCase() !== "BODY") {
          ignoreKey = true;
          if(DEBUG) console.log('[onKeyDown] : Exit | pageFocus = %o' + pageFocus);
        }
      } else {
        // Fallback for no document.activeElement support.
        hyperaudio.each( keyIgnoreElementNames.split(/\s+/g), function(i, name) {
          // The strings should already be uppercase.
          if(event.target.nodeName.toUpperCase() === name.toUpperCase()) {
            ignoreKey = true;
            if(DEBUG) console.log('[onKeyDown] : Exit | nodeName = ' + name);
            return false; // exit each.
          }
        });
      }

      if(ignoreKey) {
        return;
      }

      if(DEBUG) console.log('[onKeyDown] : Textarea prepared for copy | value = "' + this.value + '"');

      // If we get this far, prepare the textarea ready for the copy.

      hyperaudio.empty(this.container);
      this.container.style.display = 'block';

      this.clipboard = document.createElement('textarea');
      this.clipboard.setAttribute('id', this.options.id_clipboard);
      this.clipboard.value = this.value;
      this.container.appendChild(this.clipboard);
      this.clipboard.focus();
      this.clipboard.select();
    },
    onKeyUp: function(event) {
      if(DEBUG) console.log('[onKeyUp] : Key released');
      if(event.target === this.clipboard) {
        hyperaudio.empty(this.container);
        this.container.style.display = 'none';
      }
    }
  };

}(hyperaudio));

/*
                    88          88
                    88          88
                    88          88
,adPPYYba,  ,adPPYb,88  ,adPPYb,88 8b,dPPYba,  ,adPPYba, ,adPPYba, ,adPPYba,
""     `Y8 a8"    `Y88 a8"    `Y88 88P'   "Y8 a8P_____88 I8[    "" I8[    ""
,adPPPPP88 8b       88 8b       88 88         8PP"""""""  `"Y8ba,   `"Y8ba,
88,    ,88 "8a,   ,d88 "8a,   ,d88 88         "8b,   ,aa aa    ]8I aa    ]8I
`"8bbdP"Y8  `"8bbdP"Y8  `"8bbdP"Y8 88          `"Ybbd8"' `"YbbdP"' `"YbbdP"'

*/

/* Address
 *
 */

var Address = (function(hyperaudio) {

  // Refs:
  // http://diveintohtml5.info/history.html
  // http://stackoverflow.com/questions/824349/modify-the-url-without-reloading-the-page

  var DEBUG = true;

  return {
    init: function(options) {
      var self = this;

      this.options = hyperaudio.extend({
        title: 'Hyperaudio Pad'
      }, options);

      // Properties
      this.enabled = false;
      this.status = {
        iframe: false,
        remote: false,
        support: false
      };

      // See if security allowed via same domain policy.
      try {
        window.top.document.createElement('div');

        // See if we are in an iframe
        if(window.top.document !== document) {
          this.status.iframe = true;
        }

      } catch(error) {
        this.status.iframe = true;
        this.status.remote = true;
      }

      // Pick which window to use.
      if(this.status.remote || !this.status.iframe) {
        this.win = window;
      } else {
        this.win = window.top;
      }

      if(this.win.history && this.win.history.replaceState) {
        this.status.support = true;
      }

      if(DEBUG) console.log('[History|init] status: { iframe: ' + this.status.iframe + ', remote: ' + this.status.remote + ', support: ' + this.status.support + ' }');

      this.enable();
    },
    enable: function() {
      if(this.status.support) {
        this.enabled = true;
      }
      return this.enabled;
    },
    disable: function() {
      this.enabled = false;
    },
    getUrlDetail: function() {

      var url = this.win.document.location.href;
      var base_url = url;
      var param_index = url.indexOf('?');
      var param_url = '';
      var hash_index = url.indexOf('#');
      var hash_url = '';

      // Do we have any parameters
      if(param_index >= 0) {
        base_url = url.slice(0, param_index);
        // Do we have any hash chars
        if(hash_index >= 0) {
          param_url = url.slice(param_index + 1, hash_index);
          hash_url = url.slice(hash_index + 1);
        } else {
          param_url = url.slice(param_index + 1);
        }
      } else {
        // Do we have any hash chars
        if(hash_index >= 0) {
          base_url = url.slice(0, hash_index);
          hash_url = url.slice(hash_index + 1);
        }
      }

      var value_pair = param_url.split('&');
      var pair;
      var param = {};

      for(var i = 0, iLen = value_pair.length; i < iLen; i++) {
        pair = value_pair[i].split('=');
        if(pair.length === 2) {
          param[pair[0]] = pair[1]; // May need to URL decode here
        }
      }

      return {
        base: base_url,
        param: param,
        hash: hash_url
      };
    },
    buildUrl: function(detail) {
      var first = true;
      var href = detail.base;
      for(var name in detail.param) {
        if(detail.param.hasOwnProperty(name)) {
          if(first) {
            first = false;
            href += '?';
          } else {
            href += '&';
          }
          href += name + '=' + detail.param[name];
        }
      }
      if(detail.hash) {
        href += '#' + detail.hash;
      }
      if(DEBUG) console.log('[History|buildUrl] href = "' + href + '"');
      return href;
    },
    setParam: function(name, value) {
      // The value should be a string. An undefined will remove the parameter.
      if(this.enabled) {
        var detail = this.getUrlDetail();
        var save = false;
        if(typeof value === 'string') {
          if(detail.param[name] !== value) {
            detail.param[name] = value;
            save = true;
            if(DEBUG) console.log('[History|setParam] NEW VALUE | "' + name + '" = "' + value + '"');
          }
        } else {
          if(typeof detail.param[name] !== 'undefined') {
            delete detail.param[name];
            save = true;
            if(DEBUG) console.log('[History|setParam] DELETE VALUE | "' + name + '" = "' + value + '"');
          }
        }
        if(save) {
          this.win.history.replaceState(null, this.options.title, this.buildUrl(detail));
        }
      }
    },
    getParam: function(name) {
      if(this.enabled) {
        var detail = this.getUrlDetail();
        return detail.param[name];
      }
    }
  };

}(hyperaudio));


/*
            88
            88
            88
8b,dPPYba,  88 ,adPPYYba, 8b       d8  ,adPPYba, 8b,dPPYba,
88P'    "8a 88 ""     `Y8 `8b     d8' a8P_____88 88P'   "Y8
88       d8 88 ,adPPPPP88  `8b   d8'  8PP""""""" 88
88b,   ,a8" 88 88,    ,88   `8b,d8'   "8b,   ,aa 88
88`YbbdP"'  88 `"8bbdP"Y8     Y88'     `"Ybbd8"' 88
88                            d8'
88                           d8'
*/
/* Player
 *
 */

var Player = (function(window, document, hyperaudio, Popcorn) {

  function Player(options) {

    this.options = hyperaudio.extend({}, this.options, {

      entity: 'PLAYER', // Not really an option... More like a manifest

      target: '#transcript-video', // The selector of element where the video is generated

      // Caching can cause problem in Chrome due to the bug:
      //   Issue 31014: Byte range cache is locked when attempting to open the same video twice
      //   https://code.google.com/p/chromium/issues/detail?id=31014
      cache: false,

      media: {
        youtube: '', // The URL of the Youtube video.
        mp4: '', // The URL of the mp4 video.
        webm:'' // The URL of the webm video.
      },

      // Types valid in a video element
      mediaType: {
        mp4: 'video/mp4', // The mp4 mime type.
        webm:'video/webm' // The webm mime type.
      },

      guiNative: false, // TMP during dev. Either we have a gui or we are chomeless.

      gui: false, // True to add a gui, or Object to pass GUI options.
      cssClass: 'HAP-player', // Class added to the target for the GUI CSS. (passed to GUI and Projector)
      solutionClass: 'solution', // Class added to the solution that is active.
      async: true // When true, some operations are delayed by a timeout.
    }, options);

    // Properties
    this.target = typeof this.options.target === 'string' ? document.querySelector(this.options.target) : this.options.target;
    this.videoElem = null;
    this.timeout = {};
    this.commandsIgnored = /ipad|iphone|ipod|android/i.test(window.navigator.userAgent);

    // List of the media types, used to check for changes in media.
    this.mediaTypes = "youtube mp4 webm";

    this.youtube = false; // A flag to indicate if the YT player being used.

    // Until the YouTube wrapper is fixed, we need to recreate it and the listeners when the YT media changes.
    this.ytFix = [];

    if(this.options.DEBUG) {
      this._debug();
    }

    if(this.target) {
      this.create();
    }
  }

  Player.prototype = {
    create: function() {
      var self = this;

      if(this.target) {

        this.wrapper = {
          html: document.createElement('div'),
          youtube: document.createElement('div')
        };
        hyperaudio.addClass(this.wrapper.html, 'HAP-player--video');
        hyperaudio.addClass(this.wrapper.youtube, 'HAP-player--youtube');

        this.solution = {
          html: document.createElement('video'),
          youtube: Popcorn.HTMLYouTubeVideoElement(this.wrapper.youtube)
        };

        // Default to a video element to start with
        this.videoElem = this.solution.html;
        this.youtube = false;
        this.updateSolution();

        this.solution.html.controls = this.options.guiNative; // TMP during dev. Either we have a gui or we are chomeless.

        // Add listeners to the video element
        this.solution.html.addEventListener('progress', function(e) {
          if(this.readyState > 0) {
            self.commandsIgnored = false;
          }
        }, false);

        // Clear the target element and add the video
        this.empty(this.target);
        this.wrapper.html.appendChild(this.solution.html);
        // this.wrapper.youtube.appendChild(this.solution.youtube);

        // GRIDIFIX
        // var xxx = document.createElement('div');
        // this.target.appendChild(xxx);
        // this.target = xxx;

        this.target.appendChild(this.wrapper.html);
        this.target.appendChild(this.wrapper.youtube);

        if(this.options.gui) {

          var guiOptions = {
            player: this,

            navigation: false,    // next/prev buttons
            fullscreen: false,    // fullscreen button

            cssClass: this.options.cssClass // Pass in the option, so only have to define it in this class
          };

          if(typeof this.options.gui === 'object') {
            hyperaudio.extend(guiOptions, this.options.gui);
          }

          this.GUI = new hyperaudio.PlayerGUI(guiOptions);

          var handler = function(event) {
            var video = self.videoElem;
            self.GUI.setStatus({
              paused: video.paused,
              currentTime: video.currentTime,
              duration: video.duration
            });
          };

          this.addEventListener('progress', handler); // Important for YT player GUI to update on set/change
          this.addEventListener('timeupdate', handler);
          this.addEventListener('play', handler);
          this.addEventListener('pause', handler);
          this.addEventListener('ended', handler);
        }

        if(this.options.media.youtube || this.options.media.mp4) { // Assumes we have the webm
          this.load();
        }
      } else {
        this._error('Target not found : ' + this.options.target);
      }
    },

    mediaDiff: function(media) {
      var self = this,
        diff = false;
      if(media) {
        hyperaudio.each(this.mediaTypes.split(/\s+/g), function() {
          if(self.options.media[this] !== media[this]) {
            diff = true;
            return false; // exit each
          }
        });
      } else {
        diff = true;
      }
      return diff;
    },

    updateSolution: function() {

      var wrapper = this.wrapper,
        cssClass = this.options.solutionClass;

      if(this.youtube) {
        hyperaudio.removeClass(wrapper.html, cssClass);
        hyperaudio.addClass(wrapper.youtube, cssClass);
      } else {
        hyperaudio.removeClass(wrapper.youtube, cssClass);
        hyperaudio.addClass(wrapper.html, cssClass);
      }
    },

    show: function() {
      this.updateSolution();
    },
    hide: function() {
      var wrapper = this.wrapper,
        cssClass = this.options.solutionClass;

      hyperaudio.removeClass(wrapper.html, cssClass);
      hyperaudio.removeClass(wrapper.youtube, cssClass);
    },

    load: function(media) {

      var self = this,
        newMedia = this.mediaDiff(media);

      if(media) {
        this.options.media = media;
      }

      if(this.target) {

        if(newMedia) {

          this.pause(); // Pause the player, otherwise switching solution may leave 1 playing while hidden.

          this.killPopcorn();

          // console.log('media: %o', this.options.media);

          if(this.options.media.youtube) {

            // The YT element needs to be recreated while bugs in wrapper.
            // this.empty(this.wrapper.youtube);
            // this.solution.youtube = Popcorn.HTMLYouTubeVideoElement(this.wrapper.youtube);

            this.solution.youtube.src = this.options.media.youtube + '&html5=1';
            this.videoElem = this.solution.youtube;
            this.youtube = true;
            this.updateSolution();

            // Until the YouTube wrapper is fixed, we need to recreate it and the listeners when the YT media changes.
            // this._ytFixListeners();
          } else {

            this.empty(this.solution.html);

            // Setup to work with mp4 and webm property names. See options.
            hyperaudio.each(this.options.media, function(format, url) {
              // Only create known formats, so we can add other info to the media object.
              if(self.options.mediaType[format] && url) {

                if(!self.options.cache) {
                  url = url + ((/\?/).test(url) ? "&" : "?") + Math.floor(1e12 * Math.random());
                }

                var source = document.createElement('source');
                source.setAttribute('type', self.options.mediaType[format]);
                source.setAttribute('src', url); // Could use 'this' but less easy to read.
                self.solution.html.appendChild(source);
              }
            });

            this.solution.html.load();
            this.videoElem = this.solution.html;
            this.youtube = false;
            this.updateSolution();
          }

          this.initPopcorn();
        }
      } else {
        console.log('ERROR : Video player not created : ' + this.options.target);
        this._error('Video player not created : ' + this.options.target);
      }
    },
    initPopcorn: function() {
      this.killPopcorn();
      this.popcorn = Popcorn(this.videoElem);
    },
    killPopcorn: function() {
      if(this.popcorn) {
        this.popcorn.destroy();
        delete this.popcorn;
      }
    },
    empty: function(el) {
      // Empties the element... Possibly better than el.innerHTML = '';
      while(el && el.firstChild) {
        el.removeChild(el.firstChild);
      }
    },
    gui_play: function(time) {
      this._trigger(hyperaudio.event.userplay, {msg: 'User clicked play'});
      this.play(time);
    },
    gui_pause: function(time) {
      this._trigger(hyperaudio.event.userpause, {msg: 'User clicked pause'});
      this.pause(time);
    },
    gui_currentTime: function(time, play) {
      this._trigger(hyperaudio.event.usercurrenttime, {msg: 'User clicked the progress bar'});
      this.currentTime(time, play);
    },
    play: function(time) {
      if(this.youtube) {
        this.popcorn.play(time);
      } else {
        this.currentTime(time, true);
      }
    },
    pause: function(time) {
      if(this.youtube) {
        this.popcorn.pause(time);
      } else {
        this.videoElem.pause();
        this.currentTime(time);
      }
    },
    currentTime: function(time, play) {

      var self = this,
        media = this.videoElem;

      clearTimeout(this.timeout.currentTime);

      if(this.youtube) {
        this.popcorn.currentTime(time);
        return;
      }

      if(typeof time === 'number' && !isNaN(time)) {

        console.log("attempting to play");

        // Attempt to play it, since iOS has been ignoring commands
        if(play && this.commandsIgnored) {
          media.play();
        }

        try {
          // !media.seekable is for old HTML5 browsers, like Firefox 3.6.
          // Checking seekable.length is important for iOS6 to work with currentTime changes immediately after changing media
          if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
            media.currentTime = time;
            if(play) {
              media.play();
            }
          } else {
            throw 1;
          }
        } catch(err) {
          this.timeout.currentTime = setTimeout(function() {
            self.currentTime(time, play);
          }, 250);
        }
      } else {
        if(play) {
          console.log("attempting to play 2");
          media.play();
        }
      }
    },
    addEventListener: function(type, handler) {
      var self = this,
        handlers;

      if(this.solution && typeof type === 'string' && typeof handler === 'function') {
        handlers = {
          html: function(event) {
            if(!self.youtube) {
              handler.call(this, event);
            }
          },
          youtube: function(event) {
            if(self.youtube) {
              // Bugged YT wrapper context.
              // Reported https://bugzilla.mozilla.org/show_bug.cgi?id=946293
              // handler.call(this, event); // Bugged
              // this and event.target point at the document
              // event.detail.target points at the youtube target element
              handler.call(self.solution.youtube, event);
            }
          }
        };
        this.solution.html.addEventListener(type, handlers.html, false);
        this.solution.youtube.addEventListener(type, handlers.youtube, false);

        // Until the YouTube wrapper is fixed, we need to recreate it and the listeners when the YT media changes.
        this.ytFix.push({
          type: type,
          handler: handlers.youtube
        });
      }

      return handlers;
    },
    removeEventListener: function(type, handlers) {
      if(this.solution && typeof type === 'string' && typeof handlers === 'object') {
        this.solution.html.removeEventListener(type, handlers.html, false);
        this.solution.youtube.removeEventListener(type, handlers.youtube, false);

        // Until the YouTube wrapper is fixed, we need to recreate it and the listeners when the YT media changes.
        for(var i=0, l=this.ytFix.length; i<l; i++) {
          if(this.ytFix[i].type === type && this.ytFix[i].handler === handlers.youtube) {
            this.ytFix.splice(i, 1);
          }
        }
      }
    },
    // OBSOLETE Function due to Popcorn and YT Wrapper being fixed. ie., No more destroy and create... It persists!
    _ytFixListeners: function() {
      // Until the YouTube wrapper is fixed, we need to recreate it and the listeners when the YT media changes.
      for(var i=0, l=this.ytFix.length; i<l; i++) {
        this.solution.youtube.addEventListener(this.ytFix[i].type, this.ytFix[i].handler, false);
      }
    }
  };

  return Player;
}(window, document, hyperaudio, Popcorn));

/*
            88
            88
            88
8b,dPPYba,  88 ,adPPYYba, 8b       d8  ,adPPYba, 8b,dPPYba,
88P'    "8a 88 ""     `Y8 `8b     d8' a8P_____88 88P'   "Y8
88       d8 88 ,adPPPPP88  `8b   d8'  8PP""""""" 88
88b,   ,a8" 88 88,    ,88   `8b,d8'   "8b,   ,aa 88
88`YbbdP"'  88 `"8bbdP"Y8     Y88'     `"Ybbd8"' 88
88                            d8'
88                           d8'

                        88
                        ""

 ,adPPYb,d8 88       88 88
a8"    `Y88 88       88 88
8b       88 88       88 88
"8a,   ,d88 "8a,   ,a88 88
 `"YbbdP"Y8  `"YbbdP'Y8 88
 aa,    ,88
  "Y8bbdP"



*/
/**
 *
 * Player GUI
 *
 */

var PlayerGUI = (function (window, document, hyperaudio) {

  function PlayerGUI (options) {
    this.options = hyperaudio.extend({}, {
      player:     null, // mandatory instance to the player

      navigation:   true, // whether or not to display the next/prev buttons
      fullscreen:   true, // display the fullscreen button

      cssClass: 'HAP-player' // Class added to the target for the GUI CSS. (should move to GUI)
    }, options);

    if ( !this.options.player ) {
      return false;
    }

    this.status = {
      paused: true,
      currentTime: 0,
      duration: 0
    };

    this.player = this.options.player;

    var buttonCount = 1;

    var cssClass = this.options.cssClass; // For mini opto

    this.wrapperElem = document.createElement('div');
    this.wrapperElem.className = cssClass + '-gui';
    this.controlsElem = document.createElement('div');
    this.controlsElem.className = cssClass + '-controls';

    this.wrapperElem.appendChild(this.controlsElem);

    // PLAY button
    this.playButton = document.createElement('span');
    this.playButton.className = cssClass + '-play';
    this.controlsElem.appendChild(this.playButton);
    this.playButton.addEventListener('click', this.play.bind(this), false);

    // PREV/NEXT buttons
    if ( this.options.navigation ) {
      this.prevButton = document.createElement('span');
      this.prevButton.className = cssClass + '-prev';
      this.nextButton = document.createElement('span');
      this.nextButton.className = cssClass + '-next';

      this.controlsElem.appendChild(this.prevButton);
      this.controlsElem.appendChild(this.nextButton);

      //this.prevButton.addEventListener('click', this.prev.bind(this), false);
      //this.nextButton.addEventListener('click', this.next.bind(this), false);
      buttonCount += 2;
    }

    // PROGRESS BAR
    this.progressBarElem = document.createElement('div');
    this.progressBarElem.className = cssClass + '-bar';
    this.progressIndicator = document.createElement('span');
    this.progressIndicator.className = cssClass + '-progress';
    this.progressIndicator.style.width = '0%';

    this.progressBarElem.appendChild(this.progressIndicator);
    this.controlsElem.appendChild(this.progressBarElem);

    this.progressBarElem.addEventListener('mousedown', this.startSeeking.bind(this), false);
    this.progressBarElem.addEventListener('mousemove', this.seek.bind(this), false);
    document.addEventListener('mouseup', this.stopSeeking.bind(this), false);
    // this.player.videoElem.addEventListener('timeupdate', this.timeUpdate.bind(this), false);

    // FULLSCREEN Button
    if ( this.options.fullscreen ) {
      this.fullscreenButton = document.createElement('span');
      this.fullscreenButton.className = cssClass + '-fullscreen';
      this.controlsElem.appendChild(this.fullscreenButton);

      this.fullscreenButton.addEventListener('click', this.fullscreen.bind(this), false);

      buttonCount += 1;
    }

    // The time displays
    this.currentTimeElem = document.createElement('span');
    this.currentTimeElem.className = cssClass + '-current-time';
    this.durationElem = document.createElement('span');
    this.durationElem.className = cssClass + '-duration';
    this.progressBarElem.appendChild(this.currentTimeElem);
    this.progressBarElem.appendChild(this.durationElem);

    // Adjust sizes according to options
    // this.progressBarElem.style.width = 100 - buttonCount*10 + '%';

    // No longer required since fixing fullscreen using: .HAP-player-bar { position: relative; }
    // Now these are set to 100% width in the CSS.
    // this.currentTimeElem.style.width = 100 - buttonCount*10 + '%';
    // this.durationElem.style.width = 100 - buttonCount*10 + '%';

    // Add the GUI
    hyperaudio.addClass(this.player.target, cssClass);
    this.player.target.appendChild(this.wrapperElem);
  }

  PlayerGUI.prototype = {

    setStatus: function(status) {
      // Extending, since the new status might not hold all values.
      hyperaudio.extend(this.status, status);

      // console.log('paused:' + this.status.paused + ' | currentTime:' + this.status.currentTime + ' | duration:' + this.status.duration);

      this.timeUpdate();
      // could also update the play pause button?
      // - the playing to paused state is covered by timeUpdate()
    },

    play: function () {
      // if ( !this.player.videoElem.paused ) {
      if ( !this.status.paused ) {
        hyperaudio.removeClass(this.wrapperElem, 'playing');
        this.player.gui_pause();
        return;
      }

      hyperaudio.addClass(this.wrapperElem, 'playing');
      this.player.gui_play();
    },

    timeUpdate: function () {

      var percentage = 0;
      if(this.status.duration > 0) {
        percentage = Math.round(100 * this.status.currentTime / this.status.duration);
      }

      this.progressIndicator.style.width = percentage + '%';

      this.currentTimeElem.innerHTML = time(this.status.currentTime);
      this.durationElem.innerHTML = time(this.status.duration);

      if ( this.status.paused ) {
        hyperaudio.removeClass(this.wrapperElem, 'playing');
      } else {
        hyperaudio.addClass(this.wrapperElem, 'playing');
      }
    },


    fullscreen: function () {

      console.log("fullscreen function");

      if ( !this._isFullscreen() ) {
        this._requestFullScreen();
        return;
      }

      this._cancelFullScreen();
    },

    _requestFullScreen: function () {
      if (this.player.target.requestFullScreen) {
        this.player.target.requestFullScreen();
      } else if (this.player.target.mozRequestFullScreen) {
        this.player.target.mozRequestFullScreen();
      } else if (this.player.target.webkitRequestFullScreen) {
        this.player.target.webkitRequestFullScreen();
      }

      //console.log('adding fullscreen class');
      var holders = document.getElementsByClassName("HAP");

      console.log("request fullscreen");

      for (var i = 0; i < holders.length; i++) {
        holders[i].setAttribute("class", "fullscreen "+holders[i].className);
      }
    },

    _cancelFullScreen: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }

      //console.log('removing fullscreen class');
      var holders = document.getElementsByClassName("HAP");

      console.log("cancel fullscreen request");

      for (var i = 0; i < holders.length; i++) {
        console.log(holders[i].className);
        holders[i].className = holders[i].className.replace( /(?:^|\s)fullscreen(?!\S)/ , '' );
      }


    },

    _isFullscreen: function () {
      return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement || false);
    },

    startSeeking: function (e) {
      this.seeking = true;
      this.seek(e);
    },

    stopSeeking: function () {
      if ( !this.seeking ) {
        return;
      }

      this.seeking = false;
    },

    seek: function (e) {
      if ( !this.seeking ) {
        return;
      }

      var rect = this.progressBarElem.getBoundingClientRect();
      var width = rect.width;
      var x = e.pageX - rect.left;

      // var current = Math.round(this.player.videoElem.duration / width * x);
      // this.player.currentTime(current, !this.player.videoElem.paused);

      // var current = Math.round(this.status.duration / width * x);
      var current = Math.round(100 * this.status.duration * x / width) / 100;
      this.player.gui_currentTime(current);
    }
  };

  // Adapted this from jPlayer code
  function ConvertTime() {
    this.init();
  }
  ConvertTime.prototype = {
    init: function() {
      this.options = {
        timeFormat: {
          showHour: false,
          showMin: true,
          showSec: true,
          padHour: false,
          padMin: true,
          padSec: true,
          sepHour: ":",
          sepMin: ":",
          sepSec: ""
        }
      };
    },
    time: function(s) {
      s = (s && typeof s === 'number') ? s : 0;

      var myTime = new Date(s * 1000),
        hour = myTime.getUTCHours(),
        min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + hour * 60,
        sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + min * 60,
        strHour = (this.options.timeFormat.padHour && hour < 10) ? "0" + hour : hour,
        strMin = (this.options.timeFormat.padMin && min < 10) ? "0" + min : min,
        strSec = (this.options.timeFormat.padSec && sec < 10) ? "0" + sec : sec,
        strTime = "";

      strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "";
      strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "";
      strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : "";

      return strTime;
    }
  };
  var myConvertTime = new ConvertTime();
  function time(s) {
    return myConvertTime.time(s);
  }

  return PlayerGUI;

})(window, document, hyperaudio);

/*
                                                                          88
  ,d                                                                      ""              ,d
  88                                                                                      88
MM88MMM 8b,dPPYba, ,adPPYYba, 8b,dPPYba,  ,adPPYba,  ,adPPYba, 8b,dPPYba, 88 8b,dPPYba, MM88MMM
  88    88P'   "Y8 ""     `Y8 88P'   `"8a I8[    "" a8"     "" 88P'   "Y8 88 88P'    "8a  88
  88    88         ,adPPPPP88 88       88  `"Y8ba,  8b         88         88 88       d8  88
  88,   88         88,    ,88 88       88 aa    ]8I "8a,   ,aa 88         88 88b,   ,a8"  88,
  "Y888 88         `"8bbdP"Y8 88       88 `"YbbdP"'  `"Ybbd8"' 88         88 88`YbbdP"'   "Y888
                                                                             88
                                                                             88
*/
/* Transcript
 *
 */

var Transcript = (function(document, hyperaudio) {

  function Transcript(options) {

    this.options = hyperaudio.extend({}, this.options, {

      entity: 'TRANSCRIPT', // Not really an option... More like a manifest

      target: '#source-transcript', // The selector of element where the transcript is written to.
      selector: 'HAP-transcript__item',

      id: '', // The ID of the transcript.

      // src: '', // [obsolete] The URL of the transcript.
      // video: '', // [obsolete] The URL of the video.

      media: {
        // transcript, mp4, webm urls
      },

      select: true, // Enables selection of the transcript

      wordsPlay: true, // Enables word clicks forcing play

      group: 'p', // Element type used to group paragraphs.
      word: 'a', // Element type used per word.

      timeAttr: 'data-m', // Attribute name that holds the timing information.
      unit: 0.001, // Milliseconds.

      async: true, // When true, some operations are delayed by a timeout.

      stage: null,
      player: null
    }, options);

    // State Flags
    this.ready = false;
    this.enabled = true;

    // Properties
    this.target = typeof this.options.target === 'string' ? document.querySelector(this.options.target) : this.options.target;
    this.textSelect = null;

    // // this.iScroll = new IScroll(this.target, { mouseWheel: true, click: true });
    // this.iScrollOptions = {
    //   scrollbars: true,
    //   mouseWheel: true,
    //   interactiveScrollbars: true,

    //   // Options to disable grabbing the page and moving it.
    //   disableMouse: true,
    //   disablePointer: true,
    //   disableTouch: true
    // };
    // this.iScrollSpeed = 800; // ms
    // this.iScrollOffsetY = -20; // pixels
    // this.iScroll = new IScroll(this.target, this.iScrollOptions);

    // Setup Debug
    if(this.options.DEBUG) {
      this._debug();
    }

    // If we have the info, kick things off
    if(this.options.id || this.options.media.youtube || this.options.media.mp4) {
      this.load();
    }
  }

  Transcript.prototype = {

    load: function(id) {
      var self = this;

      this.ready = false;

      if(typeof id !== 'undefined') {
        if(typeof id === 'string') {
          this.options.id = id;
          this.options.media = {};
        } else if(typeof id === 'object') {
          this.options.id = '';
          this.options.media = id;
        } else {
          this.options.id = '';
          this.options.media = {};
        }
      }

      var setVideo = function() {
        if(self.options.async) {
          setTimeout(function() {
            self.setVideo();
          }, 0);
        } else {
          self.setVideo();
        }
        setTimeout(function() {
          // Create a new instance, since the contents completely changed... That 1st child is not covered by .refresh()
          // self.iScroll = new IScroll(self.target, self.iScrollOptions);
        }, 0);
      };

      if(this.target) {
        // Destroy iscroll, since is is useless after the contents of the wraper changes, changing that 1st child element.
        // self.iScroll.destroy();

        this.target.innerHTML = '';

        if(this.options.id) {
          hyperaudio.api.getTranscript(this.options.id, function(success) {
            if(success) {
              self.target.innerHTML = this.transcript.content;
              self._trigger(hyperaudio.event.load, {msg: 'Loaded "' + self.options.id + '"'});
            } else {
              self.target.innerHTML = 'Problem with transcript URL.'; // TMP - This sort of things should not be in the lib code, but acting off an error event hander.
              self._error(this.status + ' ' + this.statusText + ' : "' + self.options.id + '"');
            }
            setVideo();
          });

        } else if(this.options.media.transcript) {
          hyperaudio.xhr({
            url: this.options.media.transcript,
            complete: function(event) {
              self.target.innerHTML = this.responseText;
              self._trigger(hyperaudio.event.load, {msg: 'Loaded "' + self.options.src + '"'});
              setVideo();
            },
            error: function(event) {
              self.target.innerHTML = 'Problem with transcript URL.'; // TMP - This sort of things should not be in the lib code, but acting off an error event hander.
              self._error(this.status + ' ' + this.statusText + ' : "' + self.options.src + '"');
              setVideo();
            }
          });
        }
      }
    },

    setVideo: function() {
      var self = this;

      // Setup the player
      if(this.options.player) {

        if(this.options.id && hyperaudio.api.transcript) {

          var media = hyperaudio.api.transcript.media;

          this.options.media = {
            id: media ? media._id : '' // Store the media ID
          };

          if(media && media.source) {
            for(var type in media.source) {
              this.options.media[type] = media.source[type].url;
            }
          }
        }

        this.options.player.load(this.options.media);
        if(this.options.async) {
          setTimeout(function() {
            self.parse();
          }, 0);
        } else {
          this.parse();
        }
      } else {
        this._error('Player not defined');
        this.selectorize();
      }
    },

    parse: function() {
      var self = this,
        opts = this.options;

      if(this.target && opts.player && opts.player.popcorn) {

        var wordList = this.target.querySelectorAll(opts.target + ' ' + opts.word),
          i, l = wordList.length;

        var onNewPara = function(parent) {

          var transcriptHolders = document.getElementsByClassName("HAP-transcript--output");
          [].forEach.call(transcriptHolders, function(transcriptHolder) {
            var currentPosition  = parent.offsetTop;
            scrollTo(transcriptHolder, currentPosition, 350)
          });

        };

        for(i = 0; i < l; i++) {
          opts.player.popcorn.transcript({
            time: wordList[i].getAttribute(opts.timeAttr) * opts.unit, // seconds
            futureClass: "transcript__queue",
            target: wordList[i],
            onNewPara: onNewPara
          });
        }

        this.target.addEventListener('click', function(event) {

          event.preventDefault();
          if(event.target.nodeName.toLowerCase() === opts.word) {
            var tAttr = event.target.getAttribute(opts.timeAttr),
              time = tAttr * opts.unit;
            if(opts.wordsPlay) {
              opts.player.play(time);
            } else {
              opts.player.currentTime(time);
            }
            self._trigger(hyperaudio.event.userplayword, {msg: 'User clicked on a word to play from'});
          }
        }, false);
      }

      this.selectorize();
    },

    selectorize: function() {

      var self = this,
        opts = this.options;

      // if(opts.stage) {

      if(opts.select) {

        // Destroy any existing WordSelect.
        this.deselectorize();

        this.textSelect = new hyperaudio.WordSelect({
          el: opts.target,
          onDragStart: function(e) {

            if(opts.stage) {
              hyperaudio.addClass(opts.stage.target, opts.stage.options.dragdropClass);
              var dragdrop = new hyperaudio.DragDrop({
                dropArea: opts.stage.target,
                init: false,
                onDrop: function(el) {
                  hyperaudio.removeClass(opts.stage.target, opts.stage.options.dragdropClass);
                  this.destroy();

                  if ( !el ) {
                    return;
                  }

                  // Only clear the selection if dropped on the stage. Otherwise it can be annoying.
                  self.textSelect.clearSelection();

                  if(opts.media.id) {
                    el.setAttribute(opts.stage.options.idAttr, opts.media.id); // Pass the media ID
                  }
                  if(opts.media.transcript) {
                    el.setAttribute(opts.stage.options.transAttr, opts.media.transcript); // Pass the transcript url
                  }
                  if(opts.media.mp4) {
                    el.setAttribute(opts.stage.options.mp4Attr, opts.media.mp4); // Pass the transcript mp4 url
                  }
                  if(opts.media.webm) {
                    el.setAttribute(opts.stage.options.webmAttr, opts.media.webm); // Pass the transcript webm url
                  }
                  if(opts.media.youtube) {
                    el.setAttribute(opts.stage.options.ytAttr, opts.media.youtube); // Pass the transcript youtube url
                  }
                  el.setAttribute(opts.stage.options.unitAttr, opts.unit); // Pass the transcript Unit
                  opts.stage.dropped(el);
                }
              });

              var html = this.getSelection().replace(/ class="[\d\w\s\-]*\s?"/gi, '') + '<div class="actions"></div>';

              dragdrop.init(html, e);
            }
          },
          onSelection: function(e) {
            // Update the copy and paste.
            if(hyperaudio.Clipboard) {
              hyperaudio.Clipboard.copy(self.getSelection().text);
            }
          },
          onClear: function(e) {
            if(hyperaudio.Clipboard) {
              hyperaudio.Clipboard.clear();
            }
          }
        });
        this.ready = true;
        this._trigger(hyperaudio.event.ready, {msg: 'Transcript is ready.'});
        var event = document.createEvent('Event');
        event.initEvent('transcriptready', true, true);

        document.dispatchEvent(event);
      }
    },

    deselectorize: function() {
      if(this.textSelect) {
        this.textSelect.destroy();
      }
      delete this.textSelect;
    },

    getSelection: function() {

      if(this.textSelect) {
        var opts = this.options,
          html = this.textSelect.getSelection(),
          el = document.createElement('div'),
          words, start, end, text;

        el.innerHTML = html;
        words = el.querySelectorAll(opts.word);

        if(words.length) {
          start = words[0].getAttribute(opts.timeAttr);
          end = words[words.length - 1].getAttribute(opts.timeAttr);
        }

        text = el.textContent;
        if(text.trim) {
          text = text.trim();
        }

        // The end time is the start of the last word, so needs padding.
        return {
          text: text,
          start: start,
          end: end
        };
      }

      return {};
    },

    enable: function() {
      this.enabled = true;
    },
    disable: function() {
      this.enabled = false;
    }
  };

  return Transcript;
}(document, hyperaudio));

/*
            ,d
            88
,adPPYba, MM88MMM ,adPPYYba,  ,adPPYb,d8  ,adPPYba,
I8[    ""   88    ""     `Y8 a8"    `Y88 a8P_____88
 `"Y8ba,    88    ,adPPPPP88 8b       88 8PP"""""""
aa    ]8I   88,   88,    ,88 "8a,   ,d88 "8b,   ,aa
`"YbbdP"'   "Y888 `"8bbdP"Y8  `"YbbdP"Y8  `"Ybbd8"'
                              aa,    ,88
                               "Y8bbdP"
*/
/* Stage
 *
 */

var Stage = (function(document, hyperaudio) {

  function Stage(options) {

    var self = this;

    this.options = hyperaudio.extend({}, this.options, {

      entity: 'STAGE', // Not really an option... More like a manifest

      target: '#output-transcript', // The selector of element for the staging area.

      id: '', // The ID of the saved mix.
      mix: {
        // title, desc, type,
        // url: [!content] The url of the mix
        // content: [!url] The actual mix HTML
      },

      title: 'Title not set',
      desc: 'Description not set',
      type: 'beta',

      editable: true, // Set false to disable the drag and drop. Used for viewer and does not disable drops from transcripts.

      idAttr: 'data-id', // Attribute name that holds the transcript ID.
      transAttr: 'data-trans', // Attribute name that holds the transcript URL. [optional if ID not present]
      mp4Attr: 'data-mp4', // Attribute name that holds the transcript mp4 URL.
      webmAttr: 'data-webm', // Attribute name that holds the transcript webm URL.
      ytAttr: 'data-yt', // Attribute name that holds the transcript youtube URL.
      unitAttr: 'data-unit', // Attribute name that holds the transcript Unit.

      word: 'a',
      section: 'section',
      // timeAttr: 'data-m', // Attribute name that holds the timing information.

      dragdropClass: 'dragdrop',
      async: true, // When true, some operations are delayed by a timeout.
      projector: null
    }, options);

    // State Flags.
    this.ready = false;
    this.enabled = true;

    // Properties
    this.target = typeof this.options.target === 'string' ? document.querySelector(this.options.target) : this.options.target;
    this.article = document.createElement('article');
    this.mix = {};

    // The following lines assume that we found a target.

    this.target.appendChild(this.article);

    // Detect when an effect value is changed
    this.target.addEventListener('change', function(e) {
      self.changed();
    }, false);

    // this.target._tap = new Tap({el: this.target});
    // this.target.addEventListener('tap', function(event) {
    this.target.addEventListener('click', function(event) {

      var section, word, search;
      // event.preventDefault(); // Removed since it breaks checkbox clicks in effects.
      if(event.target.nodeName.toLowerCase() === self.options.word) {

        word = event.target;
        search = word;

        // Search up the parent tree for the section.
        while(search) {
          if(search.nodeName.toLowerCase() === self.options.section) {
            section = search;
            break; // exit while loop
          }
          search = search.parentNode;
        }

        if(self.options.projector) {
          self.options.projector.playWord(section,word);
        }
      }
    }, false);

    if(this.options.DEBUG) {
      this._debug();
    }

    if(this.options.projector) {
      this.options.projector.setStage(this);
    }

    if(this.options.id || this.options.mix.url || this.options.mix.content) {
      this.load();
    }
  }

  Stage.prototype = {
    mixDetails: function(details) {
      // [SHOULD] only really used to set the label, desc and type of the mix being saved.
      hyperaudio.extend(this.options, details);
    },
    updateStage: function(content) {
      // Need to maintain the existing article in the stage - Important for dragdrop.
      var tmp = document.createElement('div'); // Temporary DOM element
      tmp.innerHTML = content; // Add the content to the DOM element
      var articleElem = tmp.querySelector('article'); // Find the article in the content.
      // Can now insert the contents of the returned mix article into the maintained article.

      // MB edit

      this.article.innerHTML = articleElem.innerHTML;

      // TODO: Should also clear any existing attributes on the article.

      // Now copy over any attributes
      var attr = articleElem.attributes;
      for(var i=0, l=attr.length; i < l; i++ ) {
        this.article.setAttribute(attr[i].name, attr[i].value);
      }
    },
    load: function(id) {

      var self = this;

      if(typeof id !== 'undefined') {
        if(typeof id === 'string') {
          this.options.id = id;
          this.options.mix = {};
        } else if(typeof id === 'object') {
          this.options.id = '';
          this.options.mix = id;
        } else {
          this.options.id = '';
          this.options.mix = {};
        }
      }

      if(this.target) {

        if(this.options.id) {
          //hyperaudio.api.getMix(id, function(success) {
          hyperaudio.api.getMixFromUrl(id, function(success) {
            if(success) {
              self.mix = hyperaudio.extend({}, this.mix);
              self.mixDetails({
                title: self.mix.label,
                desc: self.mix.desc,
                type: self.mix.type
              });

              self.updateStage(self.mix.content);

              // Setup the dragdrop on the loaded mix sections.
              self.initDragDrop();
              self._trigger(hyperaudio.event.load, {msg: 'Loaded mix'});
            } else {
              self._error(this.status + ' ' + this.statusText + ' : "' + id + '"');
            }
          });
        } else {
          this.mixDetails({
            title: this.options.mix.title,
            desc: this.options.mix.desc,
            type: this.options.mix.type
          });
          if(this.options.mix.url) {
            hyperaudio.xhr({
              url: this.options.mix.url,
              complete: function(event) {
                self.updateStage(this.responseText);
                self.initDragDrop();
                self._trigger(hyperaudio.event.load, {msg: 'Loaded "' + self.options.mix.url + '"'});
              },
              error: function(event) {
                self.target.innerHTML = 'Problem with mix URL.'; // TMP - This sort of things should not be in the lib code, but acting off an error event hander.
                self._error(this.status + ' ' + this.statusText + ' : "' + self.options.mix.url + '"');
              }
            });
          } else if(this.options.mix.content) {
            this.updateStage(this.options.mix.content);
            this.initDragDrop();
            this._trigger(hyperaudio.event.load, {msg: 'Loaded given content'});
          } else {
            this.target.innerHTML = 'Problem with mix.'; // TMP - This sort of things should not be in the lib code, but acting off an error event hander.
            this._error('Stage : No ID, URL or Content');
          }
        }
      }
    },

    save: function(callback) {
      // Save the staged production

      var self = this;

      hyperaudio.extend(this.mix, {
        label: this.options.title,
        desc: this.options.desc,
        type: this.options.type,
        content: this.target.innerHTML
      });

      if(this.target) {

        hyperaudio.api.putMix(this.mix, function(success) {
          if(success) {
            if(success.saved) {
              self.mix = hyperaudio.extend({}, this.mix);
              hyperaudio.Address.setParam('m', self.mix._id);
              self._trigger(hyperaudio.event.save, {msg: 'Saved mix'});
            } else if(success.needLogin) {
              // We need to login
              self._trigger(hyperaudio.event.unauthenticated, {msg: 'Sign In required to save'});
            } else {
              self._error('Stage: Save: Error with API putMix() response');
            }
          } else {
            self._error('Stage: Save: Error with API putMix() request');
          }
          self.callback(callback, success);
        });
      }
    },

    callback: function(callback, success) {
      if(typeof callback === 'function') {
        callback.call(this, success);
      }
    },

    clear: function() {
      // TODO: Should also clear any existing attributes on the article.
      this.article.innerHTML = '';
      this.mix = {};
      this.options.id = '';
      this.changed(true);
      hyperaudio.Address.setParam('m');
    },

    parse: function() {
      var self = this,
        opts = this.options;

      // Will need the popcorn.transcript highlighting as per the source transcripts.
    },

    initDragDrop: function() {

      var self = this,
        i, l, sections, effectType, bgmTitle, dragHtml;

      var capitaliseFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      // We use the Stage in the viewer... So want to disable this feature there.
      if(this.options.editable) {

        if(this.target) {
          sections = this.target.getElementsByTagName('section');
          l = sections.length;
          for(i=0; i < l; i++) {

            dragHtml = '';

            // This code is to setup the drag-and-drop with a nice label. Otherwise the effects look bad after loading back in and dragged
            effectType = sections[i].getAttribute('data-effect');
            if(typeof effectType === 'string') {
              switch(effectType) {
                case 'fade':
                case 'trim':
                case 'title':
                  dragHtml = capitaliseFirstLetter(effectType);
                  break;
              }
            }

            // And we finally setup the DragDrop
            self.dropped(sections[i], dragHtml);
          }
        }
      } else {
        this.changed();
      }
    },

    dropped: function(el, html) {
      var self = this;
      var actions;
      var draggableClass = '';

      var editBlock = function (e) {
        e.stopPropagation();
        this.parentNode._editBlock = new EditBlock({
          el: this.parentNode,
          stage: self
        });
      };

      if(this.target) {
        // hyperaudio.removeClass(this.target, this.options.dragdropClass);

        // add edit action if needed
        if ( !(/(^|\s)effect($|\s)/.test(el.className)) ) {
          actions = el.querySelector('.actions');
          if(actions) {
            actions._tap = new Tap({el: actions});
            actions.addEventListener('tap', editBlock, false);
          }
        } else {
          draggableClass = 'draggableEffect';
        }

        // Setup item for future dragdrop
        el._dragInstance = new DragDrop({
          handle: el,
          dropArea: this.target,
          html: html ? html : el.innerHTML,
          draggableClass: draggableClass,
          onDragStart: function () {
            hyperaudio.addClass(self.target, self.options.dragdropClass);
          },
          onDrop: function () {
            hyperaudio.removeClass(self.target, self.options.dragdropClass);
            self.changed();
          }
        });

        this.changed();
      }
    },

    changed: function(reset) {
      // Tell the projector the content changed
      if(this.options.projector) {
        this.options.projector.requestUpdate(reset);
      }
      this._trigger(hyperaudio.event.change, {msg: 'The mix has changed'});
    },

    enable: function() {
      this.enabled = true;
    },
    disable: function() {
      this.enabled = false;
    }
  };

  return Stage;
}(document, hyperaudio));

/*
                                   88
                                   ""                         ,d
                                                              88
8b,dPPYba,  8b,dPPYba,  ,adPPYba,  88  ,adPPYba,  ,adPPYba, MM88MMM ,adPPYba,  8b,dPPYba,
88P'    "8a 88P'   "Y8 a8"     "8a 88 a8P_____88 a8"     ""   88   a8"     "8a 88P'   "Y8
88       d8 88         8b       d8 88 8PP""""""" 8b           88   8b       d8 88
88b,   ,a8" 88         "8a,   ,a8" 88 "8b,   ,aa "8a,   ,aa   88,  "8a,   ,a8" 88
88`YbbdP"'  88          `"YbbdP"'  88  `"Ybbd8"'  `"Ybbd8"'   "Y888 `"YbbdP"'  88
88                                ,88
88                              888P"

*/
/* Projector
 * Used to play the staged productions
 */

var Projector = (function(window, document, hyperaudio, Popcorn) {

  var DEBUG = false;

  function Projector(options) {

    this.options = hyperaudio.extend({}, this.options, {

      entity: 'PROJECTOR', // Not really an option... More like a manifest

      target: '#transcript-video', // The selector of element where the video is generated

      trim: 1, // (Seconds) Time added to end word timings.

      players: 1, // Number of Players to use. Mobile: 1, Desktop: 2.

      unit: 0.001, // Unit used if not given in section attr of stage.

      stageChangeDelay: 1000, // (ms) Delay for content update after the stage is changed

      timeAttr: 'data-m',

      music: null, // For the BGM

      gui: true, // True to add a gui.
      async: true // When true, some operations are delayed by a timeout.
    }, options);

    // Properties
    this.target = typeof this.options.target === 'string' ? document.querySelector(this.options.target) : this.options.target;
    this.stage = null;
    this.timeout = {};

    this.player = [];

    this.activePlayer = 0;
    this.nextPlayer = this.options.players > 1 ? 1 : 0;

    this.updateRequired = false;

    this.stageArticle = null;
    this.stageSections = null;
    this.stageIndex = 0; // [Number] The next section
    this.content = []; // [Array] Holding the sections found with content
    this.contentIndex = 0; // [Number] The content that is actually being played.
    this.firstContent = true; // [Boolean] True the first time
    this.endedContent = false; // [Boolean] True when we have no more content

    this.isReadyToPlay = false; // [Boolean] True is the projector is setup and only needs a play to resume.
    this.needsInitVideo = true; // [Boolean] True when the projector is empty and the first video should be loaded in.

    // State Flags
    this.paused = true;

    this.time = {};

    // this.iScrollOptions = {
    //   scrollbars: true,
    //   mouseWheel: true,
    //   interactiveScrollbars: true,

    //   // Options to disable grabbing the page and moving it.
    //   disableMouse: true,
    //   disablePointer: true,
    //   disableTouch: true
    // };
    // this.iScrollSpeed = 800; // ms
    // this.iScrollOffsetY = -20; // pixels
    // this.iScroll = null;

    if(this.options.DEBUG) {
      this._debug();
    }

    if(this.target) {
      this.create();
    }
  }

  Projector.prototype = {
    setStage: function(stage) {
      this.stage = stage;
      // this.iScroll = new IScroll(this.stage.target, this.iScrollOptions);
    },
    create: function() {
      var self = this;

      if(this.target) {

        var getManager = function(idx) {

          return function(event) {
            // Passing the event context to manager
            //  * The YouTube event object is useless.
            //  * The YouTube event context was fixed in the Player class.
            if(self.activePlayer === idx) {
              self.manager(this, event);
            }
          };
        };

        for(var i = 0; i < this.options.players; i++ ) {

          var manager = getManager(i);

          var player = document.createElement('div');
          hyperaudio.addClass(player, 'HAP-projector');
          this.player[i] = hyperaudio.Player({
            target: player
          });

          this.player[i].addEventListener('progress', manager); // Important for YT player GUI to update on set/change
          this.player[i].addEventListener('timeupdate', manager);
          this.player[i].addEventListener('play', manager);
          this.player[i].addEventListener('pause', manager);
          this.player[i].addEventListener('ended', manager);

          this.target.appendChild(player);
        }

        this.addHelpers();

        if(this.options.gui) {

          this.GUI = new hyperaudio.PlayerGUI({
            player: this,

            navigation: false,    // next/prev buttons
            fullscreen: true,   // fullscreen button

            cssClass: this.player[0].options.cssClass
          });
        }
      } else {
        this._error('Target not found : ' + this.options.target);
      }
    },
    addHelpers: function() {
      var fxHelper = document.createElement('div');
          fxHelper.id = 'fxHelper';
          fxHelper.className = 'HAP-curtain';

      var fxHelperHolder = fxHelper.appendChild(document.createElement('h2'));
          fxHelperHolder.className = 'HAP-curtain__title';

      var titleFXHelper = fxHelper.appendChild(document.createElement('span'));
          titleFXHelper.id = 'titleFXHelper';
          titleFXHelper.className = 'HAP-curtain__title--helper';

      this.target.appendChild(fxHelper);
      // this.target.appendChild(titleFXHelper);

    },
    initPopcorn: function(index, player) {
      var self = this;
      var elems, e, eLen;
      var onNewPara = function(parent) {

        var transcriptHolders = document.getElementsByClassName("HAP-transcript--output");
        [].forEach.call(transcriptHolders, function(transcriptHolder) {
          var currentPosition  = parent.offsetTop;
          scrollTo(transcriptHolder, currentPosition, 350)
        });

      };

      if(index < this.content.length && player < this.player.length) {

        // Reset the popcorn... Maybe want to only do this if necessary, ie., if any transcript plugins added.
        this.player[player].initPopcorn();
        if(DEBUG) console.log('[Projector|initPopcorn] player[%d].initPopcorn()', player);

        elems = this.content[index].element.getElementsByTagName('a');
        // Setup the Popcorn Transcript Plugin
        for(e = 0, eLen = elems.length; e < eLen; e++) {

          // Might want to move this (behaviour) to the plugin
          // hyperaudio.removeClass(elems[e], 'transcript__queue');

          this.player[player].popcorn.transcript({
            time: elems[e].getAttribute(this.options.timeAttr) * this.content[index].unit, // seconds
            futureClass: "transcript__queue",
            target: elems[e],
            onNewPara: onNewPara
          });
        }
      }
    },
    load: function(index) {
      var media = this.content[index].media,
        activePlayer = this.which(media);

      this.contentIndex = index;

      if(activePlayer !== false) {
        this.activePlayer = activePlayer;
      } else {
        this.player[this.activePlayer].load(media);
        if(DEBUG) console.log('[Projector|load] player[%d].load() | initPopcorn()', this.activePlayer);
      }

      this.initPopcorn(index, this.activePlayer);

      for(var i=0; i < this.player.length; i++) {
        hyperaudio.removeClass(this.player[i].target, 'active');
      }
      hyperaudio.addClass(this.player[this.activePlayer].target, 'active');

      if(DEBUG) console.log('[Projector|load] contentIndex: %d | activePlayer: %d', this.contentIndex, this.activePlayer);
    },
    prepare: function(index) {
      // Used when more than 1 player to prepare the next piece of media.

      // 1. Want to be able to call this method and it deal with preparing the other player.
      // 2. So it should check if the media is already available in a player.
      // 3. If it is available, then do nothing.
      // 4. If not, then setup the next player to play the media.

      // 5. In principle this should support 1, 2 or more players.
      // 6. If 1 player, should do nothing here.
      // 7. If 2 or more players, then setup the next one. ie., The last one ever used before.

      // 8. Normally just 1 or 2 players though, so "keep it real mofo!"

      var media = this.content[index].media;

      // Ignore if we are only using a single Player
      if(media && this.player.length > 1) {

        // See if a player already has it. NB: Zero is falsey, so strong comparison.
        var prepared = this.which(media);
        var alignStart = Math.max(0, this.content[index].start - 1); //
        if(prepared === false) {

          // Get the next free player (Has flaws if more than 2, but still works. Just does not take full advantage of more than 2.)
          this.nextPlayer = this.activePlayer + 1 < this.player.length ? this.activePlayer + 1 : 0;

          if(this.player[this.nextPlayer]) {
            this.player[this.nextPlayer].load(media);
            this.player[this.nextPlayer].pause(alignStart);

            if(DEBUG) console.log('[Projector|prepare] player[%d].load() | initPopcorn()', this.nextPlayer);
            if(DEBUG) console.log('[Projector|prepare] prepared=false | nextPlayer: %d | alignStart: %d', this.nextPlayer, alignStart);
          }
        } else {
          // Reset popcorn and move the video to the start time.
          if(prepared !== this.activePlayer) {
            this.player[prepared].initPopcorn();
            this.player[prepared].pause(alignStart);

            if(DEBUG) console.log('[Projector|prepare] player[%d].initPopcorn()', prepared);
            if(DEBUG) console.log('[Projector|prepare] prepared=' + prepared + ' | nextPlayer: %d | alignStart: %d', this.nextPlayer, alignStart);
          }
        }
      }
    },
    which: function(media) {
      var index = false;

      if(media) {
        for(var i=0; i < this.player.length; i++) {
          if(!this.player[i].mediaDiff(media)) {
            index = i;
            break;
          }
        }
      }
      if(DEBUG) console.log('[Projector|which] media: %o | index: ' + index, media); // %d no good since index can be boolean.
      return index;
    },

    cue: function(play, jumpTo) {


      var i, iLen, elems, e, eLen;
/*
      var onNewPara = function(parent) {
        // $("#transcript-content").stop().scrollTo($(parent), 800, {axis:'y',margin:true,offset:{top:0}});
      };
*/
      if(this.stage && this.stage.target) {

        if(this.updateRequired) {
          this.updateContent();
        }

        this._pause();
        this.contentIndex = jumpTo.contentIndex;

        if(this.options.music) {
          this.options.music.pause();
        }

        if(this.contentIndex < this.content.length) {

          this.load(this.contentIndex);
          if(this.content[this.contentIndex+1]) {
            this.prepare(this.contentIndex+1);
          }
          // this.effect(this.content[this.contentIndex].effect);

          this.resetEffects(jumpTo);

          if(this.options.gui) {
            this.GUI.setStatus({
              // paused: this.paused,
              currentTime: this.getTotalCurrentTime(jumpTo.start, jumpTo.contentIndex)
            });
          }

          for(i = 0, iLen = this.content.length; i < iLen; i++) {
            elems = this.content[i].element.getElementsByTagName('a');
            for(e = 0, eLen = elems.length; e < eLen; e++) {
              if(i < this.contentIndex) {
                // Remove the class
                hyperaudio.removeClass(elems[e], 'transcript__queue');
              } else if(i > this.contentIndex) {
                // Add the class
                hyperaudio.addClass(elems[e], 'transcript__queue');
              }
            }
          }

          // Believe this is a good place to set this flag
          this.isReadyToPlay = true;
          if(DEBUG) console.log('[Projector|cue] isReadyToPlay = ' + this.isReadyToPlay);

          if(play) {
            this._play(jumpTo.start);
          } else {
            this._pause(jumpTo.start);
          }
        }
      }
    },

    gui_play: function(time) {
      this._trigger(hyperaudio.event.userplay, {msg: 'User clicked play'});
      this.play(time);
    },
    gui_pause: function(time) {
      this._trigger(hyperaudio.event.userpause, {msg: 'User clicked pause'});
      this.pause(time);
    },
    gui_currentTime: function(time, play) {
      this._trigger(hyperaudio.event.usercurrenttime, {msg: 'User clicked the progress bar'});
      this.currentTime(time, play);
    },

    play: function() {

      var resume = false,
        jumpTo;

      if(arguments.length && typeof arguments[0] !== 'undefined') {
        if(typeof arguments[0] === 'object') {
          jumpTo = arguments[0];
          if(DEBUG) console.log('[Projector|play] jumpTo =  %o', jumpTo);
        }
      } else if(this.isReadyToPlay) {
        resume = true;
      }

      if(DEBUG) console.log('[Projector|play] resume = ' + resume + ' | content.length = %d | arguments = %o', this.content.length, arguments);

      if(this.content.length) {

        if(resume) {
          this._play();
        } else if(jumpTo) {
          this._pause();
          this.cue(true, {
            contentIndex: jumpTo.contentIndex,
            start: jumpTo.start
          });
          // The effect is not in cue!!!
          // this.effect(this.content[this.contentIndex].effect);
        } else {
          this.cue(true, {
            contentIndex: 0,
            start: this.content[0].start
          });
          this.effect(this.content[0].effect);
        }
      } else {
        if(this.options.gui) {
          this.GUI.setStatus({
            paused: this.paused
          });
        }
      }
    },

    pause: function() {
      // Really need pause to do similar to play by using cue()
      this._pause();
      if(this.options.music) {
        this.options.music.pause();
      }
    },
    _play: function(time) {
      this.paused = false;
      this.player[this.activePlayer].play(time);
    },
    _pause: function(time) {
      this.paused = true;
      this.player[this.activePlayer].pause(time);
    },
    currentTime: function(time, play) {
      var jumpTo = {},
        i, len;
      if(this.stage && this.stage.target) {
        if(this.updateRequired) {
          this.updateContent();
        }
        for(i = 0, len = this.content.length; i < len; i++) {
          if(this.content[i].totalStart <= time && time < this.content[i].totalEnd) {
            jumpTo.contentIndex = i;
            jumpTo.start = time - this.content[i].totalStart + this.content[i].start;
            this.cue(!this.paused, jumpTo);
            break;
          }
        }
      }
    },

    playWord: function(sectionElem, wordElem) {
      var jumpTo = {},
        i, len;
      if(this.stage && this.stage.target) {
        if(this.updateRequired) {
          this.updateContent();
        }
        for(i = 0, len = this.content.length; i < len; i++) {
          if(this.content[i].element === sectionElem) {
            jumpTo.contentIndex = i;
            jumpTo.start = wordElem.getAttribute(this.options.timeAttr) * this.content[i].unit;
            this._trigger(hyperaudio.event.userplayword, {msg: 'User clicked on a word to play from'});
            this.play(jumpTo);
            break;
          }
        }
      }
    },

    requestUpdate: function(reset) {
      var self = this,
        delay = this.options.stageChangeDelay;
      if(reset) {
        this.pause();
        if(this.options.gui) {
          this.GUI.setStatus({
            paused: this.paused,
            currentTime: 0,
            duration: 0
          });
        }
        this.needsInitVideo = true;
        delay = 0;
      }
      this.updateRequired = true;
      clearTimeout(this.timeout.updateContent);
      this.timeout.updateContent = setTimeout(function() {
        self.updateContent();
      }, delay);
    },

    updateContent: function() {

      var i, len,
        duration = 0;

      this.updateRequired = false;
      clearTimeout(this.timeout.updateContent);

      // Believe this is a good place to unset this flag
      this.isReadyToPlay = false;
      if(DEBUG) console.log('[Projector|updateContent#1] isReadyToPlay = ' + this.isReadyToPlay);

      if(this.stage && this.stage.target) {

        // Refresh the iscroller since mix changed.
        // this.iScroll.refresh();

        // Get the staged contents wrapper elem
        this.stageArticle = this.stage.target.getElementsByTagName('article')[0];

        // Get the sections
        this.stageSections = this.stageArticle.getElementsByTagName('section');

        this.stageIndex = 0; // [Number] The next section
        this.content = []; // [Array] Holding the sections found with content
        this.firstContent = true; // [Boolean] True the first time
        this.endedContent = false; // [Boolean] True when we have no more content

        // this.contentIndex = 0; // [Number] The content that is actually being played.

        while(!this.endedContent) {
          this.getContent();
        }

        // Calculate the duration and start/end of this piece of content, compared to to the whole
        for(i = 0, len = this.content.length; i < len; i++) {
          this.content[i].totalStart = duration;
          duration += this.content[i].end + this.content[i].trim - this.content[i].start;
          this.content[i].totalEnd = duration;
        }
        this.time.duration = duration;

        // Update the duration on the GUI
        if(this.options.gui) {
          this.GUI.setStatus({
            duration: this.time.duration
          });
        }

        if(this.needsInitVideo && this.content.length) {
          this.needsInitVideo = false;
          this.cue(false, {
            contentIndex: 0,
            start: this.content[0].start
          });
          //Unset this flag so that any initial effects get played - when play begins.
          this.isReadyToPlay = false;
          if(DEBUG) console.log('[Projector|updateContent#2] isReadyToPlay = ' + this.isReadyToPlay);
        }
      }
    },

    getContent: function() {

      var effect = [],
        searching = true,
        section;

      // Search for sections with content and apply sections with effects to that content
      while(searching) {

        section = this.getSection(this.stageIndex);
        // If there is another section
        if(section) {
          // If this section has content
          if(section.media) {

            // Need to add any stored affects here
            section.effect = []; // Init the effect array
            this.effectContent(section, effect);

            // Store the content
            this.content.push(section);

            // The first time we need to get the 1st and 2nd content sections.
            if(this.firstContent) {
              this.firstContent = false;
              effect = []; // reset the effect array
            } else {
              searching = false;
            }
          } else if(section.effect) {
            // Some effects need to be applied to the previous content item

            // Trim affects previous content
            if(section.effect.type === 'trim') {
              // Have we got a previous section to affect?
              if(this.content.length) {
                this.effectContent(this.content[this.content.length-1], section.effect);
              }

            // Fade effects both previous and next content
            } else if(section.effect.type === 'fade') {
              // Make 2 copies of the fade effect. Out and In.
              var fadeOutEffect = hyperaudio.extend({}, section.effect, {type: "fadeOut"}),
                fadeInEffect = hyperaudio.extend({}, section.effect, {type: "fadeIn"});
              // Have we got a previous section to affect?
              if(this.content.length) {
                this.effectContent(this.content[this.content.length-1], fadeOutEffect);
              }
              // Effect for the next section, so store it for later.
              effect.push(fadeInEffect);

            } else if(section.effect.type === 'title' && section.effect.fullscreen) {
              // Similar to the Fade effect. The FadeFX does the fullscreen title effect

              // Make 2 copies of the fade effect. Out and In.
              var fadeOutEffectTitle = hyperaudio.extend({}, section.effect, {
                type: "fadeOut",
                duration: 1
              });
              var fadeInEffectTitle = hyperaudio.extend({}, section.effect, {
                type: "fadeIn",
                duration: 1,
                delay: section.effect.duration
              });

              // Have we got a previous section to affect?
              if(this.content.length) {
                this.effectContent(this.content[this.content.length-1], fadeOutEffectTitle);
              } else {
                // Effect is on the first section, so store it for later.
                fadeOutEffectTitle.type = "fadeNow";
                effect.push(fadeOutEffectTitle);
              }
              // Effect for the next section, so store it for later.
              effect.push(fadeInEffectTitle);

            // The rest affect the next content
            } else {
              // Effect for the next section, so store it for later.
              effect.push(section.effect);
            }
          } else {
            // Something is wrong with section structure
            searching = false;
          }
        } else {
          this.endedContent = true;
          searching = false;
        }

        this.stageIndex++;
      }
    },

    getSection: function(index) {

      var stageOptions = this.stage ? this.stage.options : {},
        section = {
          index: index
        };

      if(index < this.stageSections.length) {

        // Get the section
        var el = section.element = this.stageSections[index];

        // Get the ID
        section.id = el.getAttribute(stageOptions.idAttr);

        // Get the media
        var mp4 = el.getAttribute(stageOptions.mp4Attr),
          webm = el.getAttribute(stageOptions.webmAttr),
          youtube = el.getAttribute(stageOptions.ytAttr);

        if(mp4 || webm || youtube) {
          section.media = {
            mp4: mp4,
            webm: webm,
            youtube: youtube
          };
        } else {
          section.media = false;
        }

        var unit = 1 * el.getAttribute(stageOptions.unitAttr);
        section.unit = unit = unit > 0 ? unit : this.options.unit;

        // Still have attributes hard coded in here. Would need to pass from the transcript to stage and then to here.
        var words = el.getElementsByTagName('a');
        if(words.length) {
          section.start = words[0].getAttribute(this.options.timeAttr) * unit;
          section.end = words[words.length-1].getAttribute(this.options.timeAttr) * unit;
          section.trim = this.options.trim;
        }

        // Get the effect details
        section.effect = this.getSectionEffect(el);

        return section;
      } else {
        return false;
      }
    },

    getSectionEffect: function(el) {
      // Get the effect details
      var type = el.getAttribute('data-effect'),
        effect, media, elem;

      if(type) {
        elem = {
          title: el.querySelector('.effect-title'),
          fullscreen: el.querySelector('.effect-fullscreen'),
          delay: el.querySelector('.effect-delay'),
          start: el.querySelector('.effect-start'),
          duration: el.querySelector('.effect-duration'),
          volume: el.querySelector('.effect-volume')
        };
        media = {
          mp3: el.getAttribute('data-mp3'),
          mp4: el.getAttribute('data-mp4'),
          ogg: el.getAttribute('data-ogg')
        };
        effect = {
          type: type,
          title: elem.title ? elem.title.value : '',
          fullscreen: elem.fullscreen ? elem.fullscreen.checked : false,
          delay: elem.delay ? elem.delay.value * 1 : 0, // Convert to number
          start: elem.start ? elem.start.value * 1 : 0, // Convert to number
          duration: elem.duration ? elem.duration.value * 1 : 0, // Convert to number
          volume: elem.volume ? elem.volume.value / 100 : 0, // Convert to number and ratio from percent
          media: media
        };
      } else {
        effect = false;
      }
      return effect;
    },

    // Maybe this could be its own class?
    bgmFX: function(options) {
      if(this.options.music) {
        this.options.music.bgmFX(options);
      }
    },

    // Obsolete method... Effects are too unique to be classed in such a way
    isPrevEffect: function(effect) {

      // List of the effect types. (Separated by a space.)
      var effectTypes = 'trim',
        flag = false;

      hyperaudio.each(effectTypes.split(/\s+/g), function(i,type) {
        if(effect.type === type) {
          flag = true;
          return false; // exit each
        }
      });
      return flag;
    },

    // Obsolete method... Effects are too unique to be classed in such a way
    isPrevAndNextEffect: function(effect) {

      // List of the effect types. (Separated by a space.)
      var effectTypes = 'fade',
        flag = false;

      hyperaudio.each(effectTypes.split(/\s+/g), function(i,type) {
        if(effect.type === type) {
          flag = true;
          return false; // exit each
        }
      });
      return flag;
    },

    effectContent: function(content, effect) {

      // Allow effect to be a single object, or an array of them. Empty effect arrays do nothing.
      if(effect && !effect.length && effect.length !== 0) {
        effect = [effect];
      }

      for(var i=0, l=effect.length; i < l; i++) {
        switch(effect[i].type) {
          case 'title':
            content.effect.push(effect[i]);
            break;
          case 'fadeOut':
            content.effect.push(effect[i]);
            break;
          case 'fadeIn':
            content.effect.push(effect[i]);
            break;
          case 'fadeNow':
            content.effect.push(effect[i]);
            break;
          case 'bgm':
            content.effect.push(effect[i]);
            break;
          case 'trim':
            content.trim = effect[i].duration;
            break;
        }
      }

    },

    resetEffects: function(jumpTo) {
      var i, iLen, e, eLen, effect;
      for(i = 0, iLen = this.content.length; i < iLen; i++) {
        effect = this.content[i].effect;
        for(e=0, eLen=effect.length; e < eLen; e++) {

          if(i < jumpTo.contentIndex) {
            effect[e].init = true;
          } else if(i > jumpTo.contentIndex) {
            effect[e].init = false;
          } else if(effect[e].type === 'fadeOut') { // Need an isEndEffect() method
            effect[e].init = false;
          } else {
            // i === jumpTo.contentIndex
            if(this.content[i].start + effect[e].delay < jumpTo.start) {
              effect[e].init = true;
            } else {
              effect[e].init = false;
            }
          }
        }
      }
      // force a fadeIn - as in remove any fadeOuts!
      fadeFX({
        el: '#fxHelper',
        fadeIn: true,
        time: 0
      });
    },

    // Believe that the varous effect start and ends could be refactored into the single method.

    // Effecting the start of the content
    effect: function(effect, time) {

      // time : This is the relative time of the content.
      time = typeof time === 'number' ? time : 0;

      if(effect && effect.length) {

        for(var i=0, l=effect.length; i < l; i++) {

          if(!effect[i].init && effect[i].delay <= time) {

            switch(effect[i].type) {
              case 'title':
                if(effect[i].title && effect[i].duration) {
                  titleFX({
                    el: '#titleFXHelper',
                    text: effect[i].title,
                    duration: effect[i].duration * 1000
                  });
                  effect[i].init = true;
                }
                break;
              case 'fadeIn':
                if(effect[i].duration) {
                  fadeFX({
                    el: '#fxHelper',
                    fadeIn: true,
                    text: effect[i].title,
                    time: effect[i].duration * 1000
                  });
                  effect[i].init = true;
                }
                break;
              case 'fadeNow':
                fadeFX({
                  el: '#fxHelper',
                  fadeOut: true,
                  text: effect[i].title,
                  time: 0
                });
                effect[i].init = true;
                break;
              case 'bgm':
                if(effect[i].duration) {
                  this.bgmFX({
                    media: {
                      mp3: effect[i].media.mp3,
                      mp4: effect[i].media.mp4,
                      ogg: effect[i].media.ogg
                    },
                    delay: effect[i].delay, // The delay is handled outside the bgmFX
                    start: effect[i].start,
                    duration: effect[i].duration,
                    volume: effect[i].volume
                  });
                  effect[i].init = true;
                }
                break;
            }
          }
        }
      }
    },

    // Effecting the end of the content
    effectEnd: function(effect) {

      if(effect && effect.length) {

        for(var i=0, l=effect.length; i < l; i++) {

          if(!effect[i].init) {

            switch(effect[i].type) {
              case 'fadeOut':
                if(effect[i].duration) {
                  fadeFX({
                    el: '#fxHelper',
                    fadeOut: true,
                    text: effect[i].title,
                    time: effect[i].duration * 1000
                  });
                  effect[i].init = true;
                }
                break;
            }
          }
        }
      }
    },

    checkEndEffects: function(currentTime, content) {

      // 1. Do we have an end effect?
      // 2. Yes, has it been init?
      // 3. No, well is it time? - Calculate timings
      // 4. Is it time to start it?
      // 5. Yes, well execute the effect.

      var endEffects = this.getEndEffects(content),
        l = endEffects.length,
        i = 0;

      // Check each end effect
      for(; i < l; i++) {
        // Has the effect (not) been initiated?
        if(!endEffects[i].init) {
          // Is it time to start the effect?
          if(currentTime > content.end + content.trim - endEffects[i].duration) {
            // Boomshanka! Wrap it in an Array.
            this.effectEnd([endEffects[i]]);
          }
        }
      }
      // wanna return something?
      // return {buggerAll:true};
    },

    getEndEffects: function(content) {
      // List of the effect types. (Separated by a space.)
      var effectTypes = 'fadeOut',
        endEffects = [];

      hyperaudio.each(content.effect, function(n, effect) {
        hyperaudio.each(effectTypes.split(/\s+/g), function(i,type) {
          if(effect.type === type) {
            endEffects.push(effect);
          }
        });
      });
      // return an array of all the end effects.
      return endEffects;
    },

    getTotalCurrentTime: function(currentTime, index) {
      var start, end, totalCurrentTime = 0;
      if(index < this.content.length) {
        start = this.content[index].start;
        end = this.content[index].end + this.content[index].trim;

        // Calculte the (total) currentTime to display on the GUI
        totalCurrentTime = this.content[index].totalStart;
        if(start < currentTime && currentTime < end) {
          totalCurrentTime += currentTime - start;
        } else if(currentTime >= end) {
          // totalCurrentTime += end - start;
          totalCurrentTime = this.content[index].totalEnd;
        }
      }
      return totalCurrentTime;
    },

    manager: function(videoElem, event) {
      var self = this;

      this.paused = videoElem.paused;

      if(!this.paused) {

        this.checkEndEffects(videoElem.currentTime, this.content[this.contentIndex]);

        var endTime = this.content[this.contentIndex].end + this.content[this.contentIndex].trim;

        var totalCurrentTime = this.getTotalCurrentTime(videoElem.currentTime, this.contentIndex);

        var relTime = videoElem.currentTime - this.content[this.contentIndex].start;
/*
        // Paronoid and cleaning up the relTime
        var relEnd = endTime - this.content[this.contentIndex].start;
        if(isNaN(relTime) || relTime < 0) {
          relTime = 0;
        } else if(relTime > relEnd) {
          relTime = relEnd; // Maybe this should be infinity... Since delay greater than the content, and would otherwise never occur.
        }
*/
        if(videoElem.currentTime > endTime) {
          // Goto the next piece of content

          // Flush out any remaining effects. ie., Otherwise delay > duration never happens.
          this.effect(this.content[this.contentIndex].effect, Infinity);

          this._pause(); // Need to stop, otherwise if we switch player, the hidden one keeps playing.

          this.contentIndex++;

          if(this.contentIndex < this.content.length) {
            // this.paused = false;

            this.load(this.contentIndex);
            if(this.content[this.contentIndex+1]) {
              this.prepare(this.contentIndex+1);
            }
            this.effect(this.content[this.contentIndex].effect, 0);
            this._play(this.content[this.contentIndex].start);

          } else {
            // Nothing to play
            this.paused = true;
            this.isReadyToPlay = false; // ended so needs a reset to the start
            if(DEBUG) console.log('[Projector|manager] isReadyToPlay = ' + this.isReadyToPlay);
            this.contentIndex = 0; // Reset this since YouTube player (or its Popcorn wrapper) generates the timeupdate all the time.
            this.prepare(this.contentIndex);
            if(this.options.music) {
              this.options.music.pause();
            }
          }
        } else {
          // Doing this every time now.
          this.effect(this.content[this.contentIndex].effect, relTime);
        }

        if(this.options.gui) {
          this.GUI.setStatus({
            paused: this.paused,
            currentTime: totalCurrentTime
          });
        }
      } else {
        if(this.options.gui) {
          this.GUI.setStatus({
            paused: this.paused
          });
        }
      }
    }
  };

  return Projector;
}(window, document, hyperaudio, Popcorn));


hyperaudio.register('Player', Player);
hyperaudio.register('PlayerGUI', PlayerGUI);
hyperaudio.register('Transcript', Transcript);
hyperaudio.register('Stage', Stage);
hyperaudio.register('Projector', Projector);


hyperaudio.utility('Address', Address); // obj
hyperaudio.utility('api', api); // obj
hyperaudio.utility('Clipboard', Clipboard); // obj
hyperaudio.utility('DragDrop', DragDrop); // Class
hyperaudio.utility('EditBlock', EditBlock); // Class
hyperaudio.utility('fadeFX', fadeFX); // Class
hyperaudio.utility('SideMenu', SideMenu); // Class
hyperaudio.utility('Tap', Tap); // Class
hyperaudio.utility('titleFX', titleFX ); // Class
hyperaudio.utility('WordSelect', WordSelect); // Class
hyperaudio.utility('xhr', xhr); // fn


  return hyperaudio;
}(window, document));

/*

88                                                                                        88 88
88                                                                                        88 ""
88                                                                                        88
88,dPPYba,  8b       d8 8b,dPPYba,   ,adPPYba, 8b,dPPYba, ,adPPYYba, 88       88  ,adPPYb,88 88  ,adPPYba,
88P'    "8a `8b     d8' 88P'    "8a a8P_____88 88P'   "Y8 ""     `Y8 88       88 a8"    `Y88 88 a8"     "8a
88       88  `8b   d8'  88       d8 8PP""""""" 88         ,adPPPPP88 88       88 8b       88 88 8b       d8
88       88   `8b,d8'   88b,   ,a8" "8b,   ,aa 88         88,    ,88 "8a,   ,a88 "8a,   ,d88 88 "8a,   ,a8"
88       88     Y88'    88`YbbdP"'   `"Ybbd8"' 88         `"8bbdP"Y8  `"YbbdP'Y8  `"8bbdP"Y8 88  `"YbbdP"'
                d8'     88
               d8'      88


                                88
                                88
                                88
8b,dPPYba,  ,adPPYYba,  ,adPPYb,88
88P'    "8a ""     `Y8 a8"    `Y88
88       d8 ,adPPPPP88 8b       88
88b,   ,a8" 88,    ,88 "8a,   ,d88
88`YbbdP"'  `"8bbdP"Y8  `"8bbdP"Y8
88
88

*/
/* Hyperaudio Pad */

HAP = (function (window, document, HA) {

  var HAP = {
    options: {
      viewer: false, // True for read only viewer
      targetViewer: '#viewer-wrapper',
      editBtn: '#edit-button',
      shareBtn: '#share-button',
      defaultTranscriptId: 'XMVjtXOUSC-V0sSZBOKrBw',
      ga_origin: 'Pad',
      mixHTML: '',
      mixTitle: '',
      longformId: null,
      longformMedia : null
    }
  };

  var player;
  var projector;
  var music;
  var stage;
  //var transcript;

  var sidemenu;

  var editBtn;
  var shareBtn;

  var share;
  var shareTextElem;

  var mixTitleForm;
  var mixTitle;
  var mixTitleHandler;
  var saveButton;
  var savingAnim;

  // var signin;

  var fade;
  var trim;
  var title;

  var namespace = null;
  var domain = 'hyperaud.io';
  var myUrls = {};

  var transcriptId = HA.getURLParameter('t');
  var mixId = HA.getURLParameter('m');

  // MB var

  var highlightedText;

  //loose way of determining whether a mix is passed through
  if (document.location.hash.split(":").length > 1) {
    mixId = "x"
  }

  function updateGUI() {

    myUrls = getUrls();

    if(editBtn) {
      editBtn.setAttribute('href', myUrls.edit);
    }

    if(shareTextElem) {
      var shareText = '<iframe src="' + myUrls.share + '" height="294" width="480" frameborder="0" scrolling="no" allowfullscreen seamless></iframe>';
      //var shareText = HAP.options.mixHTML;
      shareTextElem.value = shareText;
    }

    if(share && shareBtn) {
      if(mixId || HAP.options.viewer) {
        shareBtn.style.display = 'block';
      } else {
        shareBtn.style.display = 'none';
      }
    }
  }

  function getUrls() {

    //var edit = 'http://' + (namespace ? namespace + '.' : '') + domain + '/pad/';

    // MB edit

    var edit = "pad.html"+document.location.hash;

    var share = edit + '';
    var params = '';
    if(mixId && transcriptId) {
      params = '?t=' + transcriptId + '&m=' + mixId;
    } else if(mixId) {
      params = '?m=' + mixId;
    } else if(transcriptId) {
      params = '?t=' + transcriptId;
    }
    edit += params;
    share += params;

    return {
      edit: edit,
      share: share
    };
  }

  function loaded () {

    if (document.location.hostname.indexOf('hyperaud') > -1) {
      namespace = document.location.hostname.substring(0, document.location.hostname.indexOf('hyperaud') - 1);
    }

    if (document.location.hostname.indexOf('hyperaudio.net') > -1) {
      domain = 'hyperaudio.net';
    }

    // Init the API utility
    HA.api.init({
      org: namespace, // The organisations namespace / sub-domain. EG. 'chattanooga'
      domain: domain
    });

    // Init the Clipboard utility
    HA.Clipboard.init();

    // Init the Address utility
    HA.Address.init();

    editBtn = document.querySelector(HAP.options.editBtn);
    shareBtn = document.querySelector(HAP.options.shareBtn);

    share = document.querySelector('#share-modal');
    shareTextElem = document.querySelector('#share-embed-code');

    mixTitleForm = document.getElementById('mix-title-form');
    mixTitle = document.getElementById('mix-title');
    saveButton = document.getElementById('save-button');
    savingAnim = document.querySelector('#save-button-saving');


    //MB override

    if (HAP.options.longformId != null) {
      transcriptId = HAP.options.longformId;
    }

    if(!HAP.options.viewer || transcriptId || mixId) {

      if(!HAP.options.viewer || mixId) {
        projector = HA.Projector({
          target: "#output-canvas",
          music: music
        });

        stage = HA.Stage({
          target: "#output-transcript",
          projector: projector,
          editable: !HAP.options.viewer
        });

        stage.target.addEventListener(HA.event.load, function(e) {
          if(!HAP.options.viewer) {
            mixTitle.value = HA.api.mix.label;
            notify('load'); // Tell top frame the mix was loaded
          } else {
            mixTitle.innerHTML = HA.api.mix.label;
          }
          mixId = HA.api.mix._id;
          updateGUI();
        }, false);

        if(!HAP.options.viewer) {
          stage.target.addEventListener(HA.event.save, function(e) {
            savingAnim.style.display = 'none';
            notify('save'); // Tell top frame the mix was saved
            mixId = HA.api.mix._id;
            updateGUI();
          }, false);
        }
      }

      if(!HAP.options.viewer || (transcriptId && !mixId)) {

        player = HA.Player({
          target: "#source-canvas",
          gui: {
            fullscreen: HAP.options.viewer
          }
        });

        HAP.transcript = HA.Transcript({
          target: "#source-transcript",
          stage: stage,
          player: player
        });

        if(HAP.options.viewer) {
          HAP.transcript.target.addEventListener(HA.event.load, function(e) {
            mixTitle.innerHTML = HA.api.transcript.label;
          }, false);
        }
        HAP.transcript.target.addEventListener(HA.event.load, function(e) {
          transcriptId = HA.api.transcript._id;
          updateGUI();
        }, false);
      }
    }

    if(!HAP.options.viewer) {

      function mediaSelect (el) {
        var id = el.getAttribute('data-id');
        sidemenu.close();
        HAP.transcript.load(id);
      }

      // Init the side menu
      sidemenu = new HA.SideMenu({
        el: '#sidemenu',
        stage: stage,
        callback: mediaSelect
      });

      // Title handler
      mixTitleHandler = function(e) {
        e.preventDefault();
        stage.mixDetails({
          title: mixTitle.value
        });
        if(typeof mixTitle.blur === 'function') {
          mixTitle.blur();
        }
        HA.gaEvent({
          origin: HAP.options.ga_origin,
          type: 'HAP',
          action: 'titlechange: Mix title changed'
        });
      };

      // Title
      mixTitleForm.addEventListener('submit', mixTitleHandler, false);
      mixTitleForm.addEventListener('change', mixTitleHandler, false);
      mixTitle.addEventListener('keyup', function(e) {
        stage.mixDetails({
          title: this.value
        });
      }, false);

      // Save button
      saveButton._tap = new HA.Tap({el: saveButton});
      saveButton.addEventListener('tap', function () {
        savingAnim.style.display = 'block';
        stage.save();
      }, false);

      // Prompt login if attempting to save
      stage.target.addEventListener(HA.event.unauthenticated, function(e) {
        // Prompt login
        signin.style.display = 'block';
        // Hide saving anim
        savingAnim.style.display = 'none';
        notify('unauthenticated'); // Tell top frame the user is not logged in.
      });

      stage.target.addEventListener(HA.event.change, function(e) {
        notify('change'); // Tell top frame the mix (may have) changed
      });

      // Init special fx
      fade = new HA.DragDrop({
        handle: '#fadeFX',
        dropArea: stage.target,
        draggableClass: 'draggableEffect',
        onDragStart: function (e) {
          HA.addClass(stage.target, 'dragdrop');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'fadeeffectstartdrag: Start drag of Fade effect'
          });
        },
        onDrop: function (el) {
          HA.removeClass(stage.target, 'dragdrop');
          if ( !el ) {
            return;
          }
          el.setAttribute('data-effect', 'fade');
          el.className += ' effect';
          el.innerHTML = '<form onsubmit="return false"><label>Fade Effect: <span class="value">1</span>s</label><input class="effect-duration" type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.previousSibling.querySelector(\'span\').innerHTML = this.value;"></form>';
          stage.dropped(el, 'Fade');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'fadeeffectdrop: Drop Fade effect on to stage'
          });
        }
      });

      trim = new HA.DragDrop({
        handle: '#trimFX',
        dropArea: stage.target,
        draggableClass: 'draggableEffect',
        onDragStart: function (e) {
          HA.addClass(stage.target, 'dragdrop');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'trimeffectstartdrag: Start drag of Trim effect'
          });
        },
        onDrop: function (el) {
          HA.removeClass(stage.target, 'dragdrop');
          if ( !el ) {
            return;
          }
          el.setAttribute('data-effect', 'trim');
          el.className += ' HAP-effect';
          el.innerHTML = '<form onsubmit="return false"><label>Trim: <span class="value">1</span>s</label><input class="effect-duration" type="range" value="1" min="0" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.previousSibling.querySelector(\'span\').innerHTML = this.value;"></form>';
          stage.dropped(el, 'Trim');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'trimeffectdrop: Drop Trim effect on to stage'
          });
        }
      });

      title = new HA.DragDrop({
        handle: '#titleFX',
        dropArea: stage.target,
        draggableClass: 'draggableEffect',
        onDragStart: function (e) {
          HA.addClass(stage.target, 'dragdrop');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'titleeffectstartdrag: Start drag of Title effect'
          });
        },
        onDrop: function (el) {
          HA.removeClass(stage.target, 'dragdrop');
          if ( !el ) {
            return;
          }
          el.setAttribute('data-effect', 'title');
          el.className += ' HAP-effect';
          var html = '<form onsubmit="return false">' +
            '<label>Title: <span class="value">1</span>s</label>' +
            '<div class="HAP-effect__checkboxes"><label for="effect-fullscreen">Full Screen:</label> <input type="checkbox" class="effect-fullscreen" checked onchange="if(this.checked) { this.setAttribute(\'checked\', true); } else { this.removeAttribute(\'checked\'); }"></div>' +
            '<input class="effect-title" type="text" value="Title" onchange="this.setAttribute(\'value\', this.value);" onkeyup="this.setAttribute(\'value\', this.value);">' +
            '<input class="effect-duration" type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.parentNode.querySelector(\'span\').innerHTML = this.value;">' +
            '</form>';

          // el.innerHTML = '<form onsubmit="return false"><label>Title: <span class="value">1</span>s</label><input id="effect-title" type="text" value="Title" onchange="this.setAttribute(\'value\', this.value);"><input id="effect-duration" type="range" value="1" min="0.5" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.parentNode.querySelector(\'span\').innerHTML = this.value;"></form>';
          el.innerHTML = html;
          stage.dropped(el, 'Title');
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'titleeffectdrop: Drop Title effect on to stage'
          });
        }
      });
    }

    if(share && shareBtn) {
      share.querySelector('.modal-close').addEventListener('click', function(e) {
        e.preventDefault();
        share.style.display = 'none';

        HA.Clipboard.enable(); // Enable the Clipboard utility
      });

      share.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        share.style.display = 'none';
        HA.Clipboard.enable(); // Enable the Clipboard utility
      });

      shareBtn.addEventListener('click', function(e) {
        e.preventDefault();

        share.style.display = 'block';

        //HA.Clipboard.disable(); // Disable the Clipboard utility
      });
    }

    if(shareTextElem) {
      shareTextElem.addEventListener('click', function(e) {
        e.preventDefault();
        shareTextElem.focus();
        shareTextElem.select();
      }, false);
    }

    updateGUI();


    if(!HAP.options.viewer || transcriptId || mixId) {

      if(!HAP.options.viewer || mixId) {
        if(mixId) {
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'loadmix: Load Mix given in URL param'
          });
          stage.load(mixId);
        } else {
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'nomix: New pad opened'
          });
        }
      }

      if(!HAP.options.viewer || (transcriptId && !mixId)) {
        if(transcriptId) {
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'loadtranscript: Load Transcript given in URL param'
          });
          HAP.transcript.load(transcriptId);
        } else {
          HA.gaEvent({
            origin: HAP.options.ga_origin,
            type: 'HAP',
            action: 'loaddefaulttranscript: Load default Transcript'
          });
          HAP.transcript.load(HAP.options.defaultTranscriptId);
        }
      }
    }
  }

  function notify(type) {
    try {
      var topFrame = window.top;
      if(typeof topFrame.notify === 'function') {
        topFrame.notify(type);
      }
    } catch(error) {}
  }

  //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

  var pageReady = false;
  window.addEventListener('load', function() {
    pageReady = true;
  }, false);

  HAP.init = function(options) {

    this.options = HA.extend({}, this.options, options);

    if(this.options.viewer) {

      var viewer = document.querySelector(this.options.targetViewer);
      var video = document.getElementById("output-canvas");
      var text = document.getElementById("output-transcript");

      var sourceSet = false;

      // we make these checks in case HAP is initiated after the first time with initial page load
      // ie when a link is clicked and we need to change content (not load as initially)

      if (video == null) {
        sourceSet = true;
        video = document.getElementById("source-canvas");
      }

      if (text == null) {
        text = document.getElementById("source-transcript");
      }

      // var text = document.createElement('div');
      // var video = document.createElement('div');
      if(mixId) {
        video.setAttribute('id', 'output-canvas');
        // HA.addClass(video, 'video');
        // text.setAttribute('id', 'stage');
      } else {
        if (sourceSet == false) {
          video.setAttribute('id', 'source-canvas');
          HA.addClass(video, 'video');
          text.setAttribute('id', 'source-transcript');
        }
        // text.appendChild(document.createElement('p')); // Otherwise iScroll complains.
      }
      viewer.appendChild(video);
      viewer.appendChild(text);
    }

    if(pageReady) {
      loaded();
    } else {
      window.addEventListener('load', loaded, false);
    }
  };

  return HAP;

})(window, document, HA);