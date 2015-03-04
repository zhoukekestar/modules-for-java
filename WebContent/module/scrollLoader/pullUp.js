(function($){
			
	$.fn.pullUp = function(){
		var eleH = $(this)[0].offsetTop,
			winH = $(window).height(),
			loading = false,
			$this = $(this);
		
		$(this).hide();
		
		$(window).scroll(function(){
			
			//console.log("----add:" + ($(window).scrollTop() + winH) + " el:" + eleH);
			
			if ($(window).scrollTop() + winH >= eleH && loading == false)
			{
				loading = true;
				$this.show();
				
				setTimeout(function(){
					$this.before(Math.random() + "<br>333<br><hr>");
					loading = false;
					eleH = $this[0].offsetTop;
					$this.hide();
				}, 3000);
			}
		});
	}
}(jQuery));