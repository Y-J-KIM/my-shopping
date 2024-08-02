import "./App.css";
import React from "react";
import BoardList from "./components/Board/boardList.js";
import Header from "./components/Home/Header.jsx";
import Banner from "./components/Home/Banner.jsx";
import ProductList from "./components/Product/ProductList.js";
import Footer from "./components/Home/Footer.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <ProductList />
      <BoardList />
      <Footer />
    </div>
  );
}

export default App;
