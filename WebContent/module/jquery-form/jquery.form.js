// $.alertMsg 
;(function($){
	$.alertMsg = function(options)
	{

		// If options is string, set default value and overwrite options's content.
		if (typeof(options) == "string")
		{
			options = $.extend({},$.alertMsg.defaults, {content:options});
		}
		// Mix defaults and options
		else
		{			
			options = $.extend({},$.alertMsg.defaults, options);
		}
		
		// Add html to body, then show it.
		var html = '<div class="alert-msg-content" style="display:none">' + options.content + '</div>'
		$(options.body).append(html);
		$(".alert-msg-content")
		  .css({
		      "width":options.width,
		      "margin-left":-options.width/2,
		      "opacity":0
		  })
		  .show();

        // Get height value and ajust it to middle height.
		var h = $(".alert-msg-content").css("height");
		h = h.substring(0, h.indexOf("px"));
		if (options.debug)
		  console.log("[alertMsg] height:" + h + " and (h/2 + 12):" + (-h/2-12));
		$(".alert-msg-content").css({
			"margin-top":-h/2-12
			//add padding length.
		});
		
		// Show & Hide.
		$(".alert-msg-content").animate({opacity:'1'},"slow");
		if (options.autohide)
		{
			setTimeout(function(){
				$(".alert-msg-content").animate({opacity:'0'},"slow", function(){
					$(".alert-msg-content").remove();
					options.done();
				});
			},options.time);
		}
	};
	$.alertMsg.defaults = {
        width:160, 
        content:"Not set content's value.",
        done:function(){},
        time:1200,
        autohide:true,
        body:"body",
        debug:false
    };
	$.alertMsg.remove = function(done)
	{
		$(".alert-msg-content").animate({opacity:'0'},"slow", function(){
			$(".alert-msg-content").remove();
			done == undefined ? "":done();
		});
	};
})(jQuery);

// jquery form 
;(function($){
	var validFunc = {
		// Form validation: required.
		required: function(ele){
			if (
				($(ele).attr("required") != undefined) &&
				($(ele).val() == null || $(ele).val() == undefined || $(ele).val() == "")
			   )
				return false;
			return true;
		},
		// Form validation: pattern.
		pattern: function(ele){
			if ($(ele).attr("pattern") == undefined)
				return true;
			var reg = new RegExp($(ele).attr("pattern"));
			return reg.test($(ele).val());
		},
		equalto: function(ele){
			if ($(ele).data("equalto") == undefined)
				return true;
			if ($($(ele).data("equalto")).val() == $(ele).val())
				return true;
			return false;
		},
		func: function(ele){
			if ($(ele).data("func") == undefined)
				return true;
			else
			{
				var func = validFunc[$(ele).data("func")];
				return func(ele);
			}
		},
		// Show Error message
		error: function(ele, msg){
			
			$(ele).removeClass("has-success").addClass("has-error").find(".input-tooltip").html(msg).show();
		},
		// Show Success message
		success: function(ele){
			
			$(ele).removeClass("has-error").addClass("has-success").find(".input-tooltip").hide();
		}
	};
	$.formValidator = {};
	$.formValidator.addMethod = function(name, func)
	{
		validFunc[name] = func;
	};
	
	// Form validation.
	function validInput(ele){
		var group = $(ele).parents(".form-group")[0];
		// required
		if (!validFunc.required(ele))
		{	
			validFunc.error(group, "必须填写");
			return false;
		}
		
		// pattern
		if (!validFunc.pattern(ele) || !validFunc.equalto(ele) || !validFunc.func(ele))
		{
			var msg = $(ele).data("msg-err");
			if (msg == undefined)
				validFunc.error(group, "请输入正确的值");
			else
				validFunc.error(group, msg);
			return false;
		}
		
		validFunc.success(group);
		return true;
	}
	
	// Form validation init.
	$("input").each(function(){
		// Get group
		var group = $(this).parents(".form-group")[0];
		
		//Add input-tooltip
		$(group).append("<span class='input-tooltip'></span>");
		
		// hide
		$(group).find(".input-tooltip").hide();
		
		// valid
		$(this).bind("blur", function(){
			validInput(this);
		});
	});
	
	// Form submit util function
	$.fn.formSubmit = function(options){
		options = $.extend({
			type: "post",
			url: "",
			dataType:"jsonp",
			async: true,
			data: "",
			success: function(d){
				if (d.code != undefined && d.code == 0)
					options.afterSuccess(d);
			},
			afterSuccess:function(d){},
			error: function(d){$.alertMsg(d.status + " 网络错误");}
		}, options);
		
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
		var firstForm = $(this)[0];
		
		if ($(firstForm).attr("method") != undefined)
			options.type = $(firstForm).attr("method");
		if ($(firstForm).attr("action") != undefined)
			options.url = $(firstForm).attr("action");
		if ($(firstForm).data("data-type") != undefined)
			options.dataType = $(firstForm).data("data-type");
		if ($(firstForm).data("async") != undefined)
			options.async = $(firstForm).data("async");
		
		options.data = $(this).serialize();
			
		$.ajax({
			type 	: options.type,
			url 	: options.url,
			dataType: options.dataType,
			async 	: options.async,
			data	: options.data,
			success : options.success,
			error 	: options.error
		});
	};
	
	$("html").trigger("formValidatorOK");
}(jQuery));