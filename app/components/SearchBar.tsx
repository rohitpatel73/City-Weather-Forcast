// import React, { ChangeEvent } from 'react';

// interface SearchBarProps {
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="mb-4">
//       <input
//         type="text"
//         placeholder="Search for a city..."
//         value={searchTerm}
//         onChange={handleChange}
//         className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//     </div>
//   );
// };

// export default SearchBar;