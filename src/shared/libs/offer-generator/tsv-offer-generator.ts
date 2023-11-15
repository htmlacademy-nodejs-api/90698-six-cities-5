import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, OfferType, UserType, City } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM = 1;
const MAX_ROOM = 4;

const MIN_GUESTS = 1;
const MAX_GUESTS = 4;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_LONGITUDE = 10;
const MAX_LONGITUDE = 200;

const MIN_LATITUDE = 10;
const MAX_LATITUDE = 100;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.cities) as keyof typeof City;
    const preview = getRandomItem<string>(this.mockData.previews);
    const image = getRandomItems<string>(this.mockData.images).join(';');
    const premium = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem([OfferType.Apartment, OfferType.House, OfferType.Room, OfferType.Hotel]);
    const room = generateRandomValue(MIN_ROOM, MAX_ROOM).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comfort = getRandomItems<string>(this.mockData.comforts).join(';');
    const firstname = getRandomItem(this.mockData.firstname);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarsPath);
    const userType = getRandomItem([UserType.Ordinary, UserType.Pro]);
    const latitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE).toString();
    const longitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE).toString();

    return [
      title, description,
      postDate, city,preview, image, premium, rating,
      type, room, guests, price,
      comfort, firstname, email, avatarPath, userType,
      longitude, latitude,
    ].join('\t');
  }
}
