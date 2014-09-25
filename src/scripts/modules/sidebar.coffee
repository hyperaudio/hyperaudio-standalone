# ========================================== #
# Sidebar
# ========================================== #

# Name Elements
# ------------------------------------------ #
@pageSide           = $("[class^=page-side--]")
@pageBody           = $(".page-body")
@pageFoot           = $(".page-footer")
@pageOver           = $(".page-overlay")
@pageSideToggle     = $(".jsToggleSide")

# Define Magic
# ------------------------------------------ #
showSidebar         = (target, direction) ->
  @pageBody.addClass("moved--" + direction)
  @pageOver.removeClass "hide"
  @pageOver.addClass    "show"
  $(target).removeClass "moved"

hideSidebar         = (target, direction) ->
  @pageBody.removeClass("moved--" + direction)
  @pageOver.removeClass "show"
  @pageOver.addClass    "hide"
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

alterSidebarState   = (target) ->
  $(@pageOver).addClass "animated"
  $(@pageBody).addClass "animated"
  $(@pageSide).addClass "animated"
  $(@pageSide).data     "side-state", "inactive"

  # if this has target
    # @targetSide       = $(@pageSide)
  #else
    # @targetSide       = $(".page-side--" + target)

  @targetSide       = $(".page-side--" + target)
  @state            = $(@targetSide).data "side-state"

  if @state is "active"
    $(@targetSide).data   "side-state", "inactive"
  else
    $(@targetSide).data   "side-state", "active"

onSidebarToggle    = (target) ->
  alterSidebarState(target)
  renderSidebar()

# Bind Clicks
# ------------------------------------------ #
@pageSideToggle.click( ->
  @target = $(this).data("side-target")
  onSidebarToggle(@target)
)

renderSidebar()