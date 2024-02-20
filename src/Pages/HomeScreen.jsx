import React, { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';

const HomeScreen = () => {
    const [data , setdata] = useState([]);
    const [page,Setpage]= useState([]);
    const [limitStart, SetlimitStart] = useState(0);
    const [limitEnd, SetlimitEnd] = useState(9);
    useEffect(() => {
        const GetData = async ()=>{
            const respone =  await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=6GSgh6bDdoPR1cb9GQIzn6uxQvtlXC6hfBFnKmfaDQKPR_MKS_ag7wuD6O6ijvjXKZqNH6sSuIEKLDon1IFmj_g0PwniU7jJm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMJrYDxmtdOu_m2V4trV0FrLmNQVRowuQGyuxlgvnUfbwoHRLoPq7dYHbcsNLbZl32ecs0XepM1h_AC-Sl1Aa_Q6EkNTFWH3sg&lib=MEtoSape5G71MwvSDAMV700uJLH3g0HUB")
            setdata(respone.data)
        }
        GetData();
    }, []);


    const Nishan = [];
    const Nagara = [];
    const Dhankul = [];
    const Bansuri = [];
    data.map((e)=>{
        if(e.group === "Nishan"){
            Nishan.push(e)
        }
        if(e.group === "Nagara"){
            Nagara.push(e)
        } if(e.group === "Dhankul"){
            Dhankul.push(e)
        } if(e.group === "Bansuri"){
            Bansuri.push(e)
        }
    })
    const mapData = data.slice(page, 10 + page);
    const nishanScore = Nishan.reduce((total, e) => total + e.score, 0);
    const nagaraScore = Nagara.reduce((total, e) => total + e.score, 0);
    const dhankulScore = Dhankul.reduce((total, e) => total + e.score, 0);
    const bansuriScore = Bansuri.reduce((total, e) => total + e.score, 0);

    const group = [{
        name : "Nishan",
        score : nishanScore ||0
    },{
        name : "Nagara",
        score : nagaraScore || 0
    },{
        name : "Dhankul",
        score : dhankulScore || 0
    },{
        name : "Bansuri",
        score : bansuriScore || 0
    }
]
const sortedData = group.slice().sort((a, b) => a.score - b.score);
  
    return (
      <div className='flex flex-col gap-3  min-h-screen justify-between '>

      <div className="navbar bg-base-100">
        <div className="flex-none">
        <details className="dropdown">
        <summary className="m-1 btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></summary>
        <ul className="p-2 shadow-lg menu dropdown-content z-[1] bg-base-100 rounded-box w-52  text-white">
          <li><a href='/'>Arts</a></li>
          <li><a  href='/sports'>Sports</a></li>
        </ul> 
      </details>
        
        </div> 
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">EKTHARA FINE ARTS FESTIVAL 2023-24</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </button>
        </div>
      </div>  
           <>
          
{
    data == null ? (
        <div className="flex justify-center  min:h-screen  ">
            <span className="loading loading-ring loading-lg h-[300px]"></span>
        </div>
    ):(
        <div className="">
           <div className=" px-7 py-5">
           <div className="w-full flex justify-center items-center h-48 bg-white mb-10 shadow-xl rounded-xl bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523174802553-10fd69b213ec?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}} >
                <h1 className='font-black text-6xl text-white'>Arts</h1>
            </div>
            <h1 className=' text-left ml-4 font-mono font-bold text-xl text-white'> Score Board</h1>
                <div className="w-full shadow-lg rounded-lg flex flex-col py-5 ">
               {sortedData.reverse().map((e,index)=>(
                <div className=" w-full flex justify-between px-4 py-2 border-b-2 border-gray-600 mt-3 font-semibold">
                        <h1 >{index+1}</h1>
                        <h1 className='text-left' >{e.name.toUpperCase()}</h1>
                        <h1>{e.score}</h1>
                    </div>
               ))}
                    
                

                </div>
            </div>

            <div className="px-5">
            <h1 className=' text-left ml-4 font-mono font-bold text-xl text-white'>Score Table</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Item</th>
        <th>Group</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {data.reverse().slice(limitStart, limitEnd+1 )
                .map((e)=>(
        <tr>
            <td>{e.name}</td>
            <td>{e.item}</td>
            <td>{e.group}</td>
            <td>{e.score}</td>
        </tr>
      ))}
      

    </tbody>
  </table>
  
</div>
<div className="flex justify-center mt-4">
<div className="join grid grid-cols-2 w-[200px] ">
  <button className="join-item btn btn-outline" onClick={()=>{ if(limitStart == 0){

}else{
   SetlimitStart(limitStart-10) ;SetlimitEnd(limitEnd - 10)
}}}>Previous page</button>
  <button className="join-item btn btn-outline"  onClick={()=> {SetlimitStart(limitStart+10); SetlimitEnd(limitEnd + 10)}}>Next</button>
</div>
</div>
            </div>
           </div>
    )
}

</>
<footer className="footer items-center p-4 bg-neutral text-neutral-content">
  <aside className="items-center grid-flow-col">
    <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> 
    <p>Copyright © 2024 - All right reserved by Department of Computer Science</p>
  </aside> 

</footer>
        </div>

    );
}


export default HomeScreen;
