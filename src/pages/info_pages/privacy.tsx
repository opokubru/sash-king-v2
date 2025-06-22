'use client';

import { motion } from 'framer-motion';
import PageWrapper from '@/components/shared/page-wrapper';
import { Section } from '@/components/shared/section';

const PrivacyPolicy = () => {
  return (
    <PageWrapper title="Privacy Policy">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-gray-700"
      >
        At SNEAKZ, we respect your privacy and are committed to protecting your
        personal data. This Privacy Policy explains how we collect, use, and
        share your information.
      </motion.p>

      <div className="space-y-8 mt-10">
        <Section icon="mdi:account" title="Information We Collect">
          <p>
            We collect personal information such as your name, email address,
            shipping details, and payment information when you place an order or
            create an account.
          </p>
        </Section>

        <Section
          icon="mdi:shield-check-outline"
          title="How We Use Your Information"
        >
          <p>
            Your data helps us process orders, improve user experience, send
            updates, and prevent fraud.
          </p>
        </Section>

        <Section icon="mdi:share-variant-outline" title="Sharing Your Data">
          <p>
            We do not sell your data. We may share information with third-party
            services for payment processing, shipping, and analytics.
          </p>
        </Section>

        <Section icon="mdi:account-key-outline" title="Your Rights">
          <p>
            You can access, modify, or request deletion of your personal
            information by contacting us at{' '}
            <a
              href="mailto:privacy@sneakz.com"
              className="text-blue-600 underline"
            >
              privacy@sneakz.com
            </a>
            .
          </p>
        </Section>

        <Section icon="mdi:file-document-edit-outline" title="Policy Agreement">
          <p>
            By using our site, you agree to this policy. We may update it
            periodically, and we encourage you to review it regularly.
          </p>
        </Section>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
