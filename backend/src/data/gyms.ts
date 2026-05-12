// Define gym type
type Gym = {
  id: number;
  name: string;
  city: string;
  reviews: any[];
};

// Temporary gym data stored in memory
const gyms: Gym[] = [
  {
    id: 1,
    name: "Fit Gym",
    city: "Stockholm",
    reviews: [],
  },
  {
    id: 2,
    name: "Power Gym",
    city: "Malmo",
    reviews: [],
  },
];

// Export gym data
export default gyms;