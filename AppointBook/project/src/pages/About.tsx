import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Happy Patients', value: '50,000+' },
  { icon: Award, label: 'Expert Doctors', value: '200+' },
  { icon: Clock, label: 'Years of Service', value: '15+' },
  { icon: Heart, label: 'Success Rate', value: '98%' },
];

const team = [
  {
    name: 'Dr. John Smith',
    role: 'Chief Medical Officer',
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Leading healthcare innovation with 20+ years of experience.',
  },
  {
    name: 'Dr. Maria Garcia',
    role: 'Head of Cardiology',
    image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Specialist in cardiovascular medicine and preventive care.',
  },
  {
    name: 'Dr. David Chen',
    role: 'Director of Operations',
    image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Ensuring seamless healthcare delivery and patient satisfaction.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">HealthCare</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing accessible, quality healthcare through innovative technology 
              and compassionate care. Your health is our mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At HealthCare, we believe that quality healthcare should be accessible to everyone. 
                Our platform connects patients with qualified healthcare professionals, making it 
                easier than ever to book appointments, receive care, and manage your health.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We leverage technology to streamline the healthcare experience while maintaining 
                the personal touch that's so important in medical care. From booking appointments 
                to follow-up care, we're here to support you every step of the way.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Patient-Centered Care</h3>
                  <p className="text-gray-600">Your health and comfort are our top priorities.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/3952242/pexels-photo-3952242.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare team"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team of healthcare professionals and technology experts 
              work together to provide you with the best possible care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Compassion</h3>
                <p className="text-blue-100">
                  We treat every patient with empathy, respect, and understanding.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Excellence</h3>
                <p className="text-blue-100">
                  We strive for the highest standards in everything we do.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Innovation</h3>
                <p className="text-blue-100">
                  We embrace technology to improve healthcare delivery and accessibility.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}