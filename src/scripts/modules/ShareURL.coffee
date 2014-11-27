setSharePath = () ->
  thisPageURL = window.top.location.href
  shareLinks  = document.querySelectorAll ".jsSetSharePath"
  [].forEach.call shareLinks, (shareLink) ->
    shareLinkHref   = shareLink.getAttribute "href"
    shareLinkNuHref = shareLinkHref.replace "UURRLL", encodeURIComponent(thisPageURL)
    shareLink.setAttribute "href", shareLinkNuHref