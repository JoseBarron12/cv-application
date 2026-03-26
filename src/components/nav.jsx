import Icon from "@mdi/react";
import { mdiTrayArrowDown, mdiFile, mdiScriptText } from "@mdi/js";
import "../styles/nav.css";

export function NavSection({ setShowPreview }) {
  return (
    <nav className="nav-section">
      <div className="header-text">
        <Icon path={mdiScriptText} className="download-icon logo-icon" />
        <h1>CV Generator</h1>
      </div>
      <div className="header-btns">
        <button
          className="preview-btn"
          onClick={() => {
            setShowPreview(true);
          }}
        >
          <Icon path={mdiFile} className="download-icon" />
          <p>Preview</p>
        </button>
        <button
          className="download-btn"
          onClick={() => {
            window.print();
          }}
        >
          <Icon path={mdiTrayArrowDown} className="download-icon" />
          <p>Download</p>
        </button>
      </div>
    </nav>
  );
}
