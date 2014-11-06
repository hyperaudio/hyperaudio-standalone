index = undefined # we will load the index in here
request = new XMLHttpRequest()
request.open "GET", "http://framebuffer.hyperaudio.net/AJ/transcripts/data/E/index.json", true
request.onreadystatechange = ->
  if @readyState is 4
    if @status >= 200 and @status < 400
      index = lunr.Index.load(JSON.parse(@responseText))
      searchInput = document.getElementById("search")
      unless searchInput is null
        searchInput.addEventListener "change", doSearch
    else
      console.log("Silent Error")

doSearch = ->

  # clean-up
  resultsContainer = document.querySelectorAll(".listing")[0]
  resultsContainer.removeChild resultsContainer.firstChild  while resultsContainer.firstChild
  query = document.getElementById("search").value.trim()
  results = index.search(query)
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
      el.innerHTML = "<li id=r" + id + " class=\"listing__item\"><div class=\"tile\"><a class=\"thumbnail tile__thumbnail\"><img src=\"images/" + idParts[0] + "/E/p/img" + second + ".jpg\" class=\"thumbnail__image\"></a><div class=\"tile__body\"><p class=\"tile__transcript\">loading…</p></div></div></li>"
      result = el.children[0]
      resultsContainer.appendChild result

      # AJAX
      request = new XMLHttpRequest()
      request.open "GET", "http://framebuffer.hyperaudio.net/AJ/transcripts/text/E/" + id + ".txt", true
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
                keyword = lunr.stemmer(search[i].toLowerCase())
                j = 0

                while j < words.length
                  if words[j].toLowerCase().indexOf(keyword) is 0 or words[j].toLowerCase().indexOf("-" + keyword) > -1
                    words[j] = "<a class=\"highlight\" href=\"/../remix/view/#/" + idParts[0] + "/" + idParts[2] + "\">" + words[j] + "</a>"
                    match++
                  j++
                i++
              if match > 0
                sentences[s] = words.join(" ")
                resultSentences.push sentences[s]
              s++
            document.querySelectorAll("#r" + id + " .tile__transcript")[0].innerHTML = resultSentences.join(". ") + "."

      # Silent error
      request.send()
      request = null
    )()
    r++
request.send()
request = null