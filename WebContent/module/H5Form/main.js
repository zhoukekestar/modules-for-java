require.config({
	baseUrl: 'http://192.168.0.222:8080/web-modules/module/',
	paths: {
		jquery: 'http://cdn.bootcss.com/jquery/2.1.3/jquery.min',
		alertMsg: 'alertMsg/alertMsg',
		citySelect: 'citySelect/citySelect',
		H5Form: 'H5Form/H5Form',
	}
});

define(['H5Form'], function () {
	$.formValidator.addMethod("checkcode", function(ele){
		if ($(ele).val() == "123")
			return true;
		return false;
	});
});

define(['jquery'], function($){
	
	$("button").click(function(e){
		$("form").formSubmit({
			success:function(d){
				console.log(d);
			}
		});
		e.preventDefault();
	});
});