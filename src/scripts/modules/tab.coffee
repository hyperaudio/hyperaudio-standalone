# ========================================== #
# Tabs
# ========================================== #

# # Name Elements
# # ------------------------------------------ #
# @tabs             = $(".tabs")
# @tabs__list       = $(".tabs__list")
# @tab              = $(".tab")
# @tabLink          = $(".tab__link")
# @windowWidth      = $(window).width()
# @tabContent       = $(".tab-content")

# # Define Magic
# # ------------------------------------------ #

# calcDim         = (els) ->
#   val = 0
#   $(els).each ->
#     val += $(this).width()
#   return val

# alterTabState     = (i) ->
#   $(@tab).removeClass("active")
#   $(@tabs__list).find(".tab:nth(" + i + ")").addClass("active")

# alterTabPosition  = (i) ->
#   @tabs__listWidth        = calcDim(@tab)

#   if @tabs__listWidth > @windowWidth
#     @this           = $(@tabs__list).find(".tab:nth(" + i + ")")
#     @prev           = $(@tabs__list).find(".tab:nth(" + i + ")").prevAll()
#     @thisDim        = $(@this).width()
#     @prevDim        = calcDim(@prev)
#     @offset         = (@windowWidth / 2) - (@thisDim / 2) - @prevDim

#     $(@tabs__list).css("left", @offset)

#   else
#     $(@tabs__list).addClass "align-center"

# toggleTabContent  = (i) ->
#   hiddenTabs      = $(".tab-content:not(.tab-content--" + (i + 1)  + ")")
#   $(@tabContent).removeClass("active inactive")
#   $(hiddenTabs).addClass("inactive")
#   $(".tab-content--" + (i + 1)).addClass("active")

# renderTabs        = () ->
#   @i              = $(@tabs__list).data("tab")
#   alterTabState(@i)
#   alterTabPosition(@i)
#   toggleTabContent(@i)

# onTabToggle       = (e) ->
#   @i = $(e).parent().index()      # get this tab index
#   $(@tabs__list).data("tab", @i)        # set active tab data to this tab index
#   renderTabs()                    # render

# # Bind Clicks
# # ------------------------------------------ #
# @tabLink.click( ->
#   e = $(this)
#   onTabToggle(e)
# )

# renderTabs()