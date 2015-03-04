<%@tag import="com.alibaba.fastjson.JSON"%>
<%@tag import="com.share.web.module.share.wx.WXBean"%>
<%@tag import="com.share.web.module.share.wx.WXTool"%>
<%@tag import="org.apache.log4j.Logger"%>
<%@attribute name="url" required="true" %>
<%@attribute name="save" required="true" %>
<%
	try{
		if (url.equals(""))
			url = request.getScheme()+"://m.toomao.com" + request.getRequestURI() + "?" + request.getQueryString();
		
		WXBean bean = WXTool.getBean(url);
		request.setAttribute(save, bean);
	}
	catch(Exception e)
	{
		Logger logger = Logger.getLogger("/WEB-INF/tags/shareWX.tag");
		e.printStackTrace();
	}
%>