package com.share.web.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
		// HTML request
		if (req.getHeader("Accept").indexOf("text/html") != -1)
			resp.setContentType("text/html");
		
		String method = req.getParameter("method");
		String url = req.getParameter("proxy");
		if (null == url || null == method)
			resp.getWriter().print("url OR method not found.");
		else;
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
			
			// Set request cookie from client request
			request.header("Cookie", req.getHeader("Cookie"));
			String body = request.body();
			
			// Set client cookie form request's response
			Map<String, List<String>> headers = request.headers();
			if (headers.get("Set-Cookie") != null) {
				for (String head : headers.get("Set-Cookie")) {
					resp.addHeader("Set-Cookie", head);
				}
			}
			resp.getWriter().write(body);
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}
