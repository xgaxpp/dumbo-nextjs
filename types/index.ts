// 房源相关类型
export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: string;
  status: 'active' | 'inactive' | 'draft';
  images: string[];
  stats: {
    rating: number;
    reviews: number;
    occupancyRate: string;
    monthlyRevenue: string;
    bookings: number;
    views: number;
  };
  rules: {
    checkIn: string;
    checkOut: string;
    minStay: number;
    maxStay: number;
    instantBook: boolean;
  };
  recentBookings: Booking[];
  recentReviews: Review[];
}

// 预订相关类型
export interface Booking {
  id: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending';
  amount: string;
}

// 评价相关类型
export interface Review {
  id: string;
  guest: string;
  rating: number;
  comment: string;
  date: string;
} 