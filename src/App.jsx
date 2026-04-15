import Meals from "./components/meals";
import Header from "./components/header";
import CartContextProvider from "./store/cartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals />       
    </CartContextProvider>
  );
}

export default App;
