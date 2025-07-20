'use client';

import PageWrapper from '@/components/shared/page-wrapper';
import { Section } from '@/components/shared/section';

const TermsOfService = () => {
  return (
    <PageWrapper title="Terms of Service">
      <div className="space-y-8 mt-10">
        <Section title="Products and Pricing">
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              All product descriptions and images are for illustrative purposes
              only
            </li>
            <li>Prices are subject to change without notice</li>
            <li>We reserve the right to discontinue any product</li>
          </ul>
        </Section>

        <Section title="Orders and Payment">
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Orders are subject to acceptance and availability</li>
            <li>Payment is required at the time of purchase</li>
            <li>We accept momo and bank transfers</li>
          </ul>
        </Section>

        <Section title="Shipping and Delivery">
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Delivery timeframes are estimates only</li>
            <li>
              Delivery costs are calculated independently for now till prior
              notice
            </li>
          </ul>
        </Section>

        <Section title="Returns and Refunds">
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Returns accepted within 2 days of delivery</li>
            <li>Items must be unworn, unwashed, and with original tags</li>
          </ul>
        </Section>

        <Section title="Intellectual Property">
          <p>
            All content on our website is our property and protected by
            copyright laws.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages.
          </p>
        </Section>
      </div>
    </PageWrapper>
  );
};

export default TermsOfService;
