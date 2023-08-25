const FORM_TYPES_MAP = {
  rubToRub: "RUB_TO_RUB",
  rubToUsd: "RUB_TO_USD",
  usdToUsd: "USD_TO_USD",
  usdToRub: "USD_TO_RUB",
  usdToUsdt: "USD_TO_USDT",
  usdtToUsdt: "USDT_TO_USDT",
  usdtToUsd: "USDT_TO_USD",
};

const FORM_IMGS_MAP = {
  RUB: "./assets/images/rub_vector.png",
  USD: "./assets/images/usd_vector.png",
  USDT: "./assets/images/usdt_vector.png",
};

const selectOverlay = document.querySelector(".select-overlay");
const modal = document.querySelector(".modal-form-currency");
const modalLoad = document.querySelector(".modal-form-load");
const body = document.getElementsByTagName("body");
const overlay = document.querySelector(".overlay-currency");
const overlayLoad = document.querySelector(".overlay-load");
const btnCloseModal = document.querySelector(".close-modal");
const btnCloseLoadModal = document.querySelector(".close-modal-load");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const modalFormSbmtBtn = document.querySelector(".modal-form-btn-currency");
const loadmodalFormSbmtBtn = document.querySelector(".modal-form-btn-load");
const modalFormFirstInput = document.querySelector("#modal-form-first-input");
const modalFormSecondInput = document.querySelector("#modal-form-second-input");

const modalCityInput = document.querySelector("#modal-city-input");
const modalOtherSityOption = document.querySelector("#modalOtherOption");
const hiddenCityInput = document.querySelector(".modal-form-hidden-city-input");
const cityInput = document.querySelector(".modal-form-city-input");

const modalFormNameInput = document.querySelector(
  ".modal-form-name-input.name-input.cform"
);
const modalContactInputCurrency = document.querySelector("#modal-contact-input-currency");
const modalCityInputCurrency = document.querySelector("#modal-city-input-currency");
const modalFormNameInputCurrency = document.querySelector(
  ".modal-form-name-input-currency.name-input.cform"
);
const modalContactInput = document.querySelector("#modal-contact-input");

const contactOptions = document.querySelectorAll(".contact-option");
const hiddenContactInput = document.querySelector(
  ".modal-form-hidden-сontact-input"
);
const contactOptionsCurrency = document.querySelectorAll(".contact-option-currency");
const hiddenContactInputCurrency = document.querySelector(
  ".modal-form-hidden-сontact-input-currency"
);
const contactInput = document.querySelector(".modal-form-contact-input");
const contactInputCurrency = document.querySelector(".modal-form-contact-input-currency");
const contactOtherSityOption = document.querySelector(
  ".contact-hidden-city-option"
);
const hiddenContactCityInput = document.querySelector(
  ".contact-form-hidden-city-input"
);

const formContactOptions = document.querySelectorAll(".contact-option-form");
const hiddenPhoneInput = document.querySelector(
  ".contact-form-hidden-number-input"
);
const modalCommentTextarea = document.querySelector(".modal-form-textarea");
const allModalSelectOptions = document.querySelectorAll(".option.cform");

const hideSpecificOption = (optionType) => {
  if (optionType === "usdt") {
    const specificOptions = [...allModalSelectOptions].filter((option) => {
      const optionData = option?.dataset?.optionType?.split(" ")[1];
      return optionData === "usdt" || optionData === "Usdt";
    });
    specificOptions.forEach((option) => option.classList.toggle("hidden"));
  }
  if (optionType === "rub") {
    const specificOptions = [...allModalSelectOptions].filter((option) => {
      const optionData = option?.dataset?.optionType?.split(" ")[1];
      return optionData === "rub" || optionData === "Rub";
    });
    specificOptions.forEach((option) => option.classList.toggle("hidden"));
  }
};

const resetModalOptions = () => {
  const courseOptions = [...allModalSelectOptions].filter(
    (option) => option?.dataset?.optionType
  );
  courseOptions.forEach((option) => option.classList.remove("hidden"));
};

const setDefaultOptions = (courseType) => {
  const firstFieldCourse = courseType.split("To")[0].toUpperCase();
  const secondFieldCourse = courseType.split("To")[1].toUpperCase();
  const firstCourseOptions = document.querySelector(
    "#default_first_course_opt"
  );
  const secondCourseOptions = document.querySelector(
    "#default_second_course_opt"
  );

  firstCourseOptions.lastChild.data = firstFieldCourse;
  firstCourseOptions.children[0].children[0].src =
    FORM_IMGS_MAP[firstFieldCourse];

  secondCourseOptions.lastChild.data = secondFieldCourse;
  secondCourseOptions.children[0].children[0].src =
    FORM_IMGS_MAP[secondFieldCourse];
};

