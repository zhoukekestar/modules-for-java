(function($){
$.fn.pullDown = function(){
	$(".scroll-fresher", this).hide();
	
	var o, // original point
		$this = $(this),
		draging = false,
		status = "start",
		c; // current point
		
	
	$(this)
		.bind("touchstart", function(e){
			console.log("start");
			$this.removeClass("animal");
			o = {
				X: e.originalEvent.touches[0].clientX,
				Y: e.originalEvent.touches[0].clientY,
				oX: $this[0].offsetLeft,
				oY: $this[0].offsetTop
			};
			
		})
		.bind("touchmove", function(e){
			
			c = {
				X: e.originalEvent.touches[0].clientX,
				Y: e.originalEvent.touches[0].clientY,
			}
			
			//console.log("o.y" + o.Y + " c.y:" + c.Y + " scr:" + $(window).scrollTop());
			if (o.Y < c.Y && $(window).scrollTop() == 0)
			{
				if (c.Y - o.Y > 200) console.log("reload");
				else if (c.Y - o.Y > 100) console.log("note");
				
				$this.css({
					top: (c.Y - o.Y + o.oY) + "px",
				});
				
			}
			
		})
		.bind("touchend", function(e){

			if (c.Y - o.Y > 200) console.log("end-reload");
			else if (c.Y - o.Y > 100) console.log("end-note");
			
			$this.addClass("animal");
			$this.css({
				top: o.oY + "px",	
				});
			});
	}
}(jQuery));