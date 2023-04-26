
import { useStore } from "../../../states/store";
import { ListDropdownOptions } from "./ListDropdownOptions";

export function CoursesList() {

  const [data, coursesListData] = useStore((state) => [state.data, state.coursesListData]);
  const courses = coursesListData(data);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {courses.map(({ id, name, educationLevel }, idx: number) => (
          <li key={idx} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">{name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">{educationLevel}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <ListDropdownOptions category="Cursos" data={{ id, name, educationLevel }} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
