/**
 * @author Haymon Ng
 * Electronics Shopping Cart - Configuration Settings
 * 
 */

(function(esCart, $, undefined) {
	//PUBLIC:
	
	//Configuration Settings
	esCart.ConfigSettings = {
		restServiceUrlPath: "restService/itemService", 
		quantityNumberCssClass: "badge",
		greyContentCssClass: 'well well-sm'
	};
	
	//PRIVATE:
	var privateVar;
	var MY_PRIVATE_CONSTANT = 0;
	var _privateMethod = function() {		
	};
	
})(window.esCart = window.esCart || {}, jQuery);



