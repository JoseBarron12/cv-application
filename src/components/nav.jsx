import Icon from '@mdi/react';
import { mdiDownload } from '@mdi/js';

export function NavSection() {
    return (
        <nav className="nav-section">
            <div className="header-text">
                <h1>CV Generator</h1>
            </div>
            <div className="header-btns">
                <button className="preview-btn">
                    Preview
                </button>
                <button className="download-btn">
                    <Icon path={mdiDownload} className="download-icon"/>
                    Download
                </button>
            </div>
        </nav>
    )
}
