const selectInputs = document.querySelectorAll(".select");
const contactCitySelectBox = document.querySelector("#contact-city-select-box");
const contactWaySelectBox = document.querySelector("#contact-way-select-box");
const modalCitySelectBox = document.querySelector("#modal-city-select-box");
const modalWaySelectBox = document.querySelector("#modal-way-select-box");
const contactSection = document.querySelector(".contacts_container");
const contactContentBox = document.querySelector(
  ".contacts_container_content-box"
);
const modalFormContainer = document.querySelector(".modal-form.cform");
const modalFormSelectsContainer = document.querySelector(
  ".modal-form-selects-overflow-box.cform"
);
const modalOverlay = document.querySelector(".overlay");
const overlayScrollActivator = document.querySelector(".activator-ov");
const isMobile = window.innerWidth <= 767;

let index = 1;
const on = (listener, query, fn) => {
  document.querySelectorAll(query).forEach((item) => {
    item.addEventListener(listener, (el) => {
      fn(el);
    });
  });
};
const changeBoxHeight = (operationType, box, heigthValue, addingValue) => {
  if (operationType === "addition") {
    box.style.height = heigthValue + addingValue + "vh";
  }
  if (operationType === "reset") {
    box.style.height = heigthValue - addingValue + "vh";
  }
  if (operationType === "additionpercent") {
    box.style.height = heigthValue + addingValue + "%";
  }
  if (operationType === "resetpercent") {
    box.style.height = heigthValue - addingValue + "%";
  }
};
const removeAllEventListeners = (element) => {
  elClone = element.cloneNode(true);
  element.parentNode.replaceChild(elClone, element);
};
const addPhoneMaskToInputs = () => {
  [].forEach.call(document.querySelectorAll(".phone-mask"), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
    input.addEventListener("mouseup", (event) => {
      event.preventDefault();
      if (input.value.length < 4) {
        input.setSelectionRange(4, 4);
      } else {
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });
};
const convertVhToPx = (vhValue) => (window.innerHeight * vhValue) / 100;
const convertPxToVH = (pxValue) => (pxValue * 100) / window.innerHeight;
const getBoxHeight = (box) => convertPxToVH(box.offsetHeight);
const toLowerCase = (str) => str.toLowerCase();
const toCapitalCase = (str) => {
  return str
    .split("")
    .map((word, i) => (i === 0 ? word.toUpperCase() : word.toLowerCase()))
    .join("");
};

const changeModalCourseOptions = (fieldType, fieldValue) => {
  const optionFields = document.querySelectorAll(".selectBtn.cform");
  const firstOption = optionFields[0];
  const secondOption = optionFields[1];
  if (fieldType == "1") {
    firstOption.lastChild.data = fieldValue.toUpperCase();
    firstOption.children[0].children[0].src =
      secondOption.children[0].children[0].src;
  }
  if (fieldType == "2") {
    secondOption.lastChild.data = fieldValue.toUpperCase();
    secondOption.children[0].children[0].src =
      firstOption.children[0].children[0].src;
  }
};

const changeModalFormType = (fieldType, fieldValue) => {
  const modalForm = document.querySelector(".modal-form.cform");
  const modalFormTransactionType = modalForm.getAttribute(
    "data-transaction-type"
  );
  const transactionTypeArr = modalFormTransactionType.split("To");
  if (fieldType == "1") {
    transactionTypeArr[0] = fieldValue;
    const newTransactionType = transactionTypeArr.join("To");
    modalForm.setAttribute("data-transaction-type", newTransactionType);
  }
  if (fieldType == "2") {
    transactionTypeArr[1] = fieldValue;
    const newTransactionType = transactionTypeArr.join("To");
    modalForm.setAttribute("data-transaction-type", newTransactionType);
  }
};

const addDropdownEffect = (item) => {
  const contactSectionHeight = getBoxHeight(contactSection);
  const contactContentBoxHeight = getBoxHeight(contactContentBox);
  const modalFormContainerHeight = getBoxHeight(modalFormContainer);
  const modalFormSelectsContainerHeight = getBoxHeight(
    modalFormSelectsContainer
  );
  const modalOverlayHeight = getBoxHeight(modalOverlay);
  const overlayScrollActivatorHeight = getBoxHeight(overlayScrollActivator);

  if (item.target.id === "contact-city-default-input") {
    contactCitySelectBox.classList.toggle("city-select-margin");
    changeBoxHeight("addition", contactSection, contactSectionHeight, 16.6);
    changeBoxHeight(
      "addition",
      contactContentBox,
      contactContentBoxHeight,
      16.6
    );
    window.scrollBy(0, convertVhToPx(16.6));
  }
  if (item.target.id === "contact-way-default-input") {
    contactWaySelectBox.classList.toggle("contact-way-margin");
    changeBoxHeight("addition", contactSection, contactSectionHeight, 27.5);
    changeBoxHeight(
      "addition",
      contactContentBox,
      contactContentBoxHeight,
      27.5
    );
    window.scrollBy(0, convertVhToPx(27.5));
  }
  if (item.target.id === "modal-city-input") {
    modalCitySelectBox.classList.toggle("city-select-margin");
    changeBoxHeight("addition", modalOverlay, modalOverlayHeight, 16.6);
    const additionalFormValue = isMobile ? 13.5 : 4.233; //5.233
    const additionalOverflowValue = isMobile ? 0 : 50; //16.6
    changeBoxHeight(
      "addition",
      modalFormContainer,
      modalFormContainerHeight,
      additionalFormValue
    );
    changeBoxHeight(
      "addition",
      modalFormSelectsContainer,
      modalFormSelectsContainerHeight,
      16.6
    );
    changeBoxHeight(
      "additionpercent",
      overlayScrollActivator,
      overlayScrollActivatorHeight,
      additionalOverflowValue
    );
    modalOverlay.scrollBy(0, convertVhToPx(16.6));
  }
  if (item.target.id === "modal-contact-input") {
    modalWaySelectBox.classList.toggle("contact-way-margin");
    const additionalFormValue = isMobile ? 23.4 : 14.6; //16.6
    const additionalOverflowValue = isMobile ? 0 : 80; //27.5
    changeBoxHeight("addition", modalOverlay, modalOverlayHeight, 27.5);
    changeBoxHeight(
      "addition",
      modalFormContainer,
      modalFormContainerHeight,
      additionalFormValue
    );
    changeBoxHeight(
      "addition",
      modalFormSelectsContainer,
      modalFormSelectsContainerHeight,
      27.5
    );
    //here
    changeBoxHeight(
      "additionpercent",
      overlayScrollActivator,
      overlayScrollActivatorHeight,
      additionalOverflowValue
    );
    modalOverlay.scrollBy(0, convertVhToPx(27.5));
  }
};

const removeDropdownEffect = (item) => {
  const contactSectionHeight = getBoxHeight(contactSection);
  const contactContentBoxHeight = getBoxHeight(contactContentBox);
  const modalFormContainerHeight = getBoxHeight(modalFormContainer);
  const modalFormSelectsContainerHeight = getBoxHeight(
    modalFormSelectsContainer
  );
  const modalOverlayHeight = getBoxHeight(modalOverlay);
  const overlayScrollActivatorHeight = getBoxHeight(overlayScrollActivator);
  if (
    item?.target?.id === "contact-city-default-input" ||
    item?.id === "contact-city-default-input"
  ) {
    contactCitySelectBox.classList.remove("city-select-margin");
    contactWaySelectBox.classList.remove("contact-way-margin");
    if (isMobile && contactSectionHeight > 167) {
      changeBoxHeight(
        "reset",
        contactSection,
        contactSectionHeight,
        contactSectionHeight - 150
      );
      changeBoxHeight(
        "reset",
        contactContentBox,
        contactContentBoxHeight,
        contactContentBoxHeight - 100
      );
    } else {
      changeBoxHeight("reset", contactSection, contactSectionHeight, 16.6);
      changeBoxHeight(
        "reset",
        contactContentBox,
        contactContentBoxHeight,
        16.6
      );
    }

    window.scrollBy(0, -convertVhToPx(16.6));
  }
  if (
    item?.target?.id === "contact-way-default-input" ||
    item?.id === "contact-way-default-input"
  ) {
    contactWaySelectBox.classList.remove("contact-way-margin");
    if (isMobile && contactSectionHeight > 178) {
      changeBoxHeight(
        "reset",
        contactSection,
        contactSectionHeight,
        contactSectionHeight - 150
      );
      changeBoxHeight(
        "reset",
        contactContentBox,
        contactContentBoxHeight,
        contactContentBoxHeight - 100
      );
    } else {
      changeBoxHeight("reset", contactSection, contactSectionHeight, 27.5);
      changeBoxHeight(
        "reset",
        contactContentBox,
        contactContentBoxHeight,
        27.5
      );
    }
    window.scrollBy(0, -convertVhToPx(27.5));
  }
  if (
    item?.target?.id === "modal-city-input" ||
    item?.id === "modal-city-input"
  ) {
    modalCitySelectBox.classList.remove("city-select-margin");
    changeBoxHeight("reset", modalOverlay, modalOverlayHeight, 16.58);
    const formHValue = isMobile ? 85 : 80;
    const isSecondSelectOpen =
      modalWaySelectBox.classList.contains("contact-way-margin");
    const containerSubtrahendValue = isSecondSelectOpen
      ? formHValue + 27.5
      : formHValue;
    const selectsSubtrahendValue = isSecondSelectOpen ? 49.5 + 27.5 : 49.5;
    const scrollDivValue = isMobile ? 120 : 100;
    const additionalOverflowValue = isMobile ? 0 : 50; //16.6
    const scrollSubtrahendValue = isSecondSelectOpen
      ? scrollDivValue + additionalOverflowValue
      : scrollDivValue;
    changeBoxHeight(
      "reset",
      modalFormContainer,
      modalFormContainerHeight,
      modalFormContainerHeight - containerSubtrahendValue
    );
    changeBoxHeight(
      "reset",
      modalFormSelectsContainer,
      modalFormSelectsContainerHeight,
      modalFormSelectsContainerHeight - selectsSubtrahendValue
    );
    //here
    changeBoxHeight(
      "resetpercent",
      overlayScrollActivator,
      overlayScrollActivatorHeight,
      overlayScrollActivatorHeight - scrollSubtrahendValue
    );
  }
  if (
    item?.target?.id === "modal-contact-input" ||
    item?.id === "modal-contact-input"
  ) {
    modalWaySelectBox.classList.remove("contact-way-margin");
    changeBoxHeight("reset", modalOverlay, modalOverlayHeight, 27.48);
    const formHValue = isMobile ? 85 : 80;
    const isSecondSelectOpen =
      modalCitySelectBox.classList.contains("city-select-margin");
    const containerSubtrahendValue = isSecondSelectOpen
      ? formHValue + 16.6
      : formHValue;
    const selectsSubtrahendValue = isSecondSelectOpen ? 49.5 + 16.6 : 49.5;
    const scrollDivValue = isMobile ? 120 : 100;
    const additionalOverflowValue = isMobile ? 0 : 80; //27.5
    const scrollSubtrahendValue = isSecondSelectOpen
      ? scrollDivValue + additionalOverflowValue
      : scrollDivValue;
    changeBoxHeight(
      "reset",
      modalFormContainer,
      modalFormContainerHeight,
      modalFormContainerHeight - containerSubtrahendValue
    );
    changeBoxHeight(
      "reset",
      modalFormSelectsContainer,
      modalFormSelectsContainerHeight,
      modalFormSelectsContainerHeight - selectsSubtrahendValue
    );
    changeBoxHeight(
      "resetpercent",
      overlayScrollActivator,
      overlayScrollActivatorHeight,
      overlayScrollActivatorHeight - scrollSubtrahendValue
    );
  }
};

on("click", ".selectBtn", (item) => {
  const selectOverlay = document.querySelector(".select-overlay");
  const parent = item.target.closest(".select");
  const next = item.target.nextElementSibling;
  next.classList.toggle("toggle");
  next.style.zIndex = index++;
  parent.classList.toggle("border");
  if (!parent.classList.contains("border")) {
    removeDropdownEffect(item);
  }
  if (parent.classList.contains("border")) {
    addDropdownEffect(item);
  }
  selectOverlay.classList.toggle("hidden");
  selectOverlay.addEventListener("click", function (event) {
    next.classList.toggle("toggle");
    parent.classList.toggle("border");
    removeDropdownEffect(item);
    selectOverlay.classList.toggle("hidden");
    this.removeEventListener("click", arguments.callee, false);
  });
  // setTimeout(() => {
  //   if (
  //     !modal.classList.contains("hidden") &&
  //     parent.classList.contains("border")
  //   ) {
  //     modal.addEventListener("click", function (event) {
  //       if (
  //         !event.target.classList.contains("option") &&
  //         parent.classList.contains("border") &&
  //         !modalCitySelectBox.classList.contains("city-select-margin") &&
  //         !modalWaySelectBox.classList.contains("contact-way-margin")
  //       ) {
  //         next.classList.toggle("toggle");
  //         parent.classList.toggle("border");
  //         removeDropdownEffect(item);
  //       }
  //       this.removeEventListener("click", arguments.callee, false);
  //     });
  //   }
  // }, 10);
});

on("click", ".option", (item) => {
  let isFirstMask = false;
  const modalSpecInput = document.querySelector(
    ".modal-form-hidden-сontact-input"
  );
  const contactSpecField = document.querySelector("#contact-way-spec-input");
  const modalFormCurrencyType = document
    .querySelector(".modal-form.cform")
    .getAttribute("data-transaction-type");
  const hiddenContactFormCityInput = document.querySelector(
    ".contact-form-hidden-city-input.contacts_container_input.name-input"
  );
  const usMapImg = document.querySelector("#us_map_img");
  const usMapMobileBox = document.querySelector(
    ".contacts_map-img-box.contacts-map-mobile"
  );
  const usMapMobileImg = document.querySelector("#us_map_mobile_img");
  const selectOverlay = document.querySelector(".select-overlay");
  if (
    item.srcElement.nodeName === "IMG" ||
    item.srcElement.classList.contains("currency-option-icon")
  )
    return;

  if (item.srcElement.classList.value === "option cform") {
    const modalFormFirstInput = document.querySelector(
      "#modal-form-first-input"
    );
    const [fieldType, fieldValue] = item.srcElement
      .getAttribute("data-option-type")
      .split(" ");
    const [itemFieldNum, itemFieldType] =
      item.target.dataset.optionType.split(" ");
    const [firstFieldType, secondFieldType] = modalFormCurrencyType.split("To");
    if (itemFieldNum == "1") {
      if (itemFieldType.toUpperCase() === secondFieldType.toUpperCase()) {
        changeModalFormType("1", toLowerCase(secondFieldType));
        changeModalFormType("2", toCapitalCase(firstFieldType));
        changeModalCourseOptions("2", firstFieldType);
        modalFormFirstInput.dispatchEvent(new Event("input"));
      }
    } else if (itemFieldNum == "2") {
      if (itemFieldType.toUpperCase() === firstFieldType.toUpperCase()) {
        changeModalFormType("1", toLowerCase(secondFieldType));
        changeModalFormType("2", toCapitalCase(firstFieldType));
        changeModalCourseOptions("1", secondFieldType);
        modalFormFirstInput.dispatchEvent(new Event("input"));
      }
    }
    changeModalFormType(fieldType, fieldValue);
  }

  if (item.srcElement.classList.contains("contact-tg-option")) {
    contactSpecField.placeholder = "Введите ваш username или телефон";
    removeAllEventListeners(contactSpecField);
    isFirstMask = true;
  } else {
    contactSpecField.placeholder = "Введите ваш телефон";
    addPhoneMaskToInputs();
  }

  if (item.srcElement.classList.contains("modal-tg-option")) {
    modalSpecInput.placeholder = "username/телефон";
    removeAllEventListeners(modalSpecInput);
  } else {
    modalSpecInput.placeholder = "Введите телефон";
    !isFirstMask && addPhoneMaskToInputs();
  }
  isMaskAdded = false;
  if (
    item.target.dataset.type === "LAOption" &&
    !item.target.classList.contains("cform")
  ) {
    hiddenContactFormCityInput.classList.add("hidden");
    if (window.innerWidth > 767) {
      usMapImg.classList.remove("mi-scale");
      usMapImg.classList.add("la-scale");
    } else {
      usMapMobileBox.classList.add("mobile-map-box-scale");
      usMapMobileImg.classList.remove("mi-scale-mobile");
      usMapMobileImg.classList.add("la-scale-mobile");
    }
  }
  if (
    item.target.dataset.type === "MiamiOption" &&
    !item.target.classList.contains("cform")
  ) {
    hiddenContactFormCityInput.classList.add("hidden");
    if (window.innerWidth > 767) {
      usMapImg.classList.remove("la-scale");
      usMapImg.classList.add("mi-scale");
    } else {
      usMapMobileBox.classList.add("mobile-map-box-scale");
      usMapMobileImg.classList.remove("la-scale-mobile");
      usMapMobileImg.classList.add("mi-scale-mobile");
    }
  }
  if (
    item.target.dataset.type === "otherOption" &&
    !item.target.classList.contains("cform")
  ) {
    if (window.innerWidth > 767) {
      usMapImg.classList.remove("la-scale");
      usMapImg.classList.remove("mi-scale");
    } else {
      usMapMobileBox.classList.remove("mobile-map-box-scale");
      usMapMobileImg.classList.remove("la-scale-mobile");
      usMapMobileImg.classList.remove("mi-scale-mobile");
    }
  }

  item.target.parentElement.classList.remove("toggle");
  const parent = item.target.closest(".select").children[0];
  parent.setAttribute("data-type", item.target.getAttribute("data-type"));
  parent.innerHTML = item.target.innerHTML;
  item.target.closest(".select").classList.toggle("border");
  removeDropdownEffect(item.target.parentElement.previousElementSibling);
  selectOverlay.classList.toggle("hidden");
  selectOverlay.replaceWith(selectOverlay.cloneNode(true));
});
