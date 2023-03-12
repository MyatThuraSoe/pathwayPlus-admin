interface Consultant {
  _id: string;
  name: string;
  email: string;
  university: string;
  country: string;
  specialization: string;
}

interface Volunteer {
  _id: string;
  name: string;
  role: { name: string };
  department: { name: string };
  duration: string;
}

interface Blog {
  _id: string,
  cover: string,
  title: string,
  body: string,
  categories: Array<string>,
  createdAt: string,
  updatedAt: string,
}

interface Vacancy {
  _id: string;
  title: string;
  deadline: string;
  requirements: string;
  registerlink: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AvailableEvent {
  _id: string;
  name: string;
  organizer: string;
  date: Date;
  time: string;
  venue: string;
  description: string;
  registerlink: string;
  updatedAt: Date;
  createdAt: Date;
}