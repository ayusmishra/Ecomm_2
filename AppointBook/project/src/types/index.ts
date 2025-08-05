export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  image: string;
  availability: string[];
  fee: number;
  location: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed';
  payment_id?: string;
  created_at: string;
  doctor?: Doctor;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: string;
}