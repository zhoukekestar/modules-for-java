/*---------------------------------------------------------------------------------------------
 * Filename:						base.tools.js
 * Description:					Global Base Tools Javascript
 * Version:						1.0.0(2014-07-23)
 * Website:						http://www.toomao.com
 * Author:						zhoukeke
 * 
 ==STRUCTURE:===================================================================================
 * display:						Jquery extend
 * getData:						Get data by "get" method.
 * postData:						Get data by "post" method.
 * 
 ==LOG:=========================================================================================
 * Modified:						by zhoukeke on(2014-07-23)
 Change some lines to one line.

 ---------------------------------------------------------------------------------------------*/
$(function() {
	$.tools = {
		req : function(options) {
			var defaults = {
					async:true,
					form:"",
					error:function(){},
					success:function(){},
					last:function(){},
					url:"",
					method:"get",
					proxy:""
			};
			options = $.extend(defaults,options);
			
			var formdata = "";
			var f = options.form;
			while(f.length != 0)
			{
				var index = f.indexOf(",");
				var form = "";
				
				// 判断是否为最后一个form
				if (index != -1)
				{
					form = f.substring(0, index);
					f = f.substring(index + 1);
				}
				else
					form = f;

				// 第二个form开始需要用“&”连接
				formdata += (formdata=="")?"":"&";
				formdata += $('#' + form).serialize();
				
				// 最后一个form时，跳出当前循环
				if (index == -1)
					break;
			}
			
			// 是否启动代理
			if (options.proxy != "")
			{
				var t = options.url + "?" + formdata;
				options.url = options.proxy + encodeURIComponent(t);
				formdata = "";
			}
			
			$.ajax({
				type 	: options.method,
				url 	: options.url,
				dataType : "jsonp",
				jsonp 	: "callback",
				async 	: options.async,
				data	: formdata,
				success : function(d) {
				    
			        if (d.code != 0)
                        $.alertMsg(d.message);
                    else
                        options.success(d);

				    options.last(0,d);
				},
				error 	: function(req,error) {
					// no callback error handle
					if (req.status == 200)
					{
						var d = eval("(" + req.responseText + ")");
						if (d.code != 0)
	                        $.alertMsg(d.message);
	                    else
	                        options.success(d);

					    options.last(0,d);
					}
					options.error(req, error);
					options.last(-1,req,error);
				}
			});
		},
		get:function(options){
			options = $.extend(options, {"method":"get"});
			$.tools.req(options);
		},
		post:function(options)
		{
			options = $.extend(options, {"method":"post"});
			$.tools.req(options);
		},
		json2str : function(o) {
			var arr = [];
			var fmt = function(s) {
				if (typeof s == 'object' && s != null)
					return json2str(s);
				return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
			};
			for ( var i in o)
				arr.push("'" + i + "':" + fmt(o[i]));
			return '{' + arr.join(',') + '}';
		},
		getParams : function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},
		getRealH : function(selector) {
			var selc = "#" + selector;
			var selc_f = "#" + selector + "-warp";

			var oldh = $(selc).css("height");

			var n = $(selc_f).length;
			if (n == 0) {
				$("#" + selector)
						.wrap(
								"<div id='"
										+ selector
										+ "-warp' style='position:relative;height:auto;'></div>");
			}

			$(selc_f).css({
				"height" : oldh
			});

			$(selc).css("height", 0);
			var h = $("html", window.frames[selector].document).height();
			$(selc).css("height", oldh);

			$(selc_f).css({
				"height" : "auto"
			});

			return h;
		},
		getStyle : function(obj, attr) {
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj, false)[attr];
			}
		},
		GetRandomNum : function(Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return (Min + Math.round(Rand * Range));
		},
		generateMixed : function(n) {
			var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
					'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
					'Y', 'Z' ];
			var res = "";
			for (var i = 0; i < n; i++) {
				var id = Math.ceil(Math.random() * 35);
				res += chars[id];
			}
			return res;
		},
		//倒计时
		stopWatch: function($codediv, time)
		{
			$codediv.text(time+"秒后重新发送");
			time--;
			if(time >= 0){
				$codediv.attr("disabled","true");
				setTimeout(function(){
					$.tools.stopWatch($codediv, time);
				},1000);
			}else{
				$codediv.text("重新获取").removeAttr("disabled");
			}
		},
		checkCode: function (code, cellphone, type, callback) {
			var v = code;
			var ok = false;
			if (v.length == 0)
			{
				return;	
			}
			if (v.length != 6)
			{
				$.alertMsg("验证码格式错误");
				return;
			}
			$.tools.req({
				method:"put",
				url:$base + "user/checkverifycode?cellphone="+cellphone+"&authcode=" + code + "&type=" + type,
				success: function(d) {
					$.alertMsg("校验成功");
					ok = true;
				},
				last:function()
				{
					if (typeof callback == "function")
						callback(ok);
				}
			});
		},
		getCode: function (cellphone, $getCodeBtn, type, callback)
		{
			$.tools.get({
				url:$base + "user/requestverifycode?cellphone="+ cellphone + "&type=" + type, 
				success:function(d) {
					$.alertMsg("短信已发送，请注意查收");
					$.tools.stopWatch($getCodeBtn, 60);
				},
				error:function(){
					$.alertMsg("网络错误");
				},
				last:function(){
					if (typeof callback == "function")
						callback();
				}
			});
		},
		freshImgCode: function ($imgDiv) {
		  	$imgDiv.html("");
		 	var d = new Date();
		 	var s = d.getMilliseconds() + "";
		 	$imgDiv.html("<img style='height: 32px;width: 110px;' src='" + $base + "user/image?r=" + s+"' />");
		},
		checkImgcode: function (code, callback){
			var codeOK = false;
			$.tools.post({
				url:$base + "user/checkimage?code=" + code,
				success:function(d){
					codeOK = true;
				},
				last:function(){
					if (typeof callback == "function")
						callback(codeOK);
				}
			});
		}
	};
});