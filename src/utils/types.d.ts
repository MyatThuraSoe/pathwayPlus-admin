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