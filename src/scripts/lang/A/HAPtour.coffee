# runHAPTour = (stepIndex) ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "تستطيع إنجاز الريمكس بسهولة في ست خطوات. الخطوة الأولى، اختر الفيلم أو ابحث عن كلمة"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "ثانيا، شاهد الفلم، النص سيظلل بالتوازي"
#     attachTo: "#source-canvas bottom"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "ثالثا، اضغط على أي كلمة في النص وستذهب لمكان الفيديو مباشرة"
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step4",
#     title: "ثم رابعا، عندما تجد النص الذي تريد أن تبدأ منه الريمكس، ظلل عليه، واسحبه وضعه في النافذة المقابلة <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step5",
#     title: "إن غيرت رأيك في مقطع الريمكس، تستطيع إعادته للنافذة الأولى في أي مكان"
#     buttons: [
#       classes: "sec-button"
#       text: "سهل!"
#       action: tour.next
#      ]
#   tour.addStep "step6",
#     title: "خامسا، تستطيع إضافة عناوين أو مؤثرات عبر السحب إلى المكان الذي تريد"
#     attachTo: "#effects top"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step7",
#     title: "اختر فلما آخر واختر مقطعا جديدا"
#     attachTo: "#panel-media right"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   tour.addStep "step8",
#     title: "والآن تصل للخطوة السادسة والأخيرة، شارك الرابط مع أصدقائك"
#     attachTo: "#HAP-share-bttn top"
#     buttons: [
#       classes: "sec-button"
#       text: "موافق"
#       action: tour.next
#      ]
#   if stepIndex is undefined
#     tour.addStep "step9",
#       title: "الريمكس يتم حفظه تلقائيا "
#       buttons: [
#         classes: "sec-button"
#         text: "ممتاز"
#         action: tour.cancel
#        ]
#   else
#     tour.addStep "step9",
#       title: "الريمكس يتم حفظه تلقائيا "
#       buttons: [
#         classes: "sec-button"
#         text: "ممتاز"
#         action: tour.next
#        ]
#   tour.addStep "step10",
#     title: "في المرة القادمة، إن وجدت أي صعوبة، هنا تجد دليل الاستخدام "
#     attachTo: '#HAP-helper left',
#     buttons: [
#       classes: "sec-button"
#       text: "شكرا!"
#       action: tour.cancel
#      ]
#   if stepIndex is undefined
#     tour.start()
#   else
#     tour.start()
#     tour.show("step" + stepIndex)
#   createCookie("HAPtourStatus", "done", 30)
#
# toggleHAPTour = () ->
#   tourStatus  = getCookie("HAPtourStatus")
#   unless tourStatus is "done"
#     runHAPTour(0)
#
#   HAPhelper = document.getElementById "HAP-helper"
#   HAPhelper.addEventListener "click", (e) ->
#     ShepherdCheck = Shepherd.activeTour
#     if ShepherdCheck is null
#       runHAPTour()
#     else if ShepherdCheck is undefined
#       runHAPTour()
