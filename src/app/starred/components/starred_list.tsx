"use client";

import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import "@/app/styles/styles.css";
import StarredItem from "./starred_item";
import FlipMove from "react-flip-move";
import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";
import DotsLoader from "@/app/components/dots_loader";

const inter = Inter({ subsets: ["latin"] });

export default function StarredList() {
  const starred = useSelector((state: RootState) => state.starred.items);
  const [visibleStarred, setVisibleStarred] = useState(starred);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showList, setShowList] = useState(false);

  // filtering starred items
  useEffect(() => {
    if (searchInput === "") {
      setVisibleStarred(starred);
    } else {
      setVisibleStarred(
        starred.filter(
          (relation) =>
            relation.sampler.title
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.sampler.artist
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.samplee.title
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            relation.samplee.artist
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
      );
    }
  }, [starred, searchInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
  };

  // FlipMove relies on client-side rendering, so we need to wait for the client to render
  // otherwise the initial ui will not match what was rendered on the server causing Hydration failure
  useEffect(() => {
    setShowList(true);
  }, []);

  return (
    <div>
      <div className="search main-search" style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search starred"
          onChange={handleInputChange}
          value={searchInput}
        />
        {searchInput && (
          <button className="clear-button" onClick={handleClearInput}></button>
        )}
      </div>
      {showList ? (
        starred.length > 0 ? (
          visibleStarred.length ? (
            <FlipMove duration={750}>
              {visibleStarred.map((relation, index) => {
                const key = `${relation.sampler.id}-${relation.samplee.id}`;
                return (
                  <div
                    key={key}
                    style={{
                      marginTop: index === 0 ? 0 : "0.5rem",
                    }}
                  >
                    <StarredItem item={relation} />
                  </div>
                );
              })}
            </FlipMove>
          ) : (
            <div className="cardish hovered">
              <p className={inter.className}>No samples found</p>
            </div>
          )
        ) : (
          <div className="cardish hovered">
            <p className={inter.className}>You do not have any starred samples</p>
          </div>
        )
      ) : (
        // Show loader while waiting for client-side rendering
        <DotsLoader />
      )}
    </div>
  );
}
