import { createClient } from 'redis';


export const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REEDIS_PORT)
    }
});

export const redisconnect = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
    console.log(`connected to redis`)
}