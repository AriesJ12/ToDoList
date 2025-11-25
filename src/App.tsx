import "./App.css";

function App() {
  return (
    <>
      <div style={{ padding: 12, width: 240 }}>
        <h3>Open a page</h3>
        <button
          onClick={openExtensionPage}
          style={{ display: "block", marginBottom: 8 }}
        >
          Open extension page
        </button>
      </div>
    </>
  );

  function openExtensionPage() {
    const url = chrome.runtime.getURL("src/main/index.html");
    chrome.tabs.create({ url });
  }
}

export default App;
