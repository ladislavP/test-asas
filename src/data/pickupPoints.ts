// List of pickup points for ASAS eshop
export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  openingHours: string;
  availability: 'high' | 'medium' | 'low' | 'none';
}

export const pickupPoints: PickupPoint[] = [
  {
    id: 'ba-petrzalka',
    name: 'ASAS Petržalka',
    address: 'Bratislavská 42',
    city: 'Bratislava',
    postalCode: '851 03',
    openingHours: 'Po-Pi: 8:00 - 18:00, So: 8:00 - 12:00',
    availability: 'high'
  },
  {
    id: 'ba-ruzinov',
    name: 'ASAS Ružinov',
    address: 'Ružinovská 11',
    city: 'Bratislava',
    postalCode: '821 01',
    openingHours: 'Po-Pi: 7:30 - 18:00, So: 8:00 - 13:00',
    availability: 'medium'
  },
  {
    id: 'ke-centrum',
    name: 'ASAS Košice',
    address: 'Hlavná 25',
    city: 'Košice',
    postalCode: '040 01',
    openingHours: 'Po-Pi: 8:00 - 17:00, So: 9:00 - 12:00',
    availability: 'high'
  },
  {
    id: 'za-centrum',
    name: 'ASAS Žilina',
    address: 'Mariánske námestie 10',
    city: 'Žilina',
    postalCode: '010 01',
    openingHours: 'Po-Pi: 8:00 - 17:00, So: Zatvorené',
    availability: 'low'
  },
  {
    id: 'bb-centrum',
    name: 'ASAS Banská Bystrica',
    address: 'Námestie SNP 15',
    city: 'Banská Bystrica',
    postalCode: '974 01',
    openingHours: 'Po-Pi: 8:30 - 17:30, So: Zatvorené',
    availability: 'medium'
  },
  {
    id: 'nr-centrum',
    name: 'ASAS Nitra',
    address: 'Štefánikova 7',
    city: 'Nitra',
    postalCode: '949 01',
    openingHours: 'Po-Pi: 8:00 - 17:00, So: 8:00 - 12:00',
    availability: 'none'
  }
];

// Helper function to get availability text and color
export function getAvailabilityInfo(availability: PickupPoint['availability']) {
  switch (availability) {
    case 'high':
      return { text: 'Na sklade (10+)', color: 'text-green-600' };
    case 'medium':
      return { text: 'Na sklade (3-9)', color: 'text-green-600' };
    case 'low':
      return { text: 'Posledné kusy (1-2)', color: 'text-amber-500' };
    case 'none':
      return { text: 'Nedostupné', color: 'text-red-500' };
    default:
      return { text: 'Neznámy stav', color: 'text-gray-500' };
  }
}

// Generate product availability for each pickup point
// This would normally come from a backend API
export function getProductAvailability(productId: number) {
  // Simulate different availability at different pickup points
  const availabilityMap: Record<string, PickupPoint['availability']> = {};

  pickupPoints.forEach(point => {
    // Randomize availability but make sure some are available and some are not
    // Actual implementation would fetch real stock data
    const randomValue = Math.random();

    if (randomValue > 0.8) {
      availabilityMap[point.id] = 'none'; // Nedostupné
    } else if (randomValue > 0.6) {
      availabilityMap[point.id] = 'low';
    } else if (randomValue > 0.3) {
      availabilityMap[point.id] = 'medium';
    } else {
      availabilityMap[point.id] = 'high';
    }
  });

  return availabilityMap;
}
