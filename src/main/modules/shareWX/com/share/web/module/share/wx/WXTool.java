package com.share.web.module.share.wx;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.share.web.utils.HttpRequest;

public class WXTool {
	
	private static Logger logger = Logger.getLogger(WXTool.class);
	
	public static String APPID = "wx5298b809a29cb9b0";
	public static String SECRET = "e4ad79b13fa9e86b8c8f3869f0e425be";
	public static boolean DEBUG	= false;
	
	/***
	 * 获取accessToken相关参数
	 */
	private static long accessToken_Time;
	private static String accessToken;
	private static long accessToken_Expire;
	
	
	/***
	 * 获取jsapi_ticket相关参数
	 */
	private static String jsAPITicket;
	private static long jsAPITicket_Expire;
	private static long jsAPITicket_Time;
	
	/***
	 * 获取accessToken，当第一次或超时的时候，将会自动重新获取
	 * @return
	 */
	private static String getAccessToken()
	{
		if (accessToken == null || (new Date()).getTime() > (accessToken_Time + accessToken_Expire * 1000) )
			freshAccessToken();
		return accessToken;
	}
	
	/***
	 * accessToken刷新函数
	 */
	private static void freshAccessToken()
	{
		String body = HttpRequest.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + SECRET).body();
		JSONObject obj = JSON.parseObject(body);
		
		if (DEBUG)
			logger.debug("accessToken:" + body);
		
		accessToken 		= obj.getString("access_token");
		accessToken_Expire 	= obj.getLongValue("expires_in");
		accessToken_Time 	= (new Date()).getTime();
	}
	
	
	/***
	 * 获取jsapi_ticket，当第一次或超时的时候，将会自动重新获取
	 * @return
	 */
	private static String getJSAPITicket()
	{
		if (jsAPITicket == null || (new Date()).getTime() > (jsAPITicket_Time + jsAPITicket_Expire * 1000) )
			freshJSAPITicket();
		return jsAPITicket;
		
	}
	
	private static void freshJSAPITicket()
	{
		String body = HttpRequest.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + getAccessToken() + "&type=jsapi").body();
		JSONObject obj = JSON.parseObject(body);
		
		if (DEBUG)
			logger.debug("jsAPITicket:" + body);
		
		jsAPITicket 		= obj.getString("ticket");
		jsAPITicket_Expire 	= obj.getLongValue("expires_in");
		accessToken_Time 	= (new Date()).getTime();
	}
	
	
	/***
	 * 为方便调用的，返回当前时间的时间戳
	 * @return
	 */
	private static long getTimestamp(){
		long temp = (new Date()).getTime();
		
		if (DEBUG)
			logger.debug("timestamp:" + temp);
		return temp;
	}
	
	/***
	 * 为方便调用，返回16位随机字符串
	 * @return
	 */
	private static String getRandomStr(){
		String str = UUID.randomUUID().toString();
		str = str.replaceAll("-", "");
		
		if (DEBUG)
			logger.debug("randomstr:" + str.substring(0, 16));
		return str.substring(0, 16);
	}
	
	/***
	 * 传入Map对象，对其排序后，返回该Map对象的hash值
	 * @param Map
	 * @return
	 */
	private static String getSign(Map<String, String> params){
		
		List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);

        String prestr = "";
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.get(i);
            String value = params.get(key);

            if (i == keys.size() - 1) {//拼接时，不包括最后一个&字符
                prestr = prestr + key + "=" + value;
            } else {
                prestr = prestr + key + "=" + value + "&";
            }
        }
        
        if (DEBUG)
        	logger.debug("sign-str:" + prestr);
        return EncoderHandler.encodeByHash(prestr);
	}
	
	/***
	 * 
	 * Hash，MD5计算的工具类
	 * 
	 * @author zhoukeke
	 *
	 */
	public static class EncoderHandler {
		
		private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5',
				'6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

		private static String encode(String algorithm, String str) {
			if (str == null) {
				return null;
			}
			try {
				MessageDigest messageDigest = MessageDigest.getInstance(algorithm);
				messageDigest.update(str.getBytes());
				return getFormattedText(messageDigest.digest());
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

		}

		public static String encodeByMD5(String str) {
			return EncoderHandler.encode("MD5", str);
		}
		
		public static String encodeByHash(String str)
		{
			return EncoderHandler.encode("SHA1", str);
		}

		private static String getFormattedText(byte[] bytes) {
			int len = bytes.length;
			StringBuilder buf = new StringBuilder(len * 2);
			// 把密文转换成十六进制的字符串形式
			for (int j = 0; j < len; j++) { 			buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
				buf.append(HEX_DIGITS[bytes[j] & 0x0f]);
			}
			return buf.toString();
		}
	}
	
	public static WXBean getBean(String url)
	{
		String randomStr = WXTool.getRandomStr();
		String time = String.valueOf(WXTool.getTimestamp());
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("noncestr", randomStr);
		params.put("jsapi_ticket", WXTool.getJSAPITicket());
		params.put("timestamp", time);
		params.put("url", url);
		
		WXBean bean = new WXBean();
		bean.setRandomStr(randomStr);
		bean.setTime(time);
		bean.setSign(WXTool.getSign(params));
		bean.setAppID(APPID);
		
		return bean;
	}
}
