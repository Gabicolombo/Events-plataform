import { connectToRabbitMQ } from '../queue/rabbit';

export const sendNotificationToQueue = async (eventData:any) => {
  try {
    const channel = await connectToRabbitMQ();
    const eventMessage = JSON.stringify(eventData);
    channel.sendToQueue('event.notify', Buffer.from(eventMessage), {
      persistent: true});
    console.log('Notification sent to queue:', eventMessage);
  }catch(err) {
    console.error('Error sending notification to queue:', err);
  }
}