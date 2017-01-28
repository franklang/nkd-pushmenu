$(document).ready(function(){
    function onLinkClick(){
        // Get current nav level of clicked link
        var getLinkNavLevel = $(this)
                                .closest('ul.nkd-level')
                                .attr('data-level');

        // Get clicked link sublevel state (open/closed)
        var getSubLevelState = $(this)
                                .parent('li.nkd-item')
                                .attr('data-state');

        // Close children sublevels
        var closeChildren = $(this)
                                .parent('li.nkd-item')
                                .find('li.nkd-item[data-state="open"]')
                                .each(function(){
                                    $(this)
                                        .attr('data-state', 'closed');
                                });

        // Get current level
        var getCurrentLevelValue = $(this)
                                .parent('li.nkd-item')
                                .children('ul.nkd-level')
                                .attr('data-level');

        // Set clicked link sublevel state (open/closed)
        function setSubLevelState(element,state){
            element
                .parent('li.nkd-item')
                .attr('data-state', state);
        }

        if (getSubLevelState == 'closed'){
            setSubLevelState($(this),'open');

            $(this)
                .parent('li.nkd-item')
                .siblings()
                .addClass('nkd-hidden');

            $('a.nkd-previous')
                .attr('data-current-level', + getCurrentLevelValue);
        }
    }

    function onPreviousLinkClick(){
        // Last opened
        $('li.nkd-item[data-state="open"]:last')
            .attr('data-state', 'closed');

        // Update data-current-level value
        var updateCurrentLevelValue = $('li.nkd-item[data-state="closed"]:first')
                        .closest('ul.nkd-level')
                        .attr('data-level');
        $('a.nkd-previous').attr('data-current-level', updateCurrentLevelValue);

        // Show previously hidden items again
        $('ul.nkd-level[data-level="' + updateCurrentLevelValue + '"')
            .children('li.nkd-item')
            .siblings()
            .removeClass('nkd-hidden');
    }

    function showCurrentLevelLabel(){
        var getCurrentLevelLabel = $('li.nkd-item[data-state="open"]:last')
                                        .children('a.nkd-link')
                                        .text();

        $('.nkd-current').empty().text(getCurrentLevelLabel);

        if ($('.nkd-current').text().length > 0){
            $('.nkd-current').removeClass('nkd-hidden');
        }

        else if ($('.nkd-current').text().length == 0){
            $('.nkd-current').addClass('nkd-hidden');
        }
    }

    function showPreviousLevelLabel(){
        var getPreviousLevelLabel = $('li.nkd-item[data-state="open"]:last')
                                        .parent('ul.nkd-level')
                                        .prev('a.nkd-link')
                                        .text();

        $('a.nkd-previous').empty().text(getPreviousLevelLabel);

        if ($('a.nkd-previous').text().length == 0){
            $('a.nkd-previous').text('Home');
        }
    }

    function showCurrentAndPreviousLevelsLabels(){
        showCurrentLevelLabel();
        showPreviousLevelLabel();
    }

    $('a.nkd-link').on('click', onLinkClick);
    $('a.nkd-previous').on('click', onPreviousLinkClick);
    $('a.nkd-link, a.nkd-previous').on('click', showCurrentAndPreviousLevelsLabels);
});
