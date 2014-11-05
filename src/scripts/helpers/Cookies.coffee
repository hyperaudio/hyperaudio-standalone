getCookie = (c_name) ->
  if document.cookie.length > 0
    c_start = document.cookie.indexOf(c_name + "=")
    unless c_start is -1
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(";", c_start)
      c_end = document.cookie.length  if c_end is -1
      return unescape(document.cookie.substring(c_start, c_end))
  ""
createCookie = (name, value, days) ->
  expires = undefined
  if days
    date = new Date()
    date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toGMTString()
  else
    expires = ""
  document.cookie = name + "=" + value + expires + "; path=/"