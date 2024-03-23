import { Box, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'


const PrivacyPolicy = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>PRIVACY STATEMENT</Heading>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</strong></Text>
        <Text mb={2}>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.</Text>
        <Text mb={2}>When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</Text>
        <Text mb={2}>Email marketing With your permission, we may send you emails about our store, new products and other updates.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 2 - CONSENT</strong></Text>
        <Text mb={2}>How do you get my consent?</Text>
        <Text mb={2}>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</Text>
        <Text mb={2}>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</Text>
        <Text mb={2}>How do I withdraw my consent?</Text>
        <Text mb={2}>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at <Link href="mailto:prachi@psclothing.co.in"><u>prachi@psclothing.co.in</u></Link> or mailing us at: <strong>House No 3120, Panchamukhi Colony Sri Ram College Road Jabalpur Pin-482002</strong></Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 3 - DISCLOSURE</strong></Text>
        <Text mb={2}>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 4 - PAYMENT</strong></Text>
        <Text mb={2}>We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard</Text>
        <Text mb={2}>(PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.</Text>
        <Text mb={2}>Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.</Text>
        <Text mb={2}>For more insight, you may also want to read terms and conditions of razorpay on <Link href="https://razorpay.com/"><u>https://razorpay.com</u></Link></Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 5 - THIRD-PARTY SERVICES</strong></Text>
        <Text mb={2}>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</Text>
        <Text mb={2}>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</Text>
        <Text mb={2}>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</Text>
        <Text mb={2}>In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</Text>
        <Text mb={2}>Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.</Text>
        <Text mb={2}>Links</Text>
        <Text mb={2}>When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 6 - SECURITY</strong></Text>
        <Text mb={2}>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 7 - COOKIES</strong></Text>
        <Text mb={2}>We use cookies to maintain session of your user. It is not used to personally identify you on other websites.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 8 - AGE OF CONSENT</strong></Text>
        <Text mb={2}>By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>SECTION 9 - CHANGES TO THIS PRIVACY POLICY</strong></Text>
        <Text mb={2}>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</Text>
        <Text mb={2}>If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</Text>
      </Box>

      <Box mb={4}>
        <Text mb={2}><strong>QUESTIONS AND CONTACT INFORMATION</strong></Text>
        <Text mb={2}>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <Link href="mailto:prachi@psclothing.co.in"><u>prachi@psclothing.co.in</u></Link> or mailing us at: <strong>House No 3120, Panchamukhi Colony Sri Ram College Road Jabalpur Pin-482002</strong></Text>
        
      </Box>
    </Box>
  )
}

export default PrivacyPolicy
