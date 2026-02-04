# EventHorizon – Event Management & RSVP Platform

EventHorizon is a full-stack web application designed to help users discover, create, and manage events. Inspired by platforms like Meetup and PogoDo, EventHorizon allows users to browse events by interest, RSVP to attend, purchase tickets, and create their own events — all within a clean and intuitive interface.

---

### Features

#### ✨ Event Browsing
- View all upcoming events on the platform
- Filter events by:
  - Category (sports, tech, arts, etc.)
  - Date
  - Cost
  - Location
- Search events by keywords or interest tags
- View top/trending events on the homepage

---

#### ✨ Event Creation & Management
- Logged-in users can create and customize events
- Guided prompts for entering event details:
  - Title
  - Description
  - Date & Time
  - Location
  - Category / Interest Group
  - Ticket cost
  - Optional event image
- Registered users can edit or delete their own events
- Admins can edit or delete any event

---

#### ✨ RSVP & Ticketing System
- Registered users can RSVP to events
- Purchase one or multiple tickets
- See who else is attending
- Organizer dashboards for tracking RSVPs

---

#### ✨ User Roles

Unregistered Users
- Can browse all events
- Cannot RSVP, create events, or purchase tickets

Registered Users
- Create, update, and delete their own events
- RSVP and buy tickets
- Manage their profile and dashboard

Admins
- All registered user abilities
- Full moderation rights on events and reviews

---

#### Navigation

EventHorizon includes a top navigation bar with:
- Find Events
- Create Event
- Sign Up
- Log In
- Search Bar for keywords/interests

---

#### Tech Stack

Front-End
- React.js
- Tailwind or custom styling (optional)

Back-End
- Node.js + Express.js

Database
- MongoDB

Other Tools
- Git & GitHub for version control
- Deployed on personal device or Docker

---

#### Installation & Setup

```
# Clone the repository
git clone https://github.com/your-username/EventHorizon.git
cd EventHorizon

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Run server
npm start
```
---
#### Contributors
- Krish Khullar
- Sejal Khurra
- Kiran Gerwal

---

#### License

This project is for **COSC 360 – Web Development** and is under the MIT License.