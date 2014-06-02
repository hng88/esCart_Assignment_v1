/**
 * @author Haymon Ng
 * Search Filter UI Module
 * Interface to Spring RESTful controller web service via AJAX and JSON
 * 
 */

(function(esCart, $, undefined) {
	//PUBLIC:
	
	//Search Filter for Items in DB	
	esCart.SearchFilterUIModule = {
		//default settings
		configSettings: {
			el: {
				searchInputField: 'input#search-input-field'
			},
			test: 0
		},
		init: function(config) {
			console.log('Init Search Filter UI Module');
			//override or add new config settings
		    if (config && typeof(config) === 'object') {
		        $.extend(esCart.SearchFilterUIModule.configSettings, config);
		    }		
		    
			var el = this.configSettings.el;
			
			this.bindSearchInputUIAction();
		},
		bindSearchInputUIAction: function() {
			//console.log('bind search input event');
			var el = this.configSettings.el;
			$(el.searchInputField).bind("change", {}, this.handleSearchInputChange);
		},
		//event listeners
		handleSearchInputChange: function(event) {
			//console.log('handle search input change');
			var $el = $(event.target);
			var el = esCart.SearchFilterUIModule.configSettings.el;
			
			//TODO: sanitize user input
			var sanitizeUserInput = $el.val();
			
			if (sanitizeUserInput.length > 1) {
				var urlPath = "/search/" + sanitizeUserInput;
				
				$.ajax({
					  url: esCart.ConfigSettings.restServiceUrlPath + urlPath,
					  type: 'GET',
					  data: '',
					  success: function(data) {
						//console.log('success, parse response data');
						//console.log(data); 
						  esCart.CategoryFilterUIModule.clearLeftNavContext();
						  esCart.MiddleUIModule.updateMiddleHeader("Results found for: " + sanitizeUserInput);										
						  esCart.MiddleUIModule.renderMiddle(true, data, true, false);
					  },
					  error: function(e) {
						console.log('XHR Error');
					  }
				});
			}
		}
	};
	//End Search Filter UI Module
	
	
	//PRIVATE:
	var privateVar;
	var MY_PRIVATE_CONSTANT = 0;
	var _privateMethod = function() {		
	};

})(window.esCart = window.esCart || {}, jQuery);



