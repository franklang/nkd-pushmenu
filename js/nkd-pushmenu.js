;(function ($, window, undefined){
  $.fn.nkdPushMenu = function(){
    var $previous = $('.js-nkd-previous');
    var $currentPosition = $('.js-nkd-current-position');
    var $currentPositionInitialText = $currentPosition.text();

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

        $previous
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

      $previous.attr('data-current-level', updateCurrentLevelValue);

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

      $currentPosition.empty().text(getCurrentLevelLabel);

      if ($currentPosition.text().length == 0){
        $currentPosition.text($currentPositionInitialText);
      }
    }

    function showPreviousLevelLabel(){
      var getPreviousLevelLabel =
        $('[data-state="open"]:last')
          .parent('.js-nkd-level')
          .prev('.js-nkd-link')
          .text();

      $previous.empty().text(getPreviousLevelLabel);

      if ($previous.text().length == 0){
        $previous.text($currentPositionInitialText);
      }
    }

    function showCurrentAndPreviousLevelsLabels(){
      showCurrentLevelLabel();
      showPreviousLevelLabel();
    }

    $('.js-nkd-link').on('click', onLinkClick);
    $previous.on('click', onPreviousLinkClick);
    $('.js-nkd-link, .js-nkd-previous').on('click', showCurrentAndPreviousLevelsLabels);
  };
}(jQuery, window));
