import { useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronUp, mdiBriefcase, mdiPlus, mdiMinus, mdiContentSave, mdiDelete, mdiClose, mdiEyeOutline} from '@mdi/js';
import "../styles/experience.css"

export function ExperienceSection({userExp, setUserExp}) {
    const [showLink, setShowLink] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [selectedExp, setSelectedExp] = useState(null);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [showExpForm, setShowExpForm] = useState(false);

    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowLink(newView);
    }

    const showSectionBtn = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowSection(newView);
    }
    
    return (
        <section className="experience-section">
            <div className="header-section">
                <div>
                    <Icon path={mdiBriefcase} className="header-icon" />
                    <h2>Experience</h2>
                </div>
                {!showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronDown} className="header-icon" />
                </button>}
                {showSection && <button type="button" onClick={showSectionBtn(showSection)}>
                    <Icon path={mdiChevronUp} className="header-icon" />
                </button>}
            </div>
            
            {showSection && showAddBtn && userExp.length != 0 && userExp.map(input => {
                return (
                    <div className="button-container input-container" key={input.id}>
                        <button className="input-name"
                            onClick={() =>
                                {
                                    setSelectedExp(input);
                                    setShowExpForm(true);
                                    setShowAddBtn(false);
                                }}>{input.position}</button>
                                <button className="input-btn"><Icon path={mdiEyeOutline} className="link-icon" 
                                onClick={() => {
                                    const arr = [...userExp];
                                    const indexOfSelected = arr.findIndex((element) => {
                                        return element.id == input.id;
                                    });
                                    const showFlag = (arr[indexOfSelected].show == false) ? true: false;
                                        
                                    arr[indexOfSelected] = {
                                        ...arr[indexOfSelected],
                                        show: showFlag
                                    };
                                    setUserExp(arr);
                                }}/></button>
                    </div>
                )
            })}
            
            {showSection && showExpForm && <ExperienceSectionForm userExp={userExp} setUserExp={setUserExp} 
            setShowAddbtn={setShowAddBtn} setShowExpForm={setShowExpForm} selectedExp={selectedExp} setSelectedExp={setSelectedExp}/>}
            {showSection && showAddBtn && <div className="button-container">
                <button className="new-edu-btn" type="button" onClick={() =>
                    {
                        setShowExpForm(true);
                        setShowAddBtn(false);
                }}>
                <Icon path={mdiPlus} className="link-icon" />
                Experience
                </button>
            </div>}
        </section>
    )
}

const processGeneralInput = (currentId, setCurrentId, userExp, setUserExp, type, value,
    positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements) => {    
        if(currentId != null)
            {
                const arr = [...userExp];
                const indexOfSelected = arr.findIndex((element) => {
                    return element.id == currentId;
                });
               
                arr[indexOfSelected] = {
                    position: positionName,
                    company: companyName,
                    location: locationName,
                    responsibility: responsibilityName,
                    startDate: startDate,
                    endDate: endDate,
                    achievements: achievements,
                    id: currentId
                };
                arr[indexOfSelected][type] = value;
                    
                setUserExp(arr);

            } else {
                const newId = crypto.randomUUID();

                const newExpObj = {
                    position: positionName,
                    company: companyName,
                    location: locationName,
                    responsibility: responsibilityName,
                    startDate: startDate,
                    endDate: endDate,
                    achievements: achievements,
                    id: newId
                }
                newExpObj[type] = value;

                setUserExp([...userExp, {
                    ...newExpObj
                }]);

                setCurrentId(newId);
            }
}   

function GeneralInput({type, name, id, initialValue, callBack, currentId, setCurrentId, 
    userExp, setUserExp, positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements}) {
    
    const [currentValue, setCurrentValue] = useState(initialValue);
    
    const showX = (currentId != null && initialValue != "") ? true : false;
    
    const [displayX, setDisplayX] = useState(showX);
    return (
        <div>
            <input type={type} name={name + "-name"} id={id + "-name"} value={currentValue} 
            onChange={(event) => {
                    event.preventDefault();
                    
                    callBack(event.target.value);

                    processGeneralInput(currentId, setCurrentId, userExp, setUserExp, name, event.target.value,
                    positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements)

                    setCurrentValue(event.target.value);
                    setDisplayX(true);
                    
            }}/>
            {displayX && <ResetBtn setCurrentValue={setCurrentValue} setDisplayX={setDisplayX} currentId={currentId}
            name={name} callBack={callBack} userExp={userExp} setUserExp={setUserExp} positionName={positionName}
            companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate}
            endDate={endDate} achievements={achievements}/>}
        </div>
    )
}

