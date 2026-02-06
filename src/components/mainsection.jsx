import {useState } from "react";
import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'
import "../styles/main.css"

export function MainSection() {
    const [generalInput, setGeneralInput] = useState({});
    return(
        <main>
            <div className="form-section">
                <GeneralSection generalInput={generalInput} setGeneralInput={setGeneralInput}/>
                <EducationSection/>
            </div>
            <div className="preview-section">
                <div className="resume">
                    <div className="general-resume">
                        {generalInput != null &&
                        <div className="header-general">
                            {generalInput.name}
                        </div> }
                        {generalInput != null && 
                        <div className="info-general">
                            {generalInput.email}
                            {generalInput.number}
                            {generalInput.linkedIn}
                            {generalInput.github}
                        </div>}

                    </div>
                </div>
            </div>
        </main>
    )
}