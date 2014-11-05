toggleHAVTour = ->

  tourStatus  = getCookie("HAVtourStatus")

  unless tourStatus is "done"

    tour = new Shepherd.Tour(defaults:
      scrollTo: false
      showCancelLink: true
    )
    tour.addStep "step0",
      title: "You’re about to watch a full film which comes with some neat features"
      # text: ""
      # attachTo: '#panel-media bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Sweet, show me around"
        action: tour.next
       ]

    tour.addStep "step1",
      text: "The film will show up here once the buffering has started. As it’s a long film, it might take a while depending on your internet connection."
      # text: "Content of the tip"
      attachTo: "#source-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Nice!"
        action: tour.next
       ]

    tour.addStep "step2",
      text: "Here you’ll find a full transcript of the film that you can navigate with by scrolling. You can also jump to that moment in the video by tapping on a word. Try it, it’s fun."
      # text: "Content of the tip"
      attachTo: "#source-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Ok, thanks!"
        action: tour.next
       ]

    tour.start()

    # createCookie("HAVtourStatus", "done", 30)