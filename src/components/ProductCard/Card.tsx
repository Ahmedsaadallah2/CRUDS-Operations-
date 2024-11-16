import { IProduct } from "../../interfaces/interface";
import Button from "../UI/Button";
import CircleColor from "../UI/CircleColor";
import { text } from "../utils";
import Image from "./Image";

interface Iprop {
  product: IProduct;
  setProductEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductEditIdx: (value: number) => void;
  OpenConfirmModel: () => void;
}

export default function Card({
  product,
  setProductEdit,
  openEditModal,
  setProductEditIdx,
  idx,
  OpenConfirmModel,
}: Iprop) {
  const { category, colors, description, imageURL, price, title } = product;

  const ProductColor = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  const onEdit = () => {
    setProductEdit(product);
    openEditModal();
    setProductEditIdx(idx);
  };

  const onRemove = () => {
    setProductEdit(product);
    OpenConfirmModel();
  };
  return (
    <>
      <div className="max-w-sm mx-auto md:max-w-lg border border-gray-300 p-2 rounded-lg">
        <Image
          imageURL={imageURL}
          alt="Car Image Photo"
          className="w-full h-52 object-cover"
        />
        <h3 className="mt-5 text-lg font-bold">{title}</h3>
        <p className="my-2 text-slate-500">{text(description)}</p>

        <div className="flex gap-2 my-3 items-center">{ProductColor}</div>

        <div className="flex justify-between items-center my-4">
          <span className="text-indigo-800 font-bold">${price}</span>
          <Image
            imageURL={category.imageURL}
            alt={"Car Image Photo"}
            className={"w-9 h-9 rounded-full object-cover"}
          />
        </div>
        <div className="flex gap-2">
          <Button
            width="w-full"
            onClick={onEdit}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            Edit
          </Button>
          <Button
            width="w-full"
            onClick={onRemove}
            className="bg-red-700 hover:bg-red-800"
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}
