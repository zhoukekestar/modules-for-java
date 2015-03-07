<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="w" tagdir="/WEB-INF/tags/" %>
<base href="${base}" />
<meta name="keywords" content="土冒网,手机开店,社交购物,手机逛街,粉丝经济,O2M,众筹合伙,微信开店,O2O,本地商家,服务商,台州">
<meta name="description" content="土冒，全国首家本地商家的宣传推广平台；土冒为全国本地商家提供开店、宣传、推广等服务，为用户打造本地化的购物、社交、生活服务平台。土冒，重新定义开店；土冒，发现你身边的店！" />
<meta name="s-ip" content="unknown" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
<link rel="dns-prefetch" href="//www.toomao.com">
<link rel="dns-prefetch" href="//img01.taobaocdn.com">
<link rel="dns-prefetch" href="//img02.taobaocdn.com">
<link rel="dns-prefetch" href="//img03.taobaocdn.com">
<link rel="dns-prefetch" href="//img04.taobaocdn.com">
<link rel="dns-prefetch" href="//cdn.bootcss.com">
<link href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet">
<link href="http://img01.taobaocdn.com/imgextra/i1/776955218/TB2nIeFbFXXXXXAXXXXXXXXXXXX_!!776955218.png" type="image/x-icon" rel="shortcut icon">

<link rel="stylesheet" href="http://www.idangero.us/swiper/dist/css/swiper.min.css">

<script src="//cdn.bootcss.com/require.js/2.1.15/require.min.js"></script>
<script>
$ws="${ws}",$base="${base}";
require.config({
	baseUrl: $base,
	paths: {
		jquery: 'http://cdn.bootcss.com/jquery/2.1.3/jquery.min',
		swiper: "http://www.idangero.us/swiper/dist/js/swiper.min",
		bootstrap: "http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min",
	},
	shim: {
		swiper: {
			exports: "Swiper"
		},
		bootstrap:{
			deps: ['jquery']
		}
		
	},
	waitSeconds: 15
});
</script>