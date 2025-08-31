import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {IoMdArrowForward} from 'react-icons/io';
import {FiTrash2} from 'react-icons/fi';
import CartItem from '../components/CartItem';
import {SidebarContext} from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';


const Sidebar = () => {
  const {isOpen, handleClose} = useContext(SidebarContext);
  const {cart, clearCart, total, itemAmount} = useContext(CartContext);
  // Confirm before deleting cart
  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClearCart = () => {
    if (cart.length > 0) {
      setShowConfirm(true);
    }
  };
  const confirmDelete = () => {
    clearCart();
    setShowConfirm(false);
  };
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  // Overlay to close sidebar when clicking outside
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10 transition-opacity duration-300"
          onClick={handleClose}
        ></div>
      )}
      {/* Delete confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center w-[90vw] max-w-sm border">
            <div className="text-lg font-bold mb-4 text-red-600">Are you sure you want to remove all products from the cart?</div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-bold shadow"
              >
                Confirm Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-bold shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`${isOpen ? 'right-0' : '-right-full'}
          w-full bg-white fixed top-0 h-full max-h-screen shadow-2x1 md:w-[80vw] md:max-w-[400px] xl:max-w-[30vw]
          transition-all duration-300 px-4 z-20 lg:px-[35px]`}
          style={{boxShadow: isOpen ? '0 0 20px rgba(0,0,0,0.15)' : 'none'}}
      >
        <div className='flex items-center justify-between py-6 border-b'>
          <div className='uppercase text-sm font-semibold'>Shopping Bag ({itemAmount})</div>
          <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center 
          hover:bg-gray-100 rounded-full transition'>
            <IoMdArrowForward className='text-2x1'/>
          </div>
        </div>
        <div className='flex flex-col gap-y-2 h-[350px] md:h-[340px] overflow-y-auto overflow-x-hidden border-b'>
          {cart.length === 0 ? (
            <div className='flex flex-1 justify-center items-center text-gray-400 h-full'>
              Cart is empty
            </div>
          ) : (
            cart.map((item) => <CartItem item={item} key={item.id} />)
          )}
        </div>
        <div className='flex flex-col gap-y-3 py-4 mt-4'>
          <div className='flex w-full justify-between items-center'>
            <div className='uppercase font-semibold'>
              <span className='mr-2'>Total:</span>$ {parseFloat(total).toFixed(2)}
            </div>
            <div
              onClick={handleClearCart}
              className='cursor-pointer w-12 h-12 text-xl py-4 bg-red-500
               text-white flex justify-center items-center rounded hover:bg-red-600 transition'
              title= 'Delete all products'
            >
              <FiTrash2 />
            </div>
          </div>
          <Link
            to='/cart'
            className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full 
            font-medium rounded hover:bg-gray-300 transition'
            onClick={handleClose}
          >
            View Cart
          </Link>
          <Link
            to='/checkout'
            className='bg-primary flex p-4 justify-center items-center text-white w-full
             font-medium rounded hover:bg-primary/90 transition'
            onClick={handleClose}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
