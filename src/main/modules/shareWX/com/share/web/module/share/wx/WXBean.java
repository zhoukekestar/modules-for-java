package com.share.web.module.share.wx;

/***
 * wx分享的时候需要用到的参数集合
 * @author zhoukeke
 *
 */
public class WXBean {
	private String time;
	private String randomStr;
	private String sign;
	private String appID;
	
	public String getAppID() {
		return appID;
	}
	public void setAppID(String appID) {
		this.appID = appID;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getRandomStr() {
		return randomStr;
	}
	public void setRandomStr(String randomStr) {
		this.randomStr = randomStr;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	
}
