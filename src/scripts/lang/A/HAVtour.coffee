# runHAVTour = ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "شاهد من الفلم، النص سيظلل بالتوازي"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "كيف؟"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "الفلم بعد التحميل سيبدأ هنا"
#     attachTo: "#source-canvas bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "ثم تصفح النص واختر أي كلمة، الفلم سيبدأ من هذه الكلمة "
#     attachTo: "#source-transcript top"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "في المرة القادمة، إن وجدت أي صعوبة، هنا تجد دليل الاستخدام "
#     attachTo: "#HAP-helper bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "شكرا!"
#       action: tour.next
#      ]
#   tour.start()
#   createCookie("HAVtourStatus", "done", 30)
#
# toggleHAVTour = () ->
#   tourStatus  = getCookie("HAVtourStatus")
#   unless tourStatus is "done"
#     runHAVTour(0)
#
#   HAPhelper = document.getElementById "HAP-helper"
#   HAPhelper.addEventListener "click", (e) ->
#     ShepherdCheck = Shepherd.activeTour
#     if ShepherdCheck is null
#       runHAVTour()
#     else if ShepherdCheck is undefined
#       runHAVTour()
