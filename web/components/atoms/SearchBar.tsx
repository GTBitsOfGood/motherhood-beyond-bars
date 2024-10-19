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
    <div className="max-w-[400px] px-4 py-2 flex items-center gap-4 border border-[#666666] rounded-md">
      <div>
        <SearchIcon />
      </div>
      <div className="flex-grow">
        <input
          className="border-none outline-none w-full"
          placeholder="Search by name..."
          onInput={handleInputChange}
        />
      </div>
    </div>
  );
}
