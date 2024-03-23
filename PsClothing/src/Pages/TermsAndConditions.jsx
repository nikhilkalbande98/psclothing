import React from 'react';
import { Container, Heading, Text, Link, List, ListItem } from '@chakra-ui/react';

const TermsAndConditions = () => {
  return (
    <Container maxW="container.lg" mt={10}>
      <Heading as="h2" mb={6}>
        Terms and Conditions
      </Heading>

      <Text mb={4}>
        <strong>1. Acceptance of Terms</strong>
        <br />
        By accessing and using www.psclothing.co.in, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using the Website.
      </Text>

      <Text mb={4}>
        <strong>Account Registration</strong>
        <br />
        a. To make a purchase on the Website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and password.
        <br />
        b. You agree to provide accurate, current, and complete information during the registration process.
      </Text>

      <Text mb={4}>
        <strong>Product Information</strong>
        <br />
        a. We make every effort to display accurate and up-to-date product information. However, we do not warrant the accuracy, completeness, or reliability of any product descriptions or other content on the Website.
        <br />
        b. Prices are subject to change without notice.
      </Text>

      <Text mb={4}>
        <strong>Orders and Payments</strong>
        <br />
        a. Placing an order on the Website constitutes an offer to purchase the products. We reserve the right to accept or decline any order for any reason.
        <br />
        b. Payment is required at the time of purchase.
      </Text>

      <Text mb={4}>
        <strong>Shipping and Delivery</strong>
        <br />
        a. Shipping costs and estimated delivery times are provided during the checkout process.
        <br />
        b. We are not responsible for delays in shipping or delivery due to force majeure or other events beyond our control.
      </Text>

      <Text mb={4}>
        <strong>Intellectual Property</strong>
        <br />
        a. All content on the Website, including text, images, logos, and trademarks, is the property of PsClothing and is protected by intellectual property laws.
      </Text>

      <Text mb={4}>
        <strong>Limitation of Liability</strong>
        <br />
        a. We are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Website or products purchased through the Website.
      </Text>


      <Text mb={4}>
        <strong>Changes to Terms and Conditions</strong>
        <br />
        a. We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on the Website.
      </Text>

      <Text mt={6}>
        If you have any questions, please contact us at{' '}
        <Link color="blue.500" href="mailto:info@example.com">
          prachi@psclothing.co.in
        </Link>
        <Link color="blue.500" href="tel:+919981644648">
        +91 9981644648
        </Link>
        .
      </Text>
    </Container>
  );
};

export default TermsAndConditions;
