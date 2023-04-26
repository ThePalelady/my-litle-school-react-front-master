
import { useStore } from "../../../states/store";
import { ListDropdownOptions } from "./ListDropdownOptions";

type RightStudentsProps = {
  studentsPhotos: string[];
};

export function RightStudents({ studentsPhotos }: RightStudentsProps) {
  return (
    <div className="hidden sm:flex -space-x-2 overflow-hidden">
      {studentsPhotos.slice(0, 4).map((photo) => (
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={photo}
          alt=""
        />
      ))}
    </div>
  );
}


export function ClassesList() {
  const [data, classesListData] = useStore((state) => [state.data, state.classesListData]);
  const classes = classesListData(data);
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {classes.map(({ id, name, course, studentsPhotos }, idx: number) => (
          <li key={idx} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">{name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{course}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <RightStudents studentsPhotos={studentsPhotos} />
              <ListDropdownOptions category="Turmas" data={{ id, name, course }}  />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
