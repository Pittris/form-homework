import React, { useState, useEffect } from "react";
import "./App.css";
import validateFloat from "./functions/validateFloat";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import ProgressBar from "./components/ProgressBar";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import File from "./components/File";
import saveText from "./functions/saveText";

function App() {
  const [radioPrichut, setRadioPrichut] = useState("vanilková");
  const [checkboxNavic, setCheckboxNavic] = useState([]);
  const [pocetKopecku, setPocetKopecku] = useState(1);
  const druhy = ["smetanová", "jogurtová", "nízkotučná"];
  const [druhZmrzliny, setDruhZmrzliny] = useState("smetanová");
  const [mistoDisk, setMistoDisk] = useState(50);
  const odpocet = 10;
  const [zbyvaOdpocet, setZbyvaOdpocet] = useState(odpocet);
  const [scitanec1, setscitanec1] = useState(0);
  const [scitanec2, setscitanec2] = useState(0);
  const [soucetCisel, setSoucetCisel] = useState("");
  const [textArea, setTextArea] = useState("");

  // odpocet
  useEffect(() => {
    if (odpocet > 0) {
      const timer = setInterval(() => {
        setZbyvaOdpocet(zbyvaOdpocet - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [zbyvaOdpocet]);
  //  progress bar
  const progress =
    zbyvaOdpocet > 0 ? ((odpocet - zbyvaOdpocet) / odpocet) * 100 : 100;
  // prompt scitanec 1
  useEffect(() => {
    let temp = prompt("Zadejte 1. sčítanec - číslo, může být i desetinné");
    while (!validateFloat(temp)) {
      temp = prompt("Zadejte 1. sčítanec - číslo, může být i desetinné");
    }
    setscitanec1(parseFloat(temp));
  }, []);
  //  handleData
  const handleData = (data, idecko) => {
    switch (idecko) {
      case "prichut": {
        setRadioPrichut(data);
        break;
      }
      case "navic": {
        setCheckboxNavic(data);
        break;
      }
      case "pocet": {
        if (data < 1) {
          alert("minimální počet kopečků je 1");
          data = 1;
        } else if (data > 4) {
          alert("Maximální počet kopečků jsou 4");
          data = 4;
        }
        setPocetKopecku(data);
        break;
      }
      case "druh": {
        setDruhZmrzliny(data);
        break;
      }
      case "misto": {
        setMistoDisk(data);
        break;
      }
      case "scitanec1": {
        setscitanec1(data);
        break;
      }
      case "scitanec2": {
        setscitanec2(data);
        break;
      }
      case "textArea": {
        setTextArea(data);
        break;
      }
      case "chooseFile": {
        setTextArea(data);
        break;
      }
      default:
        break;
    }
  };
  // handleEvent button
  const handleEvent = (idecko) => {
    switch (idecko) {
      case "soucet": {
        if (!validateFloat(scitanec1)) {
          setSoucetCisel(
            "Zadejte validní sčítance a zmáčkněte tlačitko pro výpočet"
          );
        } else if (!validateFloat(scitanec2)) {
          setSoucetCisel(
            "Zadejte validní sčítance a zmáčkněte tlačitko pro výpočet"
          );
        } else {
          setSoucetCisel(parseFloat(scitanec1) + parseFloat(scitanec2));
        }
        break;
      }
      case "download": {
        saveText(textArea);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle py-2">
        <div className="row mt-2">
          {/* sloupec1 */}
          <div className="col-6">
            {/* vypis */}
            <p>
              {radioPrichut} {checkboxNavic} {pocetKopecku} kopečky,{" "}
              {druhZmrzliny}
            </p>{" "}
            {/* prichut zmrzliny */}
            <div className="my-4">
              <RbGroup
                label="příchuť zmrzliny"
                id="prichut"
                dataIn={[
                  { label: "vanilková", value: "vanilková" },
                  { label: "čokoládová", value: "čokoládová" },
                  { label: "míchaná", value: "míchaná" },
                ]}
                handleData={handleData}
                selectedValue={radioPrichut}
              />
            </div>
            {/* neco navic */}
            <div className="my-4">
              <ChbGroup
                label="Něco navrch?"
                id="navic"
                dataIn={[
                  { label: "kousky oříšků", value: " s kousky oříšků" },
                  { label: "čoko hoblinky", value: " s čoko hoblinkami" },
                  {
                    label: "karamelové křupinky",
                    value: " s karamelovými křupinkami",
                  },
                ]}
                handleData={handleData}
                selectedValue={checkboxNavic}
              />
            </div>
            {/* pocet kopecku */}
            <div className="my-4">
              <NumImp
                label="Počet kopečků (max 4)"
                id="pocet"
                dataIn={pocetKopecku}
                handleData={handleData}
              />
            </div>
            {/* vyber z moznosti */}
            <div className="my-4">
              <Select
                label="Vyberte druh zmrzliny"
                id="druh"
                dataIn={druhy}
                selectedValue={druhZmrzliny}
                handleData={handleData}
              />
            </div>
            {/* zaplneni disku */}
            <div className="mt-4">
              <Range
                label="místo na disku"
                id="misto"
                dataIn={mistoDisk}
                handleData={handleData}
                min="0"
                max="100"
              />
            </div>
            {/* vypis casu */}
            <p>
              <b>
                <Clock />
              </b>
              , zbývá {mistoDisk} % místa na disku
            </p>
          </div>
          {/* sloupec2 */}
          <div className="col-6">
            {/* PROGRESS BAR */}
            <ProgressBar id="odpocitavani" dataIn={progress} />
            <p>
              {zbyvaOdpocet > 0
                ? `Instalace probíhá, čekejte ${zbyvaOdpocet} vteřin`
                : "Instalace dokončena"}
            </p>
            <div className="row">
              {/* scitanec 1 */}
              <div className="col-6">
                <TextBox
                  label="sčítanec 1"
                  id="scitanec1"
                  dataIn={scitanec1}
                  handleData={handleData}
                />
              </div>
              {/* scitanec 2 */}
              <div className="col-6">
                <TextBox
                  label="sčítanec 2"
                  id="scitanec2"
                  dataIn={scitanec2}
                  handleData={handleData}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <Button
                  label="Vypočítej součet"
                  id="soucet"
                  handleEvent={handleEvent}
                />
              </div>
              <div className="col-6">
                <b>{soucetCisel}</b>
              </div>
            </div>
            {/* operace s textem */}
            <TextArea
              label="Operace s textem"
              id="textArea"
              dataIn={textArea}
              handleData={handleData}
              height={150}
            />
            <div className="row mt-4">
              <div className="col-6">
                {/* nahrani souboru */}
                <File
                  label="Načti text ze souboru"
                  id="chooseFile"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                {/* stahnuti souboru */}
                <Button
                  label="Stáhnout text"
                  id="download"
                  handleEvent={handleEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="d-flex justify-content-center">
        Created by &copy;Pittris 2024
      </footer>
    </div>
  );
}

export default App;
