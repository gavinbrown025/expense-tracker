import Link from "next/link";
import { features } from "@/lib/features";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import UIIcon from "@/components/UIIcon";
import UICircleIcon from "@/components/UICircleIcon";

const HeroSection = () => {
  return (
    <section className="gradient-primary/10 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Powered by AI Technology"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h1 className="text-dynamic-3xl-6xl font-bold">
            About <span className="gradient-text">ExpenseTracker</span>
          </h1>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-8">
            Your intelligent companion for tracking expenses and managing your
            finances with cutting-edge AI-powered insights.
          </p>
          <div className="mx-auto w-fit grid grid-cols-2 gap-4 md:gap-6 justify-center">
            <Link
              href="/sign-up"
              className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gradient-primary/90 hover:gradient-accent"
            >
              Start Your Journey <UIIcon iconName="chevron_right" />
            </Link>
            <Link
              href="/contact"
              className="btn btn-accent btn-outline btn-sm sm:btn-md lg:btn-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const MissionSection = () => {
  const stats = [
    { label: "Total Users", value: "10K+" },
    { label: "Monthly Transactions", value: "$1M+" },
    { label: "Satisfaction Rate", value: "99%" },
  ];
  return (
    <section className="gradient-base-100 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Our Mission"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-xl-4xl font-bold">
            Transforming Financial Management with{" "}
            <span className="gradient-text">AI</span>
          </h2>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-12">
            Your intelligent companion for tracking expenses and managing your
            finances with cutting-edge AI-powered insights.
          </p>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="!bg-secondary/40 !gradient-primary/20"
              >
                <h3 className="text-3xl gradient-text-primary/100 font-bold text-center">
                  {stat.value}
                </h3>
                <p className="text-sm text-center text-neutral-content/90">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="gradient-accent/10 grid place-items-center">
      <div className=" container-x py-24 space-y-16">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Features"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-2xl-5xl font-bold">
            Why Choose <span className="gradient-text">ExpenseTracker</span>
          </h2>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-12">
            Discover the powerful features that make our AI-driven platform the
            smart choice for modern financial management.
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="!gradient-base-100/100 text-left p-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <UICircleIcon
                    className="gradient-primary/100 size-8 aspect-square"
                    iconName={feature.icon}
                  />
                  <h3 className="text-base @xs/card:text-xl font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-neutral-content/90 mb-4">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const StorySection = () => {
  return (
    <section className="gradient-base-300/10 grid place-items-center">
      <div className="container-x max-w-6xl py-24 space-y-8">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Our Story"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-2xl-5xl font-bold">
            Built for the <span className="gradient-text">Future</span>
          </h2>
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-4 sm:gap-6 px-2 sm:px-0 items-start">
          <div>
            <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-8">
              ExpenseTracker was born from the vision of creating truly
              intelligent financial management tools. Our team of financial
              experts, data scientists, and technologists came together to solve
              a critical problem: making personal finance management smarter,
              more intuitive, and more effective.
              <br />
              <br />
              {`Since our launch, we've helped thousands of users achieve better
              budgeting and improve their overall financial health through the
              power of artificial intelligence. Every feature is designed with
              user experience and financial wellness in mind.`}
            </p>
            <div className="flex gap-4">
              <div className="avatar-group -space-x-6 shrink-0">
                <div className="avatar border-primary border-3 size-12">
                  <div className="w-full">
                    <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                  </div>
                </div>
                <div className="avatar border-primary border-3 size-12">
                  <div className="w-full">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                  </div>
                </div>
                <div className="avatar border-primary border-3 size-12">
                  <div className="w-full">
                    <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                  </div>
                </div>
                <div className="avatar avatar-placeholder border-primary border-3 size-12">
                  <div className="bg-neutral text-neutral-content w-full grid place-items-center">
                    <span className="leading-0">+99</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-current/80">
                  Trusted by 10,000+ users
                </h4>
                <p className="text-sm text-current/80">
                  Join our growing community
                </p>
              </div>
            </div>
          </div>
          <div className="bg-primary/20 p-8 rounded-xl">
            <ul className="space-y-4 mb-4">
              <li className="flex items-center gap-4">
                <span className="status status-primary"></span>Founded in 2024
              </li>
              <li className="flex items-center gap-4">
                <span className="status status-primary"></span>AI-First Approach
              </li>
              <li className="flex items-center gap-4">
                <span className="status status-primary"></span>Global Impact
              </li>
              <li className="flex items-center gap-4">
                <span className="status status-primary"></span>User-Centric
                Design
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ActionSection = () => {
  const stats = [
    { label: "No credit card required", value: "Free" },
    { label: "AI-powered support", value: "24/7" },
    { label: "Setup in minutes", value: "Instant" },
  ];
  return (
    <section className="gradient-base-100 grid place-items-center">
      <div className=" container-x py-24 space-y-12">
        <div className="text-center space-y-4">
          <StatusBadge
            text="Ready to Transform Your Finances?"
            className="text-sm text-primary/100 gradient-primary/20 shadow-md"
          />
          <h2 className="leading-tight text-dynamic-3xl-5xl font-bold">
            Take Control of Your <br />
            <span className="gradient-text">Financial Future</span>
          </h2>
          <p className="md:text-lg text-neutral-content max-w-2xl mx-auto mb-12">
            Join thousands of users who have already transformed their financial
            habits with ExpenseTracker. Start your journey towards smarter
            budgeting today.
          </p>
        </div>
        <div className="mx-auto w-fit grid grid-cols-2 gap-4 md:gap-6 justify-center">
          <Link
            href="/sign-up"
            className="btn btn-primary btn-sm sm:btn-md lg:btn-lg gradient-primary/90 hover:gradient-accent"
          >
            Get Started Free <UIIcon iconName="chevron_right" />
          </Link>
          <Link
            href="/contact"
            className="btn btn-accent btn-outline btn-sm sm:btn-md lg:btn-lg"
          >
            Contact Us
          </Link>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 space-y-2">
              <h3 className="text-3xl gradient-text-primary/100 font-bold text-center">
                {stat.value}
              </h3>
              <p className="text-sm text-center text-neutral-content/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div className="gradient-base-100 bg-fixed transition-all duration-300 min-h-screen">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />
      <StorySection />
      <ActionSection />
    </div>
  );
};

export default AboutPage;
