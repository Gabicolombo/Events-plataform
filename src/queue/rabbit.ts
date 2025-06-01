import amqplib from 'amqplib';

export const connectToRabbitMQ = async() => {
  try { 
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('event.notify');
    return channel;
  }catch(error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}