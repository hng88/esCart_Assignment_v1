package com.esCart.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.esCart.component.Item;
import com.esCart.service.ItemDao;


/**
 * @author Haymon Ng
 * Spring managed bean MVC Rest Controller for handling requests for DB read service and update DB
 * DI injected itemDAO to interface with DB services
 * HTTP GET method for reads, HTTP PUT method for update
 * Returns JSON response
 * 
 */
@RestController
@RequestMapping("/itemService")
public class ItemController {
	
	@Autowired
	private ItemDao itemDao;
		
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.GET, headers="Accept=application/json")
	public List<Item> getCategoryItems(@PathVariable int id) {
		List<Item> itemList = itemDao.getCategoryItems(id);
		
		System.out.println("Get Category Items");
		System.out.println(itemList);

		return itemList;
	}
	
	@RequestMapping(method = RequestMethod.GET, headers="Accept=application/json")
	public List<Item> getAllItems() {		
		List<Item> itemList = itemDao.getAllItems();
		
		System.out.println("Get All Items");
		System.out.println(itemList);

		return itemList;
	}
	
	@RequestMapping(value = "/updateCart/{id}/{value}", method = RequestMethod.PUT)
	public String updateShoppingCart(@PathVariable int id, @PathVariable int value) {		
		String result = itemDao.updateShoppingCart(id, value);

		System.out.println("Update Shopping Cart");
		System.out.println(result);
		System.out.println(id);
		System.out.println(value);
		
		return result;
	}
	
	@RequestMapping(value = "/cart", method = RequestMethod.GET, headers="Accept=application/json")
	public List<Item> getAllShoppingCartItems() {		
		List<Item> itemList = itemDao.getAllShoppingCartItems();
		
		System.out.println("Get All Shopping Cart Items");
		System.out.println(itemList);

		return itemList;
	}
	
	@RequestMapping(value = "/categories/count/{id}", method = RequestMethod.GET)
	public int getNumOfCategoryItems(@PathVariable int id) {
		int numOfCategoryItems = itemDao.getNumOfCategoryItems(id);
		
		System.out.println("Get Number of Category Items");
		System.out.println(numOfCategoryItems);

		return numOfCategoryItems;
	}
	
	@RequestMapping(value = "/count/all", method = RequestMethod.GET)
	public int getTotalNumOfItems() {
		int totalNumOfItems = itemDao.getTotalNumOfItems();
		
		System.out.println("Get Total Number of Items");
		System.out.println(totalNumOfItems);

		return totalNumOfItems;
	}
	
	@RequestMapping(value = "/search/{input}", method = RequestMethod.GET, headers="Accept=application/json")
	public List<Item> getSearchResults(@PathVariable String input) {		
		List<Item> itemList = itemDao.getSearchResults(input);
		
		System.out.println("Get Search Results");
		System.out.println(itemList);

		return itemList;
	}

	
	
}



