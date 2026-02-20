import {createClient} from "redis";

const redisClient =  createClient({
    username: 'default',
    password: 'HFg1vaq9QxqpfVvS3bdpRwaSb2iT3rNN',
    socket: {
        host: 'redis-14432.crce276.ap-south-1-3.ec2.cloud.redislabs.com',
        port: 14432
    }
});;

redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
})

await redisClient.connect()


export default redisClient;