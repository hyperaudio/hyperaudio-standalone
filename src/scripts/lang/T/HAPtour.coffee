runHAPTour = (stepIndex) ->
  tour = new Shepherd.Tour(defaults:
    scrollTo: false
    showCancelLink: true
  )
  tour.addStep "step0",
    title: "Watch, drag, trim and share! Create your own Palestine story right here!"
    buttons: [
      classes: "sec-button"
      text: "Show me how"
      action: tour.next
     ]
  tour.addStep "step1",
    title: "Pick a film from the column on the left."
    attachTo: "#panel-media right"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step2",
    title: "The selected film will appear here."
    attachTo: "#source-canvas bottom"
    buttons: [
      classes: "sec-button"
      text: "OK"
      action: tour.next
     ]
  tour.addStep "step3",
    title: "Here you will find the transcript of the film. Click on any word and the video will play from there."
    attachTo: "#source-transcript top"
    buttons: [
      classes: "sec-button"
      text: "Awesome! Tell me more"
      action: tour.next
     ]
  tour.addStep "step4",
    title: "Select any text you want and drag it here! <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
    attachTo: "#output-transcript top"
    buttons: [
      classes: "sec-button"
      text: "Wow that was easy! Now what?"
      action: tour.next
     ]
  tour.addStep "step5",
    title: "Want to make your Remix fancy? Add effects and titles by dragging them from here."
    attachTo: "#effects top"
    buttons: [
      classes: "sec-button"
      text: "Cool!"
      action: tour.next
     ]
  tour.addStep "step6",
    title: "Your Remix is automatically saved and will appear here. You can play and edit it anytime."
    attachTo: "#output-canvas bottom"
    buttons: [
      classes: "sec-button"
      text: "What’s next?"
      action: tour.next
     ]
  unless stepIndex is undefined
    tour.addStep "step7",
      title: "Your story is now ready for you to share with all your friends"
      attachTo: '#HAP-share-bttn top',
      buttons: [
        classes: "sec-button"
        text: "Great!"
        action: tour.cancel
       ]
  else
    tour.addStep "step7",
      title: "Your story is now ready for you to share with all your friends"
      attachTo: '#HAP-share-bttn top',
      buttons: [
        classes: "sec-button"
        text: "Great!"
        action: tour.next
       ]
  tour.addStep "step8",
    title: "I will be right here if you need me!"
    attachTo: '#HAP-helper bottom',
    buttons: [
      classes: "sec-button"
      text: "Got it!"
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
      runHAPTour("1")
    else if ShepherdCheck is undefined
      runHAPTour("1")