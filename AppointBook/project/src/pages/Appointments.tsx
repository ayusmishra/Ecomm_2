import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../types';
import toast from 'react-hot-toast';

// Mock appointments data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    user_id: '1',
    doctor_id: '1',
    appointment_date: '2024-01-15',
    appointment_time: '10:00 AM',
    status: 'confirmed',
    payment_status: 'completed',
    created_at: '2024-01-10T10:00:00Z',
    doctor: {
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
  },
  {
    id: '2',
    user_id: '1',
    doctor_id: '2',
    appointment_date: '2024-01-20',
    appointment_time: '02:30 PM',
    status: 'pending',
    payment_status: 'completed',
    created_at: '2024-01-12T14:00:00Z',
    doctor: {
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
  },
];

export default function Appointments() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      toast.error('Please login to view appointments');
      return;
    }

    // Simulate loading appointments
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    toast.success('Appointment cancelled successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No appointments found' : `No ${filter} appointments`}
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't booked any appointments yet.
            </p>
            <button
              onClick={() => navigate('/book-appointment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Book Your First Appointment
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={appointment.doctor?.image}
                      alt={appointment.doctor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {appointment.doctor?.name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {appointment.doctor?.specialization}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {appointment.appointment_date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {appointment.appointment_time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {appointment.doctor?.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(appointment.payment_status)}`}>
                        Payment {appointment.payment_status}
                      </span>
                    </div>
                    
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Booked on {new Date(appointment.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      ${appointment.doctor?.fee}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}