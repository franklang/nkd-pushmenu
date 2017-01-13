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
        var getCurrentLevel = $(this)
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

            $('a.fs-back-link')
                .attr('data-current-level', + getCurrentLevel);
        }
    });

    $('a.fs-back-link').on('click', function(){
        // Last opened
        $('li.fs-item[data-state="open"]')
            .last()
            .attr('data-state', 'closed');

        // Update data-current-level value
        var updateCurrentLevel = $('li.fs-item[data-state="closed"]')
                        .first()
                        .closest('ul.fs-level')
                        .attr('data-level');
        $('a.fs-back-link').attr('data-current-level', updateCurrentLevel);

        // Show previously hidden items again
        $('ul.fs-level[data-level="' + updateCurrentLevel + '"')
            .children('li.fs-item')
            .siblings()
            .removeClass('fs-hidden');
    });
});
