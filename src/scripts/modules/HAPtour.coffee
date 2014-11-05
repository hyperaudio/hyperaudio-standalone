toggleHAPTour = ->

  tourStatus  = getCookie("HAPtourStatus")

  unless tourStatus is "done"

    tour = new Shepherd.Tour(defaults:
      scrollTo: false
      showCancelLink: true
    )
    tour.addStep "step0",
      title: "Welcome to your Palestine Remix creator. Get to know our console and start remixing in seconds."
      # text: ""
      # attachTo: '#panel-media bottom',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Show me around"
        action: tour.next
       ]

    tour.addStep "step1",
      text: "A tip about the media index lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#panel-media right"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step2",
      text: "A tip about the source lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#source-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step3",
      text: "A tip about the output lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#source-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step4",
      text: "A tip about the transcript lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#output-canvas bottom"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step5",
      text: "A tip about the transcript lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#output-transcript top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step6",
      text: "A tip about the effects lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: "#effects top"
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "Next tip"
        action: tour.next
       ]

    tour.addStep "step7",
      text: "A tip about saving and publishing lorem ipsum Magna sed reprehenderit magna irure esse et fugiat do enim qui nisi nostrud veniam do in laborum et ex sint culpa officia veniam ut laborum labore ullamco eu sit fugiat nulla sed pariatur."
      # text: "Content of the tip"
      attachTo: '#save-button top',
      classes: "example-step-extra-class"
      buttons: [
        classes: "sec-button"
        text: "All clear, thanks!"
        action: tour.cancel
       ]

    tour.start()

    # createCookie("HAPtourStatus", "done", 30)