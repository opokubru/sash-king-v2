/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TemplatedSash } from '@/lib/templated-sash';
import { ThreeDSashes } from '@/lib/3d-sash';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';

const Home = () => {
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
    autoplay: true,
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
      image: 'https://placehold.co/1200x600',
      title: 'Authentic',
      subtitle: 'Handwoven in Ghana',
      description: 'Kente Stoles',
      tagline: 'Fine Craftsmanship',
    },
    {
      id: 2,
      image: 'https://placehold.co/1200x600',
      title: 'Graduation',
      subtitle: 'Your Journey Deserves Recognition',
      description: 'Premium Stoles',
      tagline: 'Celebrate Your Achievement',
    },
    {
      id: 3,
      image: 'https://placehold.co/1200x600',
      title: 'Greek',
      subtitle: 'Brotherhood & Sisterhood',
      description: 'Organization Stoles',
      tagline: 'Represent Your Letters',
    },
    {
      id: 4,
      image: 'https://placehold.co/1200x600',
      title: 'Custom',
      subtitle: 'Made-to-Order Excellence',
      description: 'Personalized Stoles',
      tagline: 'Your Vision, Our Craft',
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
              <div className="relative h-[600px] md:h-[700px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-2 opacity-90">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                        {slide.description}
                      </h2>
                      <p className="text-lg md:text-xl mb-8 opacity-90">
                        {slide.tagline}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                        <span className="text-sm font-medium text-white mr-2">
                          03. Business Office in
                        </span>
                        <span className="text-sm font-bold text-white">
                          New York, USA
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Link
                        to="/categories"
                        className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        Shop Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Graduation Message Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              BECAUSE YOU WORKED HARD FOR THIS DAY...
            </h2>
            <div className="text-lg text-gray-700 leading-relaxed mb-8">
              <p className="mb-4">
                The sleepless nights, the ominous exams anxiety, the struggles
                to meet deadlines, the courses you had to retake, the zero
                willpower to continue, the immense feeling of defeat and
                self-doubt...
              </p>
              <p className="mb-4 font-semibold text-xl">
                And yet still, you're here!
              </p>
              <p className="mb-4">
                Dear Grad, you more than deserve this. And yes! you are allowed
                to be intentional, even dramatic about it.
              </p>

              <p className="mb-4">
                Yours doesn't have to be just another regular walk in a gown,
                cap and hood. Your journey was nothing close to regular. You
                deserve to walk the stage with something extra – a Kente stole –
                from <strong>SASH KING</strong>.
              </p>
              <p className="text-2xl font-bold text-gray-900">
                Congratulations!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
              Make it your own
            </h2>
            <p className="text-lg text-gray-600">Edit our Elegant Templates</p>
          </motion.div>

          <div className="relative">
            <Slider {...productsSettings} className="products-carousel">
              {TemplatedSash.slice(0, 6).map((product, index) => (
                <div key={product.id} className="px-2">
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

          <div className="text-center mt-12">
            <Link
              to="/templated-sash"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ThreeDSashes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Design Your Own Sash From Scratch
            </h2>
            <p className="text-lg text-gray-600">
              We set a base for you to build on, so you can get creative easily
            </p>
          </motion.div>

          <div className="relative ">
            <Slider {...greekSettings} className="greek-carousel">
              {ThreeDSashes.map((stole, index) => (
                <div key={index} className="px-2">
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
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {stole.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                        {getCurrencySymbol('GHS') + parseToMoney(stole.price)}
                      </p>
                      <button className="w-full text-sm font-medium bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                        Use
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/design-your-own"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Shop with Friends Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              CELEBRATE WITH US!
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Celebrate Your Day',
                description:
                  'Document the end of this journey with those you walked it with',
                icon: '🎉',
              },
              {
                title: 'Save Money',
                description: 'Enjoy incredible quantity discounts ',
                icon: '💰',
              },

              {
                title: "You've earned it",
                description:
                  "Because you literally are your ancestors' wildest dreams",
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

          {/* <div className="text-center mt-12">
            <Link
              to="/templated-sash"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Home;
