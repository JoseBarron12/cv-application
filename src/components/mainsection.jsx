import {useState } from "react";
import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'
import "../styles/main.css"
import { Resume } from "./resume.jsx";

export function MainSection() {
    const [generalInput, setGeneralInput] = useState({});
    const [educationInput, setEducationInput] = useState([]);
    return(
        <main>
            <div className="form-section">
                <GeneralSection generalInput={generalInput} setGeneralInput={setGeneralInput}/>
                <EducationSection userEducation={educationInput} setUserEducation={setEducationInput}/>
            </div>
            <div className="preview-section">
                <Resume generalInput={generalInput} educationInput={educationInput} />
            </div>
        </main>
    )
}