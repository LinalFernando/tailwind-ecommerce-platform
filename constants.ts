import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'King Coconut Water',
    price: 12.50,
    description: '100% Natural King Coconut Water from the heart of Sri Lanka. Hydrating, refreshing, and packed with electrolytes.',
    category: 'Beverages',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T131933.599.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T131933.599.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Rich-in-Antioxidants-23.png',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/King-Coconut-Water.jpg',

    ],
    badges: ['Organic', 'Vegan', 'No Added Sugar'],
    rating: 4.9,
    reviews: 128,
    details: {
      origin: 'Sri Lanka',
      weight: '350ml',
      ingredients: '100% King Coconut Water'
    }
  },
  {
    id: '2',
    name: 'Moringa Leaf Powder',
    price: 45.00,
    description: 'Premium organic Moringa Oleifera leaf powder. A superfood rich in antioxidants, vitamins, and minerals to boost immunity.',
    category: 'Superfoods',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T115229.634.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T115229.634.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Rich-in-Antioxidants-15.png',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Moringa-Powder.jpg'
    ],
    badges: ['USDA Organic', 'Gluten Free', 'Non-GMO'],
    rating: 4.8,
    reviews: 85,
    details: {
      origin: 'Sri Lanka',
      weight: '200g',
      ingredients: 'Organic Moringa Leaves'
    }
  },
  {
    id: '3',
    name: 'Extra Virgin Coconut Oil',
    price: 32.00,
    description: 'Cold-pressed, unrefined coconut oil. Perfect for cooking, baking, or as a natural moisturizer for skin and hair.',
    category: 'Oils',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T130819.627.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T130819.627.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2025-01-12T152250.985.png',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Extra-Virgin-Coconut-500ml.jpg'
    ],
    badges: ['Keto Friendly', 'Organic', 'Cold Pressed'],
    rating: 4.9,
    reviews: 210,
    details: {
      origin: 'Sri Lanka',
      weight: '500ml',
      ingredients: '100% Organic Coconuts'
    }
  },
  {
    id: '4',
    name: 'Ceylon Cinnamon Powder',
    price: 28.00,
    description: 'Authentic Ceylon Cinnamon powder. Known as "True Cinnamon", it has a delicate flavor and numerous health benefits.',
    category: 'Spices',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T110648.713.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T110648.713.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Rich-in-Antioxidants-17.png'

    ],
    badges: ['Ceylon Cinnamon', 'Organic'],
    rating: 4.7,
    reviews: 64,
    details: {
      origin: 'Sri Lanka',
      weight: '300g',
      ingredients: 'Organic Cinnamon Bark'
    }
  },
  {
    id: '5',
    name: 'Coconut Flour',
    price: 18.00,
    description: 'Gluten-free, high-fiber flour made from dried coconut meat. An excellent alternative for healthy baking.',
    category: 'Pantry',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T122839.503.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T122839.503.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2025-01-12T153430.767.png',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Coconut-Flour-300g.jpg'

    ],
    badges: ['Gluten Free', 'High Fiber'],
    rating: 4.6,
    reviews: 42,
    details: {
      origin: 'Sri Lanka',
      weight: '300g',
      ingredients: 'Organic Coconut'
    }
  },
  {
    id: '6',
    name: 'Desiccated Coconut Fine',
    price: 15.00,
    description: 'Finely shredded, unsweetened coconut. Perfect for curries, desserts, and smoothies.',
    category: 'Pantry',
    image: 'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T125936.540.jpg',
    images: [
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Untitled-design-2024-12-30T125936.540.jpg',
      'https://heritageorganic.ae/wp-content/uploads/2024/12/Rich-in-Antioxidants-7.png'
    ],
    badges: ['No Preservatives', 'Natural'],
    rating: 4.8,
    reviews: 33,
    details: {
      origin: 'Sri Lanka',
      weight: '300g',
      ingredients: 'Dried Coconut Kernel'
    }
  }
];

export const CATEGORIES = ['All', 'Beverages', 'Superfoods', 'Oils', 'Spices', 'Pantry'];