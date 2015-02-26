
;define("formSubmit", ["formValidator"], function(validInput){
	// Form submit util function
	$.fn.formSubmit = function(options){
		options = $.extend({
			type: "post",
			url: "",
			dataType:"jsonp",
			async: true,
			data: "",
			success: function(d){
				
				// specfic code
				if (d.code != undefined && d.code == 0)
					options.afterSuccess(d);
			},
			afterSuccess:function(d){},
			error: function(d){$.alertMsg(d.status + " 网络错误");}
		}, options);
		
		// Before submit form, valid this form.
		var validOK = true;
		$(this).find("input").each(function(){
			
			var temp = validInput(this);
			if (temp == false)
				validOK = false;
			
		});
		if (!validOK){
			$.alertMsg("请正确填写表单");
			return;
		}
		
		// Get first selected form
		var firstForm = $(this)[0];
		
		// Get first selected form's data, set its value to options.
		// 1. data-method
		// 2. data-action
		// 3. data-data-type
		// 4. data-async
		// 5. data-proxy
		var proxy = undefined;
		if ($(firstForm).attr("method") != undefined) 		options.type 	= $(firstForm).attr("method");
		if ($(firstForm).attr("action") != undefined) 		options.url 	= $(firstForm).attr("action");
		if ($(firstForm).data("data-type") != undefined)	options.dataType = $(firstForm).data("data-type");
		if ($(firstForm).data("async") != undefined) 		options.async 	= $(firstForm).data("async");
		if ($(firstForm).data("proxy") != undefined)		proxy 			= $(firstForm).data("proxy");
		// Get form's data
		options.data = $(this).serialize();
			
		if (proxy == undefined) {
			$.ajax({
				type 	: options.type,
				url 	: options.url,
				dataType: options.dataType,
				async 	: options.async,
				data	: options.data,
				success : options.success,
				error 	: options.error
			});
		} else {
			
			// If use proxy
			// POST to proxy
			$.ajax({
				type 	: "POST",
				url 	: proxy,
				dataType: options.dataType,
				async 	: options.async,
				data	: {
					"proxy": encodeURIComponent(options.url + "?" + options.data)
				},
				success : options.success,
				error 	: options.error
			});
		}
		
	};
});