<%@tag import="com.alibaba.fastjson.JSON"%>
<%@tag import="com.share.web.module.share.wx.WXBean"%>
<%@tag import="com.share.web.module.share.wx.WXTool"%>
<%@tag import="org.apache.log4j.Logger"%>
<%@attribute name="url" required="true" %>
<%@attribute name="save" required="true" %>
<%
	Logger logger = Logger.getLogger("/WEB-INF/tags/shareWX.tag");
	try{
		if (url.equals(""))
		{
			if (request.getQueryString() != null)
				url = request.getScheme() + "://" + request.getServerName() + request.getRequestURI() + "?" + request.getQueryString();
			else
				url = request.getScheme() + "://" + request.getServerName() + request.getRequestURI();
			
		}
		
		
		WXBean bean = WXTool.getBean(url);
		request.setAttribute(save, JSON.toJSONString(bean));
		logger.debug(url);
		logger.debug("json:" + JSON.toJSONString(bean));
	}
	catch(Exception e)
	{
		logger.error(e);
		e.printStackTrace();
	}
%>