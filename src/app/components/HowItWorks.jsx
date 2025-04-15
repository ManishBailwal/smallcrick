'use client';

import { motion } from 'framer-motion';
import { Lightbulb, ClipboardCheck, BarChart4 } from 'lucide-react';

// Variants for staggered animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  {
    icon: <ClipboardCheck size={40} className="text-[#F77F00] group-hover:scale-110 transition" />,
    title: 'Join a Match',
    description: 'Discover upcoming local matches and register your interest in seconds.',
  },
  {
    icon: <Lightbulb size={40} className="text-[#F77F00] group-hover:rotate-12 transition" />,
    title: 'Apply to Play',
    description: 'Submit your application to get selected and represent your local team.',
  },
  {
    icon: <BarChart4 size={40} className="text-[#F77F00] group-hover:scale-110 transition" />,
    title: 'Make Predictions',
    description: 'Test your cricket IQ by predicting match winners and tracking results.',
  },
];

const HowItWorks = () => {
  return (
    <motion.section
      className="bg-[#00141b] text-white py-20 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          🧭 How It Works
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-[#002635] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#F77F00]">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
