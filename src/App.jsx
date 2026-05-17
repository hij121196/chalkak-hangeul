import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("버튼을 누르고 말해보세요.");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("이 브라우저는 음성인식을 지원하지 않아요.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setStatus("듣고 있어요...");
    };

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setText(resultText);
      setStatus("인식 완료!");
    };

    recognition.onerror = (event) => {
      setStatus("오류 발생: " + event.error);
    };

    recognition.onend = () => {
      console.log("음성인식 종료");
    };

    recognition.start();
  };

  return (
    <div style={styles.container}>
      <h1>음성인식 테스트</h1>

      <button style={styles.button} onClick={startListening}>
        🎤 말하기 시작
      </button>

      <p style={styles.status}>{status}</p>

      <div style={styles.box}>
        <p>인식된 말</p>
        <h2>{text || "아직 없음"}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  button: {
    fontSize: 28,
    padding: "18px 34px",
    borderRadius: 16,
    border: "none",
    backgroundColor: "#ffb703",
    cursor: "pointer",
  },
  status: {
    fontSize: 22,
    marginTop: 24,
  },
  box: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: 300,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
};