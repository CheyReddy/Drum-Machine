import React from 'react';
import './App.css';


const sounds = [
  { key: "Q", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3", name: "Heater-1" },
  { key: "W", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3", name: "Heater-2" },
  { key: "E", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3", name: "Heater-3" },
  { key: "A", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3", name: "Heater-4" },
  { key: "S", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3", name: "Clap" },
  { key: "D", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3", name: "Open-HH" },
  { key: "Z", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3", name: "Kick-n'-Hat" },
  { key: "X", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3", name: "Kick" },
  { key: "C", url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3", name: "Closed-HH" }
];

function Drum({keyTrigger,url, name, onPlay}){
  const playSound = () => {
    const audio = document.getElementById(keyTrigger);
    if(audio){
      audio.currentTime=0;
      audio.play();
      onPlay(name);
    }
  };
  return (
    <div className="drum-pad" id={name} onClick={playSound}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
}

function App() {
  const [currentSound, setCurrentSound] = React.useState("");
  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const sound = sounds.find((s)=>s.key===key);
    if(sound){
      const audio = document.getElementById(key);
      if(audio){
        audio.currentTime=0;
        audio.play();
        setCurrentSound(sound.name);
      }
    }
  };
  
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  return (
     <div id="drum-machine">
      <div id="display">
        <div id="pad-container">
          {sounds.map((sound) => (
            <Drum
              key={sound.key}
              keyTrigger={sound.key}
              url={sound.url}
              name={sound.name}
              onPlay={setCurrentSound}
            />
          ))}
        </div>
        <div id="sound-name">
          <p><strong>Track Name</strong><br /><hr />{currentSound}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
