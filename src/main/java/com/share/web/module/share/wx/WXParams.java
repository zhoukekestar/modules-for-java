package com.share.web.module.share.wx;

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

public class WXParams {
	
	private static Logger logger = Logger.getLogger(WXParams.class);
	
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
	public static String getAccessToken()
	{
		if (accessToken == null || (new Date()).getTime() > (accessToken_Time + accessToken_Expire * 1000) )
			freshAccessToken();
		return accessToken;
	}
	
	private static void freshAccessToken()
	{
		String body = HttpRequest.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5298b809a29cb9b0&secret=e4ad79b13fa9e86b8c8f3869f0e425be").body();
		JSONObject obj = JSON.parseObject(body);
		
		logger.debug("accessToken:" + body);
		
		accessToken 		= obj.getString("access_token");
		accessToken_Expire 	= obj.getLongValue("expires_in");
		accessToken_Time 	= (new Date()).getTime();
	}
	
	
	/***
	 * 获取jsapi_ticket，当第一次或超时的时候，将会自动重新获取
	 * @return
	 */
	public static String getJSAPITicket()
	{
		if (jsAPITicket == null || (new Date()).getTime() > (jsAPITicket_Time + jsAPITicket_Expire * 1000) )
			freshJSAPITicket();
		return jsAPITicket;
		
	}
	
	private static void freshJSAPITicket()
	{
		String body = HttpRequest.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + getAccessToken() + "&type=jsapi").body();
		JSONObject obj = JSON.parseObject(body);
		
		logger.debug("jsAPITicket:" + body);
		
		jsAPITicket 		= obj.getString("ticket");
		jsAPITicket_Expire 	= obj.getLongValue("expires_in");
		accessToken_Time 	= (new Date()).getTime();
	}
	
	
	/***
	 * 为方便调用的，返回当前时间的时间戳
	 * @return
	 */
	public static long getTimestamp(){
		long temp = (new Date()).getTime();
		logger.debug("timestamp:" + temp);
		return temp;
	}
	
	/***
	 * 为方便调用，返回16位随机字符串
	 * @return
	 */
	public static String getRandomStr(){
		String str = UUID.randomUUID().toString();
		str = str.replaceAll("-", "");
		logger.debug("randomstr:" + str.substring(0, 16));
		return str.substring(0, 16);
	}
	
	/***
	 * 传入bean对象，返回该bean对象的hash值
	 * @param bean
	 * @return
	 */
	public static String getSign(WXSignBean bean){
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("noncestr", bean.getNoncestr());
		params.put("jsapi_ticket", bean.getJsapi_ticket());
		params.put("timestamp", bean.getTimestamp());
		params.put("url", bean.getUrl());
		
		
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
        
        logger.debug("sign-str:" + prestr);
        return EncoderHandler.encodeByHash(prestr);
	}
}
