export default function FAQSection() {
  const faqs = [
    {
      question: "How secure are my pet's photos?",
      answer: "We use enterprise-grade security with encryption and regular backups to keep your memories safe."
    },
    {
      question: "Can I share albums with family members?",
      answer: "Yes! You can invite family members to view and contribute to your pet's albums."
    },
    {
      question: "Is there a limit to how many photos I can upload?",
      answer: "Our premium plans offer unlimited storage, while our free plan includes 1GB of storage."
    },
    {
      question: "Can I create memorial albums for pets who have passed?",
      answer: "Absolutely. We provide beautiful memorial templates to honor your beloved companion's memory."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we provide 24/7 customer support via chat, email, and phone for all our users."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-rose-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 