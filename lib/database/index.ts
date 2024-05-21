import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cashed = (global as any).mongoose || {conn : null, promise: null};

export const connectToDatabase = async () => {
    if (cashed.conn) return cashed.conn;

    if(!MONGODB_URI) throw new Error('MongoDB_URI missing');

    cashed.promise = cashed.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'evemtly',
        bufferCommands: false,
    })

    cashed.conn = await cashed.promise;

    return cashed.conn;

}