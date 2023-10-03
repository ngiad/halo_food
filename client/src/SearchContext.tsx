import { createContext, useState, ReactNode } from "react"
export const SearchContext = createContext()

type prop = {
  children: ReactNode;
};

const SearchContextProvider = ({children} : prop ) => {
  const [Countsearch, setCountsearch] = useState<Number>(0);

  return (
    <SearchContext.Provider value={{Countsearch,setCountsearch}}>{children}</SearchContext.Provider>
  )
}

export default SearchContextProvider