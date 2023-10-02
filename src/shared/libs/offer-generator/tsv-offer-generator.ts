//import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType, Comfort } from '../../types/index.js';
import { generateRandomValue, getRandomItem } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM = 1;
const MAX_ROOM = 4;

const MIN_GUESTS = 1;
const MAX_GUESTS = 4;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

//const FIRST_WEEK_DAY = 1;
//const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const image = getRandomItem<string>(this.mockData.images);
    const isPremium = getRandomItem(['true', 'false']);
    const isFavorite = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem([OfferType.Apartment, OfferType.House, OfferType.Room, OfferType.Hotel]);
    const room = generateRandomValue(MIN_ROOM, MAX_ROOM).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comfort = getRandomItem([Comfort.AirConditioning, Comfort.BabySeat, Comfort.Breakfast, Comfort.Fridge, Comfort.Washer]);
    const user = getRandomItem(this.mockData.firstname);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarsPath);

    return [
      title, description,
      city, preview, image, rating,
      type, price, room, guests,
      comfort, email, user, avatarPath,
      isPremium, isFavorite
    ].join('\t');
  }
}