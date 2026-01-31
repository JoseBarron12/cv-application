import { useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiSchool, mdiPlus, mdiMinus, mdiContentSave, mdiDelete} from '@mdi/js';
import "../styles/education.css"

function EducationSection() {
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [userEducation, setUserEducation] = useState([]);
    
    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }

    return (
        <section className="education-section">
            <div className="header-section">
                <div>
                    <Icon path={mdiSchool} className="header-icon" />
                    <h2>Education Information</h2>
                </div>
                 {!showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronDown} className="header-icon" />
                </button>}
                {showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronUp} className="header-icon" />
                </button>}

            </div>
            {showSection && showAddBtn && userEducation.length != 0 && userEducation.map(input => {
                return (
                    <div className="input-container" key={input.id}>{input.school}</div>
                )
            })}
            {showSection && showEducationForm && <EducationSectionForm 
            setShowEducationForm={setShowEducationForm} setShowAddBtn={setShowAddBtn}
            userEducation={userEducation} setUserEducation={setUserEducation}/>}
            {showSection && showAddBtn && <div className="button-container">
                <button className="new-edu-btn"
                 type="button"
                 onClick={() =>
                    {
                        setShowEducationForm(true);
                        setShowAddBtn(false);
                    }}
                >
                    <Icon path={mdiPlus} className="link-icon" />
                    Education</button>
            </div>}
            
        </section>
    )
}

function EducationSectionForm({setShowEducationForm, setShowAddBtn, userEducation, setUserEducation}) {
    const [showAchievements, setShowAchievements] = useState(false);
    
    const [schoolName, setSchoolName] = useState("");
    const [locationName, setLocationName] = useState("");
    
    const [degreeName, setDegreeName] = useState("");
    const [fieldName, setFieldName] = useState("");

    const [gradeValue, setGradeValue] = useState("");

    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowAchievements(newView);
    }
    return (
        <form className={"education-info"}>
            <fieldset>
                <legend>School Information</legend>
                <div className="input-field">
                    <label htmlFor="school-name">School</label>
                    <input type="text" name="school-name" id="school-name" 
                     value={schoolName} onChange={(event) => {
                        setSchoolName(event.target.value)
                     }}/>
                </div>
                <div className="input-field">
                    <label htmlFor="location-name">Location</label>
                    <input type="text" name="location-name" id="location-name" 
                     value={locationName} onChange={(event) => {
                        setLocationName(event.target.value)
                     }}/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Degree Information</legend>
                <div className="input-field">
                    <label htmlFor="degree-name">Degree</label>
                    <input type="text" name="degree-name" id="degree-name" 
                     value={degreeName} onChange={(event) => {
                        setDegreeName(event.target.value)
                     }}/>
                </div>
                <div className="input-field">
                    <label htmlFor="study-name">Field of study</label>
                    <input type="text" name="study-name" id="study-name"
                     value={fieldName} onChange={(event) => {
                        setFieldName(event.target.value)
                     }}/>
                </div>
                <div className="input-field">
                    <label htmlFor="start-date">Start date</label>
                    <EducationSectionFormDate isStart={true} idName={"start-date"}/>
                </div>
                <div className="input-field">
                    <label htmlFor="end-date">End date</label>
                    <EducationSectionFormDate isStart={false} idName={"end-date"}/>
                </div>
                <div className="input-field">
                    <label htmlFor="grade-info">GPA</label>
                    <input type="text" name="grade-info" id="grade-info"
                     value={gradeValue} onChange={(event) => {
                        setGradeValue(event.target.value)
                     }}/>
                </div>
            </fieldset>
            <div className="additional-achievement-section">
                <button 
                  type="button"
                  onClick={onBtnClick(showAchievements)}>
                    Additional Achievements
                    {!showAchievements && <Icon path={mdiPlus} className="link-icon" />}
                    {showAchievements && <Icon path={mdiMinus} className="link-icon" />}
                </button>
                {showAchievements && <EducationSectionFormAchievement/>}
            </div>
            <EducationSectionFormBtns 
            setShowEducationForm={setShowEducationForm} setShowAddBtn={setShowAddBtn}
            userEducation={userEducation} setUserEducation={setUserEducation}
            schoolName = {schoolName} locationName = {locationName} degreeName = {degreeName}
            fieldName = {fieldName} gradeValue = {gradeValue}
            />
        </form>
    )
}

function EducationSectionFormDate({isStart, idName}) {
    
    const [date, setDate] = useState({month: -1, year: -1});
    
    const months = eachMonthOfInterval({
        start: new Date(2012, 12, 31),
        end: new Date(2013, 11, 31)
    });

    const years = isStart ? eachYearOfInterval({
        start: new Date(),
        end: subYears(new Date(), 100)
        }) : eachYearOfInterval({
        start: addYears(new Date(), 10),
        end: subYears(new Date(), 100)
    });

    return (
        <div className="date-field">
            <select name="months" id={"month-" + idName}
             value={date.month}
             onChange={(event) => {
                const newDate = {...date, month: event.target.value};
                setDate(newDate)
             }}>
               <option value={-1}>Month</option>
               {months.map((month, index) => {
                    return (
                        <option value={index + 1} key={index}>
                            {format(month, 'MMMM')}
                        </option>
                    )
               })} 
            </select>
            <select name="years" id={"year-" + idName}
            value={date.year}
             onChange={(event) => {
                const newDate = {...date, year: event.target.value};
                setDate(newDate)
             }}>
               <option value={-1}>Year</option>
               {years.map((year, index) => {
                    return (
                        <option value={year} key={index}>
                            {format(year, 'yyyy')}
                        </option>
                    )
               })} 
            </select>
        </div>
    )
}

function EducationSectionFormAchievement() {
    return (
        <fieldset>
            <legend>Add New Achievement</legend>
            <div className="input-field">
                <label htmlFor="achievement-info">Name</label>
                <input type="text" name="achievement-info" id="achievement-info"/>
            </div>
        </fieldset>
    )
}

function EducationSectionFormBtns({ setShowAddBtn, setShowEducationForm, 
    userEducation, setUserEducation, schoolName, locationName, degreeName, fieldName, gradeValue}) {
    return (
        <div className="form-btns">
            <button className="delete-btn" type="button"> 
                <Icon path={mdiDelete} className="link-icon" />
                Delete
            </button>
            <div>
                <button className="cancel-btn" type="button"
                onClick={() =>
                    {
                        setShowEducationForm(false);
                        setShowAddBtn(true);
                    }}>
                    Cancel
                </button>
                <button className="save-btn" type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        setUserEducation([...userEducation, {
                            school: schoolName,
                            location: locationName,
                            degree: degreeName,
                            field: fieldName,
                            grade: gradeValue,
                            id: crypto.randomUUID()
                        }]);
                        setShowEducationForm(false);
                        setShowAddBtn(true);
                    }}>
                    <Icon path={mdiContentSave} className="link-icon" />
                    Save
                </button>
            </div>
        </div>
    )
}


export {EducationSection}
