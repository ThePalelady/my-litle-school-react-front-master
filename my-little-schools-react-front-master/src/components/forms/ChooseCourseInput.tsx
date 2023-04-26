type ChooseCourseInputProps = {
  courses: { id: string; name: string }[];
  handleChange: (id: string, name: string) => void;
  actualCourse: string;
}

export function ChooseCourseInput({ courses, handleChange, actualCourse }: ChooseCourseInputProps) {
  return (
    <fieldset>
    <legend className="text-sm font-semibold leading-6">Cursos</legend>
    <p className="mt-1 text-sm leading-6">
      Selecione um dos Cursos disponiveis.
    </p>
    <div className="mt-2 space-y-2">
      {courses.map(({ name, id }) => (
        <div key={name} className="flex items-center gap-x-3">
          <input
            id="info"
            name="course"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={() => handleChange(id, name)}
            checked={actualCourse === name}
          />
          <label
            htmlFor="info"
            className="block text-sm font-medium leading-6"
          >
            {name}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
  )
}
