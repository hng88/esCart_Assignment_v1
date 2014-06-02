package com.esCart.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.esCart.component.Item;


/**
 * @author Haymon Ng
 * Implementation of the DAO services for DB read and update via Spring JDBCTemplate
 * Spring managed bean service
 * DI injected DataSource to interface with Derby DB
 * TODO: possibly use an ORM, Unit Test Cases
 * 
 */
@Repository
public class ItemDaoImpl implements ItemDao {
	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;
	
	public List<Item> getAllItems() {
		System.out.println("Run getAllItems SQL Query");
		return jdbcTemplate.query("SELECT * from SHOPPINGCART.items", new UserMapper());
	}
	
	public List<Item> getCategoryItems(int categoryId) {
		System.out.println("Run getCategoryItems SQL Query");
		return jdbcTemplate.query("SELECT * from SHOPPINGCART.items WHERE category_id = ?", new UserMapper(), new Object[] { categoryId });
	}
	
	private static final class UserMapper implements RowMapper<Item> {
		public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
			
			Item item = new Item();
			item.setId(rs.getInt("id"));
			item.setCategoryId(rs.getInt("category_id"));
			item.setName(rs.getString("name"));
			item.setPrice(rs.getDouble("price"));
			item.setInCart(rs.getBoolean("in_cart"));
			
			return item;
		}
	}
	
	public String updateShoppingCart(int id, int value) {
		System.out.println("Run updateShoppingCart SQL Query");
		
		String result = "";
		Boolean inCart = false;
		
		if (value == 0)
			inCart = false;
		else
			inCart = true;
			
		int numRows = jdbcTemplate.update("UPDATE SHOPPINGCART.items SET in_cart = ? WHERE id = ?", 
                inCart, id);
		
		if (numRows == 1)
			result = "success";
		else
			result = "failure";
		
		return result;
	}
	
	public List<Item> getAllShoppingCartItems() {
		System.out.println("Run getAllShoppingCartItems SQL Query");
		return jdbcTemplate.query("SELECT * from SHOPPINGCART.items WHERE in_cart = true", new UserMapper());
	}
	
	public int getNumOfCategoryItems(int id) {		 
		System.out.println("Run getNumOfCategoryItems SQL Query");
		int count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM SHOPPINGCART.items WHERE category_id = ?", new Object[] { id }, Integer.class);
		
		return count;
	}
	
	public int getTotalNumOfItems() {
		System.out.println("Run getTotalNumOfItems SQL Query");
		int count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM SHOPPINGCART.items", Integer.class);
		
		return count;
	}
	
	public List<Item> getSearchResults(String input) {
		System.out.println("Run getSearchResults SQL Query");
		String userInput = '%' + input + '%';
		return jdbcTemplate.query("SELECT * from SHOPPINGCART.items WHERE name LIKE ?", new String[] { userInput }, new UserMapper());
	}
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(this.dataSource);
	}

	public DataSource getDataSource() {
		return dataSource;
	}

}








