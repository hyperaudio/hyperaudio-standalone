# renderHead = () ->
#   pageHead      = document.getElementById "page-head"
#   unless pageHead is null
#     pageHeadState = pageHead.getAttribute "data-head-state"
#     if pageHeadState is "altered"
#       addClass(pageHead, "page-head--altered")
#     else
#       removeClass(pageHead, "page-head--altered")
#
# toggleHead = ->
#   pageHead        = document.getElementById "page-head"
#   unless pageHead is null
#     pageHeadPersist = pageHead.getAttribute "data-head-state-persist"
#     unless pageHeadPersist is "true"
#       if window.pageYOffset > 30
#         pageHead.setAttribute "data-head-state", "altered"
#       else
#         pageHead.setAttribute "data-head-state", ""
#       renderHead()
