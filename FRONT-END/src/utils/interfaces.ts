import { Request } from "express";

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
  phone_number?: string;
  password_hash: string;
  user_level_id: number;
  customer_address?: string;
  city?: string;
}

interface UserLoggedIn {
  user_id: number;
  username: string;
  email: string;
  phone_number?: string;
  user_level_id: number;
  token: string;
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
  quantity: number;
}

interface Allergen {
  allergen_id: number;
  menu_id: number;
  allergen_description: string;
}

interface OrderStatus {
  status_id: number;
  status_name: "Pending" | "In progress" | "Completed";
}

interface Order {
  order_id: number;
  user_id?: number;
  customer_name: string;
  total_price: number;
  delivery_address?: string;
  city?: string;
  delivery_instructions?: string;
  order_type: string;
  status_id: number;
  order_status?: string;
  general_comment?: string;
  is_delivery: boolean;
  created_at: Date;
  order_items: OrderItem[];
}

interface OrderItem {
  order_item_id: number;
  order_id: number;
  menu_id: number;
  course_name: string;
  item_quantity: number;
}

interface Reservation {
  reservation_id?: number;
  user_id: number | null;
  reservation_date: string;
  email: string;
  phone_number: string;
  full_name: string;
  reservation_time: string;
  guests: string | number;
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

interface Translation {
  [lang: string]: {
    [key: string]: string;
  };
}

interface TimeSlot {
  time: string;
  availableSeats: number;
}
interface Times {
  availableTimes: [string];
}

export type {
  Itinerary,
  Leg,
  Trip,
  Location,
  Stop,
  UserLevel,
  User,
  ModifiedUser,
  Menu,
  Allergen,
  OrderStatus,
  Order,
  OrderItem,
  Reservation,
  FoodReview,
  RestaurantReview,
  AuthenticatedRequest,
  UserLoggedIn,
  Translation,
  TimeSlot,
  Times,
};
