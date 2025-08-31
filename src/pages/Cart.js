import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, total, clearCart } = useContext(CartContext);
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
  return (
  <div className="flex flex-col min-h-[81.3vh] pt-20"> 
      <main className="flex-1 flex flex-col items-center">
        <div className="container mx-auto py-8 w-full flex flex-col items-center">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-center border-b pb-4">Shopping Cart</h1>
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-16 text-lg min-h-[200px] flex items-center justify-center">Cart is empty</div>
            ) : (
              <>
                <div className="flex flex-col gap-y-4 mb-8">
                  {cart.map((item) => (
                    <CartItem item={item} key={item.id} />
                  ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6 w-full">
                  <div className="font-semibold text-lg">
                    Total: <span className="text-primary">$ {parseFloat(total).toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={handleClearCart}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-medium shadow"
                    >
                      Remove all products
                    </button>
                    <Link
                      to="/checkout"
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium shadow flex items-center justify-center"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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
    </main>
  </div>
  );
};

export default Cart;
