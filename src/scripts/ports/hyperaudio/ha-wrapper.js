var AJHAWrapper = {

  // Todo validate url input so that an invalid url does not cause JS errors.

  // #/t:Test%20Max,1,1.2/0:2150,4210/r:1/t:And%20Now%20For%20Something...,0,2/1:23500,5310/f:1/2:3126,7334

  init : function(target, transcriptsPath, ajOnInitCallback) {

    // browser sniff

    var mobileDevice = false;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      mobileDevice = true;
    }

    if (mobileDevice == false) { // add the Remix icon and link
      // var body = document.getElementsByTagName('body');
      // body[0].classList.add('tpl--compact');
      var remixButton = document.getElementById('HAP-remix-helper');
      if (remixButton) {
        remixButton.href = "../create/"+document.location.hash;
      }
    }

    function isFullScreen() {
      return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement || false);
    }

    function fullscreenHandler() {
      var holders = document.getElementsByClassName("HAP");

      if (isFullScreen() == true) {
        for (var i = 0; i < holders.length; i++) {
          holders[i].setAttribute("class", "fullscreen "+holders[i].className);
        }
      } else {
        for (var i = 0; i < holders.length; i++) {
          holders[i].className = holders[i].className.replace( /(?:^|\s)fullscreen(?!\S)/ , '' );
        }
      }
    }

    document.addEventListener("fullscreenchange", fullscreenHandler, false);
    document.addEventListener("webkitfullscreenchange", fullscreenHandler, false);
    document.addEventListener("mozfullscreenchange", fullscreenHandler, false);

    var v = document.createElement('video');
    var canPlayMP4 = !!v.canPlayType && v.canPlayType('video/mp4') != "";

    // constants

    var effectsLabelFade = "Fade Effect: ";
    var effectsLabelTrim = "Trim: ";
    var effectsLabelTitle = "Title: ";

    var transcript = null;
    var longformId = null;
    var longformMedia = null;

    var selectPause = false;

    var output = document.createElement("article");

    var mixTitle = null;

    function buildTranscriptSection(index, tid, stime, length, callback) {

      console.log('tid');
      console.log(tid);

      var element2 = document.createElement('p');
      var attribute = document.createAttribute('dir');
      attribute.value = "auto";
      element2.setAttributeNode(attribute);

      var etime = parseInt(stime)+parseInt(length);

      tid = tid + ".html";

      var req = new XMLHttpRequest();
      req.onload = function() {
        var html = this.responseText;
        var parser = new DOMParser();
        var transcript = parser.parseFromString(html, "text/xml");

        var firstWordInTrans;
        var lastWordInTrans;
        var firstWordEl;
        var lastWordEl;

        if (stime != null) {

          var startPos = html.indexOf('data-m="'+stime+'"');
          var endPos = html.indexOf('data-m="'+etime+'"');

          if (startPos > 0 && endPos > 0)
          {
            var endPart = html.substring(endPos, html.length);
            var endPosRemainder = endPart.indexOf("</a>");

            var element2 = '<p dir="auto"><a '+html.substring(startPos,endPos+endPosRemainder)+' </a></p>';

            var section = output.childNodes[index-1];
            section.innerHTML += element2;

            var ytid = AJHAVideoInfo[parseInt(tid)].split(',')[0];
            var mp4id = AJHAVideoInfo[parseInt(tid)].split(',')[1];

            var attribute = document.createAttribute('data-unit');
            attribute.value = "0.001";
            section.setAttributeNode(attribute);

            // use YouTube for non MP4 supporting browsers

            if (canPlayMP4) {
              attribute = document.createAttribute('data-mp4');
              attribute.value = mp4id;
            } else {
              attribute = document.createAttribute('data-yt');
              attribute.value = ytid;
            }

            section.setAttributeNode(attribute);
            section.classList.add('HAP-transcript__item');
          } else {
            console.log('WARNING: Could not locate data-m="'+stime+'" and/or data-m="'+etime+'" within transcript '+tid);
          }
        }

        callback(null, true);
      }
      req.open("get", transcriptsPath + tid, true);
      req.send();
    }


    function buildTitle(index, title, fullscreen, duration) {

      var fullscreenCheck = "";

      if (fullscreen == '1') {
        fullscreenCheck = 'checked=""';
      }

      // Viewer compatible

      //var element = '<div class="HAP-effect__checkboxes"><input id="effect-fullscreen" '+fullscreenCheck+'></div><input id="effect-title" value="'+title+'"><input id="effect-duration" value="'+duration+'">';

      // Pad compatible

      var element = '<form onsubmit="return false"><label>Title: <span class="value">'+duration+'</span>s</label><div class="HAP-effect__checkboxes"><label for="effect-fullscreen">Full Screen:</label> <input class="effect-fullscreen" '+fullscreenCheck+' onchange="if(this.checked) { this.setAttribute(\'checked\', true); } else { this.removeAttribute(\'checked\'); }" type="checkbox"></div><input class="effect-title" value="'+title+'" onchange="this.setAttribute(\'value\', this.value);" onkeyup="this.setAttribute(\'value\', this.value);" type="text"><input class="effect-duration" value="'+duration+'" min="0.5" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.parentNode.querySelector(\'span\').innerHTML = this.value;" type="range">';

      if (mixTitle == null) {
        mixTitle = title;
      }

      var section = output.childNodes[index-1];
      section.innerHTML += element;

      var attribute = document.createAttribute('data-effect');
      attribute.value = "title";
      section.setAttributeNode(attribute);
      section.classList.add('HAP-transcript__item');
      section.classList.add('HAP-effect');
    }

    function buildTimedEffect(index, duration, type, label, min) {

      // Viewer compatible

      //var element = '<input id="effect-duration" value="'+duration+'">';

      // Pad compatible

      var element = '<form onsubmit="return false"><label>'+label+'<span class="value">'+duration+'</span>s</label><input class="effect-duration" value="'+duration+'" min="'+min+'" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.previousSibling.querySelector(\'span\').innerHTML = this.value;" type="range">';

      var section = output.childNodes[index-1];
      section.innerHTML += element;
      var attribute = document.createAttribute('data-effect');
      attribute.value = type;
      section.setAttributeNode(attribute);
      section.classList.add('HAP-transcript__item');
      section.classList.add('HAP-effect');
    }

    function buildVideo(params) {
      longformId = params[1];

      if (canPlayMP4) {
        longformMedia = AJHAVideoInfo[longformId].split(',')[1];
      } else {
        longformMedia = AJHAVideoInfo[longformId].split(',')[0];
      }

      // check for timing parameters which means it's been shared or jumped to

      if (params.length > 1) {

        startTime = params[2];
        endTime = params[3];

        document.addEventListener('transcriptready', function () {

          if (startTime) {

            HAP.transcript.options.player.play(parseInt(startTime/1000));

            HAP.transcript.options.player.addEventListener('timeupdate', function () {
              var currentTime = HAP.transcript.options.player.videoElem.currentTime;
              if (endTime)
              {
                if (currentTime > parseInt(endTime/1000) && selectPause == false) {
                  HAP.transcript.options.player.pause();
                  selectPause = true;
                }
              }
            }, false);

            // cancels the check to pause video at passed through end time

            document.addEventListener('click', function () {
              selectPause = true;
            }, false);
          }

        }, false);
      }
    }

    function buildMix(params) {
      for (var i=0; i < params.length; i++) {
        var cmd = params[i].split(':');

        console.log(params);
        console.log(cmd);

        if (isNaN(cmd[0])) {

          switch (cmd[0]) {
            case "t": // title
              var details = cmd[1].split(',');
              buildTitle(i,unescape(details[0]),details[1],details[2]);
              break;
            case "r": // trim
              buildTimedEffect(i,cmd[1],"trim", effectsLabelTrim, "0");
              break;
            case "f": // fade
              buildTimedEffect(i,cmd[1],"fade", effectsLabelFade, "0.5");
              break;
          }
        } else {
          // It's a transcript or a blank (ie trailing slash)

          if (cmd[0].length > 0) { // we need to check for blank as apparently it's a number too!
            var times = cmd[1].split(',');

            if (times && times.length == 2) {
              q.defer(buildTranscriptSection,i,cmd[0],times[0],times[1]);
            }
          }
        }
      }
    }

    var q;

    function buildState() {
      console.log("building state");
      var state = document.location.hash;
      var params = state.split('/');

      // first pass - create the sections

      for (var i=1; i < params.length; i++) {
        output.appendChild(document.createElement('section'));
      }

      q = queue(1);

      // do we have any hash params?

      if (state) {

        // checking if it's a full video

        if (params[1].split(':').length == 1) {

          buildVideo(params);

        } else {

          buildMix(params);
        }
      }

      q.awaitAll(function() {

        var mixHTML = output.outerHTML;

        if (mixTitle == null) {

          mixTitle = "untitled";
        }

        if(target == 'Viewer') {

          // Hyperaudio Viewer Set Up

          HAP.init({
            viewer: true,
            origin: 'Viewer',
            editBtn: '#edit',
            shareBtn: '#share',
            mixHTML : mixHTML,
            mixTitle : mixTitle,
            longformId : longformId,
            longformMedia : longformMedia,
            transcripts: transcriptsPath,
            mp4Compat: canPlayMP4
          });

          var sourceTranscript = document.getElementById('source-transcript');

          if (sourceTranscript) {
            sourceTranscript.onmouseup = function() {

              var selection = HAP.transcript.getSelection();

              if (selection.start) {

                selectionTextContent = "'" + selection.text + "' :";
                selectionTextURI     = window.location.href + "/" + selection.start + "/" + (parseInt(selection.end) + 1000);
                selectionElement     = document.getElementById("share-selection");

                alterPanelState("share-transcript");

                [].forEach.call(document.querySelectorAll(".jsSetShareTranscriptURL"), function(el) {
                  var shareLinkHref   = el.getAttribute("href");
                  var shareLinkNuHref = shareLinkHref.replace("UURRLL", escape(selectionTextURI)).replace("TTEEXXTT", escape(selectionTextContent));
                  el.setAttribute("href", shareLinkNuHref);
                  el.classList.remove('selected');
                });


                // toggleHAVDrop(selectionElement, selectionTextContent, selectionTextURI);

                document.getElementById('hav-share-url').innerHTML = selectionTextURI;

                [].forEach.call(document.querySelectorAll("a"), function(el) {
                  el.classList.remove('selected');
                });
              }
            }
          }

          ajOnInitCallback();


        } else {

          // Hyperaudio Pad Set Up

          HAP.init({
            mixHTML : mixHTML,
            mixTitle : mixTitle,
            longformId : longformId,
            longformMedia : longformMedia,
            transcripts: transcriptsPath,
            mp4Compat: canPlayMP4
          });
        }

        // #/t:Test%20Max,1,1.2/0:2150,97910/r:1/t:And%20Now%20For%20Something...,0,2/1:23500,5310/f:1.5/2:3126,41282

      });
    }

    buildState();

    // Events

    // Sometimes we need to detect things only when the transcript is ready


    function fireMixchangeEvent() {
      var event = document.createEvent('Event');
      event.initEvent('mixchange', true, true);
      document.dispatchEvent(event);
    }

    function setEffectsListeners() {
      var durationSliders = document.getElementsByClassName('effect-duration');

      for( var i = 0; i < durationSliders.length; i++){
        durationSliders[i].removeEventListener('change', fireMixchangeEvent, false);
        durationSliders[i].addEventListener('change', fireMixchangeEvent, false);
      }

      var titleText = document.getElementsByClassName('effect-title');

      for( var i = 0; i < titleText.length; i++){
        titleText[i].removeEventListener('change', fireMixchangeEvent, false);
        titleText[i].addEventListener('change', fireMixchangeEvent, false);
      }

      var fullscreenCheck = document.getElementsByClassName('effect-fullscreen');

      for( var i = 0; i < fullscreenCheck.length; i++){
        fullscreenCheck[i].removeEventListener('change', fireMixchangeEvent, false);
        fullscreenCheck[i].addEventListener('change', fireMixchangeEvent, false);
      }
    }



    document.addEventListener('transcriptready', function () {

      console.log("transcript ready");


      if (target != 'Viewer') {

        ajOnInitCallback();
      }

      setEffectsListeners();

      // general hash change detector

      function updatePadShareUrl() {

        if (HAP.options.origin != "Viewer") {

          var url = window.location.href;
          url = url.replace("/create/","/view/");

          document.getElementById('hap-share-url').innerHTML = url;

          document.getElementById('hap-share-facebook').href = "https://www.facebook.com/sharer/sharer.php?u=" + url;
          document.getElementById('hap-share-twitter').href = "https://twitter.com/home?status=" + url;
          document.getElementById('hap-share-google').href = "https://plus.google.com/share?url=" + url;
          document.getElementById('hap-share-email').href = "mailto:?subject=Message%20via%20PALESTINE%20REMIX&body=Hey%2C%20%0A%0Acheck%20this%20page%3A%20" + url;
        }

      }

      updatePadShareUrl();


      window.onhashchange = function() {
        console.log("hash change");
        updatePadShareUrl();
      }

      var video = document.getElementsByTagName('video');

      for (var i=0; i < video.length; i++) {

        video[i].addEventListener('click', function () {

          if (HAP.transcript.options.player.videoElem.paused) {
            HAP.transcript.options.player.play();
          } else {
            HAP.transcript.options.player.pause();
          }

        });
      }

      // detect clicks on the viewer menu
      var sidemenuItems = document.getElementsByClassName('menu__link');

      for( var i = 0; i < sidemenuItems.length; i++){

        if (sidemenuItems[i].href.length > 0) {
          sidemenuItems[i].addEventListener('click', function() {
            window.onhashchange = buildState;
          }, false);
        }
      }

      // detect clicks on the pad menu
      document.addEventListener('padmenuclick', function() {
        console.log('padmenuclick');
        window.onhashchange = function() {

          var longformId = document.location.hash.split('/')[1];
          var longformMedia;

          if (isNaN(longformId) == false)
          {
            if (canPlayMP4) {
              longformMedia = AJHAVideoInfo[longformId].split(',')[1];
            } else {
              longformMedia = AJHAVideoInfo[longformId].split(',')[0];
            }
            HAP.options.longformId = longformId;
            HAP.options.longformMedia = longformMedia;
            console.log(longformMedia);
            HAP.transcript.load();
          }
        };
      }, false);

      document.addEventListener('mixchange', function () {

        // an effect may have been added to the mix

        setEffectsListeners();

        var newUrlHash = "#";
        var mix = document.getElementById('output-transcript');
        var sections = mix.getElementsByTagName('section');

        for ( var i = 0; i < sections.length; i++ ) {
          var firstChild = sections[i].firstChild;

          // if it's a para it's text

          if (firstChild.tagName == "P") {

            var paras = sections[i].getElementsByTagName('p');
            var lastChild = paras[paras.length-1];

            var sTime = firstChild.firstChild.getAttribute('data-m');

            var anchors = lastChild.getElementsByTagName('a');
            var eTime = anchors[anchors.length-1].getAttribute('data-m');

            var duration = parseInt(eTime) - parseInt(sTime);

            // maybe we should use data-id on sections to store videoId
            // there seems to be some provision for that in hyperaudio-pad.js

            var videoId;

            var videoUrl = sections[i].getAttribute('data-mp4');

            if (!videoUrl) {
              videoUrl = sections[i].getAttribute('data-yt');
            }

            console.log(videoUrl);

            for ( var j = 0; j < AJHAVideoInfo.length; j++ ) {
              if (AJHAVideoInfo[j].indexOf(videoUrl) >= 0) {
                videoId = j;
              }
            }

            newUrlHash += "/" + videoId + ":" + sTime + "," + duration;
            console.log(newUrlHash);
          }

          // If it's a form it's an effect

          if (firstChild.tagName == "FORM") {
            var type = firstChild.firstChild.firstChild.nodeValue;
            var duration = firstChild.childNodes[1].value;
            var prefix = "";

            if (type == effectsLabelFade) {
              prefix = "f";
            }

            if (type == effectsLabelTrim) {
              prefix = "r";
            }

            if (type == effectsLabelTitle) {
              prefix = "t";

              var fullscreen = firstChild[0].checked;
              if (fullscreen) {
                fullscreen = '1';
              } else {
                fullscreen = '0';
              }

              var title = firstChild[1].value;
              var duration = firstChild[2].value;
              newUrlHash += "/" + prefix + ":" + title + "," + fullscreen + "," + duration;
            } else {
              newUrlHash += "/" + prefix + ":" + duration;
            }
          }
        }

        document.location.hash = newUrlHash;
      }, false);

    }, false);
  }
};