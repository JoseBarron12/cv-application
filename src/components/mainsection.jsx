import {use, useState } from "react";
import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'
import { ExperienceSection} from "./Experience.jsx";
import "../styles/main.css"
import { Resume } from "./resume.jsx";
import { SummarySection } from "./Summary.jsx";
import { SkillsSection } from "./Skills.jsx";
import { ProjectSection } from "./project.jsx";
import { NewSection } from "./new.jsx";

export function MainSection() {
    const [generalInput, setGeneralInput] = useState({});
    const [educationInput, setEducationInput] = useState([]);
    const [expInput, setExpInput] = useState([]);
    const [summaryInput, setSummaryInput] = useState({});
    const [skillsInput, setSkillsInput] = useState([]);
    const [projectInput, setProjectInput] = useState([]);
    const [sectionInput, setSectionInput] = useState([]);

    return(
        <main>
            <div className="form-section">
                <GeneralSection generalInput={generalInput} setGeneralInput={setGeneralInput}/>
                <EducationSection userEducation={educationInput} setUserEducation={setEducationInput}/>
                <ExperienceSection userExp={expInput} setUserExp={setExpInput}/>
                <SummarySection userSummary={summaryInput} setUserSummary={setSummaryInput}/>
                <SkillsSection userSkill={skillsInput} setUserSkill={setSkillsInput}/>
                <NewSection userSection={sectionInput} setUserSection={setSectionInput}/>
            </div>
            <div className="preview-section">
                <Resume generalInput={generalInput} educationInput={educationInput} expInput={expInput} summaryInput={summaryInput} skillsInput={skillsInput}/>
            </div>
        </main>
    )
}