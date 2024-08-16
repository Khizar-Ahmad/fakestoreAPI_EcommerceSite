import { useContext } from "react";

import { AllData } from "./DataProvider";  // This statement imports the context object that we have created in 'DataProvider.js' file

export function MainSection(){

    let {allData,resultFlag}= useContext(AllData);    // it uses the context object created in 'DataProvider.js' file and also destructures 'allData state' from context object(AllData) which usually have all data stored in it that are fetched from a 'fakeStoreApi' and also resultFlag, which is used to display different DOM tree depending on the user search in the search bar 

    return(
        <div className=" w-full sm:w-11/12 mx-auto flex flex-wrap justify-center justify-items-center min-h-[100vh] space-y-2 bg-gray-300 p-1">
        {resultFlag?allData?allData.map((item)=>{
            return (
                <div key={item.id} className=" w-[90%] super-extra-sm:w-[75%] extra-sm:w-[45%] sm-md:w-[29%] lg:w-1/5 xl:w-1/6 super-extra-sm:max-extra-sm:min-h-[320px] max-h-[340px] extra-sm:max-h-[340px]  mr-2 sm:mr-5 shadow-lg shadow-red-300 hover:shadow-green-400 duration-700 hover:scale-[1.02] flex flex-wrap p-1 rounded-lg bg-white">
                    <div className="w-full h-[28vh]"><img className="w-full h-full" src={item.image}/></div>
                    <div className="w-[95%] text-lg font-serif mt-4 font-bold mx-auto text-blue-400">{item.category}</div>
                    <div className="w-[95%] mx-auto text-[14px]">{item.title}</div>
                    <div className="w-[95%] mx-auto"><span className="text-red-500 font-serif text-[15px] font-semibold">Price: </span><span className="text-[12px]">{item.price}</span></div>

                </div>
            );
        }):<div className="w-5/6 text-[30px] font-serif text-center mx-auto bg-green-300 tracking-wide text-white">Wait for few seconds...</div>:<div className="w-5/6 text-[30px] font-serif text-center mx-auto bg-green-300 tracking-wide text-white">Sorry No Result Found...</div>}
        </div>
    )
}
