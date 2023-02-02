import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./table";
import './todopage.css'
const Todo=()=>{
    const navigate=useNavigate()
    const username =localStorage.getItem('username')
   
   
    return (
        <div>
            
            <header id="header">
               <h1 >{username}</h1> 
            </header>
            
            <aside id="aside-bar">
                <h2 style={{color:"blue",margin:"5rem"}}>To Do List</h2>
                <button id="logout-btn" onClick={()=>{localStorage.removeItem('username');localStorage.removeItem('token');navigate('/')}}><h2>Logout</h2></button>
                
            </aside>
            <div id="right-table">
            <Table/>
            </div>
        
        </div>
    )
}
export default Todo