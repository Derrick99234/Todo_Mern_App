import { ChangeEvent } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
};

function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}: SearchBarProps) {
  return (
    <>
      <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search Todos"
          className="w-full text-xs bg-transparent py-[11px] outline-none"
          value={value}
          onChange={onChange}
        />
        {value && (
          <IoMdClose
            className="text-slate-500 cursor-pointer mr-3 hover:text-black"
            onClick={onClearSearch}
          />
        )}
        <FaMagnifyingGlass
          onClick={handleSearch}
          className="text-slate-400 cursor-pointer hover:text-black"
        />
      </div>
    </>
  );
}

export default SearchBar;
