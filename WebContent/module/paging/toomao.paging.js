(function($){
	$.fn.toomaoPaging = function(options)
	{
		if (options.total == undefined || options.total == "" || options.total == 0)
			options.total = 1;
		options = $.extend({
            total:0,
            pageSize:5,
            current:1,
            onSelect:function(){}
        }, options);
        
        $this = $(this);
        
        var a = 0;
    	var paging = $this.paging(options.total, { // make 1337 elements navigatable
    	    format: '[< nncnn! >]', // define how the navigation should look like and in which order onFormat() get's called
    	    //format: '< nncnn! >',
    	    perpage: options.pageSize, // show 10 elements per page
    	    lapping: 0, // don't overlap pages for the moment
    	    page: options.current, // start at page, can also be "null" or negative
    	    onSelect: function (page) {
    	        // add code which gets executed when user selects a page, how about $.ajax() or $(...).slice()?
    	        //console.log("You are on page " + page + " and you will select elements "+(this.slice[0]+1) + "-" + this.slice[1]+"!!!");
    	        //$("#result").html(page);
    	    	var max = $this.find("a").last().data("page");
    	    	$this.find("a").each(function(){
    	    		if ($(this).data("page") > max)
    	    			$(this).remove();
    	    	});
    	    	//alert("max:"+max);
    	    	if (a != 0)
    	    		options.onSelect(page);
    	    	a = 1;
    	    },
    	    onFormat: function (type) {
    	        switch (type) {
    	        case 'block': // n and c
    	        	if (this.value != this.page)
    					return '<a href="#">'+this.value+'</a>';
    				else
    					return '<a href="#"  style="color: #FFF; background-color: #26a3b7;">'+this.value+'</a>'
    	        case 'next': // >
    				return '<a href="#">&gt;</a>';
    	        case 'prev': // <
    	        	return '<a href="#">&lt;</a>';
    	        case 'first': // [
    	            return '<a href="#" style="border-radius: 5px 0px 0px 5px;">&lt;&lt;</a>';
    	        case 'last': // ]
    	        	return '<a href="#" style="border-right: solid #A2A2A2 1px;border-radius: 0px 5px 5px 0px;">&gt;&gt;</a>';
    	        }
    	    }
    	});
	};
	
})(jQuery);