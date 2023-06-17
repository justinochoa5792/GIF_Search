import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [gif, setGif] = useState([]);
  const [value, setValue] = useState("");

  const findGif = async (e) => {
    e.preventDefault();
    let response =
      await Axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips
    `);
    console.log(response.data);
    setGif(response.data.data);
  };

  return (
    <div className="App">
      <h1>Search for any GIF you'd like!</h1>
      <div className="container">
        <form onSubmit={findGif}>
          <div className="form-group">
            <label htmlFor="gifSearch">Search for GIF</label>
            <input
              type="text"
              className="form-control"
              id="gifSearch"
              aria-describedby="gifSearch"
              placeholder="Search for a GIF"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div class="container mt-4">
        <div class="row d-flex justify-content-center">
          {gif.map((el) => {
            return (
              <div class="col-auto mb-3">
                <div className="card" style={{ width: "18rem" }}>
                  <video
                    src={el.images.fixed_height.mp4}
                    muted
                    autoPlay={"autoplay"}
                    loop
                    type="video/mp4"
                  ></video>
                  <div className="card-body">
                    <h5 className="card-title">{el.title}</h5>
                    <p className="card-text">{el.username}</p>
                    <p className="card-text">{el.slug}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
