# Flight Booking System - High Level Design

## Architecture Components

### 1. Client Side

- **Mobile Frontend**: Mobile application interface for smartphones and tablets.
- **Web Frontend**: Browser-based interface with full system functionality.

### 2. Load Balancer

- Distributes incoming network traffic across multiple servers.
- Improves application responsiveness and availability.

### 3. API Gateway

- Acts as a reverse proxy for all API calls from clients.
- Routes requests to appropriate microservices.
- Handles cross-cutting concerns (authentication, SSL termination, rate limiting).

### 4. Orchestrator (Optional)

- Manages workflow and communication between microservices.
- Coordinates complex business processes spanning multiple services.
- Note: Skipped in current design for simplicity.

### 5. Core Services

- **Booking Service**: Manages flight bookings (creation, modification, cancellation).
- **Search Service**: Handles flight search queries and filtering.
- **Reminder Service**: Sends notifications and reminders about bookings and updates.

### 6. Third-party Services

- **Payment Gateway** (Stripe/Razorpay): Handles secure financial transactions.
- Note: Payment integration mentioned but not fully implemented in current design.

### 7. Message Queue

- Implements asynchronous communication between services.
- Uses publish-subscribe (Pub/Sub) pattern for reliable message delivery.
- Helps in decoupling services.

## Design Principles

- **Scalability**: System can handle increased load by adding more service instances.
- **Decoupled Services**: Easier to develop, deploy, and maintain independently.
- **Microservices Architecture**: Allows for better fault isolation and technology flexibility.
