import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Time from "./Time";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  getDocs,
  setDoc,
  orderBy,
} from "firebase/firestore";
import background from "../public/wherearethey.png";
import StartMenu from "./StartMenu";
import Controls from "./Controls";
import Wanted from "./Wanted";
import EndGame from "./EndGame";
import ScoreBoard from "./ScoreBoard";
const firebaseConfig = {
  apiKey: "AIzaSyCdUaQg-OT7VTehTL3H-w9GmWI5x89eW2Y",
  authDomain: "wherearethey-4b526.firebaseapp.com",
  projectId: "wherearethey-4b526",
  storageBucket: "wherearethey-4b526.appspot.com",
  messagingSenderId: "56955783629",
  appId: "1:56955783629:web:d399091e056120c457dc84",
  measurementId: "G-K33EF29623",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const uuser = auth.currentUser;

function App() {
  const [user, setUser] = useState(false);
  const [waldoIs, setwaldoIs] = useState("");
  async function googlesignIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setUser(true);
  }

  async function signAnonymously() {
    await signInAnonymously(auth);
    setUser(true);
  }

  const ref = useRef<any>(null);
  const [imgWidth, setimgWidth] = useState(0);
  const [imgHeight, setimgHeight] = useState(0);
  const [blur, setBlur] = useState("blur(8px)");
  const [menu, setMenu] = useState(true);
  const [time, setTime] = useState("");
  const [decitime, setDeciTime] = useState(0);
  const [nickname, setNickname] = useState("Anonymous");
  const [cursor, setCursor] = useState([0, 0]);
  const [positions, setPositions] = useState<any>();
  const [selected, setSelected] = useState("");
  const [found, setFound] = useState({
    fry: false,
    Zapp: false,
    Zoidberg: false,
  });
  const [score, setScore] = useState("");
  const [endgame, setEndgame] = useState(false);
  const [scoreMenu, setScoreMenu] = useState(false);

  const [scoreBoard, setScoreBoard] = useState({});
  useEffect(() => {
    setimgHeight(ref.current.clientHeight / 90);
    setimgWidth(ref.current.clientWidth / 90);
  });
  const timer = new Time();
  const resetTimer = () => {
    timer.reset();
  };

  useEffect(() => {
    fetchPost();
    fetchScoreboard();
  }, []);
  useEffect(() => {
    if (menu) return;

    const interval = setInterval(() => {
      timer.add(1);

      setTime(timer.toString());
      setDeciTime(timer.toDeci());
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [menu]);

  async function addtoDB() {
    const docRef = await addDoc(collection(db, "Scores"), {
      name: nickname,
      time: time,
      score: decitime,
    });
    console.log("Document written with ID: ", docRef.id);
  }
  async function unsign() {
    await signOut(auth);
    setUser(false);
  }

  async function fetchPost() {
    await getDocs(collection(db, "Position")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      setPositions(newData[0]);
    });
  }

  async function fetchScoreboard() {
    await getDocs(query(collection(db, "Scores"), orderBy("score"))).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setScoreBoard(newData);
      }
    );
  }
  const getLocationImageClick = (e: any) => {
    e.stopPropagation();
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 1000
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 1000
    );
    const coords = [xCoord, yCoord];
    console.log(scoreBoard);

    isWithin(coords);
    return coords;
  };
  const getLocationImageHover = (e: any) => {
    const xCoord = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 1000
    );
    const yCoord = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 1000
    );
    const coords = [xCoord, yCoord];

    setCursor(coords);
  };

  function isWithin(coords: number[]) {
    const Fry = positions!["Fry"];
    const Zapp = positions!["Zapp"];
    const Zoidberg = positions!["Zoidberg"];
    const fry: any = document.querySelector(".Fry");
    const zoidberg: any = document.querySelector(".Zoidberg");
    console.log(nickname);

    const zapp: any = document.querySelector(".Zapp");

    const tempFound = { ...found };

    if (
      coords[0] > Fry[0] &&
      coords[0] < Fry[1] &&
      coords[1] > Fry[2] &&
      coords[1] < Fry[3] &&
      selected === "Fry" &&
      !tempFound.fry
    ) {
      fry.style.filter = "blur(1px)";
      fry.style.outline = "2px solid black";
      tempFound.fry = true;
      setFound(tempFound);
    } else if (
      coords[0] > Zapp[0] &&
      coords[0] < Zapp[1] &&
      coords[1] > Zapp[2] &&
      coords[1] < Zapp[3] &&
      selected === "Zapp" &&
      !tempFound.Zapp
    ) {
      console.log("Zapp");
      zapp.style.filter = "blur(1px)";
      zapp.style.outline = "2px solid black";
      tempFound.Zapp = true;
      setFound(tempFound);
    } else if (
      coords[0] > Zoidberg[0] &&
      coords[0] < Zoidberg[1] &&
      coords[1] > Zoidberg[2] &&
      coords[1] < Zoidberg[3] &&
      selected === "Zoidberg" &&
      !tempFound.Zoidberg
    ) {
      zoidberg.style.filter = "blur(1px)";
      zoidberg.style.outline = "2px solid black";
      tempFound.Zoidberg = true;
      setFound(tempFound);
    }

    if (tempFound.Zapp && tempFound.Zoidberg && tempFound.fry) {
      setBlur("blur(8px)");

      setEndgame(true);
      setScore(time);
      fetchScoreboard();

      addtoDB();
      setFound({
        fry: false,
        Zapp: false,
        Zoidberg: false,
      });
    }
  }
  return (
    <div>
      {!menu && !endgame && !scoreMenu ? (
        <Controls
          selected={selected}
          setSelected={setSelected}
          setBlur={setBlur}
          setMenu={setMenu}
          width={imgWidth * 35}
          setTime={setTime}
          resetTimer={resetTimer}
          time={time}
        ></Controls>
      ) : null}
      {menu ? (
        <StartMenu
          setBlur={setBlur}
          setMenu={setMenu}
          width={imgWidth * 35}
          height={imgHeight * 25}
          nickname={nickname}
          setNickname={setNickname}
          setScoreMenu={setScoreMenu}
        ></StartMenu>
      ) : null}
      {endgame ? (
        <EndGame
          setMenu={setMenu}
          setBlur={setBlur}
          width={imgWidth * 35}
          height={imgHeight * 25}
          score={score}
          setTime={setTime}
          nickname={nickname}
          setEndgame={setEndgame}
          resetTimer={resetTimer}
        ></EndGame>
      ) : null}
      {scoreMenu ? (
        <ScoreBoard
          setMenu={setMenu}
          setBlur={setBlur}
          width={imgWidth * 35}
          height={imgHeight * 30}
          score={score}
          setTime={setTime}
          nickname={nickname}
          setEndgame={setEndgame}
          resetTimer={resetTimer}
          setScoreMenu={setScoreMenu}
          scoreBoard={scoreBoard}
        ></ScoreBoard>
      ) : null}
      <div
        onClick={getLocationImageClick}
        onMouseMoveCapture={getLocationImageHover}
        ref={ref}
        className="Waldo"
        style={{
          cursor: "none",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          width: "85vw",
          height: "80vh",
          marginTop: "7vh",

          filter: blur,
        }}
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            marginLeft: "20px",
            position: "relative",
            left: cursor[0] / 10 + "%",
            transition: "linear",
            top: cursor[1] / 10 + "%",
            borderRadius: "25px",
            outline: "4px solid white",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
