import "./write.scss";
import { useState } from "react";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [partOfTraining, setPartOfTraining] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [howManyPlayers, setHowManyPlayers] = useState("");
  const [time, setTime] = useState("");
  const [field, setField] = useState("");
  const [desc, setDesc] = useState("");
  const [coachingPoints, setCoachingPoints] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newPost = {
    //   username: user.username,
    //   title,
    //   partOfTraining,
    //   categories,
    //   subcategories,
    //   howManyPlayers,
    //   time,
    //   field,
    //   desc,
    //   coachingPoints,
    // };
    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("path", file.path);
    //   data.append("file", file);
    //   data.append("data", JSON.stringify(newPost));
    //   console.log(filename);
    //   newPost.img = filename;
    try {
      const res = await axios.post("http://localhost:5000/upload", file);
      window.location.replace("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    // }
    // try {
    //   const res = await axios.post("http://localhost:5000/api/posts", newPost);
    //   console.log(res);
    //   // window.location.replace("/post/" + res.data._id);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="writePost">
      <div className="writePostImgWrapper">
        {file && (
          <img
            className="writePostImg"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
      </div>

      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="labelFont" htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"> </i>
          <span> Dodaj plik</span>
        </label>
        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="writePostFeatures">
          <div className="inputWrapper">
            {" "}
            <label className="labelFont" htmlFor="writeTitle">
              Nazwa ćwiczenia:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="writeTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="writePartOfTraining">
              Część treningu:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="writePartOfTraining"
              onChange={(e) => setPartOfTraining(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="writePartOfTraining">
              Kategoria:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="writePartOfTraining"
              onChange={(e) =>
                setCategories(
                  e.target.value.split(" ").filter((word) => word.trim() !== "")
                )
              }
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="writePartOfTraining">
              Podkategoria:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="writePartOfTraining"
              onChange={(e) => setSubcategories(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="howMany">
              Ilość ćwiczących:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="howMany"
              onChange={(e) => setHowManyPlayers(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="fieldDimensions">
              Wymiary boiska:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="fieldDimensions"
              onChange={(e) => setField(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="playingTime">
              Czas trwania:
            </label>
            <input
              className="inputWrite"
              type="text"
              id="playingTime"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="inputWriteDesc">
            <p
              className="labelFont"
              style={{
                marginBottom: "20px",
              }}
            >
              Opis ćwiczenia:
            </p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="inputWriteDesc">
            <p
              className="labelFont"
              style={{
                marginBottom: "20px",
              }}
            >
              Coaching Points:
            </p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => setCoachingPoints(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="writeButtonSubmit" type="submit">
          Publikuj
        </button>
      </form>
    </div>
  );
};

export default Write;
