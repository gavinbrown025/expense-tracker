"use client";

import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import UICircleIcon from "@/components/UICircleIcon";
import UIIcon from "@/components/UIIcon";
import { link } from "fs";

const HeroSection = () => {
  return (
    <section className="gradient-primary/10 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Get in Touch"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h1 className="text-dynamic-3xl-6xl font-bold">
            Contact <span className="gradient-text">ExpenseTracker</span>
          </h1>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-8">
            {`Have questions about AI-powered expense tracking or need help?
            We're here to assist you with intelligent financial management.`}
          </p>
          <div className="mx-auto w-fit grid grid-cols-2 gap-4 md:gap-6 justify-center">
            <a
              href="mailto:support@example.com"
              className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gradient-primary/90 hover:gradient-accent"
            >
              Send us an Email <UIIcon iconName="mail" />
            </a>
            <a
              href="tel:+11234567890"
              className="btn btn-accent btn-outline btn-sm sm:btn-md lg:btn-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Email Support",
      description:
        "Get detailed assistance with your questions. We typically respond within 24 hours.",
      icon: "mail",
      link: {
        label: "support@example.com",
        href: "mailto:support@example.com",
      },
    },
    {
      title: "Phone Support",
      description:
        "Speak directly with our support team for immediate assistance with urgent matters.",
      icon: "phone",
      link: { label: "+1 (123) 456-7890", href: "tel:+11234567890" },
    },
    {
      title: "Location",
      description:
        "Visit our headquarters for in-person consultations and partnership discussions.",
      icon: "share_location",
      link: {
        label: "Clayton, VIC, Australia",
        href: "https://www.google.com/maps?q=Clayton,+Melbourne,+AUS",
      },
    },
  ];

  return (
    <section className="gradient-base-300 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Features"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-2xl-5xl font-bold">
            Multiple Ways to <span className="gradient-text">Connect</span>
          </h2>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-12">
            Discover the powerful features that make our AI-driven platform the
            smart choice for modern financial management.
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="gradient-base-100/100 p-2 hover-lift"
                bodyStyles="flex flex-col items-center"
              >
                <UICircleIcon
                  className="gradient-primary/100 size-8 mb-2 aspect-square"
                  iconName={feature.icon}
                />
                <h3 className="text-xl @xs/card:text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-base text-neutral-content/90 mb-4">
                  {feature.description}
                </p>
                <a
                  href={feature.link.href}
                  className="text-sm text-primary transform hover:scale-105 transition-transform duration-200"
                >
                  {feature.link.label}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="gradient-base-100/10 grid place-items-center">
      <div className="container-x max-w-6xl py-24 space-y-8">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Support Information"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-2xl-5xl font-bold">
            {`We're Here to `}<span className="gradient-text">Help</span>
          </h2>
        </div>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-4 sm:gap-6 px-2 sm:px-0 items-start">
          <Card className="!gradient-base-300/100 text-left p-2">
            <div className="flex items-center gap-4 mb-4">
              <UICircleIcon
                className="gradient-primary/100 size-8 aspect-square"
                iconName="alarm_on"
              />
              <h3 className="text-base @xs/card:text-xl font-bold">
                Support Hours
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
              <StatusBadge
                className="text-primary/100 text-sm w-full"
                text="Email support: Available 24/7"
              />
            </div>
          </Card>
          <Card className="!gradient-base-300/100 text-left">
            <div className="flex items-center gap-4 mb-4">
              <UICircleIcon
                className="gradient-primary/100 size-8 aspect-square"
                iconName="help"
              />
              <h3 className="text-base @xs/card:text-xl font-bold">
                Quick Help
              </h3>
            </div>
            <ul className="space-y-4 mb-4">
              <li className="gradient-neutral/50 py-2 px-3 rounded-md">
                <h4 className="font-bold">Technical Issues</h4>
                <p className=" text-neutral-content/80">
                  App not working properly? Check our troubleshooting guide
                  first.
                </p>
              </li>
              <li className="gradient-neutral/50 py-2 px-3 rounded-md">
                <h4 className="font-bold">AI Features</h4>
                <p className=" text-neutral-content/80">
                  Questions about AI insights? Our AI documentation has answers.
                </p>
              </li>
              <li className="gradient-neutral/50 py-2 px-3 rounded-md">
                <h4 className="font-bold">Account & Billing</h4>
                <p className=" text-neutral-content/80">
                  Account issues or billing questions? Contact us directly.
                </p>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => {
  return (
    <div className="gradient-base-100 bg-fixed transition-all duration-300 min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
    </div>
  );
};

export default ContactPage;
