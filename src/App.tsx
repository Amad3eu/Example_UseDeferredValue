import { ChangeEvent, useDeferredValue, useMemo, useState } from "react";
import { useFetch } from "./useFetch";
import { getPlayers } from "./api";
import { BootstrapStaticResponse } from "./models";
import { PlayerList } from "./PlayerList";

const App = () => {
  const { isLoading, data } = useFetch<BootstrapStaticResponse>(getPlayers);

  const dataSorted = useMemo(() => {
    return data?.elements.sort((a, b) => a.id - b.id) ?? [];
  }, [data]);

  const [searchText, setSearchText] = useState("");
  const searchTextDeffered = useDeferredValue(searchText);

  const onSearchTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  return (
    <div className="container u-full-width">
      <div
        className="container u-full-width "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <h3 className="u-text-center">Fantasy Premier League Players</h3>
        <label htmlFor="searchText">Search for player...</label>
        <input
          type="text"
          placeholder="Mohamed Salah"
          id="searchText"
          onChange={onSearchTextChange}
          value={searchText}
        />
      </div>
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading data...</p>
      ) : (
        <PlayerList
          players={dataSorted}
          searchText={searchTextDeffered}
          teams={data?.teams ?? []}
        />
      )}
    </div>
  );
};

export default App;
