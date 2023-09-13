import { createContext, useState } from "react"

export const SearchContext = createContext()


const SearchContextProvider = ({children}) => {
  const [Countsearch, setCountsearch] = useState<Number>(0);

  return (
    <SearchContext.Provider value={{Countsearch,setCountsearch}}>{children}</SearchContext.Provider>
  )
}

export default SearchContextProvider