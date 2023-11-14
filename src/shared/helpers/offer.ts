import { Offer, OfferType, Comfort, City } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postData,
    city,
    preview,
    image,
    premium,
    favourites,
    rating,
    type,
    room,
    guests,
    price,
    comfort,
    firstname,
    email,
    avatarPath,
    userType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(postData),
    city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam'| 'Hamburg'| 'Dusseldorf'],
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
    user: { firstname, email, avatarPath, userType },
    commentCount: 0,
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
