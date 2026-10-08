interface Teacher {
  _id?: Types.ObjectId;
  name: string;
  id: string;
  students: Student[];
}

interface Student {
  _id?: Types.ObjectId;
  name: string;
  grade: string;
  phone: string;
  assignments: Assignment[];
}

interface Assignment {
  _id?: Types.ObjectId;
  name: String;
  dueDay: Date;
  status: Boolean;
  score: Number;
}
