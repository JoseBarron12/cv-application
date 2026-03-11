import { useActionState, useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiSchool, mdiPlus, mdiMinus, mdiContentSave, mdiDelete, mdiEyeOutline, mdiClose} from '@mdi/js';
import "../styles/education.css"
import { addActive,removeActive } from "./eventlisteners";

function EducationSection({userEducation, setUserEducation}) {
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [selectedEdu, setSelectedEdu] = useState(null);

    
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
                        <button className="input-btn"><Icon path={mdiEyeOutline} className="link-icon" 
                        onClick={() => {
                            const arr = [...userEducation];
                            const indexOfSelected = arr.findIndex((element) => {
                                return element.id == input.id;
                            });
                            const showFlag = (arr[indexOfSelected].show == false) ? true: false;
                            
                            arr[indexOfSelected] = {
                                ...arr[indexOfSelected],
                                show: showFlag
                            };
                            setUserEducation(arr);
                        }}/></button>
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

const processGeneralInput = (currentId, setCurrentId, userEducation, setUserEducation, type, value,
    schoolName,locationName,degreeName, fieldName, gradeValue, startDate, endDate, achievements) => {    
        if(currentId != null)
            {
                const arr = [...userEducation];
                const indexOfSelected = arr.findIndex((element) => {
                    return element.id == currentId;
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
                    id: currentId
                };
                arr[indexOfSelected][type] = value;
                    
                setUserEducation(arr);

            } else {
                const newId = crypto.randomUUID();

                const newEduObj = {
                    school: schoolName,
                    location: locationName,
                    degree: degreeName,
                    field: fieldName,
                    grade: gradeValue,
                    startDate: startDate,
                    endDate: endDate,
                    achievements: achievements,
                    id: newId
                }
                newEduObj[type] = value;

                setUserEducation([...userEducation, {
                    ...newEduObj
                }]);

                setCurrentId(newId);
            }
}   

function GeneralInput({type, name, id, initialValue, callBack, currentId, setCurrentId, userEducation, setUserEducation,schoolName,locationName,degreeName, fieldName, gradeValue, startDate, endDate, achievements}) {
    
    const [currentValue, setCurrentValue] = useState(initialValue);
    
    const showX = (currentId != null && initialValue != "") ? true : false;
    
    const [displayX, setDisplayX] = useState(showX);
    return (
        <div>
            <input type={type} name={name + "-name"} id={id + "-name"} value={currentValue} 
            onChange={(event) => {
                    event.preventDefault();
                    
                    callBack(event.target.value);

                    processGeneralInput(currentId, setCurrentId, userEducation, setUserEducation, name, event.target.value,
                    schoolName,locationName,degreeName, fieldName, gradeValue, startDate, endDate, achievements)

                    setCurrentValue(event.target.value);
                    setDisplayX(true);
                    
            }}/>
            {displayX && <ResetBtn callBack={callBack} setCurrentValue={setCurrentValue} setDisplayX={setDisplayX} 
            currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation}
            name={name} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName}
            gradeValue={gradeValue} startDate={startDate} endDate={endDate} achievements={achievements}/>}
        </div>

    )
}

