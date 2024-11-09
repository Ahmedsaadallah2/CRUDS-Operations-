import { useState } from "react";
import Card from "./components/ProductCard/Card";
import Modal from "./components/UI/Model";
import { productList } from "./data";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const product = productList.map((pro) => <Card key={pro.id} product={pro} />);
  return (
    <>
      <main className="container">
        <button
          onClick={openModal}
          className="bg-indigo-500 p-2 w-full rounded-md text-white"
        >
          Add Product
        </button>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add Product">
          <div className="flex space-x-2">
            <button
              onClick={closeModal}
              className="bg-indigo-500 p-2 w-full rounded-md text-white"
            >
              Cancel
            </button>
            <button className="bg-gray-300 p-2 w-full rounded-md text-white hover:bg-gray-600 transition">
              Submit
            </button>
          </div>
        </Modal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-3">
          {product}
        </div>
      </main>
    </>
  );
}

export default App;
