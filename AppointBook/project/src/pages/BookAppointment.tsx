import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Doctor, Specialization } from '../types';
import toast from 'react-hot-toast';

// Mock data - In a real app, this would come from your database
const specializations: Specialization[] = [
  { id: '1', name: 'General Medicine', description: 'Primary healthcare and general consultation', icon: 'stethoscope' },
  { id: '2', name: 'Cardiology', description: 'Heart and cardiovascular health', icon: 'heart' },
  { id: '3', name: 'Dermatology', description: 'Skin, hair, and nail conditions', icon: 'user' },
  { id: '4', name: 'Orthopedics', description: 'Bone, joint, and muscle issues', icon: 'bone' },
  { id: '5', name: 'Pediatrics', description: 'Child and infant healthcare', icon: 'baby' },
  { id: '6', name: 'Neurology', description: 'Brain and nervous system disorders', icon: 'brain' },
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Medicine',
    experience: 8,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    fee: 150,
    location: 'Downtown Medical Center',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    fee: 200,
    location: 'Heart Specialty Clinic',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    experience: 6,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5407764/pexels-photo-5407764.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    fee: 175,
    location: 'Skin Care Institute',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 15,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    fee: 225,
    location: 'Orthopedic Surgery Center',
  },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      toast.error('Please login to book an appointment');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedSpecialization) {
      const doctors = mockDoctors.filter(
        doctor => doctor.specialization === selectedSpecialization
      );
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialization]);

  const handleSpecializationSelect = (specialization: string) => {
    setSelectedSpecialization(specialization);
    setStep(2);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(4);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(5);
  };

  const handlePayment = () => {
    // In a real app, integrate with Stripe here
    toast.success('Redirecting to payment gateway...');
    // For demo purposes, we'll simulate payment success
    setTimeout(() => {
      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    }, 2000);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${
                  stepNumber < 5 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Specialization</span>
            <span>Doctor</span>
            <span>Date</span>
            <span>Time</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Medical Specialization
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specializations.map((spec) => (
                  <motion.div
                    key={spec.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSpecializationSelect(spec.name)}
                    className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {spec.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{spec.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Doctor - {selectedSpecialization}
              </h2>
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="flex items-center p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {doctor.experience} years exp.
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {doctor.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {doctor.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ${doctor.fee}
                      </div>
                      <div className="text-sm text-gray-500">consultation</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && selectedDoctor && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Date
              </h2>
              <div className="mb-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-gray-600">{selectedDoctor.specialization}</p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Days: {selectedDoctor.availability.join(', ')}
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {selectedDate && (
                <button
                  onClick={() => handleDateSelect(selectedDate)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          )}

          {step === 4 && selectedDoctor && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Time Slot
              </h2>
              <div className="mb-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">{selectedDate}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTimeSelect(time)}
                    className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Clock className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-sm font-medium">{time}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && selectedDoctor && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Confirm & Pay
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Appointment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">{selectedDoctor.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{selectedDoctor.location}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-blue-600">${selectedDoctor.fee}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        {step > 1 && (
          <div className="mt-6">
            <button
              onClick={() => setStep(step - 1)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}