function ResetBtn({setCurrentValue, setDisplayX, currentId, setCurrentId, name, callBack,
    userExp, setUserExp, positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements}) {
    return (
        <button type="button"  onClick={(event) => {
            event.preventDefault()
            
            callBack(event.target.value);
            processGeneralInput(currentId, setCurrentId, userExp, setUserExp, name, "",
            positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements)
            
            setCurrentValue("");
            setDisplayX(false);
        }}><Icon path={mdiClose} className="close-icon" />
        </button>
    )
}

function ExperienceSectionForm({userExp, setUserExp, setShowAddbtn, setShowExpForm, selectedExp, setSelectedExp}) {
    const [showAchievements, setShowAchievements] = useState(false);

    const defaultPosition = selectedExp!= null ? selectedExp.position : "";
    const [positionName, setPositionName] = useState(defaultPosition);
    
    const defaultCompany = selectedExp != null ? selectedExp.company : "";
    const [companyName, setCompanyName] = useState(defaultCompany);
    
    const defaultLocation = selectedExp != null ? selectedExp.location : "";
    const [locationName, setLocationName] = useState(defaultLocation);
    
    const defaultResponsibility = selectedExp != null ? selectedExp.responsibility : "";
    const [responsibilityName, setResponsibilityName] = useState(defaultResponsibility);
    
    const defaultStartDate = (selectedExp != null && selectedExp.startDate != undefined) ? selectedExp.startDate : "";
    const [startDate, setStartDate] = useState(defaultStartDate);
    
    const defaultEndDate = (selectedExp != null && selectedExp.endDate != undefined) ? selectedExp.endDate : "";
    const [endDate, setEndDate] = useState(defaultEndDate);

    const defaultAchievements= selectedExp != null ? selectedExp.achievements: "";
    const [achievements, setAchievements] = useState(defaultAchievements);

    const defaultCurrentId= selectedExp != null ? selectedExp.id: null;
    const [currentId, setCurrentId] = useState(defaultCurrentId);

    const onBtnClick = (currentView) => () => {
        const newView = currentView ? false : true;
        setShowAchievements(newView);
    }
    
    return( 
        <form className="exp-info">
            <fieldset>
                <legend>Job Information</legend>
                <div className="input-field">
                    <label htmlFor="position-name">Position Title</label>
                    <GeneralInput type={"text"} name={"position"} id={"position"} callBack={setPositionName} currentId={currentId} setCurrentId={setCurrentId}
                    userExp={userExp} setUserExp={setUserExp} initialValue={positionName} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
                </div>
                <div className="input-field">
                    <label htmlFor="company-name">Company Name</label>
                    <GeneralInput type={"text"} name={"company"} id={"company"} callBack={setCompanyName} currentId={currentId} setCurrentId={setCurrentId}
                    userExp={userExp} setUserExp={setUserExp} initialValue={companyName} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
                </div>
                <div className="input-field">
                    <label htmlFor="location-name">Location</label>
                    <GeneralInput type={"text"} name={"location"} id={"location"} callBack={setLocationName} currentId={currentId} setCurrentId={setCurrentId}
                    userExp={userExp} setUserExp={setUserExp} initialValue={locationName} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
                </div>
                <div className="input-field-date">
                    <label htmlFor="start-date">Start date</label>
                    <ExperienceSectionFormDate isStart={true} idName={"start-date"} currentDate={startDate} setCurrentDate={setStartDate} currentId={currentId} setCurrentId={setCurrentId} userExp={userExp} setUserExp={setUserExp} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
                </div>
                <div className="input-field-date">
                    <label htmlFor="end-date">End date</label>
                    <ExperienceSectionFormDate isStart={false} idName={"end-date"} currentDate={endDate} setCurrentDate={setEndDate} currentId={currentId} setCurrentId={setCurrentId} userExp={userExp} setUserExp={setUserExp} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Additional Job Information</legend>
                <div className="input-field">
                    <label htmlFor="responsibility-name">Responsibility</label>
                    <GeneralInput type={"text"} name={"responsibility"} id={"responsibility"} callBack={setResponsibilityName} currentId={currentId} setCurrentId={setCurrentId}
                    userExp={userExp} setUserExp={setUserExp} initialValue={responsibilityName} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
                    achievements={achievements}/>
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
                {showAchievements && <ExperienceSectionFormAdditional achievements={achievements} setAchievements={setAchievements} currentId={currentId} setCurrentId={setCurrentId} userExp={userExp} setUserExp={setUserExp}/>}
            </div>
            <ExperienceSectionFormBtns setShowExpForm={setShowExpForm} setShowAddBtn={setShowAddbtn} selectedExp={selectedExp} setSelectedExp={setSelectedExp} currentId={currentId} setCurrentId={setCurrentId}
            userExp={userExp} setUserExp={setUserExp} initialValue={positionName} positionName={positionName} companyName={companyName} locationName={locationName} responsibilityName={responsibilityName} startDate={startDate} endDate={endDate}
            achievements={achievements}/>
        </form>
    )
}

