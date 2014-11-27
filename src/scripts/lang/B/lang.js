window.L = 'B';
unless window.parent is window
  if window.location.hash != ''
    window.top.location.hash = window.location.hash
 