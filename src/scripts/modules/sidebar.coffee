# ========================================== #
# Sidebar
# ========================================== #

# Name Elements
# ------------------------------------------ #
@pageSide           = $("[class^=page-side--]")
@pageBody           = $(".page-body")
@pageFoot           = $(".page-footer")
@pageSideToggle     = $(".jsToggleSide")

# Define Magic
# ------------------------------------------ #
showSidebar         = (target, direction) ->
  @pageBody.addClass("moved--" + direction)
  $(target).removeClass "moved"

hideSidebar         = (target, direction) ->
  @pageBody.removeClass("moved--" + direction)
  $(target).addClass    "moved"

renderSidebar       = () ->
  $(@pageSide).each () ->
    @target         = $(this)
    @state          = $(@target).data("side-state")
    @direction      = $(@target).data("side-push")

    if @state is "active"
      showSidebar @target, @direction
    else
      hideSidebar @target, @direction
    # clipBody()

  states = []
  $(@pageSide).each ->
    @sideState = $(this).data("side-state")
    states.push(@sideState)
  if states.indexOf("active") is -1
    toggleOverlay("inactive")
  else
    toggleOverlay("active")

alterSidebarState   = (target) ->
  $(@pageSide).data     "side-state", "inactive"

  @targetSide       = $(".page-side--" + target)
  @state            = $(@targetSide).data "side-state"

  if @state is "active"
    $(@targetSide).data   "side-state", "inactive"
  else
    $(@targetSide).data   "side-state", "active"

  renderSidebar()

onSidebarToggle    = (target) ->
  alterSidebarState(target)

# Bind Clicks
# ------------------------------------------ #
@pageSideToggle.click( ->
  @target = $(this).data("side-target")
  onSidebarToggle(@target)
)