import Resort from '../models/Resort';
import User from '../models/User'; // 🔐 User model for auth
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 🔐 Secret for signing JWT tokens
const secret = process.env.JWT_SECRET || 'mysecretkey';

// 🔐 Helper function to sign a token
const signToken = (user: any) => {
  return jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    secret,
    { expiresIn: '7d' } // optional: remove if you want unlimited duration
  );
};

const resolvers = {
  // === ROOT QUERY ===
  Query: {
    resorts: async () => {
      const resorts = await Resort.find();
      return resorts.map((resort: any) => ({
        id: resort._id,
        name: resort.name,
        trails_open: resort.trails_open,
        trails_total: resort.trails_total,
        lifts_open: resort.lifts_open,
        lifts_total: resort.lifts_total,
        gondolas_open: resort.gondolas_open,
        gondolas_total: resort.gondolas_total,
        snowpack_in: resort.snowpack_in,
        hours: resort.hours,
        website: resort.website,
        image: resort.image,
        latitude: resort.latitude,
        longitude: resort.longitude,
      }));
    },

    resort: async (_: unknown, { name }: { name: string }) => {
      const regex = new RegExp(`^${name}$`, 'i');
      const resort = await Resort.findOne({ name: regex });
      if (!resort) return null;

      return {
        id: resort._id,
        name: resort.name,
        trails_open: resort.trails_open,
        trails_total: resort.trails_total,
        lifts_open: resort.lifts_open,
        lifts_total: resort.lifts_total,
        gondolas_open: resort.gondolas_open,
        gondolas_total: resort.gondolas_total,
        snowpack_in: resort.snowpack_in,
        hours: resort.hours,
        website: resort.website,
        image: resort.image,
        latitude: resort.latitude,
        longitude: resort.longitude,
      };
    },

    // 🔐 Auth: Get logged-in user's data
    me: async (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(context.user._id);
    },
  },

  // === ROOT MUTATION ===
  Mutation: {
    // 🔐 Register a new user
    register: async (_: unknown, { username, email, password }: any) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already registered');

      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // 🔐 Login an existing user
    login: async (_: unknown, { email, password }: any) => {
      console.log('🔍 Login attempt:', email);
    
      // ✅ Allow login by either email or username
      const user = await User.findOne({
        $or: [{ email }, { username: email }],
      });
    
      if (!user) {
        console.log('❌ No user found for email or username:', email);
        throw new Error('Invalid email or username');
      }
    
      console.log('✅ User found:', user.username);
    
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        console.log('❌ Invalid password for:', email);
        throw new Error('Invalid password');
      }
    
      const token = signToken(user);
      return { token, user };
    }
    
    
  }
};

export default resolvers;
