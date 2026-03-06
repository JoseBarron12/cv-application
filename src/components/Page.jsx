import { NavSection } from './nav.jsx'
import { MainSection } from './mainsection.jsx'
import { useState } from "react";
import { PreviewWindow } from './Preview.jsx';

export function Page() {
    const [generalInput, setGeneralInput] = useState({});
    const [educationInput, setEducationInput] = useState([]);
    const [expInput, setExpInput] = useState([]);
    const [summaryInput, setSummaryInput] = useState({});
    const [skillsInput, setSkillsInput] = useState([]);
    const [projectInput, setProjectInput] = useState([]);
    const [sectionInput, setSectionInput] = useState([]);
    const [showPreview, setShowPreview] = useState(false);


    return (
        <>
        <NavSection  setShowPreview={setShowPreview}/>
        <MainSection generalInput={generalInput} educationInput={educationInput} expInput={expInput} summaryInput={summaryInput} skillsInput={skillsInput} sectionInput={sectionInput}
        setGeneralInput={setGeneralInput} setEducationInput={setEducationInput} setExpInput={setExpInput}
        setSummaryInput={setSummaryInput} setSkillsInput={setSkillsInput} setSectionInput={setSectionInput}
        />
        {showPreview && <PreviewWindow generalInput={generalInput} educationInput={educationInput} expInput={expInput} summaryInput={summaryInput} skillsInput={skillsInput}
        setShowPreview={setShowPreview}/>}
        {showPreview && <div className='backdrop'></div>}
        
        </>
    ) 

}