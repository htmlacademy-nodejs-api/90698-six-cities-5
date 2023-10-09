import { OfferType } from '../../../types/index.js';
import { Comfort } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public preview: string;
  public image: string;
  public premium: boolean;
  public favourites: boolean;
  public rating: number;
  public type: OfferType;
  public room: number;
  public guests: number;
  public price: number;
  public comfort: Comfort[];
  public userId: string;
  public coordinates: string;
}
