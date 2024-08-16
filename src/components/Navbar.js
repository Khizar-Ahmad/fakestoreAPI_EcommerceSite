

import { AllData } from "./DataProvider";  // This statement imports the context object that we have created in 'DataProvider.js' file

import { useContext,useEffect,useRef,useState } from "react";

    let totalCategory= ["men's clothing","jewelery","electronics","women's clothing"];

export default function Navbar(){

        let [filterData,setFilterData] = useState([]);      // it is the state created to store filtered Data in it, when user filter it through price filtering or category filtering
        let [filterDataFlag,setFilterDataFlag] = useState(false);   //this is the state used to display a modal which would have all the filtered data on it


        let {searchCategory,allData,setAllData,setResultFlag,initialDataFetcher} = useContext(AllData); // This statement uses the context Object that we have created in 'DataProvider.js' file and destructuring that object


        let [filterSortFlag,setFilterSortFlag]= useState({filterFlag:false,sortFlag:false});// This state is used to control the displaying and Removal of Filter and Sort Modal

        let [selectedPriceMethod,setSelectedPriceMethod] = useState('');    // As our price filter provide three options, such as 'Equal To', 'Greater than' and 'Lesser than. So when a user selects any option then the option name stores in this state, which would be then used to perform the corresponding filtering that the user want'




        let [selectedCategoryMethod,setSelectedCategoryMethod] = useState(''); // The category selected by the user in category filter is stored in this state, and it is then used to show the result the user expects from the system

        let [pricePlaceHolder, setPricePlaceHolder]= useState(''); // it's for placeholder manipulation

        let [priceTextField,setPriceTextField]= useState(''); // When a user enter price in the text area of the price filter it is stored in this state variable which is then used to perform various operations

        let priceFilterModalRef= useRef(''); // this variable hold the reference of the price filter option's modal, which displays the options like 'Equal To', 'Greater than' or 'Lesser than', actually we control that modal through this variable, when ever we want to display it we make use of this variable or if we want to remove it we make use of it.



        let categoryFilterModalRef= useRef(''); // This variable hold the reference of the categoryFilterModal, such as we display and remove it using this variable

        let [priceCategoryFilterActivationStatus,setPriceCategoryFilterActivationStatus]= useState({priceActivationFlag:false, categoryActivationFlag: false}); // This is used to activate and deactivate the price and category filters

        let [priceCategoryActivateDeactivateTextSwitching,setPriceCategoryActivateDeactivateTextSwitching]= useState({priceActivateDeactivateText:'',categoryActivateDeactivateText:''});  // This is used to display different texts depending upon the filters activation and deactivation status 


        let priceSortModalRef= useRef('');  // This variable hold the reference of the priceSortingmodal that exists inside the Sort modal and we display and remove that modal using this variable 


        let [screenSize, setScreenSize]= useState(window.innerWidth); // This state is used to record the screen size when it changes and layout components on screen accordingly

        let navbarDropDownModalRef= useRef(''); // When screen become shorter such as of the mobile size then filter and Sort buttons appear in a drop down menu, this variable holds reference of that dropdown menu, through which we controls it

       let [selectedAscendindOrDescending,setSelectedAscendindOrDescending] = useState('');

        useEffect(()=>{
        
            window.addEventListener('resize',()=>{

               
                        
                        setScreenSize(window.innerWidth);


            })
          
        },[])


        function showOrHidePriceModal(){
            priceFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
            
        }

        function showOrHideCategoryModal(){
            categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
        }

        let pattern;

        function filterProducts(){          // All the filtering logic is in this Function such as price filtering and category filtering

              let tempArr=[];

              let price= Number(priceTextField);


              console.log('This is the price',price);
              console.log(Number(priceTextField));

            if(priceCategoryFilterActivationStatus.priceActivationFlag || priceCategoryFilterActivationStatus.categoryActivationFlag){

                if(priceCategoryFilterActivationStatus.priceActivationFlag && priceCategoryFilterActivationStatus.categoryActivationFlag){

                    if(selectedCategoryMethod==='--Select One--' && selectedPriceMethod==='--Select One--'){
                        return alert("Please choose a specific price or category option from the drop down menu of either of the filtering technique...");
                    }

                    console.log('This is allData',allData)

                    if(selectedCategoryMethod!=='--Select One--'){
                        let oneItem;
                        allData.forEach(element => {
                                oneItem= selectedCategoryMethod===element.category&& element;
                                console.log(oneItem);
                            if(oneItem){
                                tempArr.push(oneItem);
                            }
                            
                        });

                    }

                    console.log(tempArr);

                    if(selectedPriceMethod!=='--Select One--'){
                        let oneItem;
                        let copyArr=[];
                        console.log('Check the datatype of textValue: ',price);
                        if(price.length<=0){
                            return alert('write the price in text area in order to filter product via price');
                        }
                            if(selectedPriceMethod=== 'Equal To'){
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price===price&&element;
                                    console.log('push it: ',oneItem);
                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                });
                                tempArr= [...copyArr];
                            } else if(selectedPriceMethod=== 'Greater than'){
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price>price&&element;

                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                })
                                tempArr= [...copyArr];
                            }else{
                               
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price<price&&element;

                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                })
                                tempArr= [...copyArr];

                            }
                    }
                  

                    // allData.forEach(element => {
                        
                    // });


                console.log(tempArr);

                setFilterData([...tempArr]);
                setFilterSortFlag({
                    filterFlag: false,
                    sortFlag:false
                });
                setFilterDataFlag(true);

                setPriceCategoryFilterActivationStatus({
                    priceActivationFlag: false,
                    categoryActivationFlag: false
                });
        
                    console.log(selectedPriceMethod);

                        console.log(selectedCategoryMethod);


                }else if(priceCategoryFilterActivationStatus.priceActivationFlag){

                    // When Only Price Filter is Activated
                     tempArr= [...allData];
                    
                    if(selectedPriceMethod!=='--Select One--'){
                        let oneItem;
                        let copyArr=[];
                        console.log('Check the datatype of textValue: ',price);
                        if(price.length<=0){
                            return alert('write the price in text area in order to filter product via price');
                        }

                            if(selectedPriceMethod=== 'Equal To'){
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price===price&&element;
                                    console.log('push it: ',oneItem);
                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                });
                                tempArr= [...copyArr];
                            } else if(selectedPriceMethod=== 'Greater than'){
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price>price&&element;

                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                })
                                tempArr= [...copyArr];
                            }else{
                               
                                if(typeof(price)!=='number'){
                                    return alert('Price should be a number');
                                }
                                tempArr.forEach((element)=>{
                                    oneItem= element.price<price&&element;

                                    if(oneItem){
                                        copyArr.push(oneItem);
                                    }
                                })
                                tempArr= [...copyArr];

                            }
                    }else{
                        return alert('Please, Choose an option from the dropDown menu of Price filtering');
                    }
                  
                    console.log('Price Filtering', tempArr);
                    setFilterData([...tempArr]);
                    setFilterSortFlag({
                        filterFlag: false,
                        sortFlag:false
                    });
                    setFilterDataFlag(true);

                    setPriceCategoryFilterActivationStatus({
                        priceActivationFlag: false,
                        categoryActivationFlag: false
                    });
            
            

                }else{

                    if(selectedCategoryMethod!=='--Select One--'){
                        let oneItem;
                        allData.forEach(element => {
                                oneItem= selectedCategoryMethod===element.category&& element;
                                console.log(oneItem);
                            if(oneItem){
                                tempArr.push(oneItem);
                            }
                            
                        });

                    }else{
                        return alert('Please, Choose an option from the dropDown menu of Category filtering');
                    }


                    console.log('Category Filtering', tempArr);
                    setFilterData([...tempArr]);
                    setFilterSortFlag({
                        filterFlag: false,
                        sortFlag:false
                    });
                    setFilterDataFlag(true);

                    setPriceCategoryFilterActivationStatus({
                        priceActivationFlag: false,
                        categoryActivationFlag: false
                    });
            

                }

            }else{
                alert("Please, activate atleast one of the product filter, such as 'Price Filter' or Category Filter");
                console.log('Filter Failed');
            }
        }


       function sortInAscendingOrder(){     // This function has the logic to sort the products in ascending order
        let swapper;
        let tempArr=[...allData];

        for(let i=0; i< tempArr.length; i++){


            for(let j=i+1; j<tempArr.length; j++){
              
                if(tempArr[i].price>tempArr[j].price){
                    // min= allData[j];
                    swapper= tempArr[i];
                    tempArr[i]=tempArr[j];
                    tempArr[j]=swapper;
                }
            }
            
        }
        setFilterSortFlag({
            ...filterSortFlag,
            sortFlag: false
        })
        setFilterData(tempArr);
        setFilterDataFlag(true);

        priceSortModalRef.current.classList.toggle('hidePriceAndCategoryModal');

       }

       function sortInDescendingOrder(){   // This function has the logic to sort the products in descending order
        let swapper;
        let tempArr=[...allData];

        for(let i=0; i< tempArr.length; i++){


            for(let j=i+1; j<tempArr.length; j++){
              
                if(tempArr[i].price<tempArr[j].price){
                    // min= allData[j];
                    swapper= tempArr[i];
                    tempArr[i]=tempArr[j];
                    tempArr[j]=swapper;
                }
            }
            
        }
            setFilterSortFlag({
                ...filterSortFlag,
                sortFlag: false
            })
        setFilterData(tempArr);
        setFilterDataFlag(true);
        priceSortModalRef.current.classList.toggle('hidePriceAndCategoryModal');


       }

       function sortInAlphabeticalOrder(){ // This function has the logic to sort the products in alphabetical order

       let tempArr=[...allData];

        tempArr.sort((item1,item2)=>item1.category.localeCompare(item2.category));

        setFilterSortFlag({
            ...filterSortFlag,
            sortFlag: false
        })

        setFilterData(tempArr);

        setFilterDataFlag(true);

        
       }
        

    return(

        <div className="w-full relative h-[8vh] p-1 bg-blue-500 text-white flex justify-between extra-sm:justify-around justify-items-center">

            <div className="mt-1 text-xl font-bold font-serif">Store</div>
            <div className=" w-[55%] extra-sm:w-2/5 sm:w-2/6"><input className="mt-1 w-full h-[75%] text-[10px] super-extra-sm:text-[11px] extra-sm:text-[12px] sm:text-[14px] md:text-base font-serif tracking-wide text-center text-gray-400 rounded-full duration-700 hover:shadow-lg hover:shadow-red-400" type='text' placeholder="Search for a specific product" onChange={(e)=>{

                for(let i=0;i<totalCategory.length;i++){

                if(totalCategory[i].startsWith(e.target.value) && e.target.value.length>0){
                    console.log(`Matches to index ${i}:`,true);
                    searchCategory(totalCategory[i]);
                    setResultFlag(true);
                    break;
                }else if(!totalCategory[i].startsWith(e.target.value)){
                    setResultFlag(false)
                }

                }

                console.log(e.target.value);
                if(e.target.value.length<=0){
                    setResultFlag(true);
                    initialDataFetcher();
                }


            }}/></div>

            {/* Filter and Sort Button Logic both for large screen devices and small screen devices */}


         {screenSize>450?<div className="flex mt-1 text-base sm:text-lg font-semibold font-[diode]">
            <div className="cursor-pointer  duration-700 hover:text-red-500 hover:scale-[1.2]" onClick={()=>{

                if(!filterSortFlag.filterFlag){
                    setFilterSortFlag({
                        filterFlag: true,
                        sortFlag:false
                    });

                    setSelectedPriceMethod('--Select One--');
                    setSelectedCategoryMethod('--Select One--')
                    setPricePlaceHolder('Enter Price...');
                    setPriceCategoryActivateDeactivateTextSwitching({
                        priceActivateDeactivateText: 'Activate',
                        categoryActivateDeactivateText: 'Activate'
                    });
                    setPriceTextField('');
                    
                }else{
                    setFilterSortFlag({
                        ...filterSortFlag,                        
                        filterFlag: false
                    });
                }
                   
            }}>Filter</div>
            <div className=" ml-8 extra-sm:ml-12 sm:ml-24 cursor-pointer duration-700 hover:text-red-500 hover:scale-[1.2]" onClick={()=>{
                if(!filterSortFlag.sortFlag){

                
                setSelectedAscendindOrDescending('--Select One--');

                setFilterSortFlag({
                    filterFlag:false,
                    sortFlag: true
                });

               
                
            }else{

                setFilterSortFlag({
                    ...filterSortFlag,
                    sortFlag: false
                });

            }


            }}>Sort</div>
            </div>: <div className="relative">
                <div className="w-7 mt-1 mr-2 cursor-pointer h-7" onClick={()=>{
                      navbarDropDownModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                }}><img className="w-7 h-7" src="icons8-drop-down-menu-24.png"/></div>
                
                <div ref={navbarDropDownModalRef} className="w-[100px] absolute top-[65%] right-[30%]  bg-violet-500 px-2 space-y-2 text-center font-semibold font-serif rounded-md p-1 tracking-wide duration-1000 hover:border-[1px] hover:border-gray-300 text-[15px] py-5 hidePriceAndCategoryModal">
                                    <p  className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                       if(!filterSortFlag.filterFlag){
                                        setFilterSortFlag({
                                            filterFlag: true,
                                            sortFlag:false
                                        });
                    
                                        setSelectedPriceMethod('--Select One--');
                                        setSelectedCategoryMethod('--Select One--')
                                        setPricePlaceHolder('Enter Price...');
                                        setPriceCategoryActivateDeactivateTextSwitching({
                                            priceActivateDeactivateText: 'Activate',
                                            categoryActivateDeactivateText: 'Activate'
                                        });
                                        setPriceTextField('');
                                        
                                    }else{
                                        setFilterSortFlag({
                                            ...filterSortFlag,                        
                                            filterFlag: false
                                        });
                                    }
                                        navbarDropDownModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>Filter</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                       
                                       if(!filterSortFlag.sortFlag){

                
                                        setSelectedAscendindOrDescending('--Select One--');
                        
                                        setFilterSortFlag({
                                            filterFlag:false,
                                            sortFlag: true
                                        });
                        
                                       
                                        
                                    }else{
                        
                                        setFilterSortFlag({
                                            ...filterSortFlag,
                                            sortFlag: false
                                        });
                        
                                    }

                                        navbarDropDownModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>Sort</p>
                                   
                                   
                        </div>
                
            </div> }




            {filterSortFlag.filterFlag&&<div className=" w-[80%] extra-sm:w-[65%] sm-md:w-[55%] lg:w-2/5  absolute left-[8%] extra-sm:left-[15%] sm-md:left-[30%] sm:max-sm-md:min-h-[390px] top-[15px] rounded-lg justify-center flex flex-wrap filterModalBackground z-50 px-1 py-4 sm-md:py-7">
            <div className="w-11/12 mx-auto text-lg sm:text-xl sm-md:text-2xl rounded-lg font-serif font-bold text-center max-h-14 sm-md:bg-green-500 mt-2">Filter Modal</div>


            {/* Price Modal Code Starts Here */}


        <div className="w-[80%] extra-sm:w-3/5 sm:w-[45%] max-h-[35vh] ml-2 mt-3 px-2 py-7 rounded-lg    bg-purple-400">
                <div className="relative">
                    <div className="bg-violet-800 font-serif text-[14px] sm:text-base font-semibold mb-2 ml-1 pl-2 rounded-md text-white">Price Filter:</div>
                    <div className="p-1 w-4/6 bg-red-500 mx-auto text-white rounded-lg  duration-700 hover:bg-green-300 text-[13px] sm:text-[14px] min-w-[128px]  font-serif font-semibold cursor-pointer hover:scale-[1.03] dropDownIcon pl-1" onClick={showOrHidePriceModal}>{selectedPriceMethod}</div>
                    <div className="w-4/6 min-w-[155px]  mx-auto mt-2 font-serif text-[13px]"><label className="ml-2">{priceCategoryActivateDeactivateTextSwitching.priceActivateDeactivateText} Price Filter <input type="checkbox" onChange={(e)=>{
                        console.log(e.target.checked);
                        if(e.target.checked){
                            setPriceCategoryFilterActivationStatus(
                                {
                                    ...priceCategoryFilterActivationStatus,
                                    priceActivationFlag: true
                                }
                            );

                            setPriceCategoryActivateDeactivateTextSwitching({
                                ...priceCategoryActivateDeactivateTextSwitching,
                                priceActivateDeactivateText: 'Deactivate'
                            });

                        }else{
                            setPriceCategoryFilterActivationStatus(
                                {
                                    ...priceCategoryFilterActivationStatus,
                                    priceActivationFlag: false
                                }
                            );

                            setPriceCategoryActivateDeactivateTextSwitching({
                                ...priceCategoryActivateDeactivateTextSwitching,
                                priceActivateDeactivateText: 'Activate'
                            });
                        }


                    }}/></label></div>
                        <div ref={priceFilterModalRef} className="extra-sm:w-[82%] lg:w-[75%] w-[87%]  absolute top-[45%] left-[25%]  bg-violet-500 px-2 space-y-2 text-center font-semibold font-serif rounded-md p-1 tracking-wide duration-1000 hover:border-[1px] hover:border-gray-300 text-[11px] super-extra-sm:text-[13px] py-5 hidePriceAndCategoryModal z-50">
                                    <p  className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedPriceMethod(e.target.textContent);
                                        priceFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>--Select One--</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedPriceMethod(e.target.textContent);
                                        priceFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>Equal To</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedPriceMethod(e.target.textContent);
                                        priceFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>Greater than</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedPriceMethod(e.target.textContent);
                                        priceFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>Lesser than</p>
                        </div>
                        <div className="w-4/6 mx-auto mt-2"><input className="w-[95%] h-[20px] text-[12px] text-gray-400 pl-1 rounded-lg" type="text" value={priceTextField} placeholder={pricePlaceHolder} onChange={(e)=>{
                        
                            setPriceTextField(e.target.value);
                        }}/></div>
                </div>
            </div>      
           
           {/*  Category Modal code starts here*/}

           <div className=" w-[80%] extra-sm:w-3/5 sm:w-[45%] max-h-[35vh] ml-4 mt-3 px-2 py-7 rounded-lg bg-orange-400">
                <div className="relative">
                    <div className="bg-violet-800 text-[14px] sm:text-base font-serif font-semibold mb-2 ml-1 pl-2 rounded-md text-white">Category Filter:</div>
                    <div className="p-1 w-4/6 bg-red-500 mx-auto text-white rounded-lg  duration-700 hover:bg-green-300 font-serif text-[13px] sm:text-[14px] min-w-[128px] font-semibold cursor-pointer hover:scale-[1.03] dropDownIcon pl-1" onClick={showOrHideCategoryModal}>{selectedCategoryMethod}</div>
                    <div className="w-5/6 min-w-[172px] mx-auto mt-2 font-serif text-[13px] flex justify-center"><label className="ml-1">{priceCategoryActivateDeactivateTextSwitching.categoryActivateDeactivateText} Category Filter <input type="checkbox" onChange={(e)=>{
                        console.log(e.target.checked);
                        if(e.target.checked){
                            setPriceCategoryFilterActivationStatus(
                                {
                                    ...priceCategoryFilterActivationStatus,
                                    categoryActivationFlag: true
                                }
                            );

                            setPriceCategoryActivateDeactivateTextSwitching({
                                ...priceCategoryActivateDeactivateTextSwitching,
                                categoryActivateDeactivateText: 'Deactivate'
                            });

                        }else{
                            setPriceCategoryFilterActivationStatus(
                                {
                                    ...priceCategoryFilterActivationStatus,
                                    categoryActivationFlag: false
                                }
                            );

                            setPriceCategoryActivateDeactivateTextSwitching({
                                ...priceCategoryActivateDeactivateTextSwitching,
                                categoryActivateDeactivateText: 'Activate'
                            });
                        }


                    }}/></label></div>
                        <div ref={categoryFilterModalRef} className="extra-sm:w-[82%] lg:w-[75%] w-[87%] absolute top-[65%] left-[25%]  bg-violet-500 px-2 space-y-2 text-center font-semibold font-serif rounded-md p-1 tracking-wide duration-1000 hover:border-[1px] hover:border-gray-300 text-[11px] super-extra-sm:text-[13px] py-5 hidePriceAndCategoryModal z-50">
                                    <p  className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedCategoryMethod(e.target.textContent);
                                        categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>--Select One--</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedCategoryMethod(e.target.textContent);
                                        categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>men's clothing</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedCategoryMethod(e.target.textContent);
                                        categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>jewelery</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedCategoryMethod(e.target.textContent);
                                        categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>electronics</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedCategoryMethod(e.target.textContent);
                                        categoryFilterModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>women's clothing</p>
                        </div>
                        
                </div>
            </div>

            {/* This portion is for user understanding like how to interact with filters*/}
            <div className="w-full sm:h-[15vh] mt-4 font">
                <p className="w-11/12 mx-auto text-[14px] extra-sm:text-base font-serif tracking-wide">Important Note:</p>
                <p className="w-11/12 mx-auto font-[diode] text-[13px] extra-sm:text-sm">*Atleast one filter should be activated such as price or category filter in order to filter products. More over, in order to combine both filters, activate both at the same time.</p>
            </div>

                <div className="w-full justify-center mb-2 mt-1 flex"><button className="w-[85%] bg-blue-600 py-1 rounded-lg text-[14px] extra-sm:text-base sm:text-lg font-serif duration-700 hover:bg-green-400 hover:scale-105 font-semibold tracking-wide text-white" onClick={filterProducts}>Press to filter Products</button></div>
                <div className="w-6  h-6 duration-1000 hover:scale-[1.2] cursor-pointer absolute top-4 right-4" onClick={()=>{
                    setFilterSortFlag({
                        ...filterSortFlag,
                        filterFlag: false
                    });
                }}><img className="w-full h-full" src="icons8-cancel-24.png"/></div>
            </div>}

           { filterDataFlag&&<div className=" w-11/12 extra-sm:w-10/12 justify-center overflow-y-auto space-y-3 flex flex-wrap fixed p-1 sm:p-3 bg-[#fad692] border-[1px] border-gray-300 rounded-lg min-h-[100vh] max-h-[100vh] top-2">
            <div className="w-11/12 max-h-[40px] bg-red-500 text-white py-1 text-lg font-bold font-serif text-center rounded-lg">Result</div>

           {filterData.length>0?filterData.map((item)=>{
            return (
                <div key={item.id} className=" w-[70%] sm:w-5/12 sm-md:w-[30%] md:w-[28%] lg:w-1/4 lg-xl:w-1/5 max-h-[340px] mr-2  sm:mr-5 shadow-lg shadow-red-300 hover:shadow-green-400 duration-700 hover:scale-[1.02] flex flex-wrap p-1 rounded-lg bg-white">
                    <div className="w-full h-[28vh]"><img className="w-full h-full" src={item.image}/></div>
                    <div className="w-[95%] text-lg font-serif mt-4 font-bold mx-auto text-blue-400">{item.category}</div>
                    <div className="w-[95%] text-gray-400 mx-auto text-[14px]">{item.title}</div>
                    <div className="w-[95%] mx-auto"><span className="text-red-500 font-serif text-[15px] font-semibold">Price: </span><span className="text-[12px] text-gray-400">{item.price}</span></div>

                </div>
            );
        }):<div className="w-5/6 text-[30px] font-serif text-center mx-auto bg-green-600 tracking-wide text-white">No Such Data Exists...</div>}
                <div className="w-5 absolute top-2 sm:top-5 right-4 sm:right-8 duration-1000 hover:scale-[1.2] cursor-pointer h-5" onClick={()=>{
                    setFilterDataFlag(false);
                }}><img className="w-full h-full" src="icons8-cancel-24.png"/></div>
            </div>}

                {/* Sorting Modal Code */}

             {filterSortFlag.sortFlag&&<div className=" w-[82%] extra-sm:w-[74%] sm:w-[61%] sm-md:w-[50%]  lg:w-[40%] lg-xl:w-2/6 absolute left-[10%] top-[10px] sm-md:left-[28%] lg:left-[35%] z-50 flex justify-center justify-items-center flex-wrap min-h-[60vh] sortModalBackground rounded-lg">
                     <div className="w-10/12 font-serif flex justify-center font-bold tracking-wide text-xl extra-sm:text-2xl text-center my-3 rounded-xl sortModalHeader">
                             <p className=" max-h-10 mt-2 extra-sm:mt-5">   
                            Sort Modal
                            </p>
                
                        </div>
                        <div className=" w-[97%] space-y-2 extra-sm:space-y-0 sm:w-11/12 flex-wrap extra-sm:flex-nowrap flex justify-center space-x-2  ">
                                    <div className=" w-[70%] extra-sm:w-[46%] lg:w-[50%] px-1 relative pt-2 pb-24 rounded-lg bg-violet-700">
                                                <div className=" text-[14px] extra-sm:text-base sm:text-lg font-serif tracking-wide font-semibold mt-1 ml-1 mb-2">Sort By Price:</div>
                                                <div className="p-1 w-5/6 bg-red-500 mx-auto text-white rounded-lg text-[13px] min-w-[126px]  duration-700 hover:bg-green-300 font-serif font-semibold cursor-pointer hover:scale-[1.03] dropDownIcon pl-2" onClick={()=>{
                                                    priceSortModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                                }}>{selectedAscendindOrDescending}</div>
                                                <div ref={priceSortModalRef} className="w-[70%] absolute top-[37%] left-[25%]  bg-violet-500 px-2 space-y-2 text-center font-semibold font-serif rounded-md p-1 tracking-wide duration-1000 hover:border-[1px] hover:border-gray-300 text-[13px] lg:text-[15px] py-5 hidePriceAndCategoryModal z-50">
                                    <p  className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        setSelectedAscendindOrDescending(e.target.textContent);
                                        priceSortModalRef.current.classList.toggle('hidePriceAndCategoryModal');
                                    }}>--Select One--</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={()=>{
                                       
                                        sortInAscendingOrder();
                                       
                                       
                                    }}>Ascending</p>
                                    <p className="duration-700 hover:bg-violet-800 hover:scale-[1.03] cursor-pointer" onClick={(e)=>{
                                        sortInDescendingOrder();
                                    }}>Descending</p>
                                    
                        </div>
                        


                                    </div>
                                    <div className="w-[70%] min-h-[165px] extra-sm:w-[46%] relative rounded-lg bg-green-500">
                                        <div className="p-2 absolute min-w-[158px] top-7 left-[2px] sm-md:left-1  font-serif">
                                            <p className="font-serif text-[15px]  sm:text-base inline">Sort in Alphabatical Order:</p>
                                           
                                             <input className="ml-1" type="checkbox" onChange={()=>{
                                                sortInAlphabeticalOrder();

                                             }} />
                                        
                                        </div>
                                    </div>
                        </div>

                        <div className="w-10/12 rounded-lg px-2 py-1 sortModalHeader mt-3 mb-6 text-[13px] font-serif">This is a sort modal and it works superb!</div>

                        <div className="w-5 h-5 absolute top-3 duration-1000 hover:scale-[1.2] cursor-pointer right-4" onClick={()=>{
                            setFilterSortFlag({
                                ...filterSortFlag,
                                sortFlag: false
                            });
                        }}><img className="w-full h-full" src="icons8-cancel-20.png"/></div>
                </div>}

        </div>

    );
}
