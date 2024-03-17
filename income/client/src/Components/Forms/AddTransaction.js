import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { transContext } from "../context/TransactionContext/TransContext";

export default function AddTransaction() {
  const { id } = useParams();

  const { createTransAction } = useContext(transContext);

  const [formData, setFormData] = useState({
    name: "",
    transactionType: "",
    amount: "",
    category: "",
    notes: "",
    color: "",
    date: "",
  });
  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    console.log(formData.name);
    e.preventDefault();
    createTransAction({ accountF: id, ...formData });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add Transaction
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transaction Type
                </label>
                <select
                  name="transactionType"
                  onChange={handleChange}
                  value={formData.transactionType}
                  className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Income">Income (+)</option>
                  <option value="Expense">Expenses (-)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount ($)
                </label>
                <div className="mt-1">
                  <input
                    name="amount"
                    onChange={handleChange}
                    value={formData.amount}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transaction Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  value={formData.category}
                  className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value=" Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Healt">Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pick Color
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    value={formData.color}
                    name="color"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    type="color"
                    className="block  appearance-none rounded-md border border-gray-300 px-2 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    name="date"
                    value={formData.date}
                    type="date"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Note
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={handleChange}
                    rows={4}
                    name="notes"
                    value={formData.notes}
                    className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add New Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
