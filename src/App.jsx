import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);

      setTotalPages(Math.ceil(jsonData.length / 10));
      // console.log(totalPages);
    } catch (err) {
      console.log(err);
      alert("failed to fetch data");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <header>Employee Data Table</header>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((item) => (
                <>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>

        <div className="navigation">
          <button
            onClick={handlePrevPage}
            style={{ opacity: currentPage > 1 ? 1 : 0.6 }}
          >
            Previous
          </button>
          <span className="pageNumber">{currentPage}</span>
          <button onClick={handleNextPage} style={{ opacity: currentPage < totalPages ? 1 : 0.6 }}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
