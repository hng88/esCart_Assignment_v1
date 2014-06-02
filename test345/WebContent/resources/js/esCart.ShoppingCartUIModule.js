/**
 * @author Haymon Ng
 * Shopping Cart UI Module
 * Interface to Spring RESTful controller web service via AJAX and JSON
 * 
 */

(function(esCart, $, undefined) {
	//PUBLIC:
	
	//Shopping Cart UI Module
	esCart.ShoppingCartUIModule = {
		//default settings
		configSettings: {
			el: {
				cartPanelContents: 'div#cartPanelContents',
				subTotal: 'div#sumSubtotal',
				numCartItems: 'span#numCartItems',
				myShoppingCart: 'div#my-shopping-cart',
				rightPanelContainer: 'div#rightPanel',
				checkoutBtn: 'div#item-checkout'
			},
			cartPanelContentStyles: 'margin-bottom: 1px;'			
		},
		init: function(config) {
			console.log('Init Shopping Cart UI Module');
			//override or add new config settings
		    if (config && typeof(config) === 'object') {
		        $.extend(esCart.ShoppingCartUIModule.configSettings, config);
		    }
		    this.bindMyShoppingCartUIAction();
			this.getCurrentCart("sideCart");
			this.bindMyCheckoutUIAction();
		},
		bindMyShoppingCartUIAction: function() {
			var el = this.configSettings.el;
			var $eventHandlers = $(el.myShoppingCart).data('events');			
			if (!$eventHandlers) {
				//bind only if there is no existing event handler
				$(el.myShoppingCart).bind("click", {}, this.handleMyShoppingCartClick);	
			}
		},
		//event listeners
		handleMyShoppingCartClick: function() {
			esCart.ShoppingCartUIModule.getCurrentCart("myCart");
		},		
		getCurrentCart: function(cartType) {
			//console.log('get current cart');
			$.ajax({
				  url: esCart.ConfigSettings.restServiceUrlPath + '/cart',
				  type: 'GET',
				  data: '',
				  success: function(data) {
					//console.log('success, parse response data');
					//console.log(data); 
					  
					  if (cartType === "sideCart") {
						  //render the side cart and include the cart items
						  esCart.ShoppingCartUIModule.renderSideCart(data, true);
					  }
					  else if (cartType === "myCart") {
						  //render the My Shopping Cart only
						  esCart.ShoppingCartUIModule.renderMyCart(data);
					  }						  
					  else if (cartType === "subtotal") {
						  //render the side cart but don't include the cart items
						  //this is done for the subtotal only
						  esCart.ShoppingCartUIModule.renderSideCart(data, false);
					  }
					  else if (cartType === "myCheckout") {
						  //render the My Checkout only
						  esCart.ShoppingCartUIModule.renderMyCheckout(data);
					  }
				  },
				  error: function(e) {
					console.log('XHR Error');
				  }
			});
		},
		renderSideCart: function(data, includeItems) {
			//console.log('render cart panel');
			var el = this.configSettings.el;
			
			//repopulate side cart with current items
			$(el.rightPanelContainer).show();
			$(el.cartPanelContents).empty();
			
			this.populateSideCartItems(data);

			//TODO: can implement a REST controller for returning the total count of items in the cart
			
			//quantity
			$(el.numCartItems).text((data.length) + "").addClass(esCart.ConfigSettings.quantityNumberCssClass);
	
			if (!includeItems) {
				//hide side cart if context is on main shopping cart
				$(el.rightPanelContainer).hide();	
				//quantity
				esCart.MiddleUIModule.updateQuantity(data.length);
			}				
		},
		renderMyCart: function(data) {
			//the main shopping cart
			var el = this.configSettings.el;
			$(el.rightPanelContainer).hide();			
			esCart.CategoryFilterUIModule.clearLeftNavContext();
			//render My Shopping Cart middle
			esCart.MiddleUIModule.updateMiddleHeader("My Shopping Cart");					
			esCart.MiddleUIModule.renderMiddle(false, data, false, false);			
		},
		populateSideCartItems: function(data) {
			var el = this.configSettings.el;
			var string = '';
			var concatName;
			var sumSubtotal = 0;
			
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i].name);
				//console.log(data[i].price);
				concatName = data[i].name.slice(0, 20) + "...";
				
				string += '<div class="' + esCart.ConfigSettings.greyContentCssClass + '" style="' + this.configSettings.cartPanelContentStyles + '">';
					string += concatName;
				string += '</div>';						
				
				sumSubtotal += data[i].price;
			}
			
			//empty cart
			if (data.length === 0) {
				string += '<div class="' + esCart.ConfigSettings.greyContentCssClass + '" style="' + this.configSettings.cartPanelContentStyles + '">';
					string += "Your Shopping Cart is empty.";
				string += '</div>';	
			}				
		
			$(el.cartPanelContents).append(string);
			
			//subtotal
			$(el.subTotal).text('$' + sumSubtotal.toFixed(2));
		},
		bindMyCheckoutUIAction: function() {
			var el = this.configSettings.el;
			var $eventHandlers = $(el.checkoutBtn).data('events');			
			if (!$eventHandlers) {
				//bind only if there is no existing event handler
				$(el.checkoutBtn).bind("click", {}, this.handleMyCheckoutClick);	
			}
		},
		//event listener
		handleMyCheckoutClick: function() {
			esCart.ShoppingCartUIModule.getCurrentCart("myCheckout");			
		},
		renderMyCheckout: function(data) {
			//the main checkout
			var el = this.configSettings.el;
			$(el.rightPanelContainer).hide();			
			esCart.CategoryFilterUIModule.clearLeftNavContext();
			esCart.MiddleUIModule.updateMiddleHeader("My Checkout");					
			esCart.MiddleUIModule.renderMiddle(false, data, false, true);		
		}
	};
	//End Shopping Cart UI Module

	
	//PRIVATE:
	var privateVar;
	var MY_PRIVATE_CONSTANT = 0;
	var _privateMethod = function() {		
	};
	
})(window.esCart = window.esCart || {}, jQuery);





