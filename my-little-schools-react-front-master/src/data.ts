type Student = {
  id: number;
  classId: number;
  name: string;
  birthDate: string;
  photo: string;
  qrCode: string;
}

export type Data = {
  id: number;
  name: string;
  educationLevelId: 1;
  educationLevel: {
    name: string;
  }
  classes: {
    courseId: number;
    id: number;
    name: string;
    students: Student[]
  }[]
}[];
