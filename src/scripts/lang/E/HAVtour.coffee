runHAVTour = ->
  tour = new Shepherd.Tour(defaults:
    scrollTo: false
    showCancelLink: true
  )
  tour.addStep "step0",
    title: "Watch the film, the transcript will highlight where you are in the video."
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "Show me how"
      action: tour.next
     ]
  tour.addStep "step1",
    title: "The film after buffering will stream here, please wait"
    attachTo: "#source-canvas bottom"
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step2",
    title: "Scroll to navigate the transcript, click on any word and the film will start from that word"
    attachTo: "#source-transcript top"
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step3",
    title: "Next time, if you are little confused, find the same tutorial here"
    attachTo: "#HAP-helper bottom"
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "Ok, thanks!"
      action: tour.next
     ]
  tour.start()
  createCookie("HAVtourStatus", "done", 30)

toggleHAVTour = () ->
  tourStatus  = getCookie("HAVtourStatus")
  unless tourStatus is "done"
    runHAVTour(0)

  HAPhelper = document.getElementById "HAP-helper"
  HAPhelper.addEventListener "click", (e) ->
    ShepherdCheck = Shepherd.activeTour
    if ShepherdCheck is null
      runHAVTour()
    else if ShepherdCheck is undefined
      runHAVTour()