<!DOCTYPE html>
<html>
<head>
<base href="../../">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<%@include file="include.jsp" %>
</head>
<body>

	<div id="slider" class="flexslider">
	  <ul class="slides">
	   <li>
	   		<img src="module/FlexSlider/demo/images/kitchen_adventurer_cheesecake_brownie.jpg" />
	   	</li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_lemon.jpg" />
  	    </li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_donut.jpg" />
  	   	</li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_caramel.jpg" />
  	    </li>
	    <!-- items mirrored twice, total of 12 -->
	  </ul>
	</div>
	<div id="carousel" class="flexslider">
	  <ul class="slides">
	    <li>
	   		<img src="module/FlexSlider/demo/images/kitchen_adventurer_cheesecake_brownie.jpg" />
	   	</li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_lemon.jpg" />
  	    </li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_donut.jpg" />
  	   	</li>
  	    <li>
  	    	<img src="module/FlexSlider/demo/images/kitchen_adventurer_caramel.jpg" />
  	    </li>
	    <!-- items mirrored twice, total of 12 -->
	  </ul>
	</div>
	<script>
	$(window).load(function() {
		  // The slider being synced must be initialized first
		  $('#carousel').flexslider({
		    animation: "slide",
		    controlNav: false,
		    //animationLoop: false,
		    slideshow: false,
		    itemWidth: 210,
		    itemMargin: 5,
		    asNavFor: '#slider'
		  });
		 
		  $('#slider').flexslider({
		    animation: "slide",
		    controlNav: false,
		    //animationLoop: true,
		    slideshow: false,
		    sync: "#carousel"
		  });
		});
	</script>
</body>
</html>