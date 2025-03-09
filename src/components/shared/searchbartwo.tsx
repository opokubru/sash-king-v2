import React from "react";
import { Input } from "@nextui-org/react";
import { CustomButton } from "./shared_customs";

interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  onSearch: (query: string) => void;
}

const SearchBarTwo: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  buttonText = "Search",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    // <div className="flex items-center  w-full  p-0">
    //   <Input
    //     placeholder={placeholder}
    //     classNames={{
    //       input:
    //         "bg-transparent focus:outline-none border border-[#737373] p-4 rounded-md",
    //       inputWrapper: "border-none  p-0 m-0",
    //     }}
    //     onKeyPress={handleKeyPress}
    //     height={50}
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     variant="bordered"
    //   />
    //   <CustomButton
    //     className="bg-primary text-white rounded-sm ml-[-1.5rem] rounded-r-md "
    //     onClick={() => onSearch(query)}
    //     type="submit"
    //   >
    //     {buttonText}
    //   </CustomButton>
    // </div>
    <div className="flex flex-col gap-4 items-center  w-full  p-0">
      <Input
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
        className="bg-primary text-white rounded-md "
        onClick={() => onSearch(query)}
        type="submit"
      >
        {buttonText}
      </CustomButton>
    </div>
  );
};

export default SearchBarTwo;
