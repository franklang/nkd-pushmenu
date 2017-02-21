var nkd = {
    // Reset DOM to its initial state
    nkdReset: function(element){
      element.find('[data-state="open"]').each(function(){
        $(this).attr('data-state','closed');
      });
    },

    // Set clicked link sublevel state (open/closed)
    setSubLevelState: function(element,state){
      element
        .parent('.js-nkd-item')
        .attr('data-state', state);
    }
}