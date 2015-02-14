<!DOCTYPE html>
<html>
<head>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
</head>
<body>
<h1 id="test"><p>1234567890-</p></h1>
<button>+</button>
<script type="text/javascript">
$(function(){
	$("button").click(function(){
		$("body").after($("#test").html());
	});
});
</script>
</body>
</html>