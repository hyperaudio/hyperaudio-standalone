let scrollTo = function(element, to, duration) {
  let start = element.scrollTop;
  let change = to - start;
  let currentTime = 0;
  let increment = 20;
  let animateScroll = function() {
    currentTime += increment;
    let val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if (currentTime < duration) { return setTimeout(animateScroll, increment); }
  };

  return animateScroll();
};
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) { return ((c / 2) * t * t) + b; }
  t--;
  return ((-c / 2) * ((t * (t - 2)) - 1)) + b;
};