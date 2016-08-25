let setSharePath = function() {
  let thisPageURL = window.top.location.href;
  let shareLinks  = document.querySelectorAll(".jsSetSharePath");
  return [].forEach.call(shareLinks, function(shareLink) {
    let shareLinkHref   = shareLink.getAttribute("href");
    let shareLinkNuHref = shareLinkHref.replace("UURRLL", encodeURIComponent(thisPageURL));
    return shareLink.setAttribute("href", shareLinkNuHref);
  }
  );
};