import { useActionState, useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiSchool, mdiPlus, mdiMinus, mdiContentSave, mdiDelete, mdiEyeOutline} from '@mdi/js';
import "../styles/education.css"

function EducationSection({userEducation, setUserEducation}) {
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [selectedEdu, setSelectedEdu] = useState(null)
    
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
                    <div className="button-container input-container" key={input.id}>
                        <button className="input-name"
                        onClick={() =>
                        {
                            setSelectedEdu(input);
                            setShowEducationForm(true);
                            setShowAddBtn(false);
                        }}>{input.school}</button>
                        <button className="input-btn"><Icon path={mdiEyeOutline} className="link-icon" /></button>
                    </div>
                )
            })}
            {showSection && showEducationForm && <EducationSectionForm 
            setShowEducationForm={setShowEducationForm} setShowAddBtn={setShowAddBtn}
            userEducation={userEducation} setUserEducation={setUserEducation} 
            selectedEdu={selectedEdu} setSelectedEdu={setSelectedEdu}/>}
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

function EducationSectionForm({setShowEducationForm, setShowAddBtn, userEducation, setUserEducation, selectedEdu, setSelectedEdu}) {
    const [showAchievements, setShowAchievements] = useState(false);
    
    const defaultSchool = selectedEdu != null ? selectedEdu.school : "";
    const [schoolName, setSchoolName] = useState(defaultSchool);
    
    const defaultLocation = selectedEdu != null ? selectedEdu.location : "";
    const [locationName, setLocationName] = useState(defaultLocation);
    
    const defaultDegree = selectedEdu != null ? selectedEdu.degree : "";
    const [degreeName, setDegreeName] = useState(defaultDegree);
    
    const defaultField = selectedEdu != null ? selectedEdu.field : "";
    const [fieldName, setFieldName] = useState(defaultField);
    
    const defaultGrade = selectedEdu != null ? selectedEdu.grade : "";
    const [gradeValue, setGradeValue] = useState(defaultGrade);

    const defaultStartDate = selectedEdu != null ? selectedEdu.startDate : "";
    const [startDate, setStartDate] = useState(defaultStartDate);
    
    const defaultEndDate = selectedEdu != null ? selectedEdu.endDate : "";
    const [endDate, setEndDate] = useState(defaultEndDate);

    const defaultAchievements= selectedEdu != null ? selectedEdu.achievements: "";
    const [achievements, setAchievements] = useState(defaultAchievements);

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
                    <EducationSectionFormDate isStart={true} idName={"start-date"}
                    currentDate={startDate} setCurrentDate={setStartDate}/>
                </div>
                <div className="input-field">
                    <label htmlFor="end-date">End date</label>
                    <EducationSectionFormDate isStart={false} idName={"end-date"}
                    currentDate={endDate} setCurrentDate={setEndDate}/>
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
                    {!showAchievements && <Icon path={mdiPlus} className="link-icon plus-icon" />}
                    {showAchievements && <Icon path={mdiMinus} className="link-icon plus-icon" />}
                </button>
                {showAchievements && <EducationSectionFormAchievement achievements={achievements} setAchievements={setAchievements}/>}
            </div>
            <EducationSectionFormBtns 
            setShowEducationForm={setShowEducationForm} setShowAddBtn={setShowAddBtn}
            userEducation={userEducation} setUserEducation={setUserEducation} selectedEdu={selectedEdu} setSelectedEdu={setSelectedEdu}
            schoolName = {schoolName} locationName = {locationName} degreeName = {degreeName}
            fieldName = {fieldName} gradeValue = {gradeValue} startDate = {startDate} endDate = {endDate}
            achievements = {achievements} />
        </form>
    )
}

function EducationSectionFormDate({isStart, idName, currentDate, setCurrentDate}) {
    
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
             value={currentDate.month}
             onChange={(event) => {
                setCurrentDate({...currentDate, month: event.target.value});
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
            value={currentDate.year}
             onChange={(event) => {
                setCurrentDate({...currentDate, year: event.target.value});
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

function EducationSectionFormAchievement({achievements, setAchievements}) {

    const [currentAchievement, setCurrentAchievement] = useState("");
    
    return (
        <fieldset>
            <legend>Add New Achievement</legend>
            <div className="input-field">
                <label htmlFor="achievement-info">Name
                    <button className="add-achievement"
                    onClick = {(event) => {
                        event.preventDefault();
                        setAchievements([...achievements, {
                            achievement: currentAchievement,
                            id: crypto.randomUUID()
                        }])
                        setCurrentAchievement("")
                    }}>
                    <Icon path={mdiContentSave} className="link-icon"/>
                        Save Achievement
                    </button>
                </label>
                <input type="text" name="achievement-info" id="achievement-info" value={currentAchievement}
                 onChange={(event) => {
                    setCurrentAchievement(event.target.value);
                }}/>
            </div>
            { achievements.length != 0 &&  achievements.map((achievement) => {
                return (
                    <div className="achievement-container" key={achievement.id}>
                        <p>{achievement.achievement}</p>
                        <button className="achievement-btn"><Icon path={mdiEyeOutline} className="link-icon"/></button>
                        <button className="achievement-btn"><Icon path={mdiDelete} className="link-icon delete-icon"
                        onClick={() => {
                            const arr = [...achievements];
                            setAchievements(arr.filter((element) => {
                                if(element.id != achievement.id) return element;
                            }))
                        }}/></button>
                    </div>
                )
            })}
        </fieldset>
    )
}

function EducationSectionFormBtns({ setShowAddBtn, setShowEducationForm, 
    userEducation, setUserEducation,selectedEdu, setSelectedEdu, schoolName, locationName, degreeName, fieldName, gradeValue,
    startDate, endDate, achievements}) {
    return (
        <div className="form-btns">
            <button className="delete-btn" type="button"
            onClick={() =>
                    {
                        if(selectedEdu != null)
                        {
                            const arr = userEducation;
                            setUserEducation(arr.filter((element) => {
                                if(element.id != selectedEdu.id) return element;
                            }));
                            setSelectedEdu(null);
                        }
                        setShowEducationForm(false);
                        setShowAddBtn(true);
                    }}> 
                <Icon path={mdiDelete} className="link-icon" />
                Delete
            </button>
            <div>
                <button className="cancel-btn" type="button"
                onClick={() =>
                    {
                        setSelectedEdu(null);
                        setShowEducationForm(false);
                        setShowAddBtn(true);
                    }}>
                    Cancel
                </button>
                <button className="save-btn" type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        if(selectedEdu != null)
                        {
                            const arr = [...userEducation];
                            const indexOfSelected = arr.findIndex((element) => {
                                return element.id == selectedEdu.id;
                            });
                            arr[indexOfSelected] = {
                                school: schoolName,
                                location: locationName,
                                degree: degreeName,
                                field: fieldName,
                                grade: gradeValue,
                                startDate: startDate,
                                endDate: endDate,
                                achievements: achievements,
                                id: selectedEdu.id
                            };
                            setSelectedEdu(null);
                            setUserEducation(arr);
                        }
                        else
                        {
                            setUserEducation([...userEducation, {
                            school: schoolName,
                            location: locationName,
                            degree: degreeName,
                            field: fieldName,
                            grade: gradeValue,
                            startDate: startDate,
                            endDate: endDate,
                            achievements: achievements,
                            id: crypto.randomUUID()
                            }]);
                        }
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
