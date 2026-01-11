import { db } from "./db";
import { products, cartItems, orders, type Product, type InsertProduct, type CartItem, type InsertCartItem, type Order, type InsertOrder } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder & { items: any[], total: number }): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    // Join manually or fetch products
    const result = [];
    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (product) {
        result.push({ ...item, product });
      }
    }
    return result;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(cartItems).values(item).returning();
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  // Orders
  async createOrder(order: InsertOrder & { items: any[], total: number }): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
}

export const storage = new DatabaseStorage();
