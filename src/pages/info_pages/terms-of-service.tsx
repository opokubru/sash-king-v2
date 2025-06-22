'use client';

import PageWrapper from '@/components/shared/page-wrapper';
import { Section } from '@/components/shared/section';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <PageWrapper title="Terms of Service">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-gray-700"
      >
        These Terms of Service govern your use of the SNEAKZ website and
        services. By accessing or using our site, you agree to comply with and
        be bound by these terms.
      </motion.p>

      <div className="space-y-8 mt-10">
        <Section icon="mdi:web" title="Use of Site">
          <p>
            You must be at least 18 years old or have parental consent to use
            our site. You agree not to use our site for any unlawful or
            prohibited activities.
          </p>
        </Section>

        <Section icon="mdi:tag-text-outline" title="Product Information">
          <p>
            We strive to ensure all product details, pricing, and availability
            are accurate. However, errors may occur and we reserve the right to
            correct them.
          </p>
        </Section>

        <Section icon="mdi:cart-outline" title="Order Processing">
          <p>
            We reserve the right to cancel or limit quantities on any order.
            Orders are subject to product availability and payment confirmation.
          </p>
        </Section>

        <Section icon="mdi:alert-circle-outline" title="Liability">
          <p>
            SNEAKZ is not liable for any indirect or consequential damages
            arising from the use of our site or products.
          </p>
        </Section>

        <Section icon="mdi:refresh-circle" title="Changes to Terms">
          <p>
            We may update these terms at any time. Continued use of the site
            indicates acceptance of the current terms.
          </p>
        </Section>
      </div>
    </PageWrapper>
  );
};

export default TermsOfService;
