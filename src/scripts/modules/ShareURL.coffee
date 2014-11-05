setSharePath = () ->
  thisPageURL = document.location.href
  shareLinks  = document.querySelectorAll ".jsSetSharePath"
  [].forEach.call shareLinks, (shareLink) ->
    shareLinkHref   = shareLink.getAttribute "href"
    shareLinkNuHref = shareLinkHref.replace "UURRLL", thisPageURL
    shareLink.setAttribute "href", shareLinkNuHref