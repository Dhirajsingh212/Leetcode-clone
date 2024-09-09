const OutputWindow = ({ message }: { message: string }) => {
  let parsedMessage;
  let parsedMessage2;
  let cleanStatus;

  try {
    parsedMessage = JSON.parse(message || "{}");
    parsedMessage2 = JSON.parse(parsedMessage.message || "{}");
    cleanStatus = parsedMessage2.status?.replace(/[\u0000-\u001F]/g, "").trim();
  } catch (error) {
    parsedMessage2 = { status: "" };
  }

  return (
    <div className="overflow-scroll no-scrollbar bg-gray-200 dark:bg-slate-800 h-full w-full rounded-lg dark:text-white p-4">
      {parsedMessage2.status ? cleanStatus : "Press run button to get output."}
    </div>
  );
};

export default OutputWindow;
