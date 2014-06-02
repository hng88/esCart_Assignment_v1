package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.esCart.component.Item;
import com.esCart.service.ItemDao;

/**
 * @author Haymon Ng
 * Unit Test for ItemDao
 * 
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "ItemDaoTest-context.xml" })
public class ItemDaoTest {

	@Autowired
	private ItemDao itemDao;
	
    @Before
    public void setUp() {
    	System.out.println("Setup unit test");    	
    }

	@Test
	public void testGetAllItems() {
		System.out.println("Test Get All Items");
		
		List<Item> testResult = itemDao.getAllItems();
		
		assertNotNull("Not null", testResult);
		assertTrue("Size is greater than 1", testResult.size() > 1);
		assertEquals("Size is 10", 10, testResult.size());
	}
	
	@Test
	public void testGetCategoryItems() {
		System.out.println("Test Get Category Items");
		
		List<Item> testResult = itemDao.getCategoryItems(3);
		
		assertNotNull("Not null", testResult);
		assertTrue("Size is greater than 1", testResult.size() > 1);
		assertEquals("Size is 5", 5, testResult.size());
	}
	
	@Test
	public void testUpdateShoppingCart() {
		System.out.println("Test Update Shopping Cart");
		
		String testResult = itemDao.updateShoppingCart(1, 4);
		
		assertNotNull("Not null", testResult);
		assertEquals("Result is success", "success", testResult);
	}
	
    @After
    public void tearDown() {
        System.out.println("Tear down unit test");
    }	
    


}

