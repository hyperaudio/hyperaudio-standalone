# runHAPTour = (stepIndex) ->
#   tour = new Shepherd.Tour(defaults:
#     scrollTo: false
#     showCancelLink: true
#   )
#   tour.addStep "step0",
#     title: "Svoj Remix vrlo jednostavno možete napraviti samo u šest koraka."
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step1",
#     title: "Prvo, izaberite film ili pronađite određenu riječ."
#     attachTo: "#panel-media right"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step2",
#     title: "Kao drugi korak, pratite film, a tekst ispod će biti označavan."
#     attachTo: "#source-canvas bottom"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step3",
#     title: "Treće, kliknite na riječ koju želite i video će se nastaviti od tog dijela."
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step4",
#     title: "Zatim će te željeti napraviti svoj remix. Izaberite dio iz teksta i prenesite u drugi dio ekrana.  <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
#     attachTo: "#source-transcript top"
#     buttons: [
#       classes: "sec-button"
#       text: "Vrlo jednostavno!"
#       action: tour.next
#      ]
#   tour.addStep "step5",
#     title: "Ako se predomislite vratite ga nazad."
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step6",
#     title: "Peti korak Vam dopušta da dodate naslove i efekte. "
#     attachTo: "#effects top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step7",
#     title: "Odaberite drugi film i ponovite korake za novi tekst."
#     attachTo: "#panel-media right"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   tour.addStep "step8",
#     title: "Došli ste do šestog, posljednjeg koraka; podijelite Remix sa svojim prijateljima!"
#     attachTo: "#HAP-share-bttn top"
#     buttons: [
#       classes: "sec-button"
#       text: "OK"
#       action: tour.next
#      ]
#   if stepIndex is undefined
#     tour.addStep "step9",
#       title: "Vaš remix se automatski spašava. "
#       buttons: [
#         classes: "sec-button"
#         text: "ODLIČNO"
#         action: tour.cancel
#        ]
#   else
#     tour.addStep "step9",
#       title: "Vaš remix se automatski spašava. "
#       buttons: [
#         classes: "sec-button"
#         text: "ODLIČNO"
#         action: tour.next
#        ]
#   tour.addStep "step10",
#     title: "Ukoliko Vam upustvo sljedeći put zatreba, pronađite ga ovdje."
#     attachTo: '#HAP-helper left',
#     buttons: [
#       classes: "sec-button"
#       text: "Ok, hvala!"
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
