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
