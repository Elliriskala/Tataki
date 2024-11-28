import { Request } from 'express';

interface Itinerary {
  duration: number;
  legs: Leg[];
}

interface Leg {
  mode: string;
  trip?: Trip;
  from: Location;
  to: Location;
  startTime: number;
  endTime: number;
  distance: number;
}

interface Trip {
  tripHeadsign: string;
  routeShortName: string;
}

interface Location {
  lat: number;
  lon: number;
  name: string;
  stop?: Stop;
}

interface Stop {
  code: string;
  name: string;
}

// Database table interfaces

interface UserLevel {
  level_id: number;
  level_name: string;
}

interface User {
  user_id?: number;
  username: string;
  email: string;
  password_hash: string;
  user_level_id: number;
}

interface UserLoggedIn {
  user_id: number;
  username: string;
  email: string;
  token: string;
  user_level_id: number;
}

interface ModifiedUser {
  username: string;
  email: string;
  password_hash: string;
  user_level_id: number;
}

interface Menu {
  menu_id: number;
  course_name: string;
  course_description: string;
  price: number;
  allergens?: Allergen[];
  menu_image: string;
  category: string;
}

interface Allergen {
  allergen_id: number;
  menu_id: number;
  allergen_description: string;
}

interface Order {
  order_id: number;
  user_id: number;
  order_type: string;
  order_status: string;
  created_at: Date;
  order_items: OrderItem[];
}

interface OrderItem {
  order_item_id: number;
  order_id: number;
  menu_id: number;
  item_quantity: number;
  comment?: string;
}

interface Reservation {
  reservation_id?: number;
  user_id: number;
  reservation_date: string;
  reservation_time: string;
  guests: string;
  created_at?: Date;
}

interface FoodReview {
  review_id?: number;
  user_id: number;
  menu_id: number;
  review: string;
  star_rating: number;
  created_at?: Date;
}

interface RestaurantReview {
  review_id?: number;
  user_id: number;
  review: string;
  star_rating: number;
  created_at?: Date;
}

interface AuthenticatedRequest extends Request {
  user?: string | object;
  headers: {
      authorization?: string;
      [key: string]: any;
  };
}

export type { Itinerary, Leg, Trip, Location, Stop, UserLevel, User, ModifiedUser, Menu, Allergen, Order, OrderItem, Reservation, FoodReview, RestaurantReview, AuthenticatedRequest, UserLoggedIn };


