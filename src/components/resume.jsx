import {useState } from "react";
import "../styles/resume.css"
import { format, isDate } from "date-fns";

export function Resume({generalInput, educationInput, expInput}) {
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
                                    if(edu.show != false ) {
                                    return (
                                        <div key={edu.id} className="general-edu-container">
                                            <div className="edu-header">
                                                <span className="edu-school">{edu.school != undefined && edu.school != "" && edu.school + " — "}</span>
                                                <em>
                                                    {edu.degree != undefined && edu.degree != "" && edu.degree + " in "}
                                                    {edu.field != undefined && edu.field != "" && edu.field}
                                                </em>
                                            </div>
                                            <div className="edu-info">
                                                {edu.location != undefined && edu.location != "" && edu.location + " | "}
                                                {(edu.startDate != "" && edu.startDate != undefined) && (edu.startDate.month != undefined && edu.startDate.year != undefined) && format(edu.startDate.month, 'MMM') + " " + format(edu.startDate.year, 'yyy') + " — "}
                                                {(edu.endDate != ""&& edu.endDate != undefined) && (edu.endDate.month != undefined && edu.endDate.year != undefined) && format(edu.endDate.month, 'MMM') + " " + format(edu.endDate.year, 'yyy')}
                                            </div>
                                            <ul className="edu-bullet-pts">
                                                {edu.grade != undefined && edu.grade != "" && <Grade grade={edu.grade}/>}
                                                {edu.achievements != undefined && edu.achievements != "" && edu.achievements.length != 0 &&
                                                    edu.achievements.map((ach) => {
                                                    return (
                                                        <li key={ach.id}>{ach.achievement}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                })}
                            </div>
                        </div>}
                        {expInput.length != 0 &&
                        <div className="general-edu">
                            <div className="general-edu-header">Experience</div>
                            <div className="general-edu-containers">
                                { expInput.map((exp) => {
                                    if(exp.show != false ) {
                                    return (
                                        <div key={exp.id} className="general-exp-container">
                                            <div className="edu-header">
                                                <span className="edu-school">{exp.company != undefined && exp.company != "" && exp.company + " — "}</span>
                                                <em>
                                                    {exp.position != undefined && exp.position != "" && exp.position}
                                                </em>
                                            </div>
                                            <div className="edu-info">
                                                {exp.location != undefined && exp.location != "" && exp.location + " | "}
                                                {(exp.startDate != "" && exp.startDate != undefined) && (exp.startDate.month != undefined && exp.startDate.year != undefined) && format(exp.startDate.month, 'MMM') + " " + format(exp.startDate.year, 'yyy') + " — "}
                                                {(exp.endDate != ""&& exp.endDate != undefined) && (exp.endDate.month != undefined && exp.endDate.year != undefined) && format(exp.endDate.month, 'MMM') + " " + format(exp.endDate.year, 'yyy')}
                                            </div>
                                            <ul className="edu-bullet-pts">
                                                {exp.responsibility != undefined && exp.responsibility != "" && <Responsibility resp={exp.responsibility}/>}
                                                {exp.achievements != undefined && exp.achievements != "" && exp.achievements.length != 0 &&
                                                    exp.achievements.map((ach) => {
                                                    return (
                                                        <li key={ach.id}>{ach.achievement}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                })}
                            </div>
                        </div>}
                    </div>
        </div>
    )
}

const Grade = (grade) => {
    return (
        <li>{"GPA: " + grade.grade}</li>
    )
}

const Responsibility = ({resp}) => {
    return (
        <li>{resp}</li>
    )
}