import { useEffect, useState } from "react";
import { api } from "../../axios";
import { useStore } from "../../states/store";
import { ClassData } from "../../types/types";
import { FormBottom } from "./FormBottom";
import { refreshPage } from "../functions/refreshPage";

type ClassFormProps = {
  data: ClassData
}

export function EditClassForm({ data }: ClassFormProps) {

  const [formData, setFormData] = useState({
    course: data.course,
    courseId: 0,
    name: data.name,
  })

  const [courses, setCourses] = useState<{id: number; name: string; educationLevelId: number;}[]>([]);

  const closeSlideOver = useStore((state) => state.closeSlideOver)

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get("course");
      setCourses(response.data);
      setFormData({ ...formData, courseId: response.data[0].id, course: response.data[0].name });
    };
    fetchCourses();
  }, []);

  const handleUpdateNewClass = async () => {
    const response = await api.put(`class/${data.id}`, formData);
    response.status === 200 && alert("Turma editada com sucesso!");
    refreshPage();
  }

  const handleSubmit = async (event: { preventDefault(): void; }) => {
    event.preventDefault();

    await handleUpdateNewClass();

    closeSlideOver()
  }

  const handleChange = (target: { name: any; value: any; }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  }

  const handleCourseChange = (target: { value: any }) => {
    const course = courses.filter(({ name }) => name === target.value)[0];
    setFormData({ ...formData, course: target.value, courseId: course.id });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7">
            Editar Turma
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <label htmlFor="country" className="block text-sm font-medium leading-6">
                Cursos
              </label>
              <div className="mt-2">
                <select
                  id="course"
                  name="course"
                  autoComplete="course-name"
                  className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    handleCourseChange(e.target);
                  }}
                >
                  {courses.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6">
                Nome
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    {formData.course}/
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                    onChange={(e) => {
                      handleChange(e.target)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <FormBottom />
      </div>
    </form>
  );
}
