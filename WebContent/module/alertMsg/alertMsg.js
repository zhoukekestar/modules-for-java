(function($){
	$.alertMsg = function(options)
	{

		// If options is string, set default value and overwrite options's content.
		if (typeof(options) == "string")
		{
			options = $.extend({},$.alertMsg.defaults, {content:options});
		}
		// Mix defaults and options
		else
		{			
			options = $.extend({},$.alertMsg.defaults, options);
		}
		
		// Add html to body, then show it.
		var html = '<div class="alert-msg-content" style="display:none">' + options.content + '</div>'
		$(options.body).append(html);
		$(".alert-msg-content")
		  .css({
		      "width":options.width,
		      "margin-left":-options.width/2,
		      "opacity":0
		  })
		  .show();

        // Get height value and ajust it to middle height.
		var h = $(".alert-msg-content").css("height");
		h = h.substring(0, h.indexOf("px"));
		if (options.debug)
		  console.log("[alertMsg] height:" + h + " and (h/2 + 12):" + (-h/2-12));
		$(".alert-msg-content").css({
			"margin-top":-h/2-12
			//add padding length.
		});
		
		// Show & Hide.
		$(".alert-msg-content").animate({opacity:'1'},"slow");
		if (options.autohide)
		{
			setTimeout(function(){
				$(".alert-msg-content").animate({opacity:'0'},"slow", function(){
					$(".alert-msg-content").remove();
					options.done();
				});
			},options.time);
		}
	}
	 $.alertMsg.defaults = {
        width:160, 
        content:"Not set content's value.",
        done:function(){},
        time:1200,
        autohide:true,
        body:"body",
        debug:false
    };
	$.alertMsg.remove = function(done)
	{
		$(".alert-msg-content").animate({opacity:'0'},"slow", function(){
			$(".alert-msg-content").remove();
			done == undefined ? "":done();
		});
	}
	
})(jQuery);