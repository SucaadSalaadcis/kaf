import { useEffect, useState } from "react"

import { FaFilter } from "react-icons/fa"
import Product from "../shop/Product"


function ProductList() {
    const [menu, setMenu] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [selectedCategory,setSelectedCatergory] = useState("all")
    const [sortOption,setSortOption] = useState("default");
    // pagination
    const [currentPage,setcurrentPage] = useState(1);
    const [itemsPartPage,setItemsPartPage] = useState(8)

    // loading data
    useEffect(()=> {
     // fetch data
     const fetchData = async() => {
        try {
            const response = await fetch("http://localhost:7000/electronic/")
            const data = await response.json()
            // console.log(data)
            setMenu(data)
            setFilteredItems(data)
        } catch (error) {
             console.log("Error fetching data",error)
        }
     }
     // calling the function
     fetchData();
    },[])
    

    // filtering data based on category
    // first category from menu.json second from parameter
    const filterItems =  (category) => {
         const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
         setFilteredItems(filtered)
         setSelectedCatergory(category);
         setcurrentPage(1)
    }

  
    // show all data functions
    const showAll = () => {
        setFilteredItems(menu)
        setSelectedCatergory("all")
        setcurrentPage(1)
    }
     

    // soring based On : A-Z, Z-A, low to high , high to low pricing
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];

        // logic
        // name comes from json file
        // localcompare + if refrence occur after comparing
        // - if refrence occur before comparing
        // 0 if the are equivalent
        switch(option) {
            case "A-Z":
              sortedItems.sort((a,b) => a.name.localeCompare(b.name))
              break;
            case "Z-A":
                sortedItems.sort((a,b) => b.name.localeCompare(a.name))
              break;
            case "low-to-high":
                sortedItems.sort((a,b) => a.price - b.price)
              break;
            case "high-to-low":
                sortedItems.sort((a,b) => b.price - a.price)
              break;
            default:
              // code block
              break;
          }

          setFilteredItems(sortedItems);
          setcurrentPage(1)
    }



  // pagination logic
   const indexOfLastItem = currentPage * itemsPartPage;
   const indexOfFirstItem = indexOfLastItem - itemsPartPage;
   const currentItem = filteredItems.slice(indexOfFirstItem,indexOfLastItem);
   const paginate = (pageNumber) => setcurrentPage(pageNumber)


  return (
    <div className="mt-10">
        {/* menu banner */}
         <div>

         </div>

    {/* menu shop section */}
    <div className="section-container">
        {/* Filtering and Sorting */}
       <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8" >

        {/* all category btns */}
        <div className="flex -flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
       <button onClick={showAll} 
       className={selectedCategory === "all" ? "active" : ""} 
       > All</button>
       <button onClick={() => filterItems("laptop")} 
       className={selectedCategory === "laptop" ? "active" : ""} 
       >Laptop</button>
       <button onClick={() => filterItems("phone")}
       className={selectedCategory === "phone" ? "active" : ""} 
       >Phone</button>
       <button onClick={() => filterItems("ipad")}
       className={selectedCategory === "ipad" ? "active" : ""} 
       >Ipad</button>
        </div>

        {/* sorting base filtering  */}
               <div className="flex justify-end mb-4 rounded-sm">
                <div className="bg-black p-2">
                <FaFilter className="h-4 w-4 text-white"/>
                </div>
                {/* sorting options */}
                <select name="sort" id="sort" 
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-black text-white px-2 py-1 rounded-sm"
                >
                    <option value="default">Default</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="low-to-high">Low-to-High</option>
                    <option value="high-to-low">High-to-Low</option>
                </select>
               </div>



         </div>

       {/* product card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {
                // filteredItems.map((item) => (
                currentItem.map((item) => (
                <Product key={item._id} product={item} />
                ))
            }
        </div>
    </div>
    {/* pagination */}
    <div className="flex justify-center my-8  mb-32">
        {
            Array.from({length: Math.ceil(filteredItems.length / itemsPartPage)}).map((_,index) => (
             <button key={index + 1} onClick={() => paginate(index + 1)}
             className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "gradientBg text-white" : "bg-gray-400"}`}
             >
                  {index + 1}
             </button>
            ))
        }
    </div>


    </div>
  )
}

export default ProductList