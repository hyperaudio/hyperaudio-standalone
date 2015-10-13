# runHAVTour = ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "Pratite film, tekst će biti podvlačen kako se video nastavlja."
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Pokaži mi kako ću se napraviti"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "Film će ovdje biti prikazan, čekajte."
#     attachTo: "#source-canvas bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "Kako bi vidjeli cijeli tekst pokrenite kursor na dole. Kliknite na bilo koju riječ i video će se nastaviti od tog dijela."
#     attachTo: "#source-transcript top"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "Ukoliko Vam upustvo sljedeći put zatreba, pronađite ga ovdje."
#     attachTo: "#HAP-helper bottom"
#     classes: "example-step-extra-class"
#     buttons: [
#       classes: "sec-button"
#       text: "Ok, hvala!"
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
