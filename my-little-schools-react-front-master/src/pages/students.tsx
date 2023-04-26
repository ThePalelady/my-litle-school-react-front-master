import { useEffect, useState } from "react";
import { api } from "../axios";
import { Link } from "react-router-dom";

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
  id: string;
  name: string;
  courseId: string;
  students: Student[];
  course: Course;
};

export function StudentsPage() {
  const [classes, setClasses] = useState<ClassData[]>([]);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await api.get("class");
      console.log(response.data[0].students[0]);
      setClasses(response.data);
    };
    fetchStudent();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
          Lista de Estudantes
        </h1>

        {classes.map((class_) => (
          <div className="p-4 space-y-4">
            <h3 className="leading-relaxed text-2xl font-semibold">Turma {class_.name}</h3>

            <div className="flex flex-wrap -m-2">
              {class_.students.length === 0 ? (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        Nenhum estudante cadastrado
                      </h2>
                    </div>
                  </div>
                </div>
              ) : (
                class_.students.map((student) => (
                  <Link
                    to={`/student/${student.name}`}
                    state={{ student, class_ }}
                    className="p-2 lg:w-1/3 md:w-1/2 w-full"
                  >
                    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                      <img
                        alt="team"
                        className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src={student.photo}
                      />
                      <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{student.name}</h2>
                        <p className="text-gray-500">{class_.name}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
