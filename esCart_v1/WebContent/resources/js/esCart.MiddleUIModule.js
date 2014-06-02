/**
 * @author Haymon Ng
 * Middle Content Display UI Module
 * Interface to Spring RESTful controller web service via AJAX and JSON * 
 * 
 */

(function(esCart, $, undefined) {
	//PUBLIC:
	
	//Middle Content Display	
	esCart.MiddleUIModule = {
		//default settings
		configSettings: {
			el: {
				middleContent: 'table#middleContentItems tbody',
				addToCartBtn: 'td.add-to-cart',
				middleContentHeader: 'td#middle-content-header',
				middleContentContainer: 'div#middleContent',
				tableContentContainer: 'table#middleContentItems',
				myCartQuantityId: 'my-cart-quantity'
			},
			addToCartText: "Add",
			removeFromCartText: "Remove",
			greenBtnCssClass: "alert-success",
			blueBtnCssClass: "alert-info",
			descAndPriceCssClass: 'list-group-item2'
		},
		init: function(config) {
			console.log('Init Middle UI Module');			
			//override or add new config settings
		    if (config && typeof(config) === 'object') {
		        $.extend(esCart.MiddleUIModule.configSettings, config);
		    }
			this.getAllItems();
		},
		getAllItems: function() {
			//console.log('make ajax xhr call here');			
			$.ajax({
				  url: esCart.ConfigSettings.restServiceUrlPath,
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
		//Update Middle UI (Name and Price) according to JSON response
		renderMiddle: function(includeSideCart, data, forSearch, forCheckout) {
			var el = this.configSettings.el;
			
			this.insertQuantity(data);
			this.shrinkOrEnlargeTable(includeSideCart);
			$(el.middleContent).empty();
			
			this.populateShoppingCartItems(data, forSearch, forCheckout);
			
			//bind based on having side panel or not
			this.bindAddToCartUIAction(includeSideCart);
			
			if (includeSideCart) {
				//restore the side cart panel
				esCart.ShoppingCartUIModule.getCurrentCart("sideCart");
			}
		},
		bindAddToCartUIAction: function(includeSideCart) {
			//Add to Cart Button
			//console.log('bind add to cart event');
			var el = this.configSettings.el;
			$(el.addToCartBtn).bind("click", {includeSideCart: includeSideCart}, this.handleAddToCartClick);		
		},
		//event listeners
		handleAddToCartClick: function(event) {
			//console.log('handle add to cart click');
			var $el = $(event.target);
			var id = $el.parent().attr('id');
			var value;
			
			if ($el.text() === esCart.MiddleUIModule.configSettings.addToCartText)
				value = 1;
			else
				value = 0;			
			
			$.ajax({
				  url: esCart.ConfigSettings.restServiceUrlPath + '/updateCart/' + id + '/' + value,
				  type: 'PUT',
				  data: '',
				  success: function(data) {
					//console.log('success, parse response data');
					//console.log(data); 
					//console.log(value);
					  if (data === "success") {
						  esCart.MiddleUIModule.renderAddToCartBtn($el, value);
						  
						  //render side cart panel or not
						  if (event.data.includeSideCart) {
							  //false to only fade in the items
							  esCart.ShoppingCartUIModule.init();
						  }							  
						  else {
							  esCart.ShoppingCartUIModule.getCurrentCart("subtotal");
						  }							  
					  }
					  else {
						  console.log('Update failed.');
					  }						  
				  },
				  error: function(e) {
					console.log('XHR Error');
				  }
				});
		},
		renderAddToCartBtn: function($el, value) {			
			if (value === 1) {
				$el.text(this.configSettings.removeFromCartText).removeClass(this.configSettings.greenBtnCssClass).addClass(this.configSettings.blueBtnCssClass);
			}
			else {
				$el.text(this.configSettings.addToCartText).removeClass(this.configSettings.blueBtnCssClass).addClass(this.configSettings.greenBtnCssClass);
			}		
		},
		updateMiddleHeader: function(text) {
			var el = this.configSettings.el;
			$(el.middleContentHeader).text(text);
		},
		updateQuantity: function(number) {
			var el = this.configSettings.el;
			$('span#' + el.myCartQuantityId).text(number + "");
		},
		updateWidth: function(divContainerPixels, tableContainerPixels) {
			var el = this.configSettings.el;
			$(el.middleContentContainer).width(divContainerPixels);
			$(el.tableContentContainer).width(tableContainerPixels);
		},
		insertQuantity: function(data) {
			var el = this.configSettings.el;
			//clear any existing quantity
			$('span#' + el.myCartQuantityId).remove();
			//insert quantity
			$(el.middleContentHeader).append('<span id="' + el.myCartQuantityId + '" class="' + esCart.ConfigSettings.quantityNumberCssClass + '">' + data.length + '</span>');			
		},
		shrinkOrEnlargeTable: function(includeSideCart) {
			//shrink or enlarge based on context
			if (includeSideCart) {
				//decrease width
				this.updateWidth(640, 620);				
			}
			else {
				//increase width
				this.updateWidth(830, 830);
			}	
		},
		populateShoppingCartItems: function(data, forSearch, forCheckout) {
			var el = this.configSettings.el;
			var string = '';
			var itemInCartBtn;
			var cssClass;
			
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i].name);
				//console.log(data[i].price);
				//console.log(data[i].inCart);
				
				if (data[i].inCart === true) {
					itemInCartBtn = this.configSettings.removeFromCartText;
					cssClass = this.configSettings.blueBtnCssClass;
				}
				else {
					itemInCartBtn = this.configSettings.addToCartText;
					cssClass = this.configSettings.greenBtnCssClass;
				}
				
				string += '<tr id="' + data[i].id + '">';
					string += '<td class="' + this.configSettings.descAndPriceCssClass + '" style="padding: 10px;">';
						string += data[i].name;
					string += '</td>';
					string += '<td class="center ' + this.configSettings.descAndPriceCssClass + '">';
						string += '$' + data[i].price;
					string += '</td>';
					
					if (!forCheckout) {
						string += '<td class="add-to-cart center alert ' + cssClass + '" style="padding: 4px;">';
							string += itemInCartBtn;
						string += '</td>';
					}
					else {
						string += '<td class="' + esCart.ConfigSettings.greyContentCssClass + '" style="padding: 4px;">';
							string += "";
						string += '</td>';
					}
				string += '</tr>';			
			}
			
			//empty cart
			if (data.length === 0) {
				if (!forSearch) {
					string += '<tr>';
						string += '<td class="' + esCart.ConfigSettings.greyContentCssClass + '" style="padding: 10px;" colspan="3">';
							string += "Your Shopping Cart is empty.";
						string += '</td>';
					string += '</tr>';					
				}
				else {
					string += '<tr>';
						string += '<td class="' + esCart.ConfigSettings.greyContentCssClass + '" style="padding: 10px;" colspan="3">';
							string += "0 results found.";
						string += '</td>';
					string += '</tr>';	
				}
			}				
			
			$(el.middleContent).append(string);
		}
	};
	//End Middle UI Module
	
	//PRIVATE:
	var privateVar;
	var MY_PRIVATE_CONSTANT = 0;
	var _privateMethod = function() {		
	};
	
})(window.esCart = window.esCart || {}, jQuery);







