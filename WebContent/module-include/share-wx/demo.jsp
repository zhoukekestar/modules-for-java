<%@page import="com.share.web.module.share.wx.WXSignBean"%>
<%@page import="com.share.web.module.share.wx.WXParams"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<%@include file="include.jsp" %>

<%
	long time = WXParams.getTimestamp();
	String randomStr = WXParams.getRandomStr();
	
		WXSignBean bean = new WXSignBean();
		bean.setJsapi_ticket(WXParams.getJSAPITicket());
		bean.setNoncestr(randomStr);
		bean.setTimestamp(String.valueOf(time));
		bean.setUrl(request.getScheme()+"://m.toomao.com" + request.getRequestURI() + "?" + request.getQueryString());
	
	String sign = WXParams.getSign(bean);
%>
</head>
<body>
	<script>
	$.shareWXConfig({
	    appId: 'wx5298b809a29cb9b0', // 必填，公众号的唯一标识
	    timestamp: <%=time%>, // 必填，生成签名的时间戳
	    nonceStr: '<%=randomStr %>', // 必填，生成签名的随机串
	    signature: '<%=sign %>',// 必填，签名，见附录1
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