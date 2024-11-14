/*-------Function For Validation-------*/

export const validtionForm = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const validationURL = /^(http|https):\/\/+[\www\d]+\.[\w]+(\/[\w\d]+)?/.test(
    product.imageURL
  );
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "The title must be between 10 and 80 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 250
  ) {
    errors.description =
      "The description must be between 10 and 250 characters";
  }
  if (!product.imageURL.trim() || !validationURL) {
    errors.imageURL = "Valid image URL is required";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required!";
  }
  return errors;
};
