# ========================================== #
# Toolbar
# ========================================== #

# Name Elements
# ------------------------------------------ #
@toolbarExt         = $(".toolbar__extension")
@toolbarExtToggle   = $(".jsToggleToolbarExt")

# Define Magic
# ------------------------------------------ #
showExtension       = () ->
  $(@toolbarExt).addClass "toolbar__extension--active"
  $(@toolbarExt).removeClass "toolbar__extension--inactive"

hideExtension       = () ->
  $(@toolbarExt).addClass "toolbar__extension--inactive"
  $(@toolbarExt).removeClass "toolbar__extension--active"

renderToolbar       = () ->
  @state            = $(@toolbarExt).data("toolbarext-state")
  if @state is "active"
    showExtension()
  else
    hideExtension()

alterExtensionState = () ->
  @state       = $(@toolbarExt).data "toolbarext-state"
  if @state is "active"
    $(@toolbarExt).data "toolbarext-state", "inactive"
  else
    $(@toolbarExt).data "toolbarext-state", "active"
  renderToolbar()

onExtensionToggle    = (target) ->
  alterExtensionState(target)

# Bind Clicks
# ------------------------------------------ #
@toolbarExtToggle.click( ->
  onExtensionToggle()
)