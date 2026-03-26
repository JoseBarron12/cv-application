import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiHeadCog,
  mdiPlus,
  mdiMinus,
  mdiEyeOutline,
  mdiClose,
  mdiContentSave,
  mdiDelete,
} from "@mdi/js";
import "../styles/skills.css";
import { addActive, removeActive } from "./eventlisteners";

export function SkillsSection({ userSkill, setUserSkill }) {
  const [showSection, setShowSection] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const showSectionBtn = (currentView) => () => {
    const newView = currentView ? false : true;
    setShowSection(newView);
  };

  return (
    <section className="skill-section">
      <div className="header-section">
        <div>
          <Icon path={mdiHeadCog} className="header-icon" />
          <h2>Skills</h2>
        </div>
        {!showSection && (
          <button type="button" onClick={showSectionBtn(showSection)}>
            <Icon path={mdiChevronDown} className="header-icon" />
          </button>
        )}
        {showSection && (
          <button type="button" onClick={showSectionBtn(showSection)}>
            <Icon path={mdiChevronUp} className="header-icon" />
          </button>
        )}
      </div>

      {showSection &&
        showAddBtn &&
        userSkill.length != 0 &&
        userSkill.map((input) => {
          return (
            <div className="button-container input-container" key={input.id}>
              <button
                className="input-name"
                onClick={() => {
                  setSelectedSkill(input);
                  setShowSkillForm(true);
                  setShowAddBtn(false);
                }}
              >
                {input.category}
              </button>

              <button className="input-btn">
                <Icon
                  path={mdiEyeOutline}
                  className="link-icon"
                  onClick={() => {
                    const arr = [...userSkill];
                    const indexOfSelected = arr.findIndex((element) => {
                      return element.id == input.id;
                    });
                    const showFlag =
                      arr[indexOfSelected].show == false ? true : false;

                    arr[indexOfSelected] = {
                      ...arr[indexOfSelected],
                      show: showFlag,
                    };
                    setUserSkill(arr);
                  }}
                />
              </button>
            </div>
          );
        })}

      {showSection && showSkillForm && (
        <SkillSectionForm
          userSkill={userSkill}
          setUserSkill={setUserSkill}
          setShowAddbtn={setShowAddBtn}
          setShowSkillForm={setShowSkillForm}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
        />
      )}

      {showSection && showAddBtn && (
        <div className="button-container">
          <button
            className="new-edu-btn"
            type="button"
            onClick={() => {
              setShowSkillForm(true);
              setShowAddBtn(false);
            }}
          >
            <Icon path={mdiPlus} className="link-icon" />
            New Skill Category
          </button>
        </div>
      )}
    </section>
  );
}

function SkillSectionForm({
  userSkill,
  setUserSkill,
  setShowAddbtn,
  setShowSkillForm,
  selectedSkill,
  setSelectedSkill,
}) {
  const defaultCategory = selectedSkill != null ? selectedSkill.category : "";
  const [categoryName, setCategoryName] = useState(defaultCategory);

  const defaultSkills = selectedSkill != null ? selectedSkill.skills : "";
  const [skillsArr, setSkillsArr] = useState(defaultSkills);

  const defaultCurrentId = selectedSkill != null ? selectedSkill.id : null;
  const [currentId, setCurrentId] = useState(defaultCurrentId);

  const [showSkills, setShowSkills] = useState(false);

  const onBtnClick = (currentView) => () => {
    const newView = currentView ? false : true;
    setShowSkills(newView);
  };

  return (
    <form className="skill-info">
      <fieldset>
        <legend>Skill Information</legend>

        <div
          className="input-field"
          onClick={() => {
            addActive("category-name");
          }}
          onMouseEnter={() => {
            addActive("category-name");
          }}
          onMouseLeave={() => {
            removeActive("category-name");
          }}
        >
          <label htmlFor="category-name">Category Name</label>
          <SkillInput
            type={"text"}
            id={"category"}
            name={"category"}
            setUserSkill={setUserSkill}
            userSkill={userSkill}
            initialValue={categoryName}
            callBack={setCategoryName}
            currentId={currentId}
            setCurrentId={setCurrentId}
            categoryName={categoryName}
            skillsArr={skillsArr}
          />
        </div>
      </fieldset>

      <div className="additional-achievement-section">
        <button type="button" onClick={onBtnClick(showSkills)}>
          Add Skill
          {!showSkills && (
            <Icon path={mdiPlus} className="link-icon plus-icon" />
          )}
          {showSkills && (
            <Icon path={mdiMinus} className="link-icon plus-icon" />
          )}
        </button>
        {showSkills && (
          <SkillSectionFormAdditional
            skillsArr={skillsArr}
            setSkillsArr={setSkillsArr}
            currentId={currentId}
            setCurrentId={setCurrentId}
            userSkill={userSkill}
            setUserSkill={setUserSkill}
          />
        )}
      </div>

      <SkillsSectionFormBtns
        setShowSkillForm={setShowSkillForm}
        setShowAddBtn={setShowAddbtn}
        currentId={currentId}
        setCurrentId={setCurrentId}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        userSkill={userSkill}
        setUserSkill={setUserSkill}
        categoryName={categoryName}
        skillsArr={skillsArr}
      />
    </form>
  );
}

