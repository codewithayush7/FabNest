import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'  
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products ,Search, ShowSearch} = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setsortType] = useState('relavent');

  const toggleCategory= (e)=>{
      if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(item=>item!==e.target.value));
      }
      else{
        setCategory(prev=>[...prev,e.target.value]);
      }
  }

  const toggleSubCategory= (e)=>{
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev=>prev.filter(item=>item!==e.target.value));
      }
      else{
        setSubCategory(prev=>[...prev,e.target.value]);
      }
  }

  const applyFilter= ()=>{
      let productsCopy=  products.slice();

      if(ShowSearch && Search){
        productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(Search.toLowerCase()));
      }
      if(category.length>0){
        productsCopy=productsCopy.filter(item => category.includes(item.category));
      }

      if(subCategory.length>0){
        productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));
      }

      setFilterProducts(productsCopy);
  }

  const sortProduct=()=>{
    let fpCopy= FilterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
    // console.log('Category:', category);
    
  }, [category,subCategory,Search,ShowSearch,products])
  

  useEffect(() => {
    setFilterProducts(products);
  }, [])
  
  useEffect(() => {
    sortProduct();
  }, [sortType])
  
  

  return (
    <div className='flex flex-col sm:flex-row sm:pt-10'>
        <div className=' sm:min-w-[300px] flex flex-col gap-4 pt-10 ml-7 mb-4'>
          <p onClick={()=>setShowFilter(!ShowFilter)} className='text-[17px] sm:text-2xl flex items-center'>FILTERS
            <img src={assets.dropdown_icon} alt="" className={`w-[9px] ml-2 sm:hidden ${ShowFilter?'rotate-90':''}`} />
          </p>
          {/* category filter */}
          <div className={`flex flex-col gap-3 p-4 border-2 border-gray-300 ${ShowFilter? '': 'hidden'} sm:block`}>
            <p>CATEGORIES</p>
            <p>
              <input type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p>
              <input type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p>
              <input type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
          {/* subcategory filter */}
          <div className={`flex flex-col gap-3 p-4 border-2 border-gray-300 ${ShowFilter? '': 'hidden'} sm:block`}>
            <p>TYPE</p>
            <p>
              <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p>
              <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p>
              <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>

        {/* right side */}
        <div className='w-full px-7'>
          <div className='flex flex-col gap-5 sm:flex sm:flex-row sm:justify-between'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/* product sort */}
            <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 cursor-pointer'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: low to high</option>
              <option value="high-low">Sort by: high to low</option>
            </select>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-5 py-10'>
                {
                    FilterProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))

                }
          </div>
        </div>
    </div>
  )
}

export default Collection