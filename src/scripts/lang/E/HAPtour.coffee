runHAPTour = (stepIndex) ->
  tour = new Shepherd.Tour(defaults:
    scrollTo: false
    showCancelLink: true
  )
  tour.addStep "step0",
    title: "Making a Remix can easily be done in minutes in six steps."
    buttons: [
      classes: "sec-button"
      text: "Show me how"
      action: tour.next
     ]
  tour.addStep "step1",
    title: "First, pick a film or search for a word."
    attachTo: "#panel-media right"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step2",
    title: "Second, watch the film, the transcript will be highlighted along with the video."
    attachTo: "#source-canvas bottom"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step3",
    title: "Third, click on any word in the transcript and you will go to that point in the video"
    attachTo: "#source-transcript top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step4",
    title: "Then fourth, once you find the text you would like to remix, just select, drag and drop to the other screen <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
    attachTo: "#source-transcript top"
    buttons: [
      classes: "sec-button"
      text: "Easy!"
      action: tour.next
     ]
  tour.addStep "step5",
    title: "If you changed your mind, drag it back."
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step6",
    title: "Fifth, you can add by dragging titles and effects"
    attachTo: "#effects top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step7",
    title: "Pick another film and repeat the selection of a new text"
    attachTo: "#panel-media right"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step8",
    title: "Now, it is the sixth step and the last, share with your friends. "
    attachTo: "#HAP-share-bttn top"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  if stepIndex is undefined
    tour.addStep "step9",
      title: "Your remix is automatically saved."
      buttons: [
        classes: "sec-button"
        text: "Great"
        action: tour.cancel
       ]
  else
    tour.addStep "step9",
      title: "Your remix is automatically saved."
      buttons: [
        classes: "sec-button"
        text: "Great"
        action: tour.next
       ]
  tour.addStep "step10",
    title: "Next time, if you are little confused, find the same tutorial here"
    attachTo: '#HAP-helper left',
    buttons: [
      classes: "sec-button"
      text: "Ok, thanks!"
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