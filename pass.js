javascript:(
    function(){
        prompt('Here is your shiny new password:', 
            Math.random().toString(36).slice(2) + 
            Math.random().toString(36).slice(2)
        );
    }
)();
