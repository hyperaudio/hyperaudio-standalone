var AJHAVideoInfo = [
"http://www.youtube.com/watch?v=4hRzdAgc8FM,http://player.vimeo.com/external/109585527.hd.mp4?s=7bd504c45f373de7f627177e3c3f1bcb",
"http://www.youtube.com/watch?v=HomYG95MO3k,http://player.vimeo.com/external/109585525.hd.mp4?s=dbcb3c3e779426f92f5ef51f64acbba5",
"http://www.youtube.com/watch?v=TwJHG2KSsG0,http://player.vimeo.com/external/110884059.hd.mp4?s=3eb6e351f73ca929189cbf1e2d74c8c4",
"http://www.youtube.com/watch?v=oy4PWG6LCAs,http://player.vimeo.com/external/109585524.hd.mp4?s=988c547e4e5d25236d5862976af9e836",
"http://www.youtube.com/watch?v=2JqmcqkIrFE,http://player.vimeo.com/external/110467198.hd.mp4?s=2f954a2e824e152bc3bf29a616511b92",
"http://www.youtube.com/watch?v=t657lfeIg4s,http://player.vimeo.com/external/109585526.hd.mp4?s=1fe0282cf14b8ae2bd82f59f21ad43cb",
"http://www.youtube.com/watch?v=Jp2UcV2Ldaw,http://player.vimeo.com/external/110467201.hd.mp4?s=53965bd7c092c753d3ab3506273bb5c4",
"http://youtu.be/a9rGEPGpDis               ,http://player.vimeo.com/external/110467206.hd.mp4?s=d529d60db0e6b9374f75301837c6580e",
"http://www.youtube.com/watch?v=3dBBBnxKgeQ,http://player.vimeo.com/external/110888355.hd.mp4?s=9360b21d5cb36f15bed0353a02b0d044",
"http://www.youtube.com/watch?v=GHcFqNICoJM,http://player.vimeo.com/external/110889321.hd.mp4?s=05d019878de216dffe78c98e332bcd52",
"http://www.youtube.com/watch?v=sT22bwJ55Sw,",
"http://www.youtube.com/watch?v=sXDngNEqdnA,",
"http://www.youtube.com/watch?v=iOoW9-gUCDw,http://player.vimeo.com/external/110697549.hd.mp4?s=cee08621e19cb94e50df5997d25620b0",
"http://www.youtube.com/watch?v=NRP-j1eM2Ck,",
"http://www.youtube.com/watch?v=ism-ctaSbw0,http://player.vimeo.com/external/110904621.hd.mp4?s=b5055337d78a967c8e98372a11b57b0a",
"http://www.youtube.com/watch?v=TgFWEVQTeHM,",
"http://www.youtube.com/watch?v=u49jwfcLwuE,http://player.vimeo.com/external/110467238.hd.mp4?s=1d8125fcb86fbc884d8e7ab2d71aa9d5",
"http://www.youtube.com/watch?v=H7FML0wzJ6A,",
"http://www.youtube.com/watch?v=yI2D5Fsd9lg,",
"http://www.youtube.com/watch?v=5SKECszemmA,",
"http://www.youtube.com/watch?v=0m__A7MlDrk,"
];



var AJHAWrapper = {

  // Todo validate url input so that an invalid url does not cause JS errors.

  // #/t:Test%20Max,1,1.2/0:2150,4210/r:1/t:And%20Now%20For%20Something...,0,2/1:23500,5310/f:1/2:3126,7334

  init : function(target, transcriptsPath, ajOnInitCallback) {

    var v = document.createElement('video');
    var canPlayMP4 = !!v.canPlayType && v.canPlayType('video/mp4') != "";

    console.log("canPlayMP4");
    console.log(canPlayMP4);

    //var testVideo = document.createElement('video');
    //var videoUrls = AJHAVideoInfo[0];
    //testVideo.src = videoUrls.split(',')[1];
    //var canPlayMP4 = testVideo.canPlayType();

    

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

      var element = '<form onsubmit="return false"><label>'+label+'<span class="value">1</span>s</label><input class="effect-duration" value="'+duration+'" min="'+min+'" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.previousSibling.querySelector(\'span\').innerHTML = this.value;" type="range">';

      var section = output.childNodes[index-1];
      section.innerHTML += element;
      var attribute = document.createAttribute('data-effect');
      attribute.value = type;
      section.setAttributeNode(attribute);
      section.classList.add('HAP-transcript__item');
      section.classList.add('HAP-effect');
    }

    //var videoInfo = ['mnY0rynBSTM,107384621.m3u8?p=standard*mobile&s=e4570b1860ec64fc4f1226e6612c1098','sI8R9B_caDY,107385223.mobile.mp4?s=8083e99329c10022f3c0f9ab4fdb065a','fJISrenMzws,107445262.mobile.mp4?s=2ada419278dc8fe349d47fbcbd2047f6'];

    function buildState() {
      console.log("building state");
      var state = document.location.hash;
      var params = state.split('/');

      // first pass - create the sections

      for (var i=1; i < params.length; i++) {
        output.appendChild(document.createElement('section'));
      }

      var q = queue(1);

      // checking if it's a longform 

      if (state) {

        if (params[1].split(':').length == 1) {

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

            console.log("params");
            console.log(params);
            console.log("startTime");
            console.log(startTime);

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

                // cancels the check to pause video

                document.addEventListener('click', function () {
                  selectPause = true;
                }, false);
              }

            }, false);
          }
        } else {

          for (var i=0; i < params.length; i++) {
            var cmd = params[i].split(':');

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
                // buildTranscriptSection(i,cmd[0],times[0],times[1]);
                if (times && times.length == 2) {
                  q.defer(buildTranscriptSection,i,cmd[0],times[0],times[1]);
                }
              }
            }
          }
        }
      }

      q.awaitAll(function() {
        //var mixHTML = output[0].outerHTML;
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

                alert("'" + selection.text + "' :" + window.location.href + "/" + selection.start + "/" + (parseInt(selection.end) + 1000));

                //clear selection

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

    setEffectsListeners();

    document.addEventListener('transcriptready', function () {

      console.log("transcript ready");

      if (target != 'Viewer') {

        ajOnInitCallback();

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

      var sidemenuItems = document.getElementsByClassName('menu__link');

      for( var i = 0; i < sidemenuItems.length; i++){

        if (sidemenuItems[i].href.length > 0) {
          sidemenuItems[i].addEventListener('click', function() {
            window.onhashchange = buildState;           
          }, false);
        }
      }

      document.addEventListener('mixchange', function () {

        // an effect may have been added to the mix

        setEffectsListeners();

        var newUrlHash = "#";

        var mix = document.getElementById('output-transcript');
        //console.dir(mix);
        var sections = mix.getElementsByTagName('section');
        //console.dir(sections);
        //console.log(sections.length);

        for ( var i = 0; i < sections.length; i++ ) {
          var firstChild = sections[i].firstChild;

          if (firstChild.tagName == "P") {
            //console.log('found text');

            var paras = sections[i].getElementsByTagName('p');
            var lastChild = paras[paras.length-1];

            var sTime = firstChild.firstChild.getAttribute('data-m');

            //var eTime = lastChild.lastChild.getAttribute('data-m');

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


          if (firstChild.tagName == "FORM") {
            console.log('found effect');
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

            //console.log(type);
            //console.log("-"+type+"-");
            //console.log(prefix);
            console.log(newUrlHash);
          }
        }
        console.log("attempting to change hash");
        document.location.hash = newUrlHash;
      }, false);


    }, false);
  }
};