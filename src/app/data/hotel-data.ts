export interface Room {
  name: string;
  size: string;
  view: string;
  price: string;
  amenities: string[];
  features: string[];
  image: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  title: string;
  image: string;
}

export interface TimelineItem {
  title: string;
  description: string;
}

export interface TrustBadge {
  title: string;
  detail: string;
  icon: string;
}

export interface PartnerLink {
  name: string;
  url: string;
  note: string;
}

export interface NearbyPlace {
  name: string;
  category: 'Monastery' | 'Viewpoint' | 'Village' | 'Restaurant';
  distance: string;
  summary: string;
  tip: string;
  mapUrl: string;
}

export const hotelHighlights = [
  'Eco-friendly stay with panoramic Himalayan views',
  'Curated Ladakhi cuisine and organic garden dining',
  'Guided cultural walks and stargazing terraces',
  'Premium comfort with modern amenities'
];

export const roomTypes: Room[] = [
  {
    name: 'Alpine Deluxe Room',
    size: '320 sq ft',
    view: 'Mountain and monastery view',
    price: 'From ₹7,500 / night',
    amenities: ['King bed', 'Heated floors', 'Smart TV', 'Tea lounge'],
    features: ['Soundproof windows', 'Organic linen', 'Private balcony'],
    image: 'assets/room-eco-inn.jpg'
  },
  {
    name: 'Heritage Suite',
    size: '480 sq ft',
    view: 'Valley view',
    price: 'From ₹11,500 / night',
    amenities: ['King bed', 'Lounge area', 'Bathtub', 'Curated minibar'],
    features: ['Handcrafted decor', 'Private lounge', 'Butler on request'],
    image: 'assets/view-room.jpg'
  },
  // {
  //   name: 'Eco Family Studio',
  //   size: '540 sq ft',
  //   view: 'Garden view',
  //   price: 'From ₹13,200 / night',
  //   amenities: ['Two queen beds', 'Kitchenette', 'Work desk', 'Kids kit'],
  //   features: ['Family-ready layout', 'Sustainable materials', 'Dining nook'],
  //   image: 'assets/eco-inne-view.jpg'
  // }
];

export const experiences = [
  {
    title: 'High-Altitude Dining',
    description: 'Farm-to-table Ladakhi flavors with views of the Indus Valley.',
    icon: 'bi-cup-hot-fill'
  },
  {
    title: 'Stargazing Deck',
    description: 'Crystal clear night skies with curated astronomy sessions.',
    icon: 'bi-stars'
  },
  {
    title: 'Cultural Immersion',
    description: 'Monastery visits, artisan workshops, and village trails.',
    icon: 'bi-geo-alt-fill'
  },
  {
    title: 'Wellness & Yoga',
    description: 'Morning flows, mountain air meditation, and spa rituals.',
    icon: 'bi-brightness-high-fill'
  }
];

export const storyTimeline: TimelineItem[] = [
  {
    title: 'Rooted in Ladakh',
    description: 'Local materials, artisans, and traditions shape every space.'
  },
  {
    title: 'Eco-led living',
    description: 'Thoughtful energy use, low waste practices, and mindful hospitality.'
  },
  {
    title: 'Modern comfort',
    description: 'Warm interiors, smart amenities, and quiet spaces to recharge.'
  }
];

export const trustBadges: TrustBadge[] = [
  {
    title: 'Eco practices',
    detail: 'Low-waste, low-plastic operations',
    icon: 'bi-recycle'
  },
  {
    title: 'Local partnerships',
    detail: 'Guides, artisans, and farmers from Leh',
    icon: 'bi-people-fill'
  },
  {
    title: 'Guest favorite',
    detail: 'Consistently rated 4.9+ by guests',
    icon: 'bi-award-fill'
  }
];

