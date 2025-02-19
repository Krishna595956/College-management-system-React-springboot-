import React from "react";
import card from "/card.svg";
const MakePayment = () => {
  return (
    <div>
      <div className="container">
        <div className="flex">
          <div className="w-1/2 border p-6 rounded-lg">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold m-4">Make Payment</h1>
              <p className="text-gray-500 mb-4">
                Please enter your payment details below:
              </p>
              <div className="m-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="card-number"
                >
                  Card Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="card-number"
                  type="text"
                  placeholder="Enter card number"
                />
              </div>
              <div className="m-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="expiry-date"
                >
                  Expiry Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="expiry-date"
                  type="date"
                  placeholder="Enter expiry date"
                />
              </div>
              <div className="m-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cvv"
                  type="password"
                  maxLength={3}
                  placeholder="Enter CVV"
                />
              </div>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Make Payment
              </button>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center p-3">
            <img src={card} alt="Payment Image" className="w-full transform scale-x-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
