const contactForm = document.querySelector(".contacts_container_form");
const contactFormSbmtBtn = document.querySelector(".contacts_container-btn");
const sendFormUrl = "https://whatmoneyapi.azurewebsites.net/contact";

const contactNameField = document.querySelector(
  ".contacts_container_input.name-input"
);
const contactCityField = document.querySelector("#contact-city-default-input");
const contactHiddenCityField = document.querySelector(
  ".contact-form-hidden-city-input.contacts_container_input.name-input"
);
const contactTypeField = document.querySelector("#contact-way-default-input");
const contactSpecField = document.querySelector("#contact-way-spec-input");
const contactCommentField = document.querySelector(
  ".contacts_container_input.comment-input"
);

const isCityFieldEmpty = () => {
  if (contactCityField.textContent.trim() == "В каком городе вы находитесь?") {
    return true;
  } else if (contactCityField.textContent.trim() !== "Другой") {
    return false;
  } else {
    return contactHiddenCityField.value.length == 0;
  }
};

const isContactFieldEmpty = () => {
  if (contactTypeField.textContent.trim() == "Как с вами связаться?") {
    return true;
  } else {
    return document.querySelector("#contact-way-spec-input").value?.length == 0;
  }
};

const validateContactForm = () => {
  const emptyFields = [];
  if (contactNameField.value.length == 0) emptyFields.push(contactNameField);
  if (isCityFieldEmpty()) {
    emptyFields.push(contactCityField.parentElement);
    emptyFields.push(contactHiddenCityField);
  }
  if (isContactFieldEmpty()) {
    emptyFields.push(contactTypeField.parentElement);
    emptyFields.push(contactSpecField);
  }
  if (emptyFields.length > 0) {
    emptyFields.forEach((element) => element.classList.add("border-pulse"));
    setTimeout(() => {
      emptyFields.forEach((element) =>
        element.classList.remove("border-pulse")
      );
    }, 1700);
    return false;
  } else {
    return true;
  }
};

contactFormSbmtBtn.addEventListener("click", async (event) => {
  const contactSpecField = document.querySelector("#contact-way-spec-input");

  event.preventDefault();
  if (!validateContactForm()) return;
  const formData = JSON.stringify({
    tableType: "contact",
    sumFrom: "",
    sumTo: "",
    name: contactNameField.value,
    city:
      contactCityField.textContent.trim() !== "Другой"
        ? contactCityField.textContent.trim()
        : contactHiddenCityField.value,
    contactType: contactTypeField.textContent.trim(),
    contact: document.querySelector("#contact-way-spec-input").value,
    comment: contactCommentField.value,
  });

  async function sendContactForm() {
    try {
      const response = await fetch(sendFormUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: formData,
      });
    } catch (error) {
      console.error("Course service error:", error);
    }
  }
  await sendContactForm();
  // openConfirmationPopup();
  window.location.href = "first_page.html";
});
