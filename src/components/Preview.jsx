import { Resume } from "./resume";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export function PreviewWindow({
  generalInput,
  educationInput,
  expInput,
  summaryInput,
  skillsInput,
  setShowPreview,
}) {
  const resumeWidth = document
    .querySelector(".resume")
    .getBoundingClientRect().width;
  console.log(resumeWidth);

  return (
    <dialog
      open
      className="modal"
      style={{
        width: `${resumeWidth}px`,
      }}
    >
      <Resume
        generalInput={generalInput}
        educationInput={educationInput}
        expInput={expInput}
        summaryInput={summaryInput}
        skillsInput={skillsInput}
      />
      <button
        className="modal-exit"
        onClick={() => {
          setShowPreview(false);
        }}
      >
        <Icon path={mdiClose} className="close-icon modal-icon" />
      </button>
    </dialog>
  );
}
