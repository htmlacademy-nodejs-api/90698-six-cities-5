import { Offer, OfferType, Comfort, City, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    city,
    preview,
    image,
    premium,
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
    postDate: new Date(createdDate),
    city: City[city as keyof typeof City],
    preview,
    image:image.split(';'),
    premium: premium === 'true',
    rating: Number.parseFloat(rating),
    type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    room: Number.parseInt(room, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    comfort: comfort.split(';')
      .map((comforts) => Comfort[comforts as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
    user: { firstname, email, avatarPath, userType: UserType[userType as 'Ordinary' | 'Pro' ] },
    commentCount: 0,
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };
}
