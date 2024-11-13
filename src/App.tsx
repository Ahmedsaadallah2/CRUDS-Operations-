import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./components/ProductCard/Card";
import Modal from "./components/UI/Model";
import { formInputsList, productList } from "./data";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces/interface";
import { validtionForm } from "./validation/validation";
import ErrorsMassege from "./components/UI/ErrorsMassege";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  //----------Object Handler-----------//
  const objetContainer = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [formInput, setFormInput] = useState<IProduct>(objetContainer);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  //----------Input Handler-----------//

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const product = productList.map((pro) => <Card key={pro.id} product={pro} />);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    //----------Form Handler-----------//
    setFormInput({
      ...formInput,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const formControl = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col">
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={formInput[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorsMassege msg={errors[input.name]} />
    </div>
  ));

  function ClearHandler() {
    setFormInput(objetContainer);
    closeModal();
  }
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { description, imageURL, price, title } = formInput;
    const errors = validtionForm({
      title,
      description,
      imageURL,
      price,
    });
    console.log(errors);
    // Log Errors Inputs ---------->
    const hasErorrsMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasErorrsMsg);

    if (!hasErorrsMsg) {
      setErrors(errors);
      return;
    }
  };

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
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            {formControl}
            <div className="flex space-x-4">
              <button className="bg-indigo-500 p-2 w-full rounded-md text-white">
                Submit
              </button>
              <button
                onClick={ClearHandler}
                className="bg-gray-400 p-2 w-full rounded-lg text-white hover:bg-gray-600 transition"
              >
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
