import { useState } from "react";
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp, mdiNoteText, mdiClose} from '@mdi/js';
import "../styles/summary.css"
import { addActive,removeActive } from "./eventlisteners";

export function SummarySection({userSummary, setUserSummary}) {
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
        <section className="summary-section">
            <div className="header-section summary-header">
                <div>
                    <Icon path={mdiNoteText} className="header-icon" />
                    <h2>Summary</h2>
                </div>
                {!showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronDown} className="header-icon" />
                </button>}
                {showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronUp} className="header-icon" />
                </button>}
            </div>
            {showSection && <SummarySectionForm userSummary={userSummary} setUserSummary={setUserSummary}/>}
        </section>
    )
}


function SummarySectionForm({userSummary, setUserSummary}) {
    return (
        <form className="summary-info">
            <div className="input-field"
                    onClick={() => {addActive("summary-text", true)}}
                    onMouseEnter={() => {addActive("summary-text", true)}}
                    onMouseLeave={() => {removeActive("summary-text", true)}}
            >
                <label htmlFor="summary-text">Description</label>
                <SummaryInput id={"summary-text"} name={"summary-text"} setUserSummary={setUserSummary} userSummary={userSummary} />
            </div>
        </form>
    )
}

function SummaryInput({id, name, initialValue, setUserSummary, userSummary}) {
    const [currentValue, setCurrentValue] = useState(userSummary.summary);
    
    const displayXFlag = (userSummary.summary == undefined || userSummary.summary == "") ? false : true;
    
    const [displayX, setDisplayX] = useState(displayXFlag);

    return (
        <div>
            <textarea id={id} value={currentValue} name={name} rows={4}
            onChange={(event) => {
                    event.preventDefault();
                    
                    setUserSummary({...userSummary, summary: event.target.value})

                    setCurrentValue(event.target.value);
                    setDisplayX(true);
                    
            }}/>
            {displayX && <ResetBtn callBack={setUserSummary} setCurrentValue={setCurrentValue} setDisplayX={setDisplayX} userInput={userSummary} />}
        </div>

    )
}

function ResetBtn({callBack, setCurrentValue, setDisplayX, userInput}) {
    return (
        <button type="button" className="summary-button" onClick={(event) => {
            event.preventDefault()
        
            callBack({...userInput, summary: ""})

            setCurrentValue("");
            setDisplayX(false);
        }}><Icon path={mdiClose} className="close-icon summary-icon" />
        </button>
    )
}



