import { useState } from "react";
import Icon from '@mdi/react';
import { mdiNotePlus, mdiPlus } from '@mdi/js';
import "../styles/new.css"

export function NewSection() {
    const [showSection, setShowSection] = useState(false);
    
    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }
    
    return (
        <section className="create-section">
            <button className="header-section" type="button">
                <div>
                    <Icon path={mdiNotePlus} className="header-icon" />
                    <h2>Create New Section</h2>
                </div>
                <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiPlus } className="header-icon new-icon" />
                </button>
            </button>
        </section>
    )
}