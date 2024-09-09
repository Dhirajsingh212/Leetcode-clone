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
    cleanStatus = parsedMessage2.status?.replace(/[^\x20-\x7E\n]/g, "").trim();
  } catch (error) {
    parsedMessage2 = { status: "" };
  }

  return (
    <div className="overflow-scroll no-scrollbar bg-gray-200 dark:bg-slate-800 h-full w-full rounded-lg dark:text-white p-4 whitespace-pre-wrap">
      {isLoading ? (
        <div className="flex flex-row items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : parsedMessage2.status ? (
        cleanStatus
      ) : (
        "Press run button to get output."
      )}
    </div>
  );
};

export default OutputWindow;
