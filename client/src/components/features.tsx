import { motion } from "framer-motion";
import { Cpu, Globe, Shield, Zap, Layers, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on a high-performance edge network ensuring minimal latency worldwide."
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Crafted with a focus on aesthetics and user experience out of the box."
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security protocols to keep your data safe and sound."
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Grow from 10 to 10 million users without changing a single line of code."
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Content delivered from the nearest server to your users instantly."
  },
  {
    icon: Cpu,
    title: "AI Integrated",
    description: "Native support for the latest LLMs and neural processing units."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for building the next generation of web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group h-full p-6 bg-white/5 border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm hover:bg-white/10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}