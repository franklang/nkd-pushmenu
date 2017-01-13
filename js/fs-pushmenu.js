$(document).ready(function(){
    $('a.fs-link').on('click', function(){
        // Get current nav level of clicked link
        var getLinkNavLevel = $(this)
                                .closest('ul.fs-level')
                                .attr('data-level');
        
        // Get clicked link sublevel state (open/closed)
        var getSubLevelState = $(this)
                                .parent('li.fs-item')
                                .attr('data-state');
        
        // Close children sublevels
        var closeChildren = $(this)
                                .parent('li.fs-item')
                                .find('li.fs-item[data-state="open"]')
                                .each(function(){
                                    $(this)
                                        .attr('data-state', 'closed');
                                });

        // Get current level
        var getCurrentLevelValue = $(this)
                                .parent('li.fs-item')
                                .children('ul.fs-level')
                                .attr('data-level');

        // Set clicked link sublevel state (open/closed)
        function setSubLevelState(element,state){
            element
                .parent('li.fs-item')
                .attr('data-state', state);
        }

        if (getSubLevelState == 'closed'){
            setSubLevelState($(this),'open');

            $(this)
                .parent('li.fs-item')
                .siblings()
                .addClass('fs-hidden');

            $('a.fs-previous')
                .attr('data-current-level', + getCurrentLevelValue);
        }
    });

    $('a.fs-previous').on('click', function(){
        // Last opened
        $('li.fs-item[data-state="open"]:last')
            .attr('data-state', 'closed');

        // Update data-current-level value
        var updateCurrentLevelValue = $('li.fs-item[data-state="closed"]:first')
                        .closest('ul.fs-level')
                        .attr('data-level');
        $('a.fs-previous').attr('data-current-level', updateCurrentLevelValue);

        // Show previously hidden items again
        $('ul.fs-level[data-level="' + updateCurrentLevelValue + '"')
            .children('li.fs-item')
            .siblings()
            .removeClass('fs-hidden');
    });

    $('a.fs-link, a.fs-previous').on('click', function(){
        var getCurrentLevelLabel = $('li.fs-item[data-state="open"]:last')
                                        .children('a.fs-link')
                                        .text();

        var getPreviousLevelLabel = $('li.fs-item[data-state="open"]:last')
                                        .parent('ul.fs-level')
                                        .prev('a.fs-link')
                                        .text();

        $('.fs-current').empty().text(getCurrentLevelLabel);
        $('a.fs-previous').empty().text(getPreviousLevelLabel);


        if ($('.fs-current').text().length > 0){
            $('.fs-current').removeClass('fs-hidden');
        }

        else if ($('.fs-current').text().length == 0){
            $('.fs-current').addClass('fs-hidden');
        }

        if ($('a.fs-previous').text().length == 0){
            $('a.fs-previous').text('Back');
        }        
    });
});
