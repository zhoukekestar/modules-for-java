<!DOCTYPE html>
<html>
<head>
<base href="../../">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<%@include file="include.jsp" %>
</head>
<body>
	<div class="abc pagination"></div>
	
	<script>
		$(function(){
			$(".abc").toomaoPaging({
				total:"",
				current:"${param.current}",
				onSelect:function(d){
					location = "module-include/paging/demo.jsp?current=" + d;
				}
			});
		});
	</script>
</body>
</html>