import SearchIcon from "@components/Icons/SearchIcon";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="w-[30%] px-4 py-2 flex items-center gap-4 border border-[#666666] rounded-[4px]">
      <div>
        <SearchIcon />
      </div>
      <div>
        <input
          className="border-none outline-none"
          placeholder="Search by name..."
          onInput={handleInputChange}
        />
      </div>
    </div>
  );
}
