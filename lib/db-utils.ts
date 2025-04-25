import pool from './db';

export interface Donation {
  id: number;
  donor_name: string;
  email: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  created_at: Date;
  updated_at: Date;
}

// Donation operations
export const donationUtils = {
  // Create a new donation
  async create(donation: Omit<Donation, 'id' | 'created_at' | 'updated_at'>) {
    const [result] = await pool.query(
      'INSERT INTO donations (donor_name, email, amount, payment_method) VALUES (?, ?, ?, ?)',
      [donation.donor_name, donation.email, donation.amount, donation.payment_method]
    );
    return result;
  },

  // Get all donations
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM donations ORDER BY created_at DESC');
    return rows as Donation[];
  },

  // Get donation by ID
  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM donations WHERE id = ?', [id]);
    return (rows as Donation[])[0];
  },

  // Update donation status
  async updateStatus(id: number, status: Donation['status'], transaction_id?: string) {
    const [result] = await pool.query(
      'UPDATE donations SET status = ?, transaction_id = ? WHERE id = ?',
      [status, transaction_id, id]
    );
    return result;
  }
};

// User operations
export const userUtils = {
  // Get user by email
  async getByEmail(email: string) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as User[])[0];
  },

  // Verify admin access
  async verifyAdmin(email: string) {
    const user = await this.getByEmail(email);
    return user?.role === 'admin';
  }
}; 