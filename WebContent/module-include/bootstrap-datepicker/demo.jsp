<!DOCTYPE html>
<html>
<head>

<base href="../../">
<link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>

<%@include file="include.jsp" %>
</head>
<body>
	<input class="datepicker" data-date-format="yyyy-mm-dd">
	<script>
	$(function(){
		$('.datepicker').datepicker({
		    startDate: '-3d',
		    language: 'zh-CN'
		});
	});
	</script>
</body>
</html>