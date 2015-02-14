<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<base href="../../" />
<meta charset="UTF-8">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<%@include file="include.jsp" %>
</head>
<body style="height:100%;width:100%;">

	<button id="btn1">显示提示（不自动移除）</button>
	<button id="btn2">移除当前提示</button>
	<button id="btn3">显示提示（自动移除）</button>
	<button id="btn4">显示提示（指定宽度）</button>
	
	<script>
		$(function(){
			$("#btn1").click(function(){
				$.alertMsg({
					content:"提示，不会自动消失",
					autohide:false
					});
			});
			$("#btn2").click(function(){
				$.alertMsg.remove();
			});
			$("#btn3").click(function(){
				$.alertMsg("提示，将会自动消失");
			});
			$("#btn4").click(function(){
				$.alertMsg({
					content:"提示，将会自动消失~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
					width:250
					});
			});
			
		});
	</script>
</body>
</html>
</body>
</html>