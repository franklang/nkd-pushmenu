;(function ($, window, undefined){

  var nkdPushMenuSharedVars = {};
    nkdPushMenuSharedVars.$previous = $('.js-nkd-previous');
    nkdPushMenuSharedVars.$currentPosition = $('.js-nkd-current-position');
    nkdPushMenuSharedVars.$currentPositionInitialText = nkdPushMenuSharedVars.$currentPosition.text();
    nkdPushMenuSharedVars.commonNkdReset = $.fn.nkdReset;

  // Reset DOM to its initial state
  $.fn.nkdReset = function(){
    var ret = nkdPushMenuSharedVars.commonNkdReset.apply(this, arguments);

    $(this).find('.nkd-hidden').each(function(){
      $(this).removeClass('nkd-hidden');
    });
    // $(this).find('.js-nkd-previous').text(nkdPushMenuSharedVars.$currentPositionInitialText); 
    $(this).find('.js-nkd-previous').text('toto'); 

    return ret;
  }

  $.fn.nkdPushMenu = function(){
    function onLinkClick(){
      // Get current nav level of clicked link
      var getLinkNavLevel = $(this)
        .closest('.js-nkd-level')
        .attr('data-level');

      // Get clicked link sublevel state (open/closed)
      var getSubLevelState = $(this)
        .parent('.js-nkd-item')
        .attr('data-state');

      // Close children sublevels
      var closeChildren = $(this)
        .parent('.js-nkd-item')
        .find('[data-state="open"]')
        .each(function(){
          $(this)
            .attr('data-state', 'closed');
        });

      // Get current level
      var getCurrentLevelValue = $(this)
        .parent('.js-nkd-item')
        .children('.js-nkd-level')
        .attr('data-level');

      if (getSubLevelState == 'closed'){
        nkd.setSubLevelState($(this),'open');

        $(this)
          .parent('.js-nkd-item')
          .siblings()
          .addClass('nkd-hidden');

        nkdPushMenuSharedVars.$previous
          .attr('data-current-level', + getCurrentLevelValue);
      }
    }

    function onPreviousLinkClick(){
      // Last opened
      $('[data-state="open"]:last')
        .attr('data-state', 'closed');

      // Update data-current-level value
      var updateCurrentLevelValue =
        $('[data-state="closed"]:first')
          .closest('ul.js-nkd-level')
          .attr('data-level');

      nkdPushMenuSharedVars.$previous.attr('data-current-level', updateCurrentLevelValue);

      // Show previously hidden items again
      $('[data-level="' + updateCurrentLevelValue + '"')
        .children('.js-nkd-item')
        .siblings()
        .removeClass('nkd-hidden');
    }

    function showCurrentLevelLabel(){
      var getCurrentLevelLabel =
        $('[data-state="open"]:last')
          .children('.js-nkd-link')
          .text();

      nkdPushMenuSharedVars.$currentPosition.empty().text(getCurrentLevelLabel);

      if (nkdPushMenuSharedVars.$currentPosition.text().length == 0){
        nkdPushMenuSharedVars.$currentPosition.text(nkdPushMenuSharedVars.$currentPositionInitialText);
      }
    }

    function showPreviousLevelLabel(){
      var getPreviousLevelLabel =
        $('[data-state="open"]:last')
          .parent('.js-nkd-level')
          .prev('.js-nkd-link')
          .text();

      nkdPushMenuSharedVars.$previous.empty().text(getPreviousLevelLabel);

      if (nkdPushMenuSharedVars.$previous.text().length == 0){
        nkdPushMenuSharedVars.$previous.text(nkdPushMenuSharedVars.$currentPositionInitialText);
      }
    }

    function showCurrentAndPreviousLevelsLabels(){
      showCurrentLevelLabel();
      showPreviousLevelLabel();
    }

    $('.js-nkd-link').on('click', onLinkClick);
    nkdPushMenuSharedVars.$previous.on('click', onPreviousLinkClick);
    $('.js-nkd-link, .js-nkd-previous').on('click', showCurrentAndPreviousLevelsLabels);
  };
}(jQuery, window));
