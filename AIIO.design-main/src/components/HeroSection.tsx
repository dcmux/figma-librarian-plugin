import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  onExploreClick?: () => void;
}

const HeroSection = ({
  name = "John Doe",
  title = "UX Designer & Developer",
  description = "Creating intuitive and engaging digital experiences through thoughtful design and clean code.",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
  onExploreClick = () => console.log("Explore clicked"),
}: HeroSectionProps) => {
  return (
    <section className="min-h-[800px] w-full bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Hi, I'm {name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" onClick={onExploreClick} className="group">
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square max-w-md mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
          <motion.img
            src={imageUrl}
            alt={name}
            className="relative w-full h-full object-cover rounded-full border-4 border-background shadow-2xl"
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
