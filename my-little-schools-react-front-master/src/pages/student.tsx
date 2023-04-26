import { Link, useLocation, useNavigate } from "react-router-dom";
import { EditStudentForm } from "../components/forms/EditStudentForm";
import { useEffect, useState } from "react";
import { StudentData } from "../types/types";

type Student = {
  id: string;
  photo: string;
  name: string;
  qrCode: string;
  courseName: string;
  birthDate: string;
  classId: string;
};

type Course = {
  name: string;
}

type ClassData = {
  id: number;
  name: string;
  courseId: string;
  students: Student[];
  course: Course;
};

export function StudentPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentData>();
  const [class_, setClass] = useState<ClassData>();

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    }
    setStudent(location.state.student);
    setClass(location.state.class_);
  }, []);

  return (
    <main className="flex gap-4 p-12">
      <div className="flex flex-col items-center p-4 gap-4 min-w-[10rem]">
        <img
          alt="blog"
          src="https://dummyimage.com/104x104"
          className="w-24 h-24 rounded-full flex-shrink-0 object-cover object-center"
        />
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Deletar Aluno
        </button>
        <Link
          to={`/student-card/${student?.name}`}
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          Ver card
        </Link>
      </div>
      <div className="flex-1">
        {
          student && class_ && (
            <EditStudentForm
              data={{
                birthDate: new Date(student.birthDate),
                courseName: class_.course.name,
                className: class_.name,
                name: student.name,
                photo: student.photo,
                classId: class_.id,
                id: student.id,
                qrCode: student.qrCode,
              }}
            />
          )
        }
      </div>
    </main>
  );
}
