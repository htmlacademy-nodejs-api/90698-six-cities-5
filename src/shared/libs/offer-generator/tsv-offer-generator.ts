import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType, UserType, City } from '../../types/index.js';
import { getRandomItem, getRandomItems, generateRandomValue} from '../../helpers/index.js';

const RATING = {
  MIN: 1,
  MAX: 5,
};

const ROOM = {
  MIN: 1,
  MAX: 4,
};

const GUESTS = {
  MIN: 1,
  MAX: 4,
};

const PRICE = {
  MIN: 500,
  MAX: 2000
};

const LONGITUDE = {
  MIN: 10,
  MAX: 200
};

const LATITUDE = {
  MIN: 10,
  MAX: 100,
};

const WEEK_DAY = {
  FIRST: 1,
  LAST: 7,
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(WEEK_DAY.FIRST, WEEK_DAY.LAST), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities) as keyof typeof City;
    const preview = getRandomItem<string>(this.mockData.previews);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const premium = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(RATING.MIN, RATING.MAX).toString();
    const type = getRandomItem([OfferType.Apartment, OfferType.House, OfferType.Room, OfferType.Hotel]);
    const room = generateRandomValue(ROOM.MIN, ROOM.MAX).toString();
    const guests = generateRandomValue(GUESTS.MIN, GUESTS.MAX).toString();
    const price = generateRandomValue(PRICE.MIN, PRICE.MAX).toString();
    const comfort = getRandomItems<string>(this.mockData.comforts).join(';');
    const firstname = getRandomItem(this.mockData.firstname);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarsPath);
    const userType = getRandomItem([UserType.Ordinary, UserType.Pro]);
    const latitude = generateRandomValue(LATITUDE.MIN, LATITUDE.MAX).toString();
    const longitude = generateRandomValue(LONGITUDE.MIN, LONGITUDE.MAX).toString();

    return [
      title, description,
      postDate, city,preview, images, premium, rating,
      type, room, guests, price,
      comfort, firstname, email, avatarPath, userType,
      longitude, latitude,
    ].join('\t');
  }
}
