toggleHAPTour = ->

  tourStatus  = getCookie("HAPtourStatus")

  unless tourStatus is "done"

    tour = new Shepherd.Tour(defaults:
      scrollTo: false
      showCancelLink: true
    )
    tour.addStep "step0",
      title: "Tell your Palestine Story with our films. Create a Remix of video clips that matter to you."
      # text: ""
      # attachTo: '#panel-media bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Show me how"
        action: tour.next
       ]

    tour.addStep "step1",
      text: "Pick a film or search for a topic (like “children” or “Haifa”) in all of the films."
      # text: "Content of the tip"
      attachTo: "#panel-media right"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step2",
      text: "Once you’ve chosen material for your remix, that film will show here."
      # text: "Content of the tip"
      attachTo: "#source-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step3",
      text: "Here you’ll find the whole transcript of the film. You can click on words and select them. Try it, it’s fun."
      # text: "Content of the tip"
      attachTo: "#source-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "In a minute, I want to learn more"
        action: tour.next
       ]

    tour.addStep "step4",
      text: "Great! This is where you create your Remix, you simply select and drag text from the other side to here. <img src='../../assets/images/hap/tour-dragdrop.gif'/>"
      # text: "Content of the tip"
      attachTo: "#output-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step5",
      text: "You can also add effects and titles to your Remix, by dragging them from here."
      # text: "Content of the tip"
      attachTo: "#effects top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step6",
      text: "Your Remix is automatically saved and will appear here as you’re making it, you can play it anytime."
      # text: "Content of the tip"
      attachTo: "#output-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "OK"
        action: tour.next
       ]

    tour.addStep "step7",
      text: "When you’re done telling your story, share it with your close ones."
      # text: "Content of the tip"
      attachTo: '#save-button top',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Great"
        action: tour.cancel
       ]

    tour.addStep "step8",
      text: "I’ll be here if you need me."
      # text: "Content of the tip"
      attachTo: '#HAP-helper bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Thanks!"
        action: tour.cancel
       ]

    tour.start()

    # createCookie("HAPtourStatus", "done", 30)