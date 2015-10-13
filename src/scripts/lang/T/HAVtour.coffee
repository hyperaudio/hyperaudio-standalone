# runHAVTour = ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "Filmi izleyin, videoda ilerlediğiniz şekilde metin de işaretlenecektir."
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Nasıl yapılacağını göster"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "Film yüklendikten sonra burada görünecektir, bekleyin."
#     attachTo: "#source-canvas bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "Metni görmek için imleci aşağıya doğru sürükleyin. Herhangi bir kelimeye tıklayın ve film oradan itibaren ilerleyecektir."
#     attachTo: "#source-transcript top"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "Bir sonraki seferde zorluk yaşarsanız kullanım videosunu burada bulabilirsiniz."
#     attachTo: "#HAP-helper bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Ok, teşekkürler!"
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
