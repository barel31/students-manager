interface User {
  name: string;
  id: string;
  students: Student[];
}

interface Student {
  name: string;
  grade: string;
  phone: string;
}
