var AJHAWrapper = {

  // Todo validate url input so that an invalid url does not cause JS errors.

  // #/t:Test%20Max,1,1.2/0:2150,4210/r:1/t:And%20Now%20For%20Something...,0,2/1:23500,5310/f:1/2:3126,7334

  init : function(target, transcriptsPath, AJHAPcallback) {

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

            var ytid = videoInfo[parseInt(tid)].split(',')[0];
            var mp4id = videoInfo[parseInt(tid)].split(',')[1];

            var attribute = document.createAttribute('data-unit');
            attribute.value = "0.001";
            section.setAttributeNode(attribute);
            attribute = document.createAttribute('data-mp4');
            attribute.value = mp4id;
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

      var element = '<form onsubmit="return false"><label>Title: <span class="value">'+duration+'</span>s</label><div class="HAP-effect__checkboxes"><label for="effect-fullscreen">Full Screen:</label> <input id="effect-fullscreen" '+fullscreenCheck+' onchange="if(this.checked) { this.setAttribute(\'checked\', true); } else { this.removeAttribute(\'checked\'); }" type="checkbox"></div><input id="effect-title" value="'+title+'" onchange="this.setAttribute(\'value\', this.value);" onkeyup="this.setAttribute(\'value\', this.value);" type="text"><input id="effect-duration" value="'+duration+'" min="0.5" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.parentNode.querySelector(\'span\').innerHTML = this.value;" type="range">';

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

      var element = '<form onsubmit="return false"><label>'+label+'<span class="value">1</span>s</label><input id="effect-duration" value="'+duration+'" min="'+min+'" max="5" step="0.1" onchange="this.setAttribute(\'value\', this.value); this.previousSibling.querySelector(\'span\').innerHTML = this.value;" type="range">';

      var section = output.childNodes[index-1];
      section.innerHTML += element;
      var attribute = document.createAttribute('data-effect');
      attribute.value = type;
      section.setAttributeNode(attribute);
      section.classList.add('HAP-transcript__item');
      section.classList.add('HAP-effect');
    }

    var videoInfo = ['http://www.youtube.com/watch?v=mnY0rynBSTM,http://player.vimeo.com/external/107384621.mobile.mp4?s=80297e241df84e5eb0385c87304fb3c8','http://www.youtube.com/watch?v=sI8R9B_caDY,http://player.vimeo.com/external/107385223.mobile.mp4?s=8083e99329c10022f3c0f9ab4fdb065a','https://www.youtube.com/watch?v=sr0Ha2aQm_o,http://player.vimeo.com/external/107445262.mobile.mp4?s=2ada419278dc8fe349d47fbcbd2047f6','http://www.youtube.com/YET_TO_BE_DEFINED,http://player.vimeo.com/external/109393367.sd.mp4?s=63598cd0985d9abed30f23c5d6e5196d'];

    //var videoInfo = ['mnY0rynBSTM,107384621.m3u8?p=standard*mobile&s=e4570b1860ec64fc4f1226e6612c1098','sI8R9B_caDY,107385223.mobile.mp4?s=8083e99329c10022f3c0f9ab4fdb065a','fJISrenMzws,107445262.mobile.mp4?s=2ada419278dc8fe349d47fbcbd2047f6'];

    var state = document.location.hash;
    var params = state.split('/');

    // first pass - create the sections

    for (var i=1; i < params.length; i++) {
      output.appendChild(document.createElement('section'));
    }

    var q = queue(1);

    if (params[1].split(':').length == 1) {

      longformId = params[1];
      longformMedia = videoInfo[longformId].split(',')[1];

      // check for timing parameters which means it's been shared

      if (params.length > 2) {
        startTime = params[2];
        endTime = params[3];

        document.addEventListener('transcriptready', function () {

          HAP.transcript.options.player.play(parseInt(startTime/1000));

          HAP.transcript.options.player.addEventListener('timeupdate', function () {
            var currentTime = HAP.transcript.options.player.videoElem.currentTime;
            if (currentTime > parseInt(endTime/1000) && selectPause == false) {
              HAP.transcript.options.player.pause();
              selectPause = true;
            }
          }, false);

          // cancels the check to pause video

          document.addEventListener('click', function () {
            selectPause = true;
          }, false);

        }, false);
      }
    } else {

      for (var i=0; i < params.length; i++) {
        var cmd = params[i].split(':');

        if (isNaN(cmd[0])) {

          switch (cmd[0]) {
            case "t": // title
              var details = cmd[1].split(',');
              buildTitle(i,unescape(details[0]),details[1],details[2]);
              break;
            case "r": // trime
              buildTimedEffect(i,cmd[1],"trim", effectsLabelTrim, "0");
              break;
            case "f": // fade
              buildTimedEffect(i,cmd[1],"fade", effectsLabelFade, "0.5");
              break;
          }
        } else {
          // It's a transcript
          var times = cmd[1].split(',');
          // buildTranscriptSection(i,cmd[0],times[0],times[1]);
          if (times && times.length == 2) {
            q.defer(buildTranscriptSection,i,cmd[0],times[0],times[1]);
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
          transcripts: transcriptsPath
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

        AJHAPcallback();

      } else {

        // Hyperaudio Pad Set Up

        HAP.init({
          mixHTML : mixHTML,
          mixTitle : mixTitle,
          longformId : longformId,
          longformMedia : longformMedia,
          transcripts: transcriptsPath
        });
      }

      // Events

      document.addEventListener('transcriptready', function () {

        console.log("transcript ready");

        if (target != 'Viewer') {

          AJHAPcallback();

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
      }, false);

      // #/t:Test%20Max,1,1.2/0:2150,97910/r:1/t:And%20Now%20For%20Something...,0,2/1:23500,5310/f:1.5/2:3126,41282

      document.addEventListener('mixchange', function () {
        console.log("mixchange message received");
        console.log("--------------------------");

        var newUrlHash = "#";

        var mix = document.getElementById('output-transcript');
        //console.dir(mix);
        var sections = mix.getElementsByTagName('section');
        console.dir(sections);
        console.log(sections.length);

        for ( var i = 0; i < sections.length; i++ ) {
          var firstChild = sections[i].firstChild;
          //console.dir(firstChild);
          console.log(i);
          console.log(firstChild.tagName);

          if (firstChild.tagName == "P") {
            //console.log('found text');
            var sTime = firstChild.firstChild.getAttribute('data-m');
            var eTime = firstChild.lastChild.getAttribute('data-m');
            var duration = parseInt(eTime) - parseInt(sTime);
            //console.log(sTime);
            //console.log(eTime);
            //console.log(duration);

            // maybe we should use data-id on sections to store videoId
            // there seems to be some provision for that in hyperaudio-pad.js

            var videoId;

            var videoUrl = sections[i].getAttribute('data-mp4');

            if (!videoUrl) {
              videoUrl = sections[i].getAttribute('data-yt');
            }

            console.log(videoUrl);

            for ( var j = 0; j < videoInfo.length; j++ ) {
              if (videoInfo[j].indexOf(videoUrl) >= 0) {
                videoId = j;
              }
            }

            newUrlHash += "/" + videoId + ":" + sTime + "," + duration;
            console.log(newUrlHash);
          }

          console.log("here");

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

      /*document.getElementById('output-transcript').addEventListener('DOMNodeInserted', function() {
        console.log("DOMNodeInserted");
        var mixHTML = document.getElementById('output-transcript').innerHTML;
        console.log(mixHTML);
      }, false);

      document.getElementById('output-transcript').addEventListener('DOMNodeRemoved', function() {
        console.log("DOMNodeRemoved");
        var mixHTML = document.getElementById('output-transcript').innerHTML;
        console.log(mixHTML);
      }, false);*/

    });
  }
};