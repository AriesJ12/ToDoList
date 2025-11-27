import "./App.css";

function App() {
  return (
    <>
      <button type="button" onClick={openMainWindow} className="">open window</button>
    </>
  );

  function openMainWindow() {
    const url = chrome.runtime.getURL("src/main/index.html");
    chrome.tabs.create({ url });
  }
}

export default App;
