<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="w" tagdir="/WEB-INF/tags/" %>
<!DOCTYPE html>
<html>
<head>

<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<%@include file="include.jsp" %>

</head>
<body>
	<w:shareWX url="" save="share"></w:shareWX>
	<script>
	$.shareWXConfig({
	    appId: "${share.appID}", // 必填，公众号的唯一标识
	    timestamp: "${share.time}", // 必填，生成签名的时间戳
	    nonceStr: "${share.randomStr}", // 必填，生成签名的随机串
	    signature: "${share.sign}",// 必填，签名，见附录1
	    success:function(){
	    	
	    	$.shareWX({
			    title: 'z-title', // 分享标题
			    link: 'http://www.baidu.com', // 分享链接
			    imgUrl: 'http://img01.taobaocdn.com/imgextra/i1/776955218/TB2nIeFbFXXXXXAXXXXXXXXXXXX_!!776955218.png', // 分享图标
			    success: function () { 
			       alert("z-success");
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			        alert("z-cancel");
			    }
			});
	    }
	});
	</script>
</body>
</html>