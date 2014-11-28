runHAPTour = (stepIndex) ->
  tour = new Shepherd.Tour(defaults:
    scrollTo: false
    showCancelLink: true
  )
  tour.addStep "step0",
    title: "Remiks altı adımda kolayca oluşturulabilir."
    buttons: [
      classes: "sec-button"
      text: "Show me how"
      action: tour.next
     ]
  tour.addStep "step1",
    title: "İlk olarak filmi seçin veya belirlediğiniz kelimeyi arayın."
    attachTo: "#panel-media right"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step2",
    title: "İkinci adımda filmi izlemeye başlayın, film ilerledikçe metinde de vurgulanmaya devam ettiğini göreceksiniz."
    attachTo: "#source-canvas bottom"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step3",
    title: "Üçüncü adım olarak metinde istediğiniz bir kelimeye tıklayın, film o bölümden devam edecektir."
    attachTo: "#source-transcript top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step4",
    title: "Dördüncü adımda remiks yapmak istediğiniz bölümü bulduğunuzda sadece yandaki pencereye sürükleyin ve bırakın. <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
    attachTo: "#source-transcript top"
    buttons: [
      classes: "sec-button"
      text: "Kolay!"
      action: tour.next
     ]
  tour.addStep "step5",
    title: "Fikrinizi değiştirirseniz aldığınız bölümü filmin metnine geri koyun."
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step6",
    title: "Beşinci adım başlık ve efekt ekleme olanağı sunuyor."
    attachTo: "#effects top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step7",
    title: "Başka bir film seçin ve yeni metinle aynı adımları tekrarlayın."
    attachTo: "#panel-media right"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step8",
    title: "Ve son adım; Remiksinizi arkadaşlarınızla paylaşın!"
    attachTo: "#HAP-share-bttn top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  if stepIndex is undefined
    tour.addStep "step9",
      title: "Remiksiniz otomatik olarak kaydediliyor."
      buttons: [
        classes: "sec-button"
        text: "HARİKA"
        action: tour.cancel
       ]
  else
    tour.addStep "step9",
      title: "Remiksiniz otomatik olarak kaydediliyor."
      buttons: [
        classes: "sec-button"
        text: "HARİKA"
        action: tour.next
       ]
  tour.addStep "step10",
    title: "Bir sonraki seferde zorluk yaşarsanız kullanım videosunu burada bulabilirsiniz."
    attachTo: '#HAP-helper left',
    buttons: [
      classes: "sec-button"
      text: "Ok, teşekkürler!"
      action: tour.cancel
     ]
  if stepIndex is undefined
    tour.start()
  else
    tour.start()
    tour.show("step" + stepIndex)
  createCookie("HAPtourStatus", "done", 30)

toggleHAPTour = () ->
  tourStatus  = getCookie("HAPtourStatus")
  unless tourStatus is "done"
    runHAPTour(0)

  HAPhelper = document.getElementById "HAP-helper"
  HAPhelper.addEventListener "click", (e) ->
    ShepherdCheck = Shepherd.activeTour
    if ShepherdCheck is null
      runHAPTour()
    else if ShepherdCheck is undefined
      runHAPTour()