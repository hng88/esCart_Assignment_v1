/**
 * @author Haymon Ng
 * Category Filter UI Module
 * Interface to Spring RESTful controller web service via AJAX and JSON
 * 
 */

(function(esCart, $, undefined) {
	//PUBLIC:
	
	//Filter Category Left Nav Menu (Categories)	
	esCart.CategoryFilterUIModule = {
		//default settings
		configSettings: {
			el: {
				leftNav: 'div.left-nav',
				leftNavHeader: 'div#category-filter-header'
			},
			leftNavContextCssClass: 'left-nav-context'
		},
		init: function(config) {
			console.log('Init Category Filter UI Module');
			//override or add new config settings
		    if (config && typeof(config) === 'object') {
		        $.extend(esCart.CategoryFilterUIModule.configSettings, config);
		    }		
		    
			var el = this.configSettings.el;
			
			this.refreshLeftNavContext();			
			this.getCategoryFilterCountQuantity();
			this.bindCategoryFilterUIAction();
			this.bindCategoryFilterHeaderUIAction();
		},
		getCategoryFilterCountQuantity: function() {
			//Left Nav Quantity numbers
			var el = this.configSettings.el;
			$(el.leftNav).each(function() {
				var categoryId = $(this).attr('id');
				var $leftNavCategory = $(this);
				
				var urlPath;
				
				if (categoryId * 1.0 === 0)
					urlPath = '/count/all';
				else
					urlPath = '/categories/count/' + categoryId;
				
				$.ajax({
					  url: esCart.ConfigSettings.restServiceUrlPath + urlPath,
					  type: 'GET',
					  data: '',
					  success: function(data) {
						//console.log('success, parse response data');
						//console.log(data); 
						  esCart.CategoryFilterUIModule.renderLeftPanelQuantity(data, $leftNavCategory);
					  },
					  error: function(e) {
						console.log('XHR Error');
					  }
				});
			});
		},
		renderLeftPanelQuantity: function(data, $leftNavCategory) {		
			$leftNavCategory.append('<span class="' + esCart.ConfigSettings.quantityNumberCssClass + '" style="pointer-events: none;">' + data + '</span>');
		},
		bindCategoryFilterUIAction: function() {
			//console.log('bind category filter event');
			var el = this.configSettings.el;
			$(el.leftNav).bind("click", {}, this.handleCategoryFilterClick);
		},
		//event listeners
		handleCategoryFilterClick: function(event) {
			//console.log('handle category filter click');
			var $el = $(event.target);
			var el = esCart.CategoryFilterUIModule.configSettings.el;
			
			//context
			$(el.leftNav).removeClass(esCart.CategoryFilterUIModule.configSettings.leftNavContextCssClass);
			$el.addClass(esCart.CategoryFilterUIModule.configSettings.leftNavContextCssClass);
			
			//update Header
			//str = str.substring(0, str.length - 1);
			esCart.MiddleUIModule.updateMiddleHeader($el.text().substring(0, $el.text().length - 1));
			
			esCart.CategoryFilterUIModule.getCategoryItems($el);
		},
		getCategoryItems: function($el) {
			var categoryId = $el.attr('id');			
			var urlPath = '';
				
			if (categoryId  * 1.0 === 0)
				urlPath = esCart.ConfigSettings.restServiceUrlPath;
			else
				urlPath = esCart.ConfigSettings.restServiceUrlPath + '/categories/' + categoryId;
			
			//console.log('make ajax xhr call here');	
			$.ajax({
				  url: urlPath,
				  type: 'GET',
				  data: '',
				  success: function(data) {
					//console.log('success, parse response data');
					//console.log(data);					
					  esCart.MiddleUIModule.renderMiddle(true, data, false, false);
				  },
				  error: function(e) {
					console.log('XHR Error');
				  }
			});
		},
		clearLeftNavContext: function() {
			var el = this.configSettings.el;		    
			//left nav context
			$(el.leftNav).removeClass(this.configSettings.leftNavContextCssClass);
		},
		refreshLeftNavContext: function() {
			var el = this.configSettings.el;
			//left nav context
			$(el.leftNav).removeClass(this.configSettings.leftNavContextCssClass).first().addClass(this.configSettings.leftNavContextCssClass);
		},
		bindCategoryFilterHeaderUIAction: function() {
			var el = this.configSettings.el;
			$(el.leftNavHeader).bind("click", {}, this.handleCategoryFilterHeaderClick);			
		},
		//event listener
		handleCategoryFilterHeaderClick: function(event) {
			//page refresh
		    location.reload();
		}
	};
	//End Category Filter UI Module
	
	
	//PRIVATE:
	var privateVar;
	var MY_PRIVATE_CONSTANT = 0;
	var _privateMethod = function() {		
	};

})(window.esCart = window.esCart || {}, jQuery);



