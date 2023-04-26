type ChooseClassInputProps = {
  classes: { name: string; id: string }[];
  handleChange: (id: string) => void;
  actualClassId: number;
};

export function ChooseClassInput({ classes, handleChange, actualClassId }: ChooseClassInputProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6">Turmas</legend>
      <p className="mt-1 text-sm leading-6">Selecione uma das Turmas disponiveis.</p>
      <div className="mt-2 space-y-2">
        {classes.map(({ name, id }) => (
          <div key={name} className="flex items-center gap-x-3">
            <input
              id="info"
              name="classId"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={() => handleChange(id)}
              checked={String(actualClassId) == id}
            />
            <label htmlFor="info" className="block text-sm font-medium leading-6">
              {name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
