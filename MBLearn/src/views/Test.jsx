import { useEffect } from "react";
import axiosClient from "../axios-client";
import echo from "MBLearn/echo";


export default function Test(){
    useEffect(() => {
        const channel = echo.channel('channel-name').listen('.Test', (e)=>{
            alert("Hello")
            console.log(e);
            console.log('can hear channel')
        });
        
        return () => {
            echo.leave('channel-name')
        }
    }, [])

    const handleClick = () => {
        axiosClient.get('test')
        .then((e) => {
            console.log(e);
        }).catch((err) => {
            console.log('error')
        })
    };


  return (
    <>
    <button onClick={handleClick}>
        Call /Test
    </button>
    </>
  );  
};