export const mockEvents = [
  {
    eventId: "e1",
    title: "Tech Networking Night",
    description: "A meetup for developers, designers, and tech enthusiasts.",
    date: "2024-04-15",
    time: "18:00",
    location: "Innovation Hub, Downtown",
    capacity: 50,
    organizerId: "u3",  // admin Sarah
    photos: ["/events/e1-1.jpg", "/events/e1-2.jpg"],
    videos: [],
    rsvp: ["u1", "u2"],
    reviews: [
      {
        userId: "u1",
        rating: 5,
        comment: "Great event! Met so many interesting people.",
        date: "2024-04-16"
      },
      {
        userId: "u2",
        rating: 4,
        comment: "Well organized. Parking was a bit limited.",
        date: "2024-04-16"
      }
    ]
  },

  {
    eventId: "e2",
    title: "Outdoor Movie Night",
    description: "Bring your blankets and snacks for an outdoor cinema experience!",
    date: "2024-05-01",
    time: "20:00",
    location: "Lakeside Park",
    capacity: 200,
    organizerId: "u1",  // Alice
    photos: ["/events/e2-1.jpg"],
    videos: [],
    rsvp: ["u2", "u4"],
    reviews: []
  },

  {
    eventId: "e3",
    title: "Beginner Yoga Class",
    description: "A guided session suitable for total beginners.",
    date: "2024-03-30",
    time: "09:00",
    location: "Sunrise Studio",
    capacity: 20,
    organizerId: "u2",  // David
    photos: [],
    videos: [],
    rsvp: ["u1"],
    reviews: [
      {
        userId: "u1",
        rating: 3,
        comment: "Instructor was friendly, but space was small.",
        date: "2024-03-31"
      }
    ]
  }
];