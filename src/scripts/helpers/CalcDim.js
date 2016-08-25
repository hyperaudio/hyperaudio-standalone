let calcDim = function(els) {
  let val = undefined;
  val = 0;
  [].forEach.call(els, el => val += el.offsetWidth
  );
  return val;
};