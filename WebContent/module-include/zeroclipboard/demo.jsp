<!DOCTYPE html>
<html>
<head>
<base href="../../">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<%@include file="/module-include/zeroclipboard/include.jsp" %>
</head>
<body>
<button id="copy-button" data-clipboard-text="hi,顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶大大大nihao">复制到剪切板</button>
<script type="text/javascript">
$(function(){
	$("#copy-button").toomaoClipboard();
});
</script>
</body>
</html>