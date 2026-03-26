import { useState } from "react";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiAccountGroup} from '@mdi/js';
import "../styles/summary.css"

export function ProjectSection() {
    const [showSection, setShowSection] = useState(false);
    
    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }
    
    return (
        <section className="project-section">
            <div className="header-section">
                <div>
                    <Icon path={mdiAccountGroup} className="header-icon" />
                    <h2>Projects</h2>
                </div>
                {!showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronDown} className="header-icon" />
                </button>}
                {showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronUp} className="header-icon" />
                </button>}
            </div>
        </section>
    )
}