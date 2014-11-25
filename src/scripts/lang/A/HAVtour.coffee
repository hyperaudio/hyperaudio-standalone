runHAVTour = ->
  tour = new Shepherd.Tour(defaults:
    scrollTo: false
    showCancelLink: true
  )
  tour.addStep "step0",
    title: "Watch the full documentary right here. You can view and read the transcript."
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "Show me how"
      action: tour.next
     ]
  tour.addStep "step1",
    title: "The film after buffering will stream here"
    attachTo: "#source-canvas bottom"
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step2",
    title: "Want to move forward quickly in the film? Scroll to navigate, click on any word from where you want the film to start. Try it, it’s fun!"
    attachTo: "#source-transcript top"
    classes: "example-step-extra-class"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step3",
    title: "I am right here, if you need me"
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