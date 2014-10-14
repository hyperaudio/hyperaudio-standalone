toolbarExt          = document.getElementsByClassName "toolbar__extension"
toolbarExtToggle    = document.getElementsByClassName "toggleToolbarExt"

# Define Magic
# ------------------------------------------ #
# showExtension       = () ->
#   $(@toolbarExt).addClass "toolbar__extension--active"
#   $(@toolbarExt).removeClass "toolbar__extension--inactive"

# hideExtension       = () ->
#   $(@toolbarExt).addClass "toolbar__extension--inactive"
#   $(@toolbarExt).removeClass "toolbar__extension--active"

# renderToolbar       = () ->
#   @state            = $(@toolbarExt).data("toolbarext-state")
#   if @state is "active"
#     showExtension()
#   else
#     hideExtension()

# alterExtensionState = () ->
#   @state       = $(@toolbarExt).data "toolbarext-state"
#   if @state is "active"
#     $(@toolbarExt).data "toolbarext-state", "inactive"
#   else
#     $(@toolbarExt).data "toolbarext-state", "active"
#   renderToolbar()

onExtensionToggle    = () ->
  console.log("stop here")
  # alterExtensionState()

# Bind Clicks

addEvent window, "load", ->
  i = 0
  toolbarExtToggle = document.getElementsByClassName "toggleToolbarExt"
  l = toolbarExtToggle.length
  while i < l
    addEvent toolbarExtToggle[i], "click", (e) ->
      thisToggle    = e.currentTarget
      onExtensionToggle()
      e.returnValue = false
      e.preventDefault() if e.preventDefault
      false
    ++i