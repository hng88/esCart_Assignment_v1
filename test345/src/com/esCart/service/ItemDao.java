package com.esCart.service;

import java.util.List;

import com.esCart.component.Item;



/**
 * @author Haymon Ng
 * The interface for the DAO layer of the shopping cart DB table of various services
 * 
 */
public interface ItemDao {
	
	public List<Item> getAllItems();
	public List<Item> getCategoryItems(int id);
	public String updateShoppingCart(int id, int value);
	public List<Item> getAllShoppingCartItems();
	public int getNumOfCategoryItems(int id);
	public int getTotalNumOfItems();
	public List<Item> getSearchResults(String input);

	
}






