import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'pJmlf1v9k1uEYvtIfckIKicaX9w4ELRH',
    socket: {
        host: 'redis-16564.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 16564
    }
});

export const redisconnect = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
    console.log(`connected to redis`)
}