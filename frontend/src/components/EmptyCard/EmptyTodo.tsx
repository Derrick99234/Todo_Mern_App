type EmptyTodoPops = {
  imgSrc: string;
  message: string;
};

function EmptyTodo({ imgSrc, message }: EmptyTodoPops) {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="p-8 rounded-custom bg-white">
        <img src={imgSrc} alt="No Note" className="w-64" />
      </div>
      <p className="w-1/2 text-sm font-medium text-slat-700 leading-7 text-white text-center mt-5">
        {message}
      </p>
    </div>
  );
}

export default EmptyTodo;
