package test;

import org.apache.log4j.Logger;

import com.share.java.modules.weblogger.WebLogger;

public class Test {
	public static void main(String[] args) throws InterruptedException {
		

		Logger logger = Logger.getLogger(Test.class);
	
		//WebLogger.DEBUG = true;
		
		for (int i = 0; i < 5; i ++) {
			logger.debug("hi :\"test\"" + i);
			Thread.sleep(300);
			System.out.println("add " + i);
		}
		
		System.out.println("finish");
		Thread.sleep(500000);
	}
}
