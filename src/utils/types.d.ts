interface Consultant {
  _id: string;
  name: string;
  src: string;
  university: string;
  country: string;
  specialization: string;
  year: string;
  introduction: string;
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
  // temporary, change later when api is implemented
  [key: string]: any
}

interface Event {
  // temporary, change later when api is implemented
  [key: string]: any
}