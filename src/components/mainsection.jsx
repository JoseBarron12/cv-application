import {useState } from "react";
import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'
import { ExperienceSection} from "./Experience.jsx";
import "../styles/main.css"
import { Resume } from "./resume.jsx";
import { SummarySection } from "./Summary.jsx";

export function MainSection() {
    const [generalInput, setGeneralInput] = useState({});
    const [educationInput, setEducationInput] = useState([]);
    const [jobInput, setJobInput] = useState([]);
    const [summaryInput, setSummaryInput] = useState({});
    
    return(
        <main>
            <div className="form-section">
                <GeneralSection generalInput={generalInput} setGeneralInput={setGeneralInput}/>
                <EducationSection userEducation={educationInput} setUserEducation={setEducationInput}/>
                <ExperienceSection userJob={jobInput} setUserJob={setJobInput}/>
                <SummarySection userSummary={summaryInput} setUserSummary={setSummaryInput}/>
            </div>
            <div className="preview-section">
                <Resume generalInput={generalInput} educationInput={educationInput} />
            </div>
        </main>
    )
}