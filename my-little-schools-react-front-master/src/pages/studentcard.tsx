import { useEffect, useState } from "react";
import { api } from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../components/functions/getCookie";
import { resetStudentCookie } from "../components/functions/resetCookie";

type Student = {
  name: string;
  id: string;
  birthDate: string;
  photo: string;
  qrCode: string;
  class: {
    name: string;
    course: {
      name: string;
    }
  }
}

export function StudentCardPage() {

  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student>();

  useEffect(() => {

    const studentCookie = getCookie("student-token");
    const adminCookie = getCookie("token");
    if (!adminCookie) {
      if (studentCookie != params.studentName) {
        resetStudentCookie();
        navigate("/", { replace: true });
      }
    }

    async function fetchStudent() {
      const response = await api.get(`/student/name/${params.studentName}`);
      setStudent(response.data);
    }
    fetchStudent();
  }, []);

  return (
    <section className="text-gray-600 body-font w-full">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="w-[30rem] mx-auto bg-zinc-800 rounded-md">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="text-center p-8 ">
                <img
                  alt="blog"
                  src={student?.photo}
                  className="w-28 h-28 rounded-full inline-flex justify-center items-center flex-shrink-0 object-cover object-center"
                />
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-zinc-200 text-lg">
                  {student?.name}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

                <p className="font-semibold text-zinc-200">
                  {student?.class.name} - {student?.class.course.name}
                </p>
              </div>
            </div>
            <div className="relative w-[1px] h-24 self-center rounded my-2 border border-gray-400"></div>
            <div className="flex items-center justify-center p-8 my-2">
              <img
                alt="blog"
                src={student?.qrCode}
                className="flex-shrink-0 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
