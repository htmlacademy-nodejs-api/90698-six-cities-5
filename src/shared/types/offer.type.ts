import { OfferType } from './offer-type.enum.js';
import { Comfort } from './comfort-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  preview: string;
  image: string;
  premium: boolean;
  favourites: boolean;
  rating: number;
  type: OfferType;
  room: number;
  guests: number;
  price: number;
  comfort: Comfort[];
  user: User;
  comments: number;
  coordinates: string;

}
