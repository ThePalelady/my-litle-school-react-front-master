export function MobileProfileInfo({
  user,
}: {
  user: { name: string; email: string; imageUrl: string };
}) {
  return (
    <div className="flex items-center px-5">
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
      </div>
      <div className="ml-3">
        <div className="text-base font-medium leading-none text-white">{user.name}</div>
        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
      </div>
    </div>
  );
}
