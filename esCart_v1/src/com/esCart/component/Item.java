package com.esCart.component;

import org.springframework.stereotype.Component;

/**
 * @author Haymon Ng
 * Spring managed bean for an Item model of the shopping cart (domain) business object
 * 
 */
@Component
public class Item {

	private int id;
	private int categoryId;
	private String name;
	private double price;	
	private boolean inCart;
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return id;
	}
	
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	
	public int getCategoryId() {
		return categoryId;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setInCart(boolean inCart) {
		this.inCart = inCart;
	}
	
	public boolean isInCart() {
		return inCart;
	}
	
		
		
}