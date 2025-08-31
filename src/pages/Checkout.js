import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cart, total } = useContext(CartContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentType, setPaymentType] = useState('cash');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Simulate customer history (in a real app, should be from a database)
  const [customerHistory, setCustomerHistory] = useState(() => {
    const data = localStorage.getItem('customerHistory');
    return data ? JSON.parse(data) : [];
  });

  const [pendingSubmit, setPendingSubmit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  // Check if the customer has already purchased the same products
    const found = customerHistory.find(
      (entry) => entry.name.trim() === name.trim() &&
        entry.cart &&
        entry.cart.length === cart.length &&
        entry.cart.every((item, idx) =>
          item.id === cart[idx].id && item.amount === cart[idx].amount
        )
    );
    if (found) {
      setPendingSubmit(true);
    } else {
      // أضف الطلب إلى سجل العملاء
      const newHistory = [...customerHistory, { name, cart }];
      setCustomerHistory(newHistory);
      localStorage.setItem('customerHistory', JSON.stringify(newHistory));
      setSubmitted(true);
    }
  };

  // Confirm proceed if previously purchased
  const handleConfirmProceed = () => {
    const newHistory = [...customerHistory, { name, cart }];
    setCustomerHistory(newHistory);
    localStorage.setItem('customerHistory', JSON.stringify(newHistory));
    setSubmitted(true);
    setPendingSubmit(false);
  };
  const handleCancelProceed = () => {
    setPendingSubmit(false);
  };

  return (
    <div className="flex flex-col min-h-[81.3vh] pt-20">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center border-b pb-4">Checkout</h1>
          {cart.length === 0 ? (
            <div className="text-gray-400 text-center py-16 text-lg min-h-[200px] flex items-center justify-center">Cart is empty</div>
          ) : pendingSubmit ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-yellow-600 text-center text-lg font-semibold mb-6">You have already purchased the same products!<br/>Do you want to proceed with the purchase again?</div>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmProceed}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium shadow"
                >
                  Yes, proceed
                </button>
                <button
                  onClick={handleCancelProceed}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium shadow"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : submitted ? (
            <div className="text-green-600 text-center py-16 text-lg font-semibold">Your order has been submitted successfully! Thank you for shopping with us.</div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Order Summary:</h2>
                <ul className="mb-2 text-sm text-gray-700">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between border-b py-1">
                      <span>{item.title} x {item.amount}</span>
                      <span>$ {(item.price * item.amount).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-bold text-right mt-2">Total: <span className="text-primary">$ {parseFloat(total).toFixed(2)}</span></div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded px-4 py-2 focus:outline-primary"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Detailed Address"
                  className="border rounded px-4 py-2 focus:outline-primary"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Payment Method:</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        value="cash"
                        checked={paymentType === 'cash'}
                        onChange={() => setPaymentType('cash')}
                      />
                      Cash on delivery
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        value="visa"
                        checked={paymentType === 'visa'}
                        onChange={() => setPaymentType('visa')}
                      />
                      Visa
                    </label>
                  </div>
                </div>
                {paymentType === 'visa' && (
                  <div className="border rounded px-4 py-4 bg-gray-50 flex flex-col gap-3">
                    <h3 className="font-bold text-lg mb-2 text-primary">Card Information (Visa)</h3>
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      className="border rounded px-4 py-2 focus:outline-primary"
                      maxLength={16}
                      pattern="\d{16}"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      required
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="border rounded px-4 py-2 focus:outline-primary w-1/2"
                        maxLength={5}
                        pattern="\d{2}/\d{2}"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border rounded px-4 py-2 focus:outline-primary w-1/2"
                        maxLength={4}
                        pattern="\d{3,4}"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium shadow"
                >
                  Confirm Order
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
