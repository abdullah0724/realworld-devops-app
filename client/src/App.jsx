<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
=======
import { useState, useEffect } from "react";
import { Form } from "./Form";
import { getNews, createNews } from "../lib/api";
import { News } from "./News";

const App = () => {
  const [newsList, setNewsList] = useState([]);
  const [isCache, setIsCache] = useState(false);
  const [userInput, setUserInput] = useState("");
  // set news on first render
  useEffect(() => {
    getNews()
      .then(({ isCached, news }) => {
        setNewsList(news);
        setIsCache(isCached);
      })
      .catch((error) => console.error(error));
  }, []);

  // handle form submit
  const handleSubmit = async () => {
    try {
      await createNews(userInput);
      const { isCached, news } = await getNews();
      setNewsList(news);
      setIsCache(isCached);
    } catch (error) {
      console.error("Error creating news: ", error);
    }
  };

  // handle refresh button click
  const handleRefresh = async () => {
    const { isCached, news } = await getNews();
    setNewsList(news);
    setIsCache(isCached);
  };

  return (
    <main className="grid place-items-center my-10 grid-cols-1 md:grid-cols-2">
      <section>
        <Form
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
        />
      </section>
      <section>
        <button
          className="block mx-auto mb-5 px-2 py-1 bg-gray-500 text-white rounded-md"
          onClick={handleRefresh}
        >
          ↻ Refresh
        </button>
        <News newsList={newsList} isCache={isCache} />
      </section>
    </main>
  );
};
>>>>>>> ae9cb74d7c82c84d48db87c255853433915edf0a

export default App;
