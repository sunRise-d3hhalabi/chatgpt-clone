export const Message = ({ role, content }) => {
  return (
    <div
      className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${
        role === "assistant" ? "bg-gray-600" : ""
      }`}
    >
      <div>pic</div>
      <div>{content}</div>
    </div>
  );
};
