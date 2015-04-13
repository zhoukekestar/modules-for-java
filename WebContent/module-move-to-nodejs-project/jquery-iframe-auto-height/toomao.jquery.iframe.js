(function(){
	
	$.fn.toomaoIframeAuto = function(options){
		
		
		var a = function(){};
		var b;
		var manualResize = function(){a(b);}
		var temp = function (resizeFunction, iframe) {
			a = resizeFunction;
			b = iframe;
		};
		options = $.extend({
			//debug: true,
			triggerFunctions: [ temp]
		}, options);
		
		$(this).iframeAutoHeight(options);
		
		$("*").click(function(){
			manualResize();
		});
		
		return manualResize;
	};
})(jQuery);