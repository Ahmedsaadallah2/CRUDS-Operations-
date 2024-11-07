import Card from "./components/ProductCard/Card";
import { productList } from "./data";

function App() {
  const product = productList.map((pro) => <Card key={pro.id} product={pro} />);
  return (
    <>
      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 m-3">
          {product}
        </div>
      </main>
    </>
  );
}

export default App;
