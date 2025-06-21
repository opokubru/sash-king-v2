'use client';

import PageWrapper from '@/components/shared/page-wrapper';

const PrivacyPolicy = () => {
  return (
    <PageWrapper title="Privacy Policy">
      <p>
        At SNEAKZ, we respect your privacy and are committed to protecting your
        personal data. This Privacy Policy explains how we collect, use, and
        share your information.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">
        Information We Collect
      </h2>
      <p>
        We collect personal information such as your name, email address,
        shipping details, and payment information when you place an order or
        create an account.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">
        How We Use Your Information
      </h2>
      <p>
        Your data helps us process orders, improve user experience, send
        updates, and prevent fraud.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">
        Sharing Your Data
      </h2>
      <p>
        We do not sell your data. We may share information with third-party
        services for payment processing, shipping, and analytics.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">Your Rights</h2>
      <p>
        You can access, modify, or request deletion of your personal information
        by contacting us at privacy@sneakz.com.
      </p>

      <p>
        By using our site, you agree to this policy. We may update it
        periodically, and we encourage you to review it regularly.
      </p>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
