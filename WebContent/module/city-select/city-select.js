;(function ($) {
	$.fn.citySelect = function(options){
		options = $.extend({      
			data: [],
			selected:[],
			valname:"v",
			showname:"n",
			arrname:"s"
		}, options);
		
		function nextSelect(ele, data, arr, count)
		{
			if (data == undefined || data == null || data.length == 0)
				return;
			var html = '<option value="-1">--请选择--</option>';
			for (var i = 0; i < data.length; i++)
			{
				var item = data[i];
				html += '<option value="' + item[options.valname] + '">'+ item[options.showname] + '</option>';
			}
			$(ele[count]).append(html).show();;
			$(ele[count]).change(function(){
				
				for (var i = count + 1; i < ele.length; i++)
				{
					$(ele[i]).find("option").unbind("change").remove();
					$(ele[i]).hide();
				}
				if ($(this).val() == -1)
					return;
				var curArr = arr;
				var curCount = count;
				curArr.push($(this).val());
				curCount++;
				
				for (var i = 0; i < data.length; i++)
				{
					if (data[i][options.valname] == $(this).val())
					{
						var temp =  data[i][options.arrname];
						nextSelect(ele, temp, curArr, curCount);
					}
				}
			});
		}
		
		$(this).hide();
		nextSelect(this, options.data, [], 0);
		for (var i = 0; i < options.selected.length; i++)
		{
			$(this[i]).find("option[value="+ options.selected[i]+"]").attr("selected", true).trigger("change");
	    }
	};
	
	$.fn.toomaoCitySelect = function(selected){
		var $this = $(this);
		$.getJSON("city.min.json", function(json){
			$this.citySelect({
				data: json,
				selected:selected
			});
		});
	};
})(jQuery);