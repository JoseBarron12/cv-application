const addActive = (id, isTextArea) => {
  if (isTextArea) {
    document
      .querySelector("textarea#" + id)
      .parentElement.classList.add("active-input");
  } else {
    document
      .querySelector("input#" + id)
      .parentElement.classList.add("active-input");
  }
};

const removeActive = (id, isTextArea) => {
  if (isTextArea) {
    document
      .querySelector("textarea#" + id)
      .parentElement.classList.remove("active-input");
  } else {
    document
      .querySelector("input#" + id)
      .parentElement.classList.remove("active-input");
  }
};

export { addActive, removeActive };
