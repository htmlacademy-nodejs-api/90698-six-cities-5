import { OfferType } from './offer-type.enum.js';
import { Comfort } from './comfort-type.enum.js';
import { User } from './user.type.js';
import { City } from './city-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  image: string;
  premium: boolean;
  rating: number;
  type: OfferType;
  room: number;
  guests: number;
  price: number;
  comfort: Comfort[];
  user: User;
  commentCount: number;
  latitude: number;
  longitude: number;

}
