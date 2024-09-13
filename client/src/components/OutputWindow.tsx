import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

const OutputWindow = ({
  message,
  isLoading,
}: {
  message: string;
  isLoading: boolean;
}) => {
  let parsedMessage;
  let parsedMessage2;
  let cleanStatus;

  try {
    parsedMessage = JSON.parse(message || "{}");
    parsedMessage2 = JSON.parse(parsedMessage.message || "{}");
    cleanStatus = parsedMessage2.status;
  } catch (error) {
    parsedMessage2 = { status: "" };
  }

  return (
    <div
      className={cn(
        "overflow-scroll no-scrollbar bg-gray-200 dark:bg-slate-800 h-full w-full rounded-lg dark:text-white p-4 whitespace-pre-wrap",
        {
          "bg-red-500 text-white text-center font-xl font-bold":
            parsedMessage2.error,
          "bg-green-600 text-white": parsedMessage2.success,
        }
      )}
    >
      {isLoading ? (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : parsedMessage2.status ? (
        <div className={cn(`whitespace-pre-wrap`, {})}>
          {cleanStatus}
          {parsedMessage2.error && parsedMessage2.compile_output}
        </div>
      ) : (
        "Press run button to get output."
      )}
    </div>
  );
};

export default OutputWindow;
