import "./write.scss";
import { useState } from "react";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [partOfTraining, setPartOfTraining] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [howManyPlayers, setHowManyPlayers] = useState("");
  const [time, setTime] = useState("");
  const [field, setField] = useState("");
  const [desc, setDesc] = useState("");
  const [coachingPoints, setCoachingPoints] = useState("");
  const [author, setAuthor] = useState("");
  console.log(categories);

  // console.log(file);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newPost = {
  //     title,
  //     partOfTraining,
  //     categories,
  //     subcategories,
  //     howManyPlayers,
  //     time,
  //     field,
  //     desc,
  //     coachingPoints,
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const filename = Date.now() + file.originalname;
  //     data.append("name", filename);
  //     data.append("path", file.path);
  //     data.append("file", ...file);
  //     data.append("data", JSON.stringify(newPost));
  //     console.log(...file);
  //     newPost.img = filename;
  //     try {
  //       axios
  //         .post("http://localhost:5000/upload", data, {
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         .then(({ data }) => {
  //           console.log(data);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <div className="writePost">
      <div className="writePostImgWrapper">
        {file &&
          (file[1] ? (
            <>
              <img
                className="writePostImg"
                src={URL.createObjectURL(file[0])}
                alt=""
              />
              <img
                className="writePostImg"
                src={URL.createObjectURL(file[1])}
                alt=""
              />
            </>
          ) : (
            <img
              className="writePostImg"
              src={URL.createObjectURL(file[0])}
              alt=""
            />
          ))}
      </div>

      <form
        action="http://localhost:5000/upload"
        method="post"
        className="writeForm"
        // onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className="labelFont" htmlFor="fileInput">
          <i className="writeIcon fas fa-plus"> </i>
          <span> Dodaj plik</span>
        </label>
        <input
          id="fileInput"
          type="file"
          name="file"
          multiple={true}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files)}
        />
        <div className="writePostFeatures">
          <div className="inputWrapper">
            {" "}
            <label className="labelFont" htmlFor="writeTitle">
              Nazwa ćwiczenia:
            </label>
            <input
              name="title"
              className="inputWrite"
              type="text"
              id="writeTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            {" "}
            <label className="labelFont" htmlFor="writeTitle">
              Autor ćwiczenia:
            </label>
            <input
              name="author"
              className="inputWrite"
              type="text"
              id="writeTitle"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="writePartOfTraining">
              Część treningu:
            </label>
            <input
              name="partOfTraining"
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
              name="categories"
              type="text"
              id="writePartOfTraining"
              onChange={
                (e) =>
                  setCategories(
                    e.target.value
                      .split(" ")
                      .filter((word) => word.trim() !== ",")
                  )
                // .split(" ").filter((word) => word.trim() !== "")
              }
            />
          </div>
          <div className="inputWrapper">
            <label className="labelFont" htmlFor="writePartOfTraining">
              Podkategoria:
            </label>
            <input
              name="subcategories"
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
              name="howManyPlayers"
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
              name="field"
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
              name="time"
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
              name="desc"
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
              name="coachingPoints"
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