function ExperienceSectionFormDate({isStart, idName, currentDate, setCurrentDate, currentId, setCurrentId, 
    userExp, setUserExp, positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements
}) {
    
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
                <select name="months" id={"month-" + idName} value={currentDate.month}
                 onChange={(event) => {
                    setCurrentDate({...currentDate, month: event.target.value});
                    if(currentId != null)
                    {
                        const arr = [...userExp];
                        const indexOfSelected = arr.findIndex((element) => {
                            return element.id == currentId;
                        });
                        if(isStart)
                        {
                            arr[indexOfSelected] = {
                            ...arr[indexOfSelected],
                            startDate: {...currentDate, month: event.target.value}
                            };
                                setUserExp(arr);
                        } else {
                            arr[indexOfSelected] = {
                            ...arr[indexOfSelected],
                            endDate: {...currentDate, month: event.target.value}
                            };
                            setUserExp(arr);
                        }
                    } else {
                        const newId = crypto.randomUUID();
                        if(isStart)
                        {
                            setUserExp([...userExp, {
                                position: positionName,
                                company: companyName,
                                location: locationName,
                                responsibility: responsibilityName,
                                endDate: endDate,
                                achievements: achievements,
                                startDate: {...currentDate, month: event.target.value},
                                id: newId
                            }]);
                            setCurrentId(newId);
                        } else {
                            setUserExp([...userExp, {
                                position: positionName,
                                company: companyName,
                                location: locationName,
                                responsibility: responsibilityName,
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
                <select name="years" id={"year-" + idName} value={currentDate.year}
                onChange={(event) => {
                    setCurrentDate({...currentDate, year: event.target.value});
                    if(currentId != null)
                    {
                        const arr = [...userExp];
                        const indexOfSelected = arr.findIndex((element) => {
                            return element.id == currentId;
                        });
                        if(isStart)
                        {
                            arr[indexOfSelected] = {
                            ...arr[indexOfSelected],
                            startDate: {...currentDate, year: event.target.value}
                            };
                                setUserExp(arr);
                        } else {
                            arr[indexOfSelected] = {
                            ...arr[indexOfSelected],
                            endDate: {...currentDate, year: event.target.value}
                            };
                            setUserExp(arr);
                        }
                    } else {
                        const newId = crypto.randomUUID();
                        if(isStart)
                        {
                            setUserExp([...userExp, {
                                position: positionName,
                                company: companyName,
                                location: locationName,
                                responsibility: responsibilityName,
                                endDate: endDate,
                                achievements: achievements,
                                startDate: {...currentDate, year: event.target.value},
                                id: newId
                            }]);
                            setCurrentId(newId);
                        } else {
                            setUserExp([...userExp, {
                                position: positionName,
                                company: companyName,
                                location: locationName,
                                responsibility: responsibilityName,
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

function ExperienceSectionFormAdditional({achievements, setAchievements, currentId, setCurrentId, userExp, setUserExp}) {
    
    const [currentAchievement, setCurrentAchievement] = useState("");

    return (
        <fieldset>
            <legend>Add new additional job information</legend>
            <div className="input-field">
                <label htmlFor="addit-info">Name
                    <button className="add-achievement" 
                    onClick={(event) => {
                        event.preventDefault();
                        
                        const newAchievement = [...achievements, {
                            achievement: currentAchievement,
                            id: crypto.randomUUID()
                        }];
                        
                        setAchievements(newAchievement);
                        setCurrentAchievement("");
                        
                        if(currentId != null)
                        {
                            const arr = [...userExp];
                            const indexOfSelected = arr.findIndex((element) => {
                                return element.id == currentId;
                            });
                            arr[indexOfSelected] = {
                                ...arr[indexOfSelected],
                                achievements: newAchievement,
                                id: currentId
                            };
                            setUserExp(arr);
                        } else {
                            const newId = crypto.randomUUID();
                            setUserExp([...userExp, {
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
                <div><input type="text" name="addit-info" id="addit-info" value={currentAchievement}
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
                                const tempArr = [...userExp];
                                const indexOfSelected = tempArr.findIndex((element) => {
                                        return element.id == currentId;
                                });
                                tempArr[indexOfSelected] = {
                                    ...tempArr[indexOfSelected],
                                    achievements: arr,
                                    id: currentId
                                };
                                setUserExp(tempArr);
                            } else {
                                const newId = crypto.randomUUID();
                                setUserExp([...userExp, {
                                achievements: arr,
                                id: newId
                                }]);
                                setCurrentId(newId);
                            }      
                                setAchievements(arr);
                        }}/>
                    </button>
                </div>
                )
            })}
        </fieldset>
    )
}

function ExperienceSectionFormBtns({setShowExpForm, setShowAddBtn, currentId, setCurrentId, selectedExp, setSelectedExp,
    userExp, setUserExp, positionName, companyName, locationName, responsibilityName, startDate, endDate, achievements}) {
    return (
        <div className="form-btns">
            <button className="delete-btn" type="button" onClick={(e) => {
                e.preventDefault();
                
                if(selectedExp != null)
                    {
                        const arr = [...userExp];
                        setUserExp(arr.filter((element) => {
                            if(element.id != selectedExp.id) return element;
                        }));
                        setSelectedExp(null);
                    }

                if(currentId != null) {
                    const arr = [...userExp];
                    setUserExp(arr.filter((element) => {
                        if(element.id != currentId) return element;
                    }));
                    setCurrentId(null);
                }
                
                setShowExpForm(false);
                setShowAddBtn(true);
            }}> 
                <Icon path={mdiDelete} className="link-icon" />
                Delete
            </button>
            <div>
                <button className="cancel-btn" type="button" onClick={(e) => {
                    if(currentId != null && selectedExp == null) {
                        const arr = [...userExp];

                        setUserExp(arr.filter((element) => {
                            if(element.id != currentId) return element;
                        }));
                        setCurrentId(null);
                    }
                    setSelectedExp(null);
                    setShowExpForm(false);
                    setShowAddBtn(true);
                }}>
                    Cancel
                </button>
                <button className="save-btn" type="submit" onClick={(e) => 
                {
                    e.preventDefault();
                        
                    if(selectedExp != null)
                    {
                        const arr = [...userExp];
                        const indexOfSelected = arr.findIndex((element) => {
                            return element.id == selectedExp.id;
                        });
                        arr[indexOfSelected] = {
                            position: positionName,
                            company: companyName,
                            location: locationName,
                            responsibility: responsibilityName,
                            startDate: startDate,
                            endDate: endDate,
                            achievements: achievements,
                            id: selectedExp.id
                        };
                        setSelectedExp(null);
                        setUserExp(arr);
                    }
                    
                    setShowExpForm(false);
                    setShowAddBtn(true);
                    setCurrentId(null)
                }}>
                    <Icon path={mdiContentSave} className="link-icon" />
                    Save
                </button>
            </div>
        </div>
    )
}
