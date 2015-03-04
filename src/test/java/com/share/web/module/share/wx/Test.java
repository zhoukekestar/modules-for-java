package com.share.web.module.share.wx;

import com.alibaba.fastjson.JSON;


public class Test {
	public static void main(String[] args) {
		WXBean bean = WXTool.getBean("http://www.baidu.com");
		System.out.println(JSON.toJSONString(bean));
	}
}
