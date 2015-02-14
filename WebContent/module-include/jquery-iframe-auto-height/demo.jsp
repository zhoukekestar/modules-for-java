<!DOCTYPE html>
<html>
<head>
<base href="../../">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<%@include file="/module-include/jquery-iframe-auto-height/include.jsp" %>
</head>
<body>
<ul>
	<li data-url="page/dealer/account-detail.jsp">details</li>
	<li data-url="page/dealer/invite-shop.jsp">invite</li>
	<li data-url="module-include/jquery-iframe-auto-height/iframe1.jsp">iframe1.jsp</li>
</ul>
<iframe src="" style="" width="100%;" scrolling="no" style="border:none;"></iframe>
<script type="text/javascript">

var resizeIframe;

$(function(){
	
	$("li").click(function(){
		$("iframe").attr("src", $(this).data("url"));
		
		setTimeout(function(){
			
			$("iframe")[0].contentWindow.$("*").click(function(){
					parent.resizeIframe();
				});

		}, 1200);
	});
	
	resizeIframe = $("iframe").toomaoIframeAuto();
});
</script>

</body>
</html>