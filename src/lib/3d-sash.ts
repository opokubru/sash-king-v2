import { Product } from '@/utils/types/product';

// Simple UUID generator for browser compatibility
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const ThreeDSashes: Product[] = [
    {
      id: generateUUID(),
      name: 'Logo Up, Text Down Sash',
      title: 'Sash Variant 1',
      description:
        'This sash allows logos/designs at the top and text at the bottom on either side',
      image: '/images/3d-sash/1.jpeg',
    //   model: sash_model,
    //   confirm_image: image_confirm_1,
      myNode: [
        { name: 'plain_sections', yardNeeded: 1 },
        { name: 'Stripe_1', yardNeeded: 1 },
        { name: 'Stripe_2', yardNeeded: 1 },
        { name: 'mid_stripes', yardNeeded: 1 },
      ],
      otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
      myZoom: 2,
      price: 110,
      // sizeModels: tshirt_model,
      readyIn: 7,
      weight: 0.25,
    //   sizeGuide: sash_guide,
      sizeOptions: [
        { label: 'S', value: 0.5 },
        { label: 'M', value: 1 },
        { label: 'L', value: 2 },
      ],
      sizeForms: [
        {
          label: 'Length (cm)',
        },
        {
          label: 'Width (cm)',
        },
      ],
      extra_image_urls: [],
      sizes: [],
      colors: [],
      in_stock: true,
    },
    {
      id: generateUUID(),
      name: 'Text Up, Logo Down Sash',
      title: 'Sash Variant 2',
      description:
        'This sash allows logos/designs at the bottom and text at the top on either side',
      image: '/images/3d-sash/2.jpeg',
      // model: sash_both_down,
      // confirm_image: image_confirm_2,
      myNode: [
        { name: 'plain_section', yardNeeded: 1 },
        { name: 'stripe_1', yardNeeded: 1 },
        { name: 'stripe_2', yardNeeded: 1 },
        { name: 'mid_stripes', yardNeeded: 1 },
      ],
      otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
      myZoom: 2,
      price: 110,
      readyIn: 7,
      // weight: 0.25,
    //   sizeGuide: sash_guide,
      sizeOptions: [
        { label: 'S', value: 0.5 },
        { label: 'M', value: 1 },
        { label: 'L', value: 2 },
      ],
      sizeForms: [
        {
          label: 'Length (cm)',
        },
        {
          label: 'Width (cm)',
        },
      ],
      extra_image_urls: [],
      sizes: [],
      colors: [],
      in_stock: true,
    },
    {
      id: generateUUID(),
      name: 'Contrasting Logo and Text Sash',
      title: 'Sash Variant 3',
      description:
        'This sash has logos/design positions contrasting with text on either side',
      image: '/images/3d-sash/3.jpeg',
    //   model: sash_striped_edge,
    //   confirm_image: image_confirm_3,
      myNode: [
        { name: 'mid_section', yardNeeded: 1 },
        { name: 'stripe_1', yardNeeded: 1 },
        { name: 'stripe_2', yardNeeded: 1 },
      ],
      otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
      myZoom: 2,
      price: 110,
      readyIn: 7,
      // weight: 0.25,
    //   sizeGuide: sash_guide,
      sizeOptions: [
        { label: 'S', value: 0.5 },
        { label: 'M', value: 1 },
        { label: 'L', value: 2 },
      ],
      sizeForms: [
        {
          label: 'Length (cm)',
        },
        {
          label: 'Width (cm)',
        },
      ],
      extra_image_urls: [],
      sizes: [],
      colors: [],
      in_stock: true,
    },
    
    {
      id: generateUUID(),
      name: 'One-Sided Logo, Two-Sided Text Sash',
      title: 'Sash Variant 4',
      description:
        'This sash allows logos/designs on one side and text on both sides',
      image: '/images/3d-sash/4.jpeg',
    //   model: sash_striped_edge,
    //   confirm_image: image_confirm_5,
      myNode: [
        { name: 'mid_section', yardNeeded: 1 },
        { name: 'stripe_1', yardNeeded: 1 },
        { name: 'stripe_2', yardNeeded: 1 },
      ],
      otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
      myZoom: 2,
      price: 110,
      readyIn: 7,
    //   sizeGuide: sash_guide,
      sizeOptions: [
        { label: 'S', value: 0.5 },
        { label: 'M', value: 1 },
        { label: 'L', value: 2 },
      ],
      sizeForms: [
        {
          label: 'Length (cm)',
        },
        {
          label: 'Width (cm)',
        },
      ],
      extra_image_urls: [],
      sizes: [],
      colors: [],
      in_stock: true,
    },
   
  
 
    
  ];