function ResetBtn({setCurrentValue, setDisplayX, currentId, setCurrentId, userEducation, setUserEducation, name,
    schoolName,locationName, degreeName, fieldName, gradeValue, startDate, endDate, achievements, callBack}) {
    return (
        <button type="button"  onClick={(event) => {
            event.preventDefault()
            
            callBack(event.target.value);
            processGeneralInput(currentId, setCurrentId, userEducation, setUserEducation, name, "",
                schoolName,locationName,degreeName, fieldName, gradeValue, startDate, endDate, achievements)
            
            setCurrentValue("");
            setDisplayX(false);
        }}><Icon path={mdiClose} className="close-icon" />
        </button>
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

    const defaultStartDate = (selectedEdu != null && selectedEdu.startDate != undefined) ? selectedEdu.startDate : "";
    const [startDate, setStartDate] = useState(defaultStartDate);
    
    const defaultEndDate = (selectedEdu != null && selectedEdu.endDate != undefined) ? selectedEdu.endDate : "";
    const [endDate, setEndDate] = useState(defaultEndDate);

    const defaultAchievements= selectedEdu != null ? selectedEdu.achievements: "";
    const [achievements, setAchievements] = useState(defaultAchievements);

    const defaultCurrentId= selectedEdu != null ? selectedEdu.id: null;
    const [currentId, setCurrentId] = useState(defaultCurrentId);

    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowAchievements(newView);
    }
    return (
        <form className={"education-info"}>
            <fieldset>
                <legend>School Information</legend>
                <div className="input-field"
                    onClick={() => {addActive("school-name")}}
                    onMouseEnter={() => {addActive("school-name")}}
                    onMouseLeave={() => {removeActive("school-name")}}
                >
                    <label htmlFor="school-name">School</label>
                    <GeneralInput name={"school"} id={"school"} currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation} type={"text"}
                         initialValue={schoolName} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName} gradeValue={gradeValue} startDate={startDate}
                         endDate={endDate} achievements={achievements} callBack={setSchoolName}
                    />
                </div>
                <div className="input-field"
                    onClick={() => {addActive("location-name")}}
                    onMouseEnter={() => {addActive("location-name")}}
                    onMouseLeave={() => {removeActive("location-name")}}
                >
                    <label htmlFor="location-name">Location</label>
                    <GeneralInput name={"location"} id={"location"} currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation} type={"text"}
                         initialValue={locationName} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName} gradeValue={gradeValue} startDate={startDate}
                         endDate={endDate} achievements={achievements} callBack={setLocationName}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Degree Information</legend>
                <div className="input-field"
                onClick={() => {addActive("degree-name")}}
                onMouseEnter={() => {addActive("degree-name")}}
                onMouseLeave={() => {removeActive("degree-name")}}
                >
                    <label htmlFor="degree-name">Degree</label>
                    <GeneralInput name={"degree"} id={"degree"} currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation} type={"text"}
                         initialValue={degreeName} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName} gradeValue={gradeValue} startDate={startDate}
                         endDate={endDate} achievements={achievements} callBack={setDegreeName}
                    />
                </div>
                <div className="input-field"
                    onClick={() => {addActive("field-name")}}
                    onMouseEnter={() => {addActive("field-name")}}
                    onMouseLeave={() => {removeActive("field-name")}}
                >
                    <label htmlFor="field-name">Field of study</label>
                    <GeneralInput name={"field"} id={"field"} currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation} type={"text"}
                         initialValue={fieldName} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName} gradeValue={gradeValue} startDate={startDate}
                         endDate={endDate} achievements={achievements} callBack={setFieldName}
                    />
                </div>
                <div className="input-field-date"
                >
                    <label htmlFor="start-date">Start date</label>
                    <EducationSectionFormDate isStart={true} idName={"start-date"}
                    currentDate={startDate} setCurrentDate={setStartDate} currentId={currentId} setCurrentId={setCurrentId}
                    userEducation={userEducation} setUserEducation={setUserEducation}
                    />
                </div>
                <div className="input-field-date">
                    <label htmlFor="end-date">End date</label>
                    <EducationSectionFormDate isStart={false} idName={"end-date"}
                    currentDate={endDate} setCurrentDate={setEndDate}  currentId={currentId} setCurrentId={setCurrentId}
                    userEducation={userEducation} setUserEducation={setUserEducation}/>
                </div>
                <div className="input-field"
                    onClick={() => {addActive("grade-name")}}
                    onMouseEnter={() => {addActive("grade-name")}}
                    onMouseLeave={() => {removeActive("grade-name")}}
                >
                    <label htmlFor="grade-name">GPA</label>
                    <GeneralInput name={"grade"} id={"grade"} currentId={currentId} setCurrentId={setCurrentId} userEducation={userEducation} setUserEducation={setUserEducation} type={"text"}
                         initialValue={gradeValue} schoolName={schoolName} locationName={locationName} degreeName={degreeName} fieldName={fieldName} gradeValue={gradeValue} startDate={startDate}
                         endDate={endDate} achievements={achievements} callBack={setGradeValue}
                    />
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
                {showAchievements && <EducationSectionFormAchievement achievements={achievements} setAchievements={setAchievements} currentId={currentId} setCurrentId={setCurrentId}
                    userEducation={userEducation} setUserEducation={setUserEducation} />}
            </div>
            <EducationSectionFormBtns 
            setShowEducationForm={setShowEducationForm} setShowAddBtn={setShowAddBtn}
            userEducation={userEducation} setUserEducation={setUserEducation} selectedEdu={selectedEdu} setSelectedEdu={setSelectedEdu}
            schoolName = {schoolName} locationName = {locationName} degreeName = {degreeName}
            fieldName = {fieldName} gradeValue = {gradeValue} startDate = {startDate} endDate = {endDate}
            achievements = {achievements} currentId={currentId} setCurrentId={setCurrentId}/>
        </form>
    )
}

