package com.share.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter("/*")
public class AJAXFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		boolean ajax = false;
		HttpServletRequest req = (HttpServletRequest)request;
		if ( 
			(req.getHeader("Accept").indexOf("text/javascript") != -1 || req.getHeader("Accept").indexOf("application/javascript") != -1) 
			&& req.getParameter("callback") != null
		   )
			ajax = true;
		
		if (ajax)
			response.getWriter().write(request.getParameter("callback") + "(");
		
		chain.doFilter(request, response);
		
		response.setContentType("application/json;charset=UTF-8");
		if (ajax)
			response.getWriter().write(")");
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		//System.out.println("init");
	}

	@Override
	public void destroy() {
		//System.out.println("destory");
	}
}
