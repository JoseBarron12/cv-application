import {useState } from "react";
import "../styles/resume.css"
import { format } from "date-fns";

export function Resume({generalInput, educationInput}) {
    return (
        <div>
            <div className="resume">
                <div className="general-resume">
                    {generalInput != null &&
                        <div className="header-general">
                            {generalInput.name}
                        </div>}
                        {generalInput != null &&
                        <div className="info-general">
                            {(generalInput.email != "" && generalInput.email != undefined) && generalInput.email + " | "}
                            {(generalInput.number != "" && generalInput.number != undefined) && generalInput.number + " | "}
                            {(generalInput.linkedIn != "" && generalInput.linkedIn != undefined) && generalInput.linkedIn + " | "}
                            {(generalInput.github != "" &&  generalInput.github != undefined) && generalInput.github}
                        </div>}
                        </div>
                        {educationInput.length != 0 &&
                        <div className="general-edu">
                            <div className="general-edu-header">Education</div>
                            <div className="general-edu-containers">
                                { educationInput.map((edu) => {
                                    return (
                                        <div key={edu.id} className="general-edu-container">
                                            <div className="edu-header">
                                                <span className="edu-school">{edu.school + " — "}</span>
                                                <em>
                                                    {edu.degree + " in "}
                                                    {edu.field}
                                                </em>
                                            </div>
                                            <div className="edu-info">
                                                {edu.location + " | "}
                                                {format(edu.startDate.month, 'MMM') + " " + format(edu.startDate.year, 'YYY') + " — "}
                                                {format(edu.endDate.month, 'MMM') + " " + format(edu.endDate.year, 'YYY')}
                                            </div>
                                            <ul className="edu-bullet-pts">
                                                <li>GPA: {edu.grade}</li>
                                                {edu.achievements.length != 0 &&
                                                    edu.achievements.map((ach) => {
                                                    return (
                                                        <li key={ach.id}>{ach.achievement}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}
                    </div>
        </div>
    )
}