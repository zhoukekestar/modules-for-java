package com.share.web.config;

import java.io.IOException;
import java.util.Properties;

import org.apache.log4j.Logger;


public class JSPConfig {
	private static Logger logger = Logger.getLogger(JSPConfig.class);
	
	public static String BASE;
	public static String SERVICE_LOCAL;
	public static String SERVICE_REMOTE;
	
	static {
		Properties jsp = new Properties();
		try {
			jsp.load(JSPConfig.class.getClassLoader().getResourceAsStream("jsp.properties"));
		} catch (IOException e) {
			logger.error("Can't find jsp properties.");
		}
		
		BASE 			= jsp.getProperty("BASE");
		SERVICE_LOCAL 	= jsp.getProperty("SERVICE_LOCAL");
		SERVICE_REMOTE 	= jsp.getProperty("SERVICE_REMOTE");
	}
}
