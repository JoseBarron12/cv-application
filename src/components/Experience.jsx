import { useState } from "react";
import { eachMonthOfInterval, format, subYears, addYears, eachYearOfInterval } from "date-fns";
import Icon from '@mdi/react';
import { mdiChevronDown,mdiChevronUp, mdiBriefcase} from '@mdi/js';
import "../styles/experience.css"

export function ExperienceSection({userExp, setUserExp}) {
    const [showLink, setShowLink] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [selectedExp, setSelectedExp] = useState(null);
    
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
            { showSection && <ExperienceSectionForm/>}
        </section>
    )
}

function ExperienceSectionForm({showSection, setShowSection, userExp, setUserExp}) {
    return( 
        <form className="exp-info">
            <fieldset>
                <legend>Job Information</legend>
                <div className="input-field">
                    <label htmlFor="position-name">Position Title</label>
                    <div><input type="text" id="position-name" name="position-name"/></div>
                </div>
                <div className="input-field">
                    <label htmlFor="company-name">Company Name</label>
                    <div><input type="text"  id="company-name" name="company-name"/></div>
                </div>
                <div className="input-field">
                    <label htmlFor="location-name">Location</label>
                    <div><input type="text" id="location-name" name="location-name" /></div>
                </div>
                <div className="input-field-date">
                    <label htmlFor="start-date">Start date</label>
                    <ExperienceSectionFormDate isStart={true} idName={"start-date"}/>
                </div>
                <div className="input-field-date">
                    <label htmlFor="end-date">End date</label>
                    <ExperienceSectionFormDate isStart={false} idName={"end-date"}/>
                </div>
            </fieldset>


        </form>
    )
}

function ExperienceSectionFormDate({isStart, idName}) {
    
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
                <select name="months" id={"month-" + idName}>
                   <option value={-1}>Month</option>
                   {months.map((month, index) => {
                        return (
                            <option value={month} key={index}>
                                {format(month, 'MMMM')}
                            </option>
                        )
                   })}
                </select>
                <select name="years" id={"year-" + idName} >
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

