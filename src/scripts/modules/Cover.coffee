renderCover = () ->
  if document.getElementById("page-cover")
    cover     = document.getElementById("page-cover")
    coverEl   = document.getElementById("page-coverEl")
    fitFold(cover, coverEl)