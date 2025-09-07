import { SignInButton } from "@clerk/nextjs";

import { features } from "@/lib/features";

import StatusBadge from "./StatusBadge";
import UIIcon from "./UIIcon";
import Link from "next/link";
import Card from "./Card";
import UICircleIcon from "./UICircleIcon";
import Avatar from "./Avatar";

const HeroSection = () => {
  return (
    <section className="gradient-primary/10 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="AI-Powered Financial Management"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h1 className="text-dynamic-3xl-6xl font-bold">
            Welcome to <span className="gradient-text">ExpenseTracker</span>
          </h1>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-8">
            Track your expenses, manage your budget, and get AI-powered insights
            to take control of your finances with intelligent automation.
          </p>
          <div className="mx-auto w-fit grid grid-cols-2 gap-4 md:gap-6 justify-center">
            <SignInButton>
              <button className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gradient-primary/90 hover:gradient-accent">
                Get Started Free <UIIcon iconName="chevron_right" />
              </button>
            </SignInButton>
            <Link
              href="/about"
              className="btn btn-accent btn-outline btn-sm sm:btn-md lg:btn-lg"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="gradient-base-100/60 sm:last:col-span-2 md:last:col-span-1"
            >
              <UICircleIcon
                iconName={feature.icon}
                className="gradient-primary/100 mx-auto"
              />
              <h3 className="text-lg font-bold text-center">{feature.title}</h3>
              <p className="text-sm text-center text-neutral-content">
                {feature.brief}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const FAQs = [
    {
      question: "What is ExpenseTracker AI?",
      answer:
        "ExpenseTracker AI is an intelligent financial management tool that uses artificial intelligence to help you monitor your spending patterns, get smart category suggestions, and receive personalized insights to improve your financial health.",
    },
    {
      question: "How does the AI work?",
      answer:
        "Our AI analyzes your spending data to automatically categorize expenses, detect patterns, and provide personalized recommendations. You can also ask the AI questions about your spending habits and get instant, intelligent responses.",
    },
    {
      question: "Is ExpenseTracker Free?",
      answer:
        "Yes, ExpenseTracker AI offers a free plan with basic AI features including smart categorization and insights. Premium plans are available for advanced AI analytics and unlimited AI interactions.",
    },
  ];
  return (
    <section className="gradient-base-100 grid place-items-center py-24">
      <div className="container-x max-w-6xl grid md:grid-cols-2 gap-x-8 gap-12 mb-8">
        <div className="space-y-6">
          <h2 className="text-dynamic-2xl-5xl leading-tight font-bold">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-content">
            Everything you need to know about ExpenseTracker AI and how it can
            transform your financial management.
          </p>
        </div>
        <div className="space-y-4">
          {FAQs.map((f, i) => (
            <div
              key={i}
              className="collapse collapse-arrow bg-base-300 border-base-100 border shadow-xl"
            >
              <input
                type="radio"
                name="faq"
                id={`faq-${i}`}
                defaultChecked={i === 0}
              />
              <div className="collapse-title font-semibold">{f.question}</div>
              <div className="collapse-content text-sm">{f.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: `"ExpenseTracker AI has completely transformed my budgeting. The AI insights are incredibly helpful and I now have full control over my finances!"`,
    },
    {
      name: "Jane Smith",
      feedback: `"The AI-powered insights from ExpenseTracker have helped me identify and reduce unnecessary spending. The smart categorization is amazing!"`,
    },
    {
      name: "Alice Johnson",
      feedback: `"ExpenseTracker AI is so intelligent and easy to use. The AI recommendations are spot-on and have genuinely improved my financial habits!"`,
    },
  ];

  return (
    <section className="gradient-primary/10 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Testimonials"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="text-dynamic-3xl-5xl font-bold">
            What Our Users <span className="gradient-text">Say</span>
          </h2>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their
            financial habits with ExpenseTracker AI.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="gradient-base-100/60 sm:last:col-span-2 md:last:col-span-1"
            >
              <div className="flex gap-4">
                <Avatar
                  user={{
                    firstName: testimonial.name.split(" ")[0],
                    lastName: testimonial.name.split(" ")[1] ?? "",
                    imageUrl: "",
                    hasImage: false,
                  }}
                  className="size-12 mx-auto mb-4"
                />
                <div>
                  <h3 className="text-lg font-bold text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-neutral-content/80 italic">
                    Verified User
                  </p>
                </div>
              </div>
              <p>{testimonial.feedback}</p>
              <div className="rating py-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="mask mask-star gradient-accent/100"
                    aria-label={`${i + 1} star`}
                    aria-current={i === 4 && "true"}
                  ></div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Guest = () => {
  return (
    <div>
      <HeroSection />
      <FaqSection />
      <Testimonials />
    </div>
  );
};

export default Guest;
