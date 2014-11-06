toggleHAPTour = (stepIndex) ->

  tourStatus  = getCookie("HAPtourStatus")
  unless tourStatus is "done"
    tour = new Shepherd.Tour(defaults:
      scrollTo: false
      showCancelLink: true
    )
    tour.addStep "step0",
      title: "Tell your Palestine Story with our films. Create a Remix of video clips that matter to you."
      # attachTo: '#panel-media bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Show me how"
        action: tour.next
       ]

    tour.addStep "step1",
      title: "Pick a film or search for a topic (like “children” or “Haifa”) in all of the films."
      attachTo: "#panel-media right"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step2",
      title: "Once you’ve chosen material for your remix, that film will show here."
      attachTo: "#source-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step3",
      title: "Here you’ll find the whole transcript of the film. You can click on words and select them. Try it, it’s fun."
      attachTo: "#source-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "In a minute, I want to learn more"
        action: tour.next
       ]

    tour.addStep "step4",
      title: "Great! This is where you create your Remix, you simply select and drag text from the other side to here. <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
      attachTo: "#output-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step5",
      title: "You can also add effects and titles to your Remix, by dragging them from here."
      attachTo: "#effects top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step6",
      title: "Your Remix is automatically saved and will appear here as you’re making it, you can play it anytime."
      attachTo: "#output-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    unless stepIndex is undefined
      tour.addStep "step7",
        title: "When you’re done telling your story, share it with your close ones."
        attachTo: '#save-button top',
        classes: "example-step-extra-class"
        buttons: [
          classes: "sec-button"
          text: "Great"
          action: tour.cancel
         ]
    else
      tour.addStep "step7",
        title: "When you’re done telling your story, share it with your close ones."
        attachTo: '#save-button top',
        classes: "example-step-extra-class"
        buttons: [
          classes: "sec-button"
          text: "Great"
          action: tour.next
         ]

    tour.addStep "step8",
      title: "I’ll be here if you need me."
      attachTo: '#HAP-helper bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Thanks!"
        action: tour.cancel
       ]

    unless stepIndex is undefined
      # console.log(step)
      tour.start()
      tour.show("step" + stepIndex)
    else
      tour.start()

    # createCookie("HAPtourStatus", "done", 30)

# Bind clicks
HAPhelper = document.getElementById "HAP-helper"
HAPhelper.addEventListener "click", (e) ->
  createCookie("HAPtourStatus", "", 30)
  toggleHAPTour("1")