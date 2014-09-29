# ========================================== #
# Menu
# ========================================== #

# Name Elements
# ------------------------------------------ #

@menu               = $(".menu")
@menuRoot           = $(".menu__list--lvl-0")
@menuToggle         = $(".jsToggleMenuPane")

# Define Magic
# ------------------------------------------ #

renderMenuPane      = (dir, id) ->
  @targetMenuPane   = $(@menu).data("active-pane")
  if dir is "drillup"
    $(".menu__pane--lvl-0").removeClass("moved--left")
    $(".menu__pane--lvl-1").addClass("moved--right")
  else if dir is "drilldown"
    $(".menu__pane--lvl-0").addClass("moved--left")
    $(".menu__pane--" + id).removeClass("moved--right")

alterMenuPaneState    = (lvl, id) ->
  @currentMenuPane    = $(@menu).data("active-pane")
  @targetMenuPaneLvl  = lvl

  if @currentMenuPane == @targetMenuPaneLvl
  else if @currentMenuPane > @targetMenuPaneLvl
    $(@menu).data "active-pane", @targetMenuPaneLvl
    renderMenuPane "drillup", id
  else if @currentMenuPane < @targetMenuPaneLvl
    $(@menu).data "active-pane", @targetMenuPaneLvl
    renderMenuPane "drilldown", id

onMenuPaneToggle    = (lvl, id) ->
  alterMenuPaneState(lvl, id)

# Bind Clicks
# ------------------------------------------ #
@menuToggle.click( ->
  @targetPanelLvl   = $(this).data("menu-pane-target")
  @targetPaneId     = $(this).data("menu-pane-target-id")
  onMenuPaneToggle(@targetPanelLvl, @targetPaneId)
)