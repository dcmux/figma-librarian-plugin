import React from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import PortfolioSection from "./PortfolioSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface HomeProps {
  userData?: {
    name?: string;
    title?: string;
    bio?: string;
    heroImage?: string;
    email?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
    isAvailable?: boolean;
  };
}

const Home = ({
  userData = {
    name: "John Doe",
    title: "UX Designer & Developer",
    bio: "Creating intuitive and engaging digital experiences through thoughtful design and clean code.",
    heroImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
    email: "hello@example.com",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    isAvailable: true,
  },
}: HomeProps) => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Tip: How to Use This Prompt",
      description: "Copy this prompt and paste it into ChatGPT to get started.",
      variant: "default",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <Navigation />

      <main>
        <section id="hero">
          <HeroSection
            name={userData.name}
            title={userData.title}
            description={userData.bio}
            imageUrl={userData.heroImage}
          />
        </section>

        <section id="portfolio">
          <PortfolioSection />
        </section>

        <section id="about">
          <AboutSection
            name={userData.name}
            title={userData.title}
            bio={userData.bio}
          />
        </section>

        <section id="contact">
          <ContactSection
            email={userData.email}
            socialLinks={userData.socialLinks}
            isAvailable={userData.isAvailable}
          />
        </section>
      </main>

      <footer className="py-8 text-center bg-background text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {userData.name}. All rights reserved.
        </p>
        <div className="mt-4">
          <Button onClick={showToast}>Show Tip Toast</Button>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
