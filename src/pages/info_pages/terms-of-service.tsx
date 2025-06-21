'use client';

import PageWrapper from '@/components/shared/page-wrapper';

const TermsOfService = () => {
  return (
    <PageWrapper title="Terms of Service">
      <p>
        These Terms of Service govern your use of the SNEAKZ website and
        services. By accessing or using our site, you agree to comply with and
        be bound by these terms.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">Use of Site</h2>
      <p>
        You must be at least 18 years old or have parental consent to use our
        site. You agree not to use our site for any unlawful or prohibited
        activities.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">
        Product Information
      </h2>
      <p>
        We strive to ensure all product details, pricing, and availability are
        accurate. However, errors may occur and we reserve the right to correct
        them.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">
        Order Processing
      </h2>
      <p>
        We reserve the right to cancel or limit quantities on any order. Orders
        are subject to product availability and payment confirmation.
      </p>

      <h2 className="text-xl font-semibold text-yellow-400">Liability</h2>
      <p>
        SNEAKZ is not liable for any indirect or consequential damages arising
        from the use of our site or products.
      </p>

      <p>
        We may update these terms at any time. Continued use of the site
        indicates acceptance of the current terms.
      </p>
    </PageWrapper>
  );
};

export default TermsOfService;
