# ========================================== #
# Modal
# ========================================== #

# Name Elements
# ------------------------------------------ #
@modalToggle        = $("[data-modal-toggle]")
@modals             = $(".modal")

# Define Magic
# ------------------------------------------ #
showModal                   = (targetModal) ->
  @targetModal              = targetModal
  $(@targetModal).addClass "active"

hideModal                   = (targetModal) ->
  @targetModal              = targetModal
  $(@targetModal).removeClass "active"

renderModal                 = (targetModal) ->
  @targetModal              = targetModal
  @state                    = $(@targetModal).data "modal-state"
  if @state is "active"
    showModal @targetModal
  else
    hideModal @targetModal
  clipBody()

alterModalState             = (targetModal) ->
  @targetModal              = targetModal

  @state                    = $(@targetModal).data "modal-state"
  if @state is "active"
    $(@targetModal).data      "modal-state", "inactive"
  else
    $(@targetModal).data      "modal-state", "active"

  $(@targetModal).addClass    "animated"
  $(@targetModal).addClass    "animated"
  $(@targetModal).addClass    "animated"

onModalToggle               = (target) ->
  @targetModal              = $("[data-modal="+ target + "]")
  alterModalState             @targetModal
  renderModal                 @targetModal

# Bind Clicks
# ------------------------------------------ #
@modalToggle.click( ->
  @toggle                   = $(this)
  @target                   = $(@toggle).data("modal-toggle")
  onModalToggle                 @target
)

$(@modals).each( ->
  renderModal($(this))
)