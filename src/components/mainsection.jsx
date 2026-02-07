import {useState } from "react";
import { GeneralSection} from './General.jsx'
import { EducationSection } from './Education.jsx'
import "../styles/main.css"

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
                    {educationInput.length != 0 && 
                    <div className="general-edu">
                        { educationInput.map((edu) => {
                            return (
                                <div key={edu.id}>
                                    <div className="edu-header">
                                        {edu.school}
                                        {edu.degree}
                                        {edu.field}
                                    </div>
                                    <div className="edu-info">
                                        {edu.location}
                                        {edu.startDate.year}
                                        {edu.endDate.year}
                                    </div>
                                    <div className="edu-bullet-pts">
                                        <div>{edu.grade}</div> 
                                        {edu.achievements.length != 0 &&
                                         edu.achievements.map((ach) => {
                                            return (
                                                <div key={ach.id}>{ach.achievement}</div>
                                            )
                                         })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
        </main>
    )
}