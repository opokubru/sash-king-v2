import { Product } from '@/utils/types/product';

// Simple UUID generator for browser compatibility
// const generateUUID = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     const r = Math.random() * 16 | 0;
//     const v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// };


// models
const sash_model = '/models/sash.glb';
  const sash_both_down = '/models/sash_both_down.glb';
const sash_striped_edge = '/models/sash_striped_edge.glb';

// confim images
const image_confirm_1 = '/images/confirm-images/sash1.png';
const image_confirm_2 = '/images/confirm-images/sash2.png';
const image_confirm_3 = '/images/confirm-images/sash3.png';
const image_confirm_5 = '/images/confirm-images/sash5.png';

const sash_guide = '/images/size-guide/the_sash.jpg';




export const ThreeDSashes: Product[] = [
    {
      id: '1',
      name: 'Logo Up, Text Down Sash',
      title: 'Sash Variant 1',
      description:
        'This sash allows logos/designs at the top and text at the bottom on either side',
      image: '/images/3d-sash/logo-down-text-up.png',
      model: sash_model,
      confirm_image: image_confirm_1,
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
      sizeGuide: sash_guide,
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
      textColor: 'gold',
      positioningLeft: {
        text: {
          top: '-1.5rem',
          left: '-9.9rem',
          height: '10.5rem',
          width: '5rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '-9.4rem',
          left: '-9.2rem',
          height: '3rem',
          width: '3rem',
        },
      },
      positioningRight: {
        text: {
          top: '-1.1rem',
          left: '5.1rem',
          height: '10.5rem',
          width: '4.5rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '-9.4rem',
          left: '6rem',
          height: '3rem',
          width: '3rem',
        },
      },
    },
    {
      id: '2',
      name: 'Text Up, Logo Down Sash',
      title: 'Sash Variant 2',
      description:
        'This sash allows logos/designs at the bottom and text at the top on either side',
      image: '/images/3d-sash/text-up-logo-down.png',
      model: sash_both_down,
      confirm_image: image_confirm_2,
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
      sizeGuide: sash_guide,
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
      textColor: 'gold',
      positioningLeft: {
        text: {
          top: '-9rem',
          left: '-9.9rem',
          height: '10.5rem',
          width: '5rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '6.1rem',
          left: '-9.2rem',
          height: '3rem',
          width: '3rem',
        },
      },
      positioningRight: {
        text: {
          top: '-9rem',
          left: '5.1rem',
          height: '10.5rem',
          width: '4.5rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '6.1rem',
          left: '6rem',
          height: '3rem',
          width: '3rem',
        },
      },
    },
    {
        id: '3',
        name: 'Contrasting Logo and Text Sash',
        title: 'Sash Variant 3',
      description:
        'This sash has logos/design positions contrasting with text on either side',
      image: '/images/3d-sash/contrasting-logo.png',
      model: sash_striped_edge,
      confirm_image: image_confirm_3,
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
      sizeGuide: sash_guide,
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
      textColor: 'gold',
      positioningLeft: {
        text: {
          top: '2rem',
          left: '-8.8rem',
          height: '10.5rem',
          width: '3rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '-5.4rem',
          left: '-8.2rem',
          height: '2.5rem',
          width: '2.5rem',
        },
      },
      positioningRight: {
        text: {
          top: '-4.4rem',
          left: '5rem',
          height: '10.5rem',
          width: '2.8rem',
          lineHeight: '2.4rem',
          rotate: -2,
          size: 12,
        },
        image: {
          top: '8rem',

          left: '5.2rem',
          height: '2.5rem',
          width: '2.5rem',
        },
      },
    },
    
    {
      id: '4',
      name: 'One-Sided Logo, Two-Sided Text Sash',
      title: 'Sash Variant 4',
      description:
        'This sash allows logos/designs on one side and text on both sides',
      image: '/images/3d-sash/single-log-double-text.png',
      model: sash_striped_edge,
      confirm_image: image_confirm_5,
      myNode: [
        { name: 'mid_section', yardNeeded: 1 },
        { name: 'stripe_1', yardNeeded: 1 },
        { name: 'stripe_2', yardNeeded: 1 },
      ],
      otherYards: { small: 2, large: 3, extraLarge: 4, extraExtraLarge: 4 },
      myZoom: 2,
      price: 110,
      readyIn: 7,
      sizeGuide: sash_guide,
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
      textColor: 'gold',
      positioningLeft: {
        text: {
          top: '2rem',
          left: '-8.8rem',
          height: '10.5rem',
          width: '3rem',
          lineHeight: '2.4rem',
          rotate: 0,
          size: 12,
        },
        image: {
          top: '-5.4rem',
          left: '-8.2rem',
          height: '2.5rem',
          width: '2.5rem',
        },
      },
      positioningRight: {
        text: {
          top: '-5rem',
          left: '5rem',
          height: '10.5rem',
          width: '2.7rem',
          lineHeight: '2.4rem',
          rotate: -1,
          size: 12,
        },
        image: {
          top: '-5.4rem',
          left: '50rem',
          height: '0rem',
          width: '0rem',
        },
      },
    },
   
    
  ];