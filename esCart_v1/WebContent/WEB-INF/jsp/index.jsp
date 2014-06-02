<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Electronics Shopping Cart</title>		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/cart.css" type="text/css" media="all">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap.css" type="text/css" media="all">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap-theme.css" type="text/css" media="all">
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/lib/jquery-1.7.js'></script>		
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/lib/bootstrap.js'></script>
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/esCart.ConfigSettings.js'></script>
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/esCart.MiddleUIModule.js'></script>
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/esCart.ShoppingCartUIModule.js'></script>
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/esCart.CategoryFilterUIModule.js'></script>
		<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/esCart.SearchFilterUIModule.js'></script>		
		
		<script type="text/javascript">
			$(function(){
				//Init UI Modules
				esCart.MiddleUIModule.init({
					addToCartText: "Add to Cart (+)",
					removeFromCartText: "Remove (-)"
				});		
				esCart.ShoppingCartUIModule.init();
				esCart.CategoryFilterUIModule.init();
				esCart.SearchFilterUIModule.init();
				
				//all initizialized. hide them and fade them in
				$('div#scLeftNav').hide().fadeIn("slow");
				$(esCart.MiddleUIModule.configSettings.el.middleContentContainer).hide().fadeIn("slow");
				$(esCart.ShoppingCartUIModule.configSettings.el.rightPanelContainer).hide().fadeIn("slow");
				$('div#rightPanelSubtotal').hide().fadeIn("slow");
			});
		</script>
	</head>

	<body>
		<!-- Bootstrap Header -->
		<nav class="navbar navbar-default list-group-item active" role="navigation" style="background: -moz-linear-gradient(center top , #0079BC, #00509D) repeat scroll 0 0 rgba(0, 0, 0, 0);">
			<div class="container-fluid" style="width: 1130px; padding-left: 40px;">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="." style="color: white; font-size: 20px;">Electronics Shopping Cart</a>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<form class="navbar-form navbar-left" role="search" style="margin-left: -15px;" onsubmit="return false;">
						<div class="form-group">
							<input id="search-input-field" type="text" class="form-control" placeholder="Search Electronics Store" style="width: 670px; height: 45px; font-size: 17px;" />
						</div>
						<button class="btn btn-default" style="font-size: 17px; font-weight: normal; line-height: 1.6; width: 100px; background-image: none !important; background-color: #F5F5F5;">Search</button>
					</form>
				</div>
				<!-- /.navbar-collapse -->
			</div>
			<!-- /.container-fluid -->
		</nav>
		<!-- Bootstrap Header end -->

		<!-- Main -->
		<div id="scContainer">
	        <div id="scLeftNav">
	        	<div id="category-filter-header" class="list-group-item active" style="color: white; font-weight: bold;">Categories</div>
				<div class="left-nav list-group-item" id="0">All</div>
				<div class="left-nav list-group-item" id="1">Notebooks</div>
				<div class="left-nav list-group-item" id="2">Tablets</div>
				<div class="left-nav list-group-item" id="3">Desktop PCs</div>
				<div class="left-nav list-group-item" id="4">Televisions</div>
	        </div>
			
			<div id="middleContent">
				<table id="middleContentItems" border="0">
					<thead>
						<tr>
							<td id="middle-content-header" class="list-group-item active" style="color: white; font-weight: bold; display: table-cell; border: none !important;" colspan="3">
								All
							</td>			
						</tr>
					    <tr>
					    	<td width="280" class="center alert alert-warning" style="padding: 9px; font-weight: bold;">Description</td>
					    	<td width="50" class="center alert alert-warning" style="padding: 9px; font-weight: bold;">Price</td>
					    	<td width="80" class="center alert alert-warning" style="padding: 9px;"></td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			
			<div id="rightPanel">
				<div id="my-shopping-cart" class="center alert alert-danger" style="font-weight: bold; margin-bottom: 1px; padding: 9px;">
					My Shopping Cart
					<span id="numCartItems">14</span>
				</div>
				<div id="cartPanelContents"></div>
			</div>
			<div id="rightPanelSubtotal" class="list-group-item active" style="padding: 5px;">
				<div id="rightPanelSubtotalTitle">Subtotal</div>
				<div id="sumSubtotal">0.00</div>
				<div id="item-checkout" class="btn btn-danger" style="float:right; margin-top: 10px;">Checkout</div>
			</div>
		</div>
		<!-- Main End -->
		
		<!-- Bootstrap Footer -->
		<div id="footer">
			<div class="container" style="width: 1070px; text-align: right;">
				<p class="text-muted">MIR = Mail in Rebate, IR = Instant Rebate. Prices are in Canadian dollars. </p>
			</div>
		</div>
		<!-- Bootstrap Footer End -->
	</body>

</html>


