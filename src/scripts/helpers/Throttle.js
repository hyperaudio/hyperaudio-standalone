// ========================================== #
// Throttle as Remy Sharp commanded:
// https://remysharp.com/2010/07/21/throttling-function-calls
// ========================================== #

let throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  let last = undefined;
  let deferTimer = undefined;
  return function() {
    let context = scope || this;
    let now = +new Date();
    let args = arguments;
    if (last && now < last + threshhold) {

      // hold on to it
      clearTimeout(deferTimer);
      return deferTimer = setTimeout(function() {
        last = now;
        return fn.apply(context, args);
      }
      , threshhold);
    } else {
      last = now;
      return fn.apply(context, args);
    }
  };
};