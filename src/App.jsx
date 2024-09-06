import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";

function App() {
  console.log(import.meta.env.VITE_NEWS_BASE_API_URL);
  return (
    <>
      <Header />
      <div className="container">
        <Main />
      </div>
    </>
  );
}

export default App;
