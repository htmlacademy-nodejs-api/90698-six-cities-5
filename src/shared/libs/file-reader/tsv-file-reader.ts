import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType } from '../../types/index.js';
import { Comfort } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postData,city, preview, image, premium, favourites, rating, type, room, guests, price, comfort, firstname, email, avatarPath, password, userType, comments, coordinates]) => ({
        title,
        description,
        postData,
        city,
        preview,
        image,
        premium: premium === 'true',
        favourites: favourites === 'true',
        rating: Number.parseFloat(rating),
        type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        room: Number.parseInt(room, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        comfort: comfort.split(';')
          .map((comforts) => Comfort[comforts as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
        user: { firstname, email, avatarPath, password, userType },
        comments: Number.parseInt(comments, 10),
        coordinates,
      }));
  }
}
