import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  experience?: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
}

const AboutSection = ({
  name = "John Doe",
  title = "UX Designer & Developer",
  bio = "Passionate about creating intuitive and engaging digital experiences. With over 5 years of experience in UX design and frontend development, I specialize in translating complex problems into simple, beautiful solutions.",
  skills = [
    "UI/UX Design",
    "User Research",
    "Prototyping",
    "Frontend Development",
    "Design Systems",
    "Responsive Design",
  ],
  experience = [
    {
      role: "Senior UX Designer",
      company: "Design Studio X",
      period: "2020 - Present",
      description: "Lead designer for enterprise software solutions",
    },
    {
      role: "UX Developer",
      company: "Tech Innovations Inc",
      period: "2018 - 2020",
      description: "Developed and maintained design systems",
    },
  ],
}: AboutSectionProps) => {
  return (
    <section className="w-full min-h-[700px] py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{name}</h3>
                <p className="text-primary mb-4">{title}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{bio}</p>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Experience</h4>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h5 className="font-semibold">{exp.role}</h5>
                      <p className="text-sm text-primary">{exp.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
