/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TemplatedSash } from '@/lib/templated-sash';
import { ThreeDSashes } from '@/lib/3d-sash';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { CustomButton } from '@/components/shared/shared_customs';

const Home = () => {
  const navigate = useNavigate();
  // Hero carousel settings
  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'linear',
    arrows: true,
  };

  // Products carousel settings
  const productsSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Greek stoles carousel settings
  const greekSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Hero carousel slides data
  const heroSlides = [
    {
      id: 1,
      image: '/images/carousel/landing-page-re-3.webp',
      title: 'Wear Your Story',
      subtitle: 'Every Thread Tells a Tale',
      description: 'Authentic Kente Sashes',
      tagline: 'Crafted with Pride, Worn with Purpose',
    },
    {
      id: 2,
      image: '/images/carousel/landing-page-re-3.webp',
      title: 'Graduate Like Royalty',
      subtitle: 'Your Crown Awaits',
      description: 'Premium Graduation Sashes',
      tagline: 'Because You Earned This Moment',
    },
    {
      id: 3,
      image: '/images/carousel/landing-page-re-3.webp',
      title: 'Brotherhood & Sisterhood',
      subtitle: 'Wear Your Letters with Pride',
      description: 'Faculty & College Sashes',
      tagline: 'Unity in Every Stitch',
    },
    {
      id: 4,
      image: '/images/carousel/landing-page-re-3.webp',
      title: 'Create Your Legacy',
      subtitle: 'From Vision to Reality',
      description: 'Custom Made Sashes',
      tagline: 'Your Imagination, Our Mastery',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .hero-carousel .slick-dots {
          bottom: 30px;
        }
        .hero-carousel .slick-dots li button:before {
          color: white;
          font-size: 12px;
        }
        .hero-carousel .slick-dots li.slick-active button:before {
          color: white;
        }
        .hero-carousel .slick-prev,
        .hero-carousel .slick-next {
          z-index: 10;
          transition: all 0.3s ease;
        }
        .hero-carousel .slick-prev {
          left: 30px;
        }
        .hero-carousel .slick-next {
          right: 30px;
        }
        .hero-carousel .slick-prev:before,
        .hero-carousel .slick-next:before {
          font-size: 32px;
          color: white;
          opacity: 0.9;
          font-weight: bold;
        }
    
        .products-carousel .slick-dots,
        .greek-carousel .slick-dots {
          bottom: -50px;
        }
        .products-carousel .slick-dots li button:before,
        .greek-carousel .slick-dots li button:before {
          color: #666;
          font-size: 12px;
        }
        .products-carousel .slick-dots li.slick-active button:before,
        .greek-carousel .slick-dots li.slick-active button:before {
          color: #000;
        }
        .products-carousel .slick-prev,
        .products-carousel .slick-next,
        .greek-carousel .slick-prev,
        .greek-carousel .slick-next {
          z-index: 10;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
   
        .products-carousel .slick-prev,
        .greek-carousel .slick-prev {
          left: -25px;
        }
        .products-carousel .slick-next,
        .greek-carousel .slick-next {
          right: -25px;
        }
        .products-carousel .slick-prev:before,
        .products-carousel .slick-next:before,
        .greek-carousel .slick-prev:before,
        .greek-carousel .slick-next:before {
          font-size: 24px;
          color: #000;
          opacity: 0.8;
          font-weight: bold;
        }
       
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .products-carousel .slick-prev,
          .products-carousel .slick-next,
          .greek-carousel .slick-prev,
          .greek-carousel .slick-next {
            width: 40px;
            height: 40px;
          }
          .products-carousel .slick-prev,
          .greek-carousel .slick-prev {
            left: -15px;
          }
          .products-carousel .slick-next,
          .greek-carousel .slick-next {
            right: -15px;
          }
          .products-carousel .slick-prev:before,
          .products-carousel .slick-next:before,
          .greek-carousel .slick-prev:before,
          .greek-carousel .slick-next:before {
            font-size: 20px;
          }
          .hero-carousel .slick-prev,
          .hero-carousel .slick-next {
            width: 50px;
            height: 50px;
          }
          .hero-carousel .slick-prev {
            left: 15px;
          }
          .hero-carousel .slick-next {
            right: 15px;
          }
          .hero-carousel .slick-prev:before,
          .hero-carousel .slick-next:before {
            font-size: 28px;
          }
        }
      `}</style>
      {/* Hero Carousel Section */}
      <section className="relative">
        <Slider {...heroSettings} className="hero-carousel">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative">
              <div className="relative  flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain "
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-xxl md:text-6xl lg:text-7xl font-bold mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-2 opacity-90">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4">
                        {slide.description}
                      </h2>
                      <p className="text-lg md:text-xl mb-8 opacity-90">
                        {slide.tagline}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Link
                        to="/templated-sash"
                        className="inline-block bg-white text-black px-4 py-2 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Shop Now
                      </Link>
                    </motion.div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Products Section */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Make It Uniquely Yours
            </h2>
            <p className="text-lg text-gray-600">
              Transform Our Elegant Templates Into Your Personal Masterpiece
            </p>
          </motion.div>

          <div className="relative">
            <Slider {...productsSettings} className="products-carousel">
              {TemplatedSash.slice(0, 6).map((product, index) => (
                <div key={product.id} className="px-2 ">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <div className="text-center my-10">
        {/* <Link
          to="/templated-sash"
          className="inline-block bg-black text-white text-sm px-2 py-1 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          View All
        </Link> */}
        <CustomButton variant_type="primary">View All</CustomButton>
      </div>

      {/* ThreeDSashes Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Design Your Dream Sash
            </h2>
            <p className="text-lg text-gray-600">
              Start from scratch and create something truly extraordinary. Our
              3D design tools make it easy to bring your vision to life.
            </p>
          </motion.div>

          <div className="relative ">
            <Slider {...greekSettings} className="greek-carousel">
              {ThreeDSashes.map((stole, index) => (
                <Link
                  to={`/product/3d/${stole.id}`}
                  key={index}
                  className="px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden bg-gray-100">
                      <img
                        src={stole.image}
                        alt={stole.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                        {stole.name}
                      </h3>
                      <p className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                        {getCurrencySymbol('GHS') + parseToMoney(stole.price)}
                      </p>
                      <CustomButton
                        onClick={() => navigate(`/product/3d/${stole.id}`)}
                        className="w-full text-sm font-medium bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                      >
                        Use
                      </CustomButton>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <div className="text-center mt-5 md:mt-10">
        {/* <Link
          to="/design-your-own"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          View All
        </Link> */}
        <CustomButton variant_type="primary" className="">
          View All
        </CustomButton>
      </div>

      {/* Shop with Friends Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-0 md:mb-2">
              Your Journey, Your Way
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Celebrate Your Victory',
                description:
                  'Mark this milestone with something as unique as your journey. Create memories that last forever.',
                icon: '🏆',
              },
              {
                title: 'Express Your Identity',
                description:
                  'Wear your story, your culture, your achievements. Every sash tells your personal tale.',
                icon: '🎨',
              },
              {
                title: 'Quality That Speaks',
                description:
                  'Handcrafted with love, precision, and the finest materials. Because you deserve nothing less than excellence.',
                icon: '✨',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
