import React from "react";

const FAQs = () => {
  const faqs = [
    {
      question: "What is RideShare?",
      answer:
        "RideShare connects drivers with empty seats to passengers looking for a ride, making travel more affordable and convenient.",
    },
    {
      question: "How does RideShare work?",
      answer:
        "Users sign up either as a Rider or a Driver. Riders can search for available rides and book a seat, while Drivers can post their ride details and accept ride requests.",
    },
    {
      question: "Is RideShare free to use?",
      answer:
        "Creating an account is free, but payments for rides depend on the driver's set fare.",
    },
    {
      question: "How do I find a ride?",
      answer:
        "Enter your pickup and drop-off locations in the search bar and choose from available rides.",
    },
    {
      question: "How do I pay for my ride?",
      answer:
        "Payment methods depend on the driver’s preference and app settings (e.g., cash, card, or in-app payments).",
    },
    {
      question: "What if my driver cancels?",
      answer:
        "You’ll be notified immediately and can search for another available ride.",
    },
    {
      question: "Is ride-sharing safe?",
      answer:
        "We verify drivers and encourage user reviews and ratings to ensure safety.",
    },
    {
      question: "How do I become a driver?",
      answer:
        "Sign up as a Driver, complete the verification process, and post your available rides.",
    },
    {
      question: "Can I choose my passengers?",
      answer:
        "Yes, drivers can approve or decline ride requests based on user profiles and ratings.",
    },
    {
      question: "How do I get paid?",
      answer:
        "Payments can be made in cash or through bank transfer",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click Sign Up, select Rider or Driver, and complete the registration process.",
    },
    {
      question: "Can I switch between being a Rider and a Driver?",
      answer:
        "No, your account is either a Rider or a Driver. If you want to switch, you’ll need to create a new account.",
    },
    {
      question: "How you provide security for me during the ride?",
      answer:
        "We will have dashboard cameras will be mounted inside the vehicle for security purposes. In case of further emergencies riders are encouraged to contact 15.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach our support team via email through the Contact Us page.",
    },
  ];

  return (
    <section className="background-card text-color px-6 py-32 md:px-12 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold primary-font text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-2xl font-semibold primary-font mb-2">
              {faq.question}
            </h3>
            <p className="text-lg secondary-font">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