function EducationSectionFormDate({isStart, idName, currentDate, setCurrentDate, currentId, setCurrentId, userEducation, setUserEducation, schoolName, locationName, degreeName, fieldName, gradeValue,
    startDate, endDate, achievements}) {
    
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
        <div>
            <div className="date-field">
                <select name="months" id={"month-" + idName}
                 value={currentDate.month}
                 onChange={(event) => {
                    setCurrentDate({...currentDate, month: event.target.value});
                    if(currentId != null)
                            {
                                const arr = [...userEducation];
                                const indexOfSelected = arr.findIndex((element) => {
                                    return element.id == currentId;
                                });
                                if(isStart)
                                {
                                    arr[indexOfSelected] = {
                                    ...arr[indexOfSelected],
                                    startDate: {...currentDate, month: event.target.value}
                                    };
                                    setUserEducation(arr);
                                } else {
                                    arr[indexOfSelected] = {
                                    ...arr[indexOfSelected],
                                    endDate: {...currentDate, month: event.target.value}
                                    };
                                    setUserEducation(arr);
                                }
            
            
                            } else {
                                const newId = crypto.randomUUID();
                                if(isStart)
                                {
                                    setUserEducation([...userEducation, {
                                    school: schoolName,
                                    location: locationName,
                                    degree: degreeName,
                                    field: fieldName,
                                    grade: gradeValue,
                                    endDate: endDate,
                                    achievements: achievements,
                                    startDate: {...currentDate, month: event.target.value},
                                    id: newId
                                    }]);
                                    setCurrentId(newId);
                                } else {
                                    setUserEducation([...userEducation, {
                                     school: schoolName,
                                    location: locationName,
                                    degree: degreeName,
                                    field: fieldName,
                                    grade: gradeValue,
                                    startDate: startDate,
                                    achievements: achievements,
                                    endDate: {...currentDate, month: event.target.value},
                                    id: newId
                                    }]);
                                    setCurrentId(newId);
                                }
                            }
                 }}>
                   <option value={-1}>Month</option>
                   {months.map((month, index) => {
                        return (
                            <option value={month} key={index}>
                                {format(month, 'MMMM')}
                            </option>
                        )
                   })}
                </select>
                <select name="years" id={"year-" + idName}
                value={currentDate.year}
                 onChange={(event) => {
                    setCurrentDate({...currentDate, year: event.target.value});
                    if(currentId != null)
                        {
                            const arr = [...userEducation];
                            const indexOfSelected = arr.findIndex((element) => {
                                return element.id == currentId;
                            });
                            if(isStart)
                            {
                                arr[indexOfSelected] = {
                                ...arr[indexOfSelected],
                                startDate: {...currentDate, year: event.target.value}
                                };
                                setUserEducation(arr);
                            } else {
                                arr[indexOfSelected] = {
                                ...arr[indexOfSelected],
                                endDate: {...currentDate, year: event.target.value}
                                    };
                                setUserEducation(arr);
                            }
                        } else {
                            const newId = crypto.randomUUID();
                            if(isStart)
                            {
                                setUserEducation([...userEducation, {
                                school: schoolName,
                                location: locationName,
                                degree: degreeName,
                                field: fieldName,
                                grade: gradeValue,
                                endDate: endDate,
                                achievements: achievements,
                                startDate: {...currentDate, year: event.target.value},
                                id: newId
                                }]);
                                setCurrentId(newId);
                            } else {
                                setUserEducation([...userEducation, {
                                school: schoolName,
                                location: locationName,
                                degree: degreeName,
                                field: fieldName,
                                grade: gradeValue,
                                startDate: startDate,
                                achievements: achievements,
                                endDate: {...currentDate, year: event.target.value},
                                id: newId
                                }]);
                                setCurrentId(newId);
                            }
                        }
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
        </div>
    )
}

function EducationSectionFormAchievement({achievements, setAchievements, currentId, setCurrentId, userEducation, setUserEducation}) {

    const [currentAchievement, setCurrentAchievement] = useState("");
    
    return (
        <fieldset>
            <legend>Add New Achievement</legend>
            <div className="input-field"
                    onClick={() => {addActive("achievement-info")}}
                    onMouseEnter={() => {addActive("achievement-info")}}
                    onMouseLeave={() => {removeActive("achievement-info")}}
                    >
                <label htmlFor="achievement-info">Name
                    <button className="add-achievement"
                    onClick = {(event) => {
                        event.preventDefault();
                        
                        // When making a state change that changes multiple states that can change
                        // from it, create one variable and use it for each to make state change all
                        // at once rather than changing state with another state. WILL AVOID THE
                        // ONE BEHIND ISSUE
                        
                        const newAchievement = [...achievements, {
                            achievement: currentAchievement,
                            id: crypto.randomUUID()
                        }];
                        
                        setAchievements(newAchievement);
                        setCurrentAchievement("");
                        
                        if(currentId != null)
                        {
                            const arr = [...userEducation];
                            const indexOfSelected = arr.findIndex((element) => {
                                return element.id == currentId;
                            });
                            arr[indexOfSelected] = {
                                ...arr[indexOfSelected],
                                achievements: newAchievement,
                                id: currentId
                            };
                            setUserEducation(arr);
                        } else {
                            const newId = crypto.randomUUID();
                            setUserEducation([...userEducation, {
                            achievements: newAchievement,
                            id: newId
                            }]);
                            setCurrentId(newId);
                        }

                    }}>
                    <Icon path={mdiContentSave} className="link-icon"/>
                        Save Achievement
                    </button>
                </label>
                <div>
                    <input type="text" name="achievement-info" id="achievement-info" value={currentAchievement}
                     onChange={(event) => {
                        setCurrentAchievement(event.target.value);
                         }}/>
                </div>
            </div>
            { achievements.length != 0 &&  achievements.map((achievement) => {
                return (
                    <div className="achievement-container" key={achievement.id}>
                        <p>{achievement.achievement}</p>
                        <button className="achievement-btn"><Icon path={mdiEyeOutline} className="link-icon"/></button>
                        <button className="achievement-btn"><Icon path={mdiDelete} className="link-icon delete-icon"
                        onClick={() => {
                            const arr = [...achievements].filter((element) => {
                                if(element.id != achievement.id) return element;
                            });
                            
                            if(currentId != null)
                            {
                                const tempArr = [...userEducation];
                                const indexOfSelected = tempArr.findIndex((element) => {
                                    return element.id == currentId;
                                });
                                tempArr[indexOfSelected] = {
                                    ...tempArr[indexOfSelected],
                                    achievements: arr,
                                    id: currentId
                                };
                                setUserEducation(tempArr);
                            } else {
                                const newId = crypto.randomUUID();
                                setUserEducation([...userEducation, {
                                achievements: arr,
                                id: newId
                                }]);
                                setCurrentId(newId);
                            }
                            
                            setAchievements(arr);


                        }}/></button>
                    </div>
                )
            })}
        </fieldset>
    )
}

function EducationSectionFormBtns({ setShowAddBtn, setShowEducationForm, 
    userEducation, setUserEducation, selectedEdu, setSelectedEdu, schoolName, locationName, degreeName, fieldName, gradeValue,
    startDate, endDate, achievements, currentId, setCurrentId}) {
    return (
        <div className="form-btns">
            <button className="delete-btn" type="button"
            onClick={() =>
                    {
                        if(selectedEdu != null)
                        {
                            const arr = [...userEducation];
                            setUserEducation(arr.filter((element) => {
                                if(element.id != selectedEdu.id) return element;
                            }));
                            setSelectedEdu(null);
                        }

                        if(currentId != null) {
                            const arr = [...userEducation];
                            setUserEducation(arr.filter((element) => {
                                if(element.id != currentId) return element;
                            }));
                            setCurrentId(null);
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
                        if(currentId != null && selectedEdu == null) {
                            const arr = [...userEducation];

                            setUserEducation(arr.filter((element) => {
                                if(element.id != currentId) return element;
                            }));
                            setCurrentId(null);
                        }
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
                        setShowEducationForm(false);
                        setShowAddBtn(true);
                        setCurrentId(null);
                    }}>
                    <Icon path={mdiContentSave} className="link-icon" />
                    Save
                </button>
            </div>
        </div>
    )
}


export {EducationSection}
