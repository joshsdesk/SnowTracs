import Resort from '../models/Resort';

const resolvers = {
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
      // Case-insensitive, full-name match
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
  },
};

export default resolvers;
