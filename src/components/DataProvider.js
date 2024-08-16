
import {createContext, useEffect, useState} from 'react';

export let AllData= createContext('');

//  Here I have created Context Api, which we would use in our application

export function DataProvider({children}){

    let [allData,setAllData]= useState('');
    
    let [resultFlag,setResultFlag]= useState(true);

    async function  initialDataFetcher() {
        
        let getData= await fetch('https://fakestoreapi.com/products');  //fetching data from 'products End-Point' of the fakestoreapi

        getData= await getData.json();
        // console.log(getData);
        setAllData(getData);
    // setAllData()


    }

    async function searchCategory(category) {

        let fetchSpecificCategory= await fetch(`https://fakestoreapi.com/products/category/${category}`);

        fetchSpecificCategory= await fetchSpecificCategory.json();

        setAllData(fetchSpecificCategory);

    }

    useEffect(()=>{

        initialDataFetcher();  // when website starts, initialDataFetch() function would be called automatically, which would fetch data from the fakeStoreApi
      

    },[])

    return(
            //  the context object such as 'AllData' here shares all the data with the entire application using the provider component. that data can then be used by all components of application
        <AllData.Provider value={{allData,searchCategory,setAllData,resultFlag,setResultFlag,initialDataFetcher}}>

            {children}

        </AllData.Provider>


    );

}