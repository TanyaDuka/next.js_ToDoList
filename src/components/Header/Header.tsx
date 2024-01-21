import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header: React.FC<{ onSearch?: (search: string) => void }> = ({
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debouncedSearch = useCallback(
    debounce((id) => {
      if (onSearch) onSearch(id);
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (pathname == "/") {
      debouncedSearch(e.target.value);
    }
  };

  const handleSearchClick = () => {
    router.push(`/${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {pathname === "/" ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a search name here..."
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
        />
      ) : (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter a board ID here..."
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearchClick}
            className="ml-4 w-32 p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Go
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
