import Icon from '@mdi/react';
import { mdiTrayArrowDown } from '@mdi/js';
import "../styles/nav.css"

export function NavSection({}) {
    return (
        <nav className="nav-section">
            <div className="header-text">
                <h1>CV Generator</h1>
            </div>
            <div className="header-btns">
                <button className="preview-btn">
                    Preview
                </button>
                <button className="download-btn" onClick={() => {
                window.print();
                }}>
                    <Icon path={mdiTrayArrowDown} className='download-icon'/>
                    Download
                </button>
            </div>
        </nav>
    )
}
