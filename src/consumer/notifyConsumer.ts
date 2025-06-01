import { connectToRabbitMQ } from '../queue/rabbit';
import { sendEmail } from '../services/sendEmail';

const consumeNotifications = async () => {
  const channel = await connectToRabbitMQ();
  channel.consume('event.notify', async (msg) => {
    if (msg !== null) {
      const eventData = JSON.parse(msg.content.toString());
      console.log('Notification received:', eventData);

      // Extract email and other details from eventData
      const { email, subject, text } = eventData;

      // Send email notification
      try {
        await sendEmail(email, subject, text);
        console.log('Email sent successfully');
        channel.ack(msg); // Acknowledge the message
      } catch (error) {
        console.error('Error sending email:', error);
        channel.nack(msg); // Reject the message
      }
    }
  });
}

consumeNotifications();