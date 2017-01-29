$(document).ready(function(){
    var $previous = $('a.js-nkd-previous');
    var $current = $('.js-nkd-current-position');

    // Set clicked link sublevel state (open/closed)
    function setSubLevelState(element,state){
        element
            .parent('li.js-nkd-item')
            .attr('data-state', state);
    }

    function onLinkClick(){
        // Get current nav level of clicked link
        var getLinkNavLevel = $(this)
                                .closest('ul.js-nkd-level')
                                .attr('data-level');

        // Get clicked link sublevel state (open/closed)
        var getSubLevelState = $(this)
                                .parent('li.js-nkd-item')
                                .attr('data-state');

        // Close children sublevels
        var closeChildren = $(this)
                                .parent('li.js-nkd-item')
                                .find('li.js-nkd-item[data-state="open"]')
                                .each(function(){
                                    $(this)
                                        .attr('data-state', 'closed');
                                });

        // Get current level
        var getCurrentLevelValue = $(this)
                                .parent('li.js-nkd-item')
                                .children('ul.js-nkd-level')
                                .attr('data-level');

        if (getSubLevelState == 'closed'){
            setSubLevelState($(this),'open');

            $(this)
                .parent('li.js-nkd-item')
                .siblings()
                .addClass('nkd-hidden');

            $previous
                .attr('data-current-level', + getCurrentLevelValue);
        }
    }

    function onPreviousLinkClick(){
        // Last opened
        $('li.js-nkd-item[data-state="open"]:last')
            .attr('data-state', 'closed');

        // Update data-current-level value
        var updateCurrentLevelValue = $('li.js-nkd-item[data-state="closed"]:first')
                        .closest('ul.js-nkd-level')
                        .attr('data-level');
        $previous.attr('data-current-level', updateCurrentLevelValue);

        // Show previously hidden items again
        $('ul.js-nkd-level[data-level="' + updateCurrentLevelValue + '"')
            .children('li.js-nkd-item')
            .siblings()
            .removeClass('nkd-hidden');
    }

    function showCurrentLevelLabel(){
        var getCurrentLevelLabel = $('li.js-nkd-item[data-state="open"]:last')
                                        .children('a.js-nkd-link')
                                        .text();

        $current.empty().text(getCurrentLevelLabel);

        if ($current.text().length > 0){
            $current.removeClass('nkd-hidden');
        }

        else if ($current.text().length == 0){
            $current.addClass('nkd-hidden');
        }
    }

    function showPreviousLevelLabel(){
        var getPreviousLevelLabel = $('li.js-nkd-item[data-state="open"]:last')
                                        .parent('ul.js-nkd-level')
                                        .prev('a.js-nkd-link')
                                        .text();

        $previous.empty().text(getPreviousLevelLabel);

        if ($previous.text().length == 0){
            $previous.text('Home');
        }
    }

    function showCurrentAndPreviousLevelsLabels(){
        showCurrentLevelLabel();
        showPreviousLevelLabel();
    }

    $('a.js-nkd-link').on('click', onLinkClick);
    $previous.on('click', onPreviousLinkClick);
    $('a.js-nkd-link, a.js-nkd-previous').on('click', showCurrentAndPreviousLevelsLabels);
});
