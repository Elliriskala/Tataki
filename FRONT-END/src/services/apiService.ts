import { Menu } from "../utils/interfaces";

export const apiBaseUrl = "http://localhost:3000/api";

// Fetching the menu items from the database

export const fetchMenuItems = async (): Promise<Menu[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/menus`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Fetching the menu items from the database based on the category
export const fetchMenuItemsByCategory = async (category: string): Promise<Menu[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/menus/category/${category}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    throw error;
  }
};

// fetch special menus from the database
export const fetchSpecialMenus = async (): Promise<Menu[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/menus/specials/1`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching special menus:", error);
    throw error;
  }
};

// fetch item details from database (name, price)
export const fetchItemDetails = async (itemId: number) => {
    try {
      const response = await fetch(`${apiBaseUrl}/menus/${itemId}`);
  
      const rawResponse = await response.text();
      console.log("Raw response:", rawResponse);
  
      if (!response.ok) {
        throw new Error(`Error fetching item details: ${response.statusText}`);
      }
  
      const itemArray = JSON.parse(rawResponse);
  
      if (!itemArray || itemArray.length === 0) {
        console.error("Item not found");
        return null;
      }
  
      const item = itemArray[0];
      return item;
    } catch (error) {
      console.error("fetchItemDetails error:", error);
      throw new Error("Failed to fetch item details");
    }
  };


// fetch user info to fill in the order fields if user is logged in
export const fetchUserInfo = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("No auth token found. User not logged in");
      return null;
    }
    
    try {
        const response = await fetch(`${apiBaseUrl}/users/user`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching user info: ${response.statusText}`);
        }

        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error("fetchUserInfo error:", error);
        throw new Error("Failed to fetch user info");
    }
};
