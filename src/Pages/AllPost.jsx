import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { NotesCard } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterOption, setFilterOption] = useState("title");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.getAllNotes();
        if (response && response.documents) {
          setPosts(response.documents);
        } else {
          setError("No posts found.");
        }
      } catch (er) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  };

  const clearFilter = () => {
    setFilterText("");
    setFilterOption("title");
  };

  const filteredPosts = posts.filter((post) => {
    const filterValue = filterText.toLowerCase();
    if (filterOption === "title") {
      return post.title.toLowerCase().includes(filterValue);
    }
    if (filterOption === "content") {
      return post.content?.toLowerCase().includes(filterValue);
    }
    return true;
  });

  return (
    <div className="w-full">
      {/* Filter Options: Always visible */}
      <div className="flex justify-center my-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="p-2 border border-white rounded"
            placeholder={`Search posts by ${filterOption}`}
            value={filterText}
            onChange={handleFilterChange}
          />

          <select
            value={filterOption}
            onChange={handleFilterOptionChange}
            className="p-2 border border-white rounded"
          >
            <option value="title">Title</option>
          </select>

          <button
            onClick={clearFilter}
            className=" btn btn-outline text-white border-white hover:bg-white hover:text-black focus:ring focus:ring-white"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {loading && (
        <div className="w-full py-8 mt-4">
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full py-8 mt-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-2 text-lg">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="w-full py-8 mt-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">
              No Notes Available
            </h1>
            <p className="mt-2 text-lg">
              It looks like there are no posts to display.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && (
        <div className="w-full py-8 mt-4 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-yellow-500">
              No Posts Match Your Filter
            </h1>
            <p className="mt-2 text-lg">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
          {filteredPosts.map((post) => (
            <NotesCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPost;
