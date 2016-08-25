let toggleClass = function(el, className) {
  if (el.classList) {
    return el.classList.toggle(className);
  } else {
    let classes = el.className.split(" ");
    let existingIndex = classes.indexOf(className);
    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }
    return el.className = classes.join(" ");
  }
};

let hasClass = function(el, className) {
  className = ` ${className} `;
  if ((` ${el.className} `).replace(/[\n\t]/g, " ").indexOf(className) > -1) { return true; }
  return false;
};

let addClass = function(el, className) {
  if (!hasClass(el, className)) { return el.className += ` ${className}`; }
};

let removeClass = function(el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    return el.className = el.className.replace(reg, " ");
  }
};