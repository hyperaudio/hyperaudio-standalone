# Load search index
index = undefined # we will load the index in here
titles = {} # we will load the titles in here

request0 = new XMLHttpRequest()
request0.open "GET", "/AJE/PalestineRemix/transcripts/html/" + L + "/list.json", true
request0.onreadystatechange = ->
  if @readyState is 4
    if @status >= 200 and @status < 400
      _titles = JSON.parse(@responseText)
      console.log(_titles)
      i = 0
      while i < _titles.length
        titles["" + _titles[i]._id] = _titles[i].label
        i++
      
      request = new XMLHttpRequest()
      request.open "GET", "/AJE/PalestineRemix/transcripts/data/" + L + "/index.json", true
      request.onreadystatechange = ->
        if @readyState is 4
          if @status >= 200 and @status < 400
            index = lunr.Index.load(JSON.parse(@responseText))
            listingSearchInput = document.getElementById("search")
            unless listingSearchInput is null
              listingSearchInput.addEventListener "change", doSearch
              listingSearchInput.setAttribute "value", getParameterByName("search") if getParameterByName("search")
              event = document.createEvent("HTMLEvents")
              event.initEvent "change", true, false
              listingSearchInput.dispatchEvent event
          else
            console.log("Silent Error")

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
  resultsContainer = document.querySelectorAll(".listing")[0]
  resultsContainer.removeChild resultsContainer.firstChild  while resultsContainer.firstChild
  query = document.getElementById("search").value.trim()
  results = index.search(query)
  if results.length is 0
    console.log("hello no results")
  r = 0
  while r < results.length
    # don't ask
    (->
      # video-paragraph-timecode
      idParts = results[r].ref.split("-")
      id = idParts[0] + "-" + idParts[1]
      second = parseInt(idParts[2] / 1000)
      second = 1 if second is 0
      el = document.createElement("div")
      # el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><a class=\"thumbnail tile__thumbnail\"><img src=\"http://10.24.21.20/~laurian/PALESTINE PROJECT/DATA/MEDIA/SEARCH/images/" + idParts[0] + "/E/p/img" + second + ".jpg\" class=\"thumbnail__image\"></a><div class=\"tile__body\"><p class=\"tile__transcript\">loading…</p></div></div></li>"
      title = titles[idParts[0]]
      el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><a href=\"../remix/view/#/" + idParts[0] + "/" + idParts[2] + "\" class=\"thumbnail tile__thumbnail\"><img src=\"http://interactive.aljazeera.com/aje/PalestineRemix/transcripts/images/" + idParts[0] + "/" + L + "/p/img" + second + ".jpg\" class=\"thumbnail__image\"></a><div class=\"tile__body\"><p class=\"tile__transcript\">loading…</p>" + title + "</div></div></li>"
      result = el.children[0]
      resultsContainer.appendChild result
      # AJAX
      request = new XMLHttpRequest()
      request.open "GET", "/AJE/PalestineRemix/transcripts/text/" + L + "/" + id + ".txt", true
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
                  if sword.indexOf(keyword) is 0
                    words[j] = "<a class=\"highlight\" href=\"../remix/view/#/" + idParts[0] + "/" + idParts[2] + "\">" + words[j] + "</a>"
                    match++
                  j++
                i++
              if match > 0
                sentences[s] = words.join(" ")
                resultSentences.push sentences[s]
              s++
            document.querySelectorAll("#r" + id + " .tile__transcript")[0].innerHTML = resultSentences.join(". ") + "."
      request.send()
      request = null
    )()
    r++
request0.send()
request0 = null