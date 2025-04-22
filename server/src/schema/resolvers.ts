import Resort from '../models/Resort';
import User from '../models/User';
import Session from '../models/Session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecretkey';

const signToken = (user: any) => {
  return jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    secret,
    { expiresIn: '7d' }
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

    me: async (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(context.user._id);
    },

    sessions: async () => {
      return await Session.find().sort({ date: -1 });
    },

    session: async (_: unknown, { id }: { id: string }) => {
      return await Session.findById(id);
    }
  },

  // === ROOT MUTATION ===
  Mutation: {
    register: async (
      _: unknown,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        userType,
        profileImage,
        bio
      }: any
    ) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error('Email already registered');

      const user = await User.create({
        username,
        email,
        password,
        firstName,
        lastName,
        userType,
        profileImage,
        bio
      });

      const token = signToken(user);
      return { token, user };
    },

    login: async (_: unknown, { email, password }: any) => {
      console.log('🔍 Login attempt:', email);

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
