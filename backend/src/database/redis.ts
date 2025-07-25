import { createClient } from 'redis';

const port = process.env.REDIS_PORT
export const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(port)
    }
});

export const redisconnect = async () => {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    console.log(`Connected to Redis`)
}




