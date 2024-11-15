import { ChangeEvent, FormEvent, useState } from "react";
import Card from "./components/ProductCard/Card";
import Modal from "./components/UI/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces/interface";
import { validtionForm } from "./validation/validation";
import ErrorsMassege from "./components/UI/ErrorsMassege";
import CircleColor from "./components/UI/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/UI/Select";
import Button from "./components/UI/Button";
import { TypesProductName } from "./types";

function App() {
  /* Use <=================> Hooks */
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productEdit, setProductEdit] = useState<IProduct>(objetContainer);
  const [productEditIdx, setProductEditIdx] = useState<number>(0);

  //----------Input Handler-----------//

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeEditModal() {
    setIsOpenEditModel(false);
  }
  function openEditModal() {
    setIsOpenEditModel(true);
  }
  /* Product <=================> ListMap */
  const product = products.map((pro, idx) => (
    <Card
      key={pro.id}
      product={pro}
      setProductEdit={setProductEdit}
      openEditModal={openEditModal}
      setProductEditIdx={setProductEditIdx}
      idx={idx}
    />
  ));
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    //----------Form Handler-----------//
    setProductEdit({
      ...productEdit,
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
    closeEditModal();
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
    // Log Errors Inputs ---------->
    const hasErorrsMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErorrsMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      {
        ...formInput,
        id: uuid(),
        colors: tempColor,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setFormInput(objetContainer);
    closeModal();
    setTempColor([]);
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { description, imageURL, price, title } = productEdit;
    const errors = validtionForm({
      title,
      description,
      imageURL,
      price,
    });
    // Log Errors Inputs ---------->
    const hasErorrsMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErorrsMsg) {
      setErrors(errors);
      return;
    }

    const updateProduct = [...products];
    updateProduct[productEditIdx] = productEdit;
    setProducts(updateProduct);

    setProductEdit(objetContainer);
    closeEditModal();
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

  const renderEditProduct = (
    id: string,
    label: string,
    name: TypesProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={label}>Product Title</label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorsMassege msg={errors[name]} />
      </div>
    );
  };
  return (
    <>
      <main className="container">
        <button
          onClick={openModal}
          className="bg-indigo-500 p-3 px-7 text-lg mx-auto block m-4 rounded-md text-white "
        >
          Add Product
        </button>
        {/*Open Model To Add Product  */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="ADD A NEW PRODUCT"
        >
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            {formControl}
            <Select
              setSelected={setSelectedCategory}
              selected={selectedCategory}
            />

            <div className="flex gap-2 my-3 items-center flex-wrap">
              {ProductColor}
            </div>
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
        {/*Open Model To Edit Product  */}
        <Modal
          isOpen={isOpenEditModel}
          closeModal={closeEditModal}
          title="EDIT THIS PRODUCT"
        >
          <form
            className="flex flex-col space-y-4"
            onSubmit={submitEditHandler}
          >
            {renderEditProduct("title", "Product Title", "title")}
            {renderEditProduct(
              "description",
              "Product Description",
              "description"
            )}
            {renderEditProduct("imageURL", "Product ImageURL", "imageURL")}
            {renderEditProduct("price", "Product Price", "price")}
            {/* <Select
              setSelected={setSelectedCategory}
              selected={selectedCategory}
            /> */}

            {/* <div className="flex gap-2 my-3 items-center flex-wrap">
              {ProductColor}
            </div>
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
            </div> */}

            <div className="flex space-x-4">
              <Button width="w-full" className="bg-indigo-500">
                Submit
              </Button>
              <Button
                width="w-full"
                onClick={ClearHandler}
                className="bg-gray-400 hover:bg-gray-600 transition"
              >
                Cancel
              </Button>
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
