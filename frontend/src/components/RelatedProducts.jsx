import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category,subCategory}) => {

    const {products}= useContext(ShopContext);
    const [Related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length>0){
            let productCopy=products.slice();

            productCopy=productCopy.filter((item) => category === item.category && subCategory === item.subCategory);

            setRelated(productCopy.slice(0,5));
            
        }
    }, [products])
    

  return (
    <div>
        <div className='flex justify-center mt-25 items-center'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-5 gap-5 py-10'>
            {
                Related.map((item,index)=>(
                    <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />    
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts