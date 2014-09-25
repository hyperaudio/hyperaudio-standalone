# ========================================== #
# Sidebar
# ========================================== #

# Name Elements
# ------------------------------------------ #
@pageSide           = $(".page-sidebar")
@pageBody           = $(".page-body")
@pageFoot           = $(".page-footer")
@pageOver           = $(".page-overlay")
@pageSideToggle     = $("[data-toggle-sidebar]")

# Define Magic
# ------------------------------------------ #
showSidebar         = () ->
  @pageOver.removeClass "hide"
  @pageSide.removeClass "moved"
  @pageBody.addClass    "moved"
  @pageFoot.addClass    "moved"
  @pageOver.addClass    "show"

hideSidebar         = () ->
  @pageBody.removeClass "moved"
  @pageFoot.removeClass "moved"
  @pageOver.removeClass "show"
  @pageSide.addClass    "moved"
  @pageOver.addClass    "hide"

renderSidebar       = () ->
  @state            = $(@pageSide).data "side-state"
  if @state is "active"
    showSidebar()
  else
    hideSidebar()
  clipBody()

alterSidebarState   = () ->
  $(@pageOver).addClass "animated"
  $(@pageBody).addClass "animated"
  $(@pageFoot).addClass "animated"
  $(@pageSide).addClass "animated"

  @state            = $(@pageSide).data "side-state"
  if @state is "active"
    $(@pageSide).data   "side-state", "inactive"
  else
    $(@pageSide).data   "side-state", "active"

onSidebarToggle    = () ->
  alterSidebarState()
  renderSidebar()

# Bind Clicks
# ------------------------------------------ #
@pageSideToggle.click( ->
  onSidebarToggle()
)

renderSidebar()