export const bookingPartners: PartnerLink[] = [
  {
    name: 'Booking.com',
    url: 'https://www.booking.com/',
    note: 'Official listing'
  },
  {
    name: 'Airbnb',
    url: 'https://www.airbnb.com/',
    note: 'Official listing'
  },
  {
    name: 'MakeMyTrip',
    url: 'https://www.makemytrip.com/',
    note: 'Official listing'
  }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Ananya Sharma',
    location: 'Mumbai',
    rating: '5.0',
    quote:
      'The views are unreal and the service feels personal. The concierge helped us plan monasteries and dining.'
  },
  {
    name: 'Tsering Dolma',
    location: 'Leh',
    rating: '4.9',
    quote:
      'A beautiful eco-friendly stay with peaceful rooms and warm hospitality. We loved the stargazing deck.'
  },
  {
    name: 'Rohan Mehta',
    location: 'Delhi',
    rating: '5.0',
    quote:
      'Modern rooms, calm ambience, and a great breakfast. The team arranged our Nubra day trip smoothly.'
  }
];

export const faqs: FaqItem[] = [
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Check-in is from 2:00 PM and check-out is by 11:00 AM.'
  },
  {
    question: 'Do you provide airport transfers?',
    answer: 'Yes, airport transfers can be arranged on request.'
  },
  {
    question: 'Is the property suitable for families?',
    answer: 'Yes, we have family-friendly rooms and tailored activities for kids.'
  },
  {
    question: 'How do you support eco-friendly stays?',
    answer: 'We focus on local sourcing, reduced plastic, and energy-efficient systems.'
  }
];

export const galleryItems: GalleryItem[] = [
  { title: 'Mountain View Lounge', image: 'assets/eco-inne-view.jpg' },
  { title: 'Eco Inn Exterior', image: 'assets/eco-inne-hotel.jpg' },
  { title: 'Signature View', image: 'assets/hotel-eco-inn.jpg' },
  { title: 'Dining Experience', image: 'assets/eco-inn-dine.jpg' },
  { title: 'Cozy Room', image: 'assets/eco-inn-room.jpg' },
  { title: 'Winter Views', image: 'assets/winter-view.jpg' },
  { title: 'Summer Vibes', image: 'assets/new-hotel.jpeg' },
  { title: 'Chill Out Zone', image: 'assets/out.jpeg' },
  // { title: 'Winter Views', image: 'assets/htel.jpeg' },
];

export const nearbyPlaces: NearbyPlace[] = [
  {
    name: 'Thiksey Monastery',
    category: 'Monastery',
    distance: '18 km',
    summary: 'Iconic hilltop monastery known for sunrise views and serene courtyards.',
    tip: 'Visit early for softer light and fewer crowds.',
    mapUrl: 'https://www.google.com/maps?q=Thiksey%20Monastery%20Leh%20Ladakh'
  },
  {
    name: 'Shey Palace & Monastery',
    category: 'Monastery',
    distance: '15 km',
    summary: 'Historic palace ruins with panoramic valley views and a giant Buddha statue.',
    tip: 'Pair with a sunset drive back to Leh.',
    mapUrl: 'https://www.google.com/maps?q=Shey%20Palace%20Leh%20Ladakh'
  },
  {
    name: 'Shanti Stupa',
    category: 'Viewpoint',
    distance: '5 km',
    summary: 'White-domed stupa with sweeping views of Leh town and the mountains.',
    tip: 'Best at sunrise or blue hour.',
    mapUrl: 'https://www.google.com/maps?q=Shanti%20Stupa%20Leh%20Ladakh'
  },
  {
    name: 'Magnetic Hill',
    category: 'Viewpoint',
    distance: '27 km',
    summary: 'A fun optical illusion point along the Leh-Kargil highway.',
    tip: 'Combine with Gurudwara Pathar Sahib.',
    mapUrl: 'https://www.google.com/maps?q=Magnetic%20Hill%20Leh%20Ladakh'
  },
  {
    name: 'Stok Village',
    category: 'Village',
    distance: '14 km',
    summary: 'Traditional Ladakhi homes, palace museum, and craft souvenirs.',
    tip: 'Ask us for a curated village walk.',
    mapUrl: 'https://www.google.com/maps?q=Stok%20Village%20Leh%20Ladakh'
  },
  {
    name: 'Lamayuru Cafe (Leh)',
    category: 'Restaurant',
    distance: '3 km',
    summary: 'Popular local cafe for Tibetan-Mughlai comfort food and tea.',
    tip: 'Try momos and butter tea.',
    mapUrl: 'https://www.google.com/maps?q=Lamayuru%20Cafe%20Leh%20Ladakh'
  }
];
