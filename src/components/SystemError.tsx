import { ImSpinner3 } from "react-icons/im";
import { MdOutlineError } from "react-icons/md";

interface SystemMessageProps {
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
}

export default function SystemMessage({
  isFetching,
  isLoading,
  error,
}: SystemMessageProps) {
  if (isLoading) {
    return (
      <div className=" flex h-auto z-2000 bg-main fixed ml-auto self-start px-2 py-4 items-center gap-2 text-white bottom-5 left-auto right-5">
        <ImSpinner3 size={20} />
        <p className="text-md">Loading data...</p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className=" flex h-auto z-2000 bg-main fixed ml-auto self-start px-2 py-4 items-center gap-2 text-white bottom-5 left-auto right-5">
        <ImSpinner3 size={20} />
        <p className="text-md">Updating data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" flex h-auto z-2000 bg-main fixed ml-auto self-start px-2 py-4  items-center gap-2 text-white bottom-5 left-auto right-5">
        <MdOutlineError />
        <p className="text-md">Error while fetching data. Try later.</p>
      </div>
    );
  }
}
