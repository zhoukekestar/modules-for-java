package com.share.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.log4j.Logger;

import com.share.web.config.JSPConfig;

@WebListener
public class ServletContextInitListener implements ServletContextListener {

	private Logger logger = Logger.getLogger(ServletContextInitListener.class);
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		sce.getServletContext().setAttribute("base", JSPConfig.BASE);
		sce.getServletContext().setAttribute("ts", JSPConfig.SERVICE_LOCAL);
		sce.getServletContext().setAttribute("ws", JSPConfig.SERVICE_REMOTE);
		
		logger.info("ServletContext init: ws->" + JSPConfig.SERVICE_REMOTE + "  base->" + JSPConfig.BASE + " ts->" + JSPConfig.SERVICE_LOCAL);
		
		sce.getServletContext().getSessionCookieConfig().setName("j_session");
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		logger.info("ServletContext destory.");
	}

}
