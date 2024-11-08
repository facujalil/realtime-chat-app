function NoMessages() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 w-full h-full opacity-75 pointer-events-none">
      <div className="flex justify-center items-center w-full h-32">
        <i className="fa-solid fa-comment-slash text-9xl"></i>
      </div>
      <p>No messages here yet...</p>
    </div>
  );
}

export default NoMessages;
