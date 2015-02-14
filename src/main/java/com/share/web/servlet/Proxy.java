package com.share.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.share.web.utils.HttpRequest;

@SuppressWarnings("serial")
@WebServlet("/proxy")
public class Proxy extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String method = req.getParameter("method");
		String url = req.getParameter("url");
		if (null == url || null == method)
			resp.getWriter().print("url OR method not found.");
		else
		{
			HttpRequest request = null;
			if (method.equalsIgnoreCase("get"))
				request = HttpRequest.get(url);
			else if (method.equalsIgnoreCase("put"))
				request = HttpRequest.put(url);
			else if (method.equalsIgnoreCase("post"))
				request = HttpRequest.post(url);
			else if (method.equalsIgnoreCase("delete"))
				request = HttpRequest.delete(url);
			else
				request = HttpRequest.get(url);
			
			resp.getWriter().write(request.body());
			resp.setHeader("Set-cookie", request.header("Set-cookie"));
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}
