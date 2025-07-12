export const News = ({ newsList, isCache }) => {
  return (
    <div>
      <h2>News List {isCache && "(from cache)"}</h2>
      <ul>
        {newsList.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