const processGeneralInput = (
  value,
  type,
  setUserSkill,
  userSkill,
  currentId,
  setCurrentId,
  categoryName,
  skillsArr,
) => {
  if (currentId != null) {
    const arr = [...userSkill];
    const indexOfSelected = arr.findIndex((element) => {
      return element.id == currentId;
    });

    arr[indexOfSelected] = {
      category: categoryName,
      skills: skillsArr,
      id: currentId,
    };
    arr[indexOfSelected][type] = value;

    setUserSkill(arr);
  } else {
    const newId = crypto.randomUUID();

    const newSkillObj = {
      category: categoryName,
      skills: skillsArr,
      id: newId,
    };
    newSkillObj[type] = value;

    setUserSkill([
      ...userSkill,
      {
        ...newSkillObj,
      },
    ]);

    setCurrentId(newId);
  }
};

function SkillInput({
  type,
  id,
  name,
  initialValue,
  setUserSkill,
  userSkill,
  callBack,
  currentId,
  setCurrentId,
  categoryName,
  skillsArr,
}) {
  const [currentValue, setCurrentValue] = useState(initialValue);

  const showX = currentId != null && initialValue != "" ? true : false;
  const [displayX, setDisplayX] = useState(showX);

  return (
    <div>
      <input
        type={type}
        id={id + "-name"}
        value={currentValue}
        name={name + "-name"}
        onChange={(event) => {
          event.preventDefault();

          callBack(event.target.value);

          processGeneralInput(
            event.target.value,
            name,
            setUserSkill,
            userSkill,
            currentId,
            setCurrentId,
            categoryName,
            skillsArr,
          );

          setCurrentValue(event.target.value);
          setDisplayX(true);
        }}
      />

      {displayX && (
        <ResetBtn
          setCurrentValue={setCurrentValue}
          setDisplayX={setDisplayX}
          currentId={currentId}
          setCurrentId={setCurrentId}
          name={name}
          callBack={callBack}
          setUserSkill={setUserSkill}
          userSkill={userSkill}
          categoryName={categoryName}
          skillsArr={skillsArr}
        />
      )}
    </div>
  );
}

function ResetBtn({
  setCurrentValue,
  setDisplayX,
  currentId,
  setCurrentId,
  name,
  callBack,
  setUserSkill,
  userSkill,
  categoryName,
  skillsArr,
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();

        callBack(event.target.value);
        processGeneralInput(
          "",
          name,
          setUserSkill,
          userSkill,
          currentId,
          setCurrentId,
          categoryName,
          skillsArr,
        );

        setCurrentValue("");
        setDisplayX(false);
      }}
    >
      <Icon path={mdiClose} className="close-icon" />
    </button>
  );
}

