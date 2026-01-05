import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [ProductData, setProductData] = useState(false);
  const [Image, setImage] = useState('');
  const [Size, setSize] = useState('');

  const fetchProductData= async ()=>{
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
        
      }
    })
  }

  useEffect(() => {
  if (products.length > 0) {
    fetchProductData();
    }
  }, [productId, products]);

  

  return ProductData ?(
    <div className=''>
      {/* product data */}
      <div className=' w-full flex flex-col sm:flex-row'>
        <div className=' flex flex-col sm:flex-row gap-3 sm:gap-5 w-full'>
          <div className='sm:flex sm:flex-col hidden'>
            {ProductData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} className='mt-4 w-40 cursor-pointer'/>
            ))}
          </div>

          <div className='w-full sm:mt-4'>
            <img src={Image} alt="" className='w-full'/>         
          </div>

          <div className='flex gap-1.25 w-full sm:flex-col sm:hidden'>
            {ProductData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} className=' w-[24%] cursor-pointer '/>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-center gap-5 mt-15 sm:mt-4 sm:ml-5'>
          <div className='text-2xl font-semibold'>
            {ProductData.name}
          </div>

          <div className='flex gap-1 w-5'>
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
          </div>

          <div className='text-2xl font-semibold'>{currency}{ProductData.price}</div>

          <div>{ProductData.description}</div>

          <div>
            <div><p>Select Size</p></div>
            <div className='flex gap-3 mt-4'>
              {ProductData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={` p-2 px-3 bg-gray-100 cursor-pointer ${item===Size? 'border-2 border-orange-400' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>

          <div className='mt-3'>
            <button onClick={()=>addToCart(ProductData._id, Size)} className='cursor-pointer py-3 px-4 bg-black active:bg-gray-700 text-white'>ADD TO CART</button>
          </div>

          <hr className='mt-4 text-gray-200 sm:4/5'/>
          <div className='mt-4 text-gray-400'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      
      {/* related products */}
      <div>
        <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory}/>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product