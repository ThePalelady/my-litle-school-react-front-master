import { useStore } from "../../../states/store";
import { ListDropdownOptions } from "./ListDropdownOptions";

export function StudentsList() {

  const [data, studentsListData] = useStore((state) => [state.data, state.studentsListData]);
  const students = studentsListData(data);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {students.map(({ id, photo, name, className, classId, courseName, birthDate }, idx: number) => (
          <li key={idx} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={photo} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">{name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{className}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <ListDropdownOptions category="Alunos" data={{ id, photo, name, className, birthDate, classId, courseName }} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
