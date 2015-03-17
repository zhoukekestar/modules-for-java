package com.share.java.modules.weblogger;

import org.apache.log4j.AppenderSkeleton;
import org.apache.log4j.spi.LocationInfo;
import org.apache.log4j.spi.LoggingEvent;

import com.alibaba.fastjson.JSON;
import com.github.kevinsawicki.http.HttpRequest;

public class WebLogger extends AppenderSkeleton {

	public static boolean DEBUG = false;
	private String api;

	public static class Msg {
		private String msg;
		private String level;
		private String className;
		private String detail;
		
		public String getMsg() {
			return msg;
		}
		public void setMsg(String msg) {
			this.msg = msg;
		}
		public String getLevel() {
			return level;
		}
		public String getClassName() {
			return className;
		}
		public void setClassName(String className) {
			this.className = className;
		}
		public String getDetail() {
			return detail;
		}
		public void setDetail(String detail) {
			this.detail = detail;
		}
		public void setLevel(String level) {
			this.level = level;
		}
	}

	@Override
	protected void append(LoggingEvent event) {
		
		LocationInfo info = event.getLocationInformation();
		try{
			Msg msg = new Msg();
			msg.setMsg(this.getLayout().format(event).replaceAll("\n", " ").replaceAll("\r", " ").replaceAll("\"", "'"));
			msg.setLevel(event.getLevel().toString());
			msg.setClassName(info.getClassName());
			msg.setDetail(info.getMethodName() + ":" + info.getLineNumber());
			
			if (DEBUG) {
				System.out.println(JSON.toJSONString(msg));
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			} else {
				HttpRequest.post(api).send("doc=" + JSON.toJSONString(msg)).code();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void close() {
		if (closed)
			return;
		closed = true;
	}

	@Override
	public boolean requiresLayout() {
		return true;
	}
	
	public String getApi() {
		return api;
	}

	public void setApi(String api) {
		this.api = api;
	}

}
