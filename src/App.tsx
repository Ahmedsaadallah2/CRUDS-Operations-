import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./components/ProductCard/Card";
import Modal from "./components/UI/Model";
import { colors, formInputsList, productList } from "./data";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces/interface";
import { validtionForm } from "./validation/validation";
import ErrorsMassege from "./components/UI/ErrorsMassege";
import CircleColor from "./components/UI/CircleColor";
import { v4 as uuid } from "uuid";

function App() {
  /* Use <=================> Hooks */
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
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColor, setTempColor] = useState<string[]>([]);
  console.log(tempColor);

  //----------Input Handler-----------//

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  /* Product <=================> ListMap */
  const product = products.map((pro) => <Card key={pro.id} product={pro} />);
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
  /* Submit <=================> Form */
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
    setProducts((prev) => [
      { ...formInput, id: uuid(), colors: tempColor },
      ...prev,
    ]);
    setFormInput(objetContainer);
    closeModal();
    setTempColor([]);
  };

  /* Product <=================> Color */
  const ProductColor = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((itme) => itme !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <>
      <main className="container">
        <button
          onClick={openModal}
          className="bg-indigo-500 p-3 px-7 text-lg mx-auto block m-4 rounded-md text-white "
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
            <div className="flex gap-2 my-3 items-center flex-wrap">
              {tempColor.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="bg-indigo-500 text-sm p-1 rounded-2xl text-white"
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex gap-2 my-3 items-center flex-wrap">
              {ProductColor}
            </div>

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
