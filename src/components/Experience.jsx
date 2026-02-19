import { useState } from "react";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiBriefcase} from '@mdi/js';
import "../styles/experience.css"

export function ExperienceSection({userJob, setUserJob}) {
    const [showLink, setShowLink] = useState(false);
    const [showSection, setShowSection] = useState(false);
    
    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowLink(newView);
    }

    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }
    
    return (
        <section className="experience-section">
            <div className="header-section">
                <div>
                    <Icon path={mdiBriefcase} className="header-icon" />
                    <h2>Experience</h2>
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