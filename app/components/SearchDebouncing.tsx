"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function SearchDebounce(){
    const [movies,setMovies] = useState([]);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        const delaySearch = setTimeout(async ()=>{
            const data = await getDatas(search);
            setMovies(data);
        },500);

        return () =>{
            clearTimeout(delaySearch);
        }
    },[search]);


    const handleInputChange = (event:any) =>{
        setSearch(event.target.value);
    }
    return (
        <>
            <div className="flex justify-center">
                <Input type="text" className="w-[50%] mr-5" placeholder="Search movies..." value={search} onChange={handleInputChange} ></Input>
                
                <Button><svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="3em">
                <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg></Button>
            </div>
            
        
        </>
    )
}