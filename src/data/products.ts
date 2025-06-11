// Sample product data for ASAS eshop
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryName: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  images: string[];
  pickupPointAvailability: Record<string, 'high' | 'medium' | 'low' | 'none'>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'stavebne-materialy',
    name: 'Stavebné materiály',
    description: 'Cement, betón, tehly, bloky a izolačné materiály',
    subcategories: [
      { id: 'cement-beton', name: 'Cement a betón', description: 'Cementy, betónové zmesi' },
      { id: 'tehly-bloky', name: 'Tehly a bloky', description: 'Stavebné tehly, pórobetónové bloky' },
      { id: 'izolacia', name: 'Izolácia', description: 'Tepelné a zvukové izolácie' }
    ]
  },
  {
    id: 'farby',
    name: 'Farby a laky',
    description: 'Interiérové a exteriérové farby, základné nátery',
    subcategories: [
      { id: 'interierove-farby', name: 'Interiérové farby', description: 'Farby na steny a stropy' },
      { id: 'exterierove-farby', name: 'Exteriérové farby', description: 'Fasádne farby a nátery' },
      { id: 'laky-lazury', name: 'Laky a lazúry', description: 'Ochranné nátery na drevo' }
    ]
  },
  {
    id: 'kupelne',
    name: 'Kúpeľne a sanitácia',
    description: 'Obklady, dlažby, sanitárne zariadenia',
    subcategories: [
      { id: 'obklady-dlazby', name: 'Obklady a dlažby', description: 'Keramické obklady a dlažby' },
      { id: 'sanitarne-zariadenia', name: 'Sanitárne zariadenia', description: 'WC, umývadlá, vane' },
      { id: 'baterie-sprchy', name: 'Batérie a sprchy', description: 'Vodovodné batérie a sprchové súpravy' }
    ]
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Cement Portland 25kg',
    price: 8.50,
    category: 'stavebne-materialy',
    categoryName: 'Stavebné materiály',
    description: 'Vysokokvaliný cement Portland pre všetky typy stavebných prác. Vhodný pre betónovanie, murovanie a omietanie.',
    specifications: {
      'Hmotnosť': '25 kg',
      'Typ': 'Portland CEM I 42,5 R',
      'Balenie': 'Papierový vrece',
      'Skladovanie': 'Suché miesto'
    },
    inStock: true,
    stockQuantity: 150,
    image: '/images/products/portland1.png',
    images: ['/images/products/portland1.png', '/images/products/portland2.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'medium',
      'ke-centrum': 'high',
      'za-centrum': 'medium',
      'bb-centrum': 'low',
      'nr-centrum': 'none'
    }
  },
  {
    id: 2,
    name: 'Tepelná izolácia Isover 10cm',
    price: 15.20,
    category: 'stavebne-materialy',
    categoryName: 'Stavebné materiály',
    description: 'Minerálna vlna pre tepelnú izoláciu stien, striech a podláh. Výborné tepelno-izolačné vlastnosti.',
    specifications: {
      'Hrúbka': '10 cm',
      'Rozmer': '120 x 60 cm',
      'Lambda': '0,032 W/mK',
      'Balenie': '6 ks/balík'
    },
    inStock: true,
    stockQuantity: 85,
    image: '/images/products/isover.png',
    images: ['/images/products/isover.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'medium',
      'ba-ruzinov': 'low',
      'ke-centrum': 'high',
      'za-centrum': 'none',
      'bb-centrum': 'medium',
      'nr-centrum': 'low'
    }
  },
  {
    id: 3,
    name: 'Interiérová farba biela 10L',
    price: 25.90,
    category: 'farby',
    categoryName: 'Farby a laky',
    description: 'Kvalitná interiérová farba s vysokou kryvosťou. Vhodná pre všetky interiérové povrchy.',
    specifications: {
      'Objem': '10 litrov',
      'Kryvosť': 'Trieda 1',
      'Lesk': 'Matný',
      'Riedenie': 'Voda'
    },
    inStock: true,
    stockQuantity: 45,
    image: '/images/products/paint.png',
    images: ['/images/products/paint.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'high',
      'ke-centrum': 'medium',
      'za-centrum': 'low',
      'bb-centrum': 'medium',
      'nr-centrum': 'none'
    }
  },
  {
    id: 4,
    name: 'Tehly pálené červené 250ks',
    price: 89.99,
    category: 'stavebne-materialy',
    categoryName: 'Stavebné materiály',
    description: 'Klasické pálené tehly pre murované stavby. Vysoká odolnosť a dlhá životnosť.',
    specifications: {
      'Rozmer': '250 x 120 x 65 mm',
      'Hmotnosť': '2,5 kg/ks',
      'Pevnosť': 'M125',
      'Balenie': '250 kusov'
    },
    inStock: true,
    stockQuantity: 85,
    image: '/images/products/tehly.png',
    images: ['/images/products/tehly.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'medium',
      'ke-centrum': 'high',
      'za-centrum': 'medium',
      'bb-centrum': 'high',
      'nr-centrum': 'medium'
    }
  },
  {
    id: 5,
    name: 'Penetrácia na podklad 5L',
    price: 18.90,
    category: 'farby',
    categoryName: 'Farby a laky',
    description: 'Základná penetrácia pre prípravu podkladov pred maľovaním. Zlepšuje priľnavosť farby.',
    specifications: {
      'Objem': '5 litrov',
      'Typ': 'Akrylátová',
      'Spotreba': '8-10 m²/L',
      'Schnutie': '4 hodiny'
    },
    inStock: true,
    stockQuantity: 65,
    image: '/images/products/coat.png',
    images: ['/images/products/coat.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'high',
      'ke-centrum': 'medium',
      'za-centrum': 'low',
      'bb-centrum': 'medium',
      'nr-centrum': 'low'
    }
  },
  {
    id: 6,
    name: 'Obkladačky kúpeľňa 30x60cm',
    price: 12.50,
    category: 'kupelne',
    categoryName: 'Kúpeľne a sanitácia',
    description: 'Elegantné keramické obkladačky pre kúpeľne a kuchyne. Ľahko sa čistia a udržiavajú.',
    specifications: {
      'Rozmer': '30 x 60 cm',
      'Materiál': 'Keramika',
      'Povrch': 'Lesklý',
      'Balenie': '1,44 m²'
    },
    inStock: true,
    stockQuantity: 200,
    image: '/images/products/obkl.png',
    images: ['/images/products/obkl.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'high',
      'ke-centrum': 'high',
      'za-centrum': 'medium',
      'bb-centrum': 'high',
      'nr-centrum': 'medium'
    }
  },
  {
    id: 7,
    name: 'Sanitárny set komplet',
    price: 299.00,
    category: 'kupelne',
    categoryName: 'Kúpeľne a sanitácia',
    description: 'Kompletný sanitárny set obsahujúci WC misu, nádržku a sedadlo. Moderný dizajn.',
    specifications: {
      'Typ': 'Závesné WC',
      'Materiál': 'Keramika',
      'Farba': 'Biela',
      'Obsah balenia': 'WC misa, nádržka, sedadlo'
    },
    inStock: true,
    stockQuantity: 8,
    image: '/images/products/set.png',
    images: ['/images/products/set.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'medium',
      'ba-ruzinov': 'low',
      'ke-centrum': 'medium',
      'za-centrum': 'low',
      'bb-centrum': 'none',
      'nr-centrum': 'none'
    }
  },
  {
    id: 8,
    name: 'Exteriérová farba sivá 15L',
    price: 45.90,
    category: 'farby',
    categoryName: 'Farby a laky',
    description: 'Odolná exteriérová farba pre fasády. Dlhodobá ochrana proti poveternostným vplyvom.',
    specifications: {
      'Objem': '15 litrov',
      'Typ': 'Akrylátová',
      'Farba': 'Sivá',
      'Životnosť': '15 rokov'
    },
    inStock: true,
    stockQuantity: 25,
    image: '/images/products/ext.png',
    images: ['/images/products/ext.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'medium',
      'ke-centrum': 'low',
      'za-centrum': 'none',
      'bb-centrum': 'medium',
      'nr-centrum': 'low'
    }
  },
  {
    id: 9,
    name: 'Pórobetónové bloky 60cm',
    price: 125.50,
    category: 'stavebne-materialy',
    categoryName: 'Stavebné materiály',
    description: 'Ľahké pórobetónové bloky pre stavbu stien. Výborné tepelno-izolačné vlastnosti.',
    specifications: {
      'Rozmer': '600 x 200 x 240 mm',
      'Hmotnosť': '18 kg/ks',
      'Pevnosť': 'P4/550',
      'Balenie': '40 kusov/m³'
    },
    inStock: true,
    stockQuantity: 120,
    image: '/images/products/poro.png',
    images: ['/images/products/poro.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'high',
      'ba-ruzinov': 'medium',
      'ke-centrum': 'high',
      'za-centrum': 'high',
      'bb-centrum': 'medium',
      'nr-centrum': 'low'
    }
  },
  {
    id: 10,
    name: 'Lazúra na drevo orech 2.5L',
    price: 32.90,
    category: 'farby',
    categoryName: 'Farby a laky',
    description: 'Ochranná lazúra na drevo v odtieni orech. Zdôrazňuje prirodzenú kresbu dreva.',
    specifications: {
      'Objem': '2,5 litra',
      'Odtieň': 'Orech',
      'Spotreba': '12-14 m²/L',
      'Ochrana': 'UV + voda'
    },
    inStock: true,
    stockQuantity: 45,
    image: '/images/products/lazura.png',
    images: ['/images/products/lazura.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'medium',
      'ba-ruzinov': 'high',
      'ke-centrum': 'medium',
      'za-centrum': 'low',
      'bb-centrum': 'high',
      'nr-centrum': 'medium'
    }
  },
  {
    id: 12,
    name: 'Dlažba vonkajšia 40x40cm',
    price: 22.50,
    category: 'kupelne',
    categoryName: 'Kúpeľne a sanitácia',
    description: 'Mrazuvzdorná dlažba vhodná pre terasy a chodníky. Protišmykový povrch.',
    specifications: {
      'Rozmer': '40 x 40 cm',
      'Hrúbka': '18 mm',
      'Materiál': 'Kamenina',
      'Balenie': '1,6 m²'
    },
    inStock: false,
    stockQuantity: 0,
    image: '/images/products/obkl1.png',
    images: ['/images/products/obkl1.png'],
    pickupPointAvailability: {
      'ba-petrzalka': 'none',
      'ba-ruzinov': 'low',
      'ke-centrum': 'none',
      'za-centrum': 'none',
      'bb-centrum': 'none',
      'nr-centrum': 'none'
    }
  }
];
