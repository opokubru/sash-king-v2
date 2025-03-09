import React from "react";
import { Input } from "@nextui-org/react";
import { CustomButton } from "./shared_customs";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  buttonText = "Search",
}) => {
  const [query, setQuery] = React.useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        navigate(`/search?query=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <div className="flex items-center  w-full  p-0">
      <Input
        isClearable
        placeholder={placeholder}
        classNames={{
          input:
            "bg-transparent focus:outline-none border border-[#737373] p-4 rounded-md",
          inputWrapper: "border-none  p-0 m-0",
        }}
        onKeyPress={handleKeyPress}
        height={50}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="bordered"
      />
      <CustomButton
        className="bg-primary text-white ml-2"
        onClick={handleSearch}
      >
        {buttonText}
      </CustomButton>
    </div>
  );
};

export default SearchBar;
