import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

export const AppContext= createContext();

export default function AppContextProvider({children}){
    const[loading, setLoading]= useState(false);
    const[posts, setPosts]= useState([]);
    const[page, setPages]= useState(1);
    const[totalPages, setTotalPages]= useState(null);


   async function fetchBlogPosts(page=1){
     setLoading(true);
     let url=`${baseUrl}?page=${page}`;
     try{
        const result= await fetch(url);
        const data= await result.json();
        setPages(data.page);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
     }
     catch(error){
        alert("Error");
        setPages(1);
        setPosts([]);
        setTotalPages(null);

     }
     setLoading(false);
   }
   function handlerPageChange(page){
      setPages(page);
      fetchBlogPosts(page);
   }
    const value={
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPages,
        totalPages,
        setTotalPages,
        handlerPageChange,
        fetchBlogPosts
    }
   return <AppContext.Provider value={value}> {children}</AppContext.Provider>;
}