function SkillSectionFormAdditional({
  skillsArr,
  setSkillsArr,
  currentId,
  setCurrentId,
  userSkill,
  setUserSkill,
}) {
  const [currentSkill, setCurrentSkill] = useState("");

  return (
    <fieldset>
      <legend>Add new skill </legend>
      <div
        className="input-field"
        onClick={() => {
          addActive("addit-info");
        }}
        onMouseEnter={() => {
          addActive("addit-info");
        }}
        onMouseLeave={() => {
          removeActive("addit-info");
        }}
      >
        <label htmlFor="addit-info">
          Name
          <button
            className="add-achievement"
            onClick={(event) => {
              event.preventDefault();

              const newSkills = [
                ...skillsArr,
                {
                  skill: currentSkill,
                  id: crypto.randomUUID(),
                },
              ];

              setSkillsArr(newSkills);
              setCurrentSkill("");

              if (currentId != null) {
                const arr = [...userSkill];
                const indexOfSelected = arr.findIndex((element) => {
                  return element.id == currentId;
                });
                arr[indexOfSelected] = {
                  ...arr[indexOfSelected],
                  skills: newSkills,
                  id: currentId,
                };
                setUserSkill(arr);
              } else {
                const newId = crypto.randomUUID();
                setUserSkill([
                  ...userSkill,
                  {
                    skills: newSkills,
                    id: newId,
                  },
                ]);
                setCurrentId(newId);
              }
            }}
          >
            <Icon path={mdiContentSave} className="link-icon" />
            Save Skill
          </button>
        </label>
        <div>
          <input
            type="text"
            name="addit-info"
            id="addit-info"
            value={currentSkill}
            onChange={(event) => {
              setCurrentSkill(event.target.value);
            }}
          />
        </div>
      </div>
      {skillsArr.length != 0 &&
        skillsArr.map((skill) => {
          return (
            <div className="achievement-container" key={skill.id}>
              <p>{skill.skill}</p>
              <button className="achievement-btn">
                <Icon
                  path={mdiEyeOutline}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="link-icon"
                />
              </button>
              <button className="achievement-btn">
                <Icon
                  path={mdiDelete}
                  className="link-icon delete-icon"
                  onClick={(e) => {
                    e.preventDefault();

                    const arr = [...skillsArr].filter((element) => {
                      if (element.id != skill.id) return element;
                    });

                    if (currentId != null) {
                      const tempArr = [...userSkill];
                      const indexOfSelected = tempArr.findIndex((element) => {
                        return element.id == currentId;
                      });
                      tempArr[indexOfSelected] = {
                        ...tempArr[indexOfSelected],
                        skills: arr,
                        id: currentId,
                      };
                      setUserSkill(tempArr);
                    } else {
                      const newId = crypto.randomUUID();
                      setUserSkill([
                        ...userSkill,
                        {
                          skills: arr,
                          id: newId,
                        },
                      ]);
                      setCurrentId(newId);
                    }
                    setSkillsArr(arr);
                  }}
                />
              </button>
            </div>
          );
        })}
    </fieldset>
  );
}

function SkillsSectionFormBtns({
  setShowSkillForm,
  setShowAddBtn,
  currentId,
  setCurrentId,
  selectedSkill,
  setSelectedSkill,
  userSkill,
  setUserSkill,
  categoryName,
  skillsArr,
}) {
  return (
    <div className="form-btns">
      <button
        className="delete-btn"
        type="button"
        onClick={(e) => {
          e.preventDefault();

          if (selectedSkill != null) {
            const arr = [...userSkill];
            setUserSkill(
              arr.filter((element) => {
                if (element.id != selectedSkill.id) return element;
              }),
            );
            setSelectedSkill(null);
          }

          if (currentId != null) {
            const arr = [...userSkill];
            setUserSkill(
              arr.filter((element) => {
                if (element.id != currentId) return element;
              }),
            );
            setCurrentId(null);
          }

          setShowSkillForm(false);
          setShowAddBtn(true);
        }}
      >
        <Icon path={mdiDelete} className="link-icon" />
        Delete
      </button>
      <div>
        <button
          className="cancel-btn"
          type="button"
          onClick={() => {
            if (currentId != null && selectedSkill == null) {
              const arr = [...userSkill];

              setUserSkill(
                arr.filter((element) => {
                  if (element.id != currentId) return element;
                }),
              );
              setCurrentId(null);
            }
            setSelectedSkill(null);
            setShowSkillForm(false);
            setShowAddBtn(true);
          }}
        >
          Cancel
        </button>
        <button
          className="save-btn"
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            if (selectedSkill != null) {
              const arr = [...userSkill];
              const indexOfSelected = arr.findIndex((element) => {
                return element.id == selectedSkill.id;
              });
              arr[indexOfSelected] = {
                category: categoryName,
                skills: skillsArr,
                id: selectedSkill.id,
              };
              setSelectedSkill(null);
              setUserSkill(arr);
            }

            setShowSkillForm(false);
            setShowAddBtn(true);
            setCurrentId(null);
          }}
        >
          <Icon path={mdiContentSave} className="link-icon" />
          Save
        </button>
      </div>
    </div>
  );
}
