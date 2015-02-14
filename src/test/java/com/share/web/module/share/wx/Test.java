package com.share.web.module.share.wx;


public class Test {
public static void main(String[] args) {
	WXSignBean bean = new WXSignBean();
	bean.setJsapi_ticket(WXParams.getJSAPITicket());
	bean.setNoncestr(WXParams.getRandomStr());
	bean.setTimestamp(String.valueOf(WXParams.getTimestamp()));
	bean.setUrl("http://m.toomao.com/toomao_mobile/page/get-hongbao-share.jsp");
	System.out.println(WXParams.getSign(bean));
}
}