const sortCourseOptions = (formType, courseType) => {
  if (formType === "currency") {
    hideSpecificOption("usdt");
    setDefaultOptions(courseType);
  }
  if (formType === "crypto") {
    hideSpecificOption("rub");
    setDefaultOptions(courseType);
  }
};

const openModal = function (event) {
  const currencyFirstInputValue = document.querySelector(
    "#currency-form-first-input"
  ).valueAsNumber;
  const currencySecondInputValue = document.querySelector(
    "#currency-form-second-input"
  ).valueAsNumber;
  const cryptocurrencyFirstInputValue = document.querySelector(
    "#cryptocurrency-form-first-input"
  ).valueAsNumber;
  const cryptocurrencySecondInputValue = document.querySelector(
    "#cryptocurrency-form-second-input"
  ).valueAsNumber;
  const modalFormTransactionType = document.querySelector(".modal-form.cform");

  if (event.target.id === "currency-sbmt") {
    modalFormFirstInput.valueAsNumber = currencyFirstInputValue;
    modalFormSecondInput.valueAsNumber = currencySecondInputValue;
    modalFormTransactionType.setAttribute(
      "data-transaction-type",
      event.target.closest(".currency_form").getAttribute("data-currency-type")
    );
    sortCourseOptions(
      "currency",
      modalFormTransactionType.dataset.transactionType
    );
  } else if (event.target.id === "cryptocurrency-sbmt") {
    modalFormFirstInput.valueAsNumber = cryptocurrencyFirstInputValue;
    modalFormSecondInput.valueAsNumber = cryptocurrencySecondInputValue;
    modalFormTransactionType.setAttribute(
      "data-transaction-type",
      event.target
        .closest(".cryptocurrency_form")
        .getAttribute("data-currency-type")
    );
    sortCourseOptions(
      "crypto",
      modalFormTransactionType.dataset.transactionType
    );
  }

  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = function (e) {
  if (!e.target.classList.contains("cform")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    resetModalOptions();
  }
};

const closeLoadModal = function (e) {
  if (!e.target.classList.contains("cform")) {
    modalLoad.classList.add("hidden");
    overlayLoad.classList.add("hidden");
    document.body.style.overflow = "";
    resetModalOptions();
  }
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);

btnCloseLoadModal.addEventListener("click", closeLoadModal);

overlay.addEventListener("click", closeModal);

overlayLoad.addEventListener("click", closeLoadModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

modalOtherSityOption.addEventListener("click", function () {
  hiddenCityInput.classList.remove("hidden");
  cityInput.classList.add("halfWidth");
});

for (let i = 0; i < contactOptions.length; i++) {
  contactOptions[i].addEventListener("click", function () {
    hiddenContactInput.classList.remove("hidden");
    contactInput.classList.add("halfWidth");
  });
}

for (let i = 0; i < contactOptionsCurrency.length; i++) {
  contactOptionsCurrency[i].addEventListener("click", function () {
    hiddenContactInputCurrency.classList.remove("hidden");
    contactInputCurrency.classList.add("halfWidth");
  });
}

contactOtherSityOption.addEventListener("click", function () {
  hiddenContactCityInput.classList.remove("hidden");
});

for (let i = 0; i < formContactOptions.length; i++) {
  formContactOptions[i].addEventListener("click", function () {
    hiddenPhoneInput.classList.remove("hidden");
  });
}

const addEventListenersToModalForm = (course) => {
  const { rubToUsd: rubToUsdCourse, usdToRub: usdToRubCourse } = course;
  modalFormFirstInput.addEventListener("input", (event) => {
    const modalFormTransactionType = document
      .querySelector(".modal-form.cform")
      .getAttribute("data-transaction-type");
    if (modalFormTransactionType == "rubToRub") {
      modalFormSecondInput.valueAsNumber = modalFormFirstInput.valueAsNumber;
    } else if (modalFormTransactionType == "rubToUsd") {
      modalFormSecondInput.valueAsNumber = (
        Number(modalFormFirstInput.valueAsNumber) / Number(rubToUsdCourse)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdToUsd") {
      modalFormSecondInput.valueAsNumber = modalFormFirstInput.valueAsNumber;
    } else if (modalFormTransactionType == "usdToRub") {
      modalFormSecondInput.valueAsNumber = (
        Number(modalFormFirstInput.valueAsNumber) * Number(usdToRubCourse)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdToUsdt") {
      const currentConvertCource =
        Number(modalFormFirstInput.valueAsNumber) > 5000
          ? CRYPTO_COURSE.usdToUsdtSmall
          : CRYPTO_COURSE.usdtToUsdBig;
      modalFormSecondInput.valueAsNumber = (
        Number(modalFormFirstInput.valueAsNumber) -
        Number(modalFormFirstInput.valueAsNumber) * Number(currentConvertCource)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdtToUsdt") {
      modalFormSecondInput.valueAsNumber = modalFormFirstInput.valueAsNumber;
    } else if (modalFormTransactionType == "usdtToUsd") {
      const currentConvertCource =
        Number(modalFormFirstInput.valueAsNumber) > 5000
          ? CRYPTO_COURSE.usdToUsdtSmall
          : CRYPTO_COURSE.usdtToUsdBig;
      modalFormSecondInput.valueAsNumber = (
        Number(modalFormFirstInput.valueAsNumber) -
        Number(modalFormFirstInput.valueAsNumber) * Number(currentConvertCource)
      ).toFixed(2);
    }
  });

  modalFormSecondInput.addEventListener("input", () => {
    const modalFormTransactionType = document
      .querySelector(".modal-form.cform")
      .getAttribute("data-transaction-type");
    const triggerValue = modalFormTransactionType === "usdToUsdt" ? 5250 : 4750;
    if (modalFormTransactionType == "rubToRub") {
      modalFormFirstInput.valueAsNumber = modalFormSecondInput.valueAsNumber;
    } else if (modalFormTransactionType == "rubToUsd") {
      modalFormFirstInput.valueAsNumber = (
        Number(modalFormSecondInput.valueAsNumber) * Number(rubToUsdCourse)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdToUsd") {
      modalFormFirstInput.valueAsNumber = modalFormSecondInput.valueAsNumber;
    } else if (modalFormTransactionType == "usdToRub") {
      modalFormFirstInput.valueAsNumber = (
        Number(modalFormSecondInput.valueAsNumber) / Number(usdToRubCourse)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdToUsdt") {
      currentCource =
        Number(modalFormSecondInput.valueAsNumber) > triggerValue
          ? CRYPTO_COURSE.usdToUsdtSmall
          : CRYPTO_COURSE.usdtToUsdBig;
      modalFormFirstInput.valueAsNumber = (
        Number(modalFormSecondInput.valueAsNumber) / Number(1 - currentCource)
      ).toFixed(2);
    } else if (modalFormTransactionType == "usdtToUsdt") {
      modalFormFirstInput.valueAsNumber = modalFormSecondInput.valueAsNumber;
    } else if (modalFormTransactionType == "usdtToUsd") {
      currentCource =
        Number(modalFormSecondInput.valueAsNumber) > triggerValue
          ? CRYPTO_COURSE.usdToUsdtSmall
          : CRYPTO_COURSE.usdtToUsdBig;
      modalFormFirstInput.valueAsNumber = (
        Number(modalFormSecondInput.valueAsNumber) / Number(1 - currentCource)
      ).toFixed(2);
    }
  });
};

const isModalCityFieldEmpty = () => {
  if (modalCityInput.textContent.trim() == "В каком городе вы находитесь?") {
    return true;
  } else if (modalCityInput.textContent.trim() !== "Другой") {
    return false;
  } else {
    return hiddenCityInput.value.length == 0;
  }
};

const isModalContactFieldEmpty = () => {
  if (modalContactInput.textContent.trim() == "Как с вами связаться?") {
    return true;
  } else {
    return (
      document.querySelector(".modal-form-hidden-сontact-input").value.length ==
      0
    );
  }
};

const isModalCityFieldEmptyCurrency = () => {
  if (modalCityInputCurrency.textContent.trim() == "В каком городе вы находитесь?") {
    return true;
  } else if (modalCityInputCurrency.textContent.trim() !== "Другой") {
    return false;
  } else {
    return hiddenCityInput.value.length == 0;
  }
};

const isModalContactFieldEmptyCurrency = () => {
  if (modalContactInputCurrency.textContent.trim() == "Как с вами связаться?") {
    return true;
  } else {
    return false;
  }
};

const validateModalForm = () => {
  const emptyFields = [];
  if (modalFormFirstInput.value.length == 0){
    emptyFields.push(modalFormFirstInput);}
  if (modalFormSecondInput.value.length == 0){
      emptyFields.push(modalFormSecondInput);}
  if (modalFormNameInputCurrency.value.length == 0){
    emptyFields.push(modalFormNameInput);}
  if (isModalCityFieldEmptyCurrency()) {
    emptyFields.push(modalCityInputCurrency.parentElement);
    emptyFields.push(hiddenCityInput);
  }
  if (isModalContactFieldEmptyCurrency()) {
    emptyFields.push(modalContactInputCurrency.parentElement);
    emptyFields.push(hiddenContactInput);
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

const validateLoadModalForm = () => {
  const emptyFields = [];
  // if (modalFormFirstInput.value.length == 0)
  //   emptyFields.push(modalFormFirstInput);
  // if (modalFormSecondInput.value.length == 0)
  //   emptyFields.push(modalFormSecondInput);
  if (modalFormNameInput.value.length == 0)
    emptyFields.push(modalFormNameInput);
  // if (isModalCityFieldEmpty()) {
  //   emptyFields.push(modalCityInput.parentElement);
  //   emptyFields.push(hiddenCityInput);
  // }
  if (isModalContactFieldEmpty()) {
    emptyFields.push(modalContactInput.parentElement);
    emptyFields.push(hiddenContactInput);
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

modalFormSbmtBtn.addEventListener("click", async (event) => {
  
  const hiddenContactInput = document.querySelector(
    ".modal-form-hidden-сontact-input"
  );
  event.preventDefault();
  if (!validateModalForm()) return;
  const modalFormType = document
    .querySelector(".modal-form.cform")
    .getAttribute("data-transaction-type");
  const prettiredModalFormType = FORM_TYPES_MAP[modalFormType];
  const modalFormData = JSON.stringify({
    tableType: prettiredModalFormType,
    sumFrom: modalFormFirstInput.value,
    sumTo: modalFormSecondInput.value,
    name: modalFormNameInputCurrency.value,
    city:
      modalCityInputCurrency.textContent.trim() !== "Другой"
        ? modalCityInputCurrency.textContent.trim()
        : hiddenCityInput.value,
    contactType: modalContactInputCurrency.textContent.trim(),
    contact: hiddenContactInput.value,
    comment: modalCommentTextarea.value,
  });

  async function sendModalForm() {
    try {
      const response = await fetch(sendFormUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: modalFormData,
      });
    } catch (error) {
      console.error("Course service error:", error);
    }
  }
  await sendModalForm();
  // openConfirmationPopup();
  window.location.href = "first_page.html";
});

loadmodalFormSbmtBtn.addEventListener("click", async (event) => {
  const hiddenContactInput = document.querySelector(
    ".modal-form-hidden-сontact-input"
  );
  event.preventDefault();
  if (!validateLoadModalForm()) return;
  const modalFormType = document
    .querySelector(".modal-form.cform")
    .getAttribute("data-transaction-type");
  const prettiredModalFormType = FORM_TYPES_MAP[modalFormType];
  const modalFormData = JSON.stringify({
    tableType: prettiredModalFormType,
    // sumFrom: modalFormFirstInput.value,
    // sumTo: modalFormSecondInput.value,
    name: modalFormNameInput.value,
    // city:
    //   modalCityInput.textContent.trim() !== "Другой"
    //     ? modalCityInput.textContent.trim()
    //     : hiddenCityInput.value,
    contactType: modalContactInput.textContent.trim(),
    contact: hiddenContactInput.value,
    comment: modalCommentTextarea.value,
  });

  async function sendModalForm() {
    try {
      const response = await fetch(sendFormUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: modalFormData,
      });
    } catch (error) {
      console.error("Course service error:", error);
    }
  }
  await sendModalForm();
  // openConfirmationPopup();
  localStorage.setItem("loadModalHidden", "true");
  window.location.href = "first_page.html";
});

document.addEventListener("DOMContentLoaded", function() {
  const modalHidden = localStorage.getItem("loadModalHidden");
  setTimeout(() =>        
  {if(modalHidden == null){
    modalLoad.classList.remove("hidden");
    overlayLoad.classList.remove("hidden");
  }},
  2000);
  
  
});
