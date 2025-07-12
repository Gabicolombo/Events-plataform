# 📅 Eventify

**Eventify** is a GraphQL-based API for user authentication and event management. Users can register, log in, and create events with participants from the platform. When an event is created, a message is sent to RabbitMQ, and a consumer processes that message to send email notifications to the event participants.

## 🚀 Features

- User registration and login via GraphQL
- Event creation with participant assignment
- Integration with **RabbitMQ** for asynchronous notification handling
- Email notification system (via message consumer)

## 🛠 Technologies Used

- **TypeScript**
- **Node.js**
- **GraphQL**
- **MongoDB**
- **RabbitMQ**
- **Mailtrap**

## ▶️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the application
```bash
npm run start
```

### 3. Run the RabbitMQ consumer (in separate terminal)
```bash
ts-node src/consumer/notifyConsumer.ts
```