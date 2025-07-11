import { useState, useEffect } from "react";
import { Form } from "./Form";
import { fetchNews } from "@lib/api";
import { News } from "./News";

const NewsApp = () => {
  const [newsList, setNewsList] = useState([]);
  const [isCache, setIsCache] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    getNews()
      .then(({ isCached, news }) => {
        setNewsList(news);
        setIsCache(isCached);
      })
      .catch((error) => console.error(error));
  }, []);

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

export default NewsApp;

