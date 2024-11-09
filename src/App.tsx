import { useState } from "react";
import Card from "./components/ProductCard/Card";
import Modal from "./components/UI/Model";
import { formInputsList, productList } from "./data";
import Input from "./components/UI/Input";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const product = productList.map((pro) => <Card key={pro.id} product={pro} />);

  const formControl = formInputsList.map((input) => (
    <div className="flex flex-col">
      <label htmlFor={input.id}>{input.label}</label>
      <Input id={input.id} name={input.name} />
    </div>
  ));
  return (
    <>
      <main className="container">
        <button
          onClick={openModal}
          className="bg-indigo-500 p-2 w-full rounded-md text-white"
        >
          Add Product
        </button>
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="ADD A NEW PRODUCT"
        >
          <form className="flex flex-col space-y-4">
            {formControl}
            <div className="flex space-x-4">
              <button
                onClick={closeModal}
                className="bg-indigo-500 p-2 w-full rounded-md text-white"
              >
                Submit
              </button>
              <button className="bg-gray-400 p-2 w-full rounded-lg text-white hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-3">
          {product}
        </div>
      </main>
    </>
  );
}

export default App;
