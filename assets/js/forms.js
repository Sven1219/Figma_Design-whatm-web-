const INPUTS_TYPES = {
  rub: {
    inputIconSrc: "./assets/images/rub_vector.png",
    inputName: "RUB",
  },
  usd: {
    inputIconSrc: "./assets/images/usd_vector.png",
    inputName: "USD",
  },
  usdt: {
    inputIconSrc: "./assets/images/usdt_vector.png",
    inputName: "USDT",
  },
};

const CRYPTO_COURSE = {
  usdToUsdtSmall: 0.03,
  usdtToUsdBig: 0.05,
};

let currencyCourse;

const currencyTable = document.querySelector(".currency_form");
let currencyTableType = currencyTable.dataset.currencyType;
const currencySwapBtn = document.querySelector(".currency_form__switch_btn");

const cryptocurrencyTable = document.querySelector(".cryptocurrency_form");
let cryptocurrencyTableType = cryptocurrencyTable.dataset.currencyType;
const cryptocurrencySwapBtn = document.querySelector(
  ".cryptocurrency_form__switch_btn"
);

const firstInputIcon = document.querySelector(
  ".currency_form__rub-input-icon-box"
).children;
let firstIcon = firstInputIcon[0].children[0];
let firstInputText = firstInputIcon[1];

const secondInputIcon = document.querySelector(
  ".currency_form__usd-input-icon-box"
).children;
let secondIcon = secondInputIcon[0].children[0];
let secondInputText = secondInputIcon[1];

const firstCryptoInputIcon = document.querySelector(
  ".currency_form__usdt-input-icon-box"
).children;
let firstCryptoIcon = firstCryptoInputIcon[0].children[0];
let firstCryptoInputText = firstCryptoInputIcon[1];

const secondCryptoInputIcon = document.querySelector(
  ".currency_form__usd-input-icon-box.crypto"
).children;
let secondCryptoIcon = secondCryptoInputIcon[0].children[0];
let secondCryptoInputText = secondCryptoInputIcon[1];

const changeFormType = () => {
  if (currencyTableType === "rubToUsd") {
    currencyTable.setAttribute("data-currency-type", "usdToRub");
    currencyTableType = "usdToRub";
  } else {
    currencyTable.setAttribute("data-currency-type", "rubToUsd");
    currencyTableType = "rubToUsd";
  }
};

const changeCryptoFormType = () => {
  if (cryptocurrencyTableType === "usdtToUsd") {
    cryptocurrencyTable.setAttribute("data-currency-type", "usdToUsdt");
    cryptocurrencyTableType = "usdToUsdt";
  } else {
    cryptocurrencyTable.setAttribute("data-currency-type", "usdtToUsd");
    cryptocurrencyTableType = "usdtToUsd";
  }
};

const currencyFirstInput = document.querySelector("#currency-form-first-input");
const currencySecondInput = document.querySelector(
  "#currency-form-second-input"
);

const cryptocurrencyFirstInput = document.querySelector(
  "#cryptocurrency-form-first-input"
);
const cryptocurrencySecondInput = document.querySelector(
  "#cryptocurrency-form-second-input"
);

const addEventListenersToFirstForm = (course) => {
  const { rubToUsd: rubToUsdCourse, usdToRub: usdToRubCourse } = course;
  currencyCourse = course;
  currencySecondInput.valueAsNumber = (1000 / rubToUsdCourse).toFixed(2);
  currencyFirstInput.addEventListener("input", (event) => {
    if (currencyTableType === "rubToUsd") {
      currencySecondInput.valueAsNumber = (
        Number(currencyFirstInput.valueAsNumber) / Number(rubToUsdCourse)
      ).toFixed(2);
    } else {
      currencySecondInput.valueAsNumber = (
        Number(currencyFirstInput.valueAsNumber) * Number(usdToRubCourse)
      ).toFixed(2);
    }
  });

  currencySecondInput.addEventListener("input", () => {
    if (currencyTableType === "rubToUsd") {
      currencyFirstInput.valueAsNumber = (
        Number(currencySecondInput.valueAsNumber) * Number(rubToUsdCourse)
      ).toFixed(2);
    } else {
      currencyFirstInput.valueAsNumber = (
        Number(currencySecondInput.valueAsNumber) / Number(usdToRubCourse)
      ).toFixed(2);
    }
  });
};

cryptocurrencyFirstInput.addEventListener("input", (event) => {
  currentCource =
    Number(cryptocurrencyFirstInput.valueAsNumber) > 5000
      ? CRYPTO_COURSE.usdToUsdtSmall
      : CRYPTO_COURSE.usdtToUsdBig;
  if (cryptocurrencyTableType === "usdToUsdt") {
    cryptocurrencySecondInput.valueAsNumber = (
      Number(cryptocurrencyFirstInput.valueAsNumber) -
      Number(cryptocurrencyFirstInput.valueAsNumber) * Number(currentCource)
    ).toFixed(2);
  } else {
    cryptocurrencySecondInput.valueAsNumber = (
      Number(cryptocurrencyFirstInput.valueAsNumber) -
      Number(cryptocurrencyFirstInput.valueAsNumber) * Number(currentCource)
    ).toFixed(2);
  }
});

cryptocurrencySecondInput.addEventListener("input", () => {
  const triggerValue = cryptocurrencyTableType === "usdToUsdt" ? 5250 : 4750;
  currentCource =
    Number(cryptocurrencySecondInput.valueAsNumber) > triggerValue
      ? CRYPTO_COURSE.usdToUsdtSmall
      : CRYPTO_COURSE.usdtToUsdBig;
  if (cryptocurrencyTableType === "usdToUsdt") {
    cryptocurrencyFirstInput.valueAsNumber = (
      Number(cryptocurrencySecondInput.valueAsNumber) /
      Number(1 - currentCource)
    ).toFixed(2);
  } else {
    cryptocurrencyFirstInput.valueAsNumber = (
      Number(cryptocurrencySecondInput.valueAsNumber) /
      Number(1 - currentCource)
    ).toFixed(2);
  }
});

const swapInputs = () => {
  const firstInputValue = currencyFirstInput.valueAsNumber;
  const secondInputValue = currencySecondInput.valueAsNumber;
  currencyFirstInput.valueAsNumber = secondInputValue;
  if (currencyTableType === "usdToRub") {
    currencySecondInput.valueAsNumber = (
      Number(currencyFirstInput.valueAsNumber) / Number(currencyCourse.rubToUsd)
    ).toFixed(2);
  } else {
    currencySecondInput.valueAsNumber = (
      Number(currencyFirstInput.valueAsNumber) * Number(currencyCourse.usdToRub)
    ).toFixed(2);
  }
  if (currencyTableType === "rubToUsd") {
    firstIcon.src = INPUTS_TYPES.usd.inputIconSrc;
    firstInputText.textContent = INPUTS_TYPES.usd.inputName;
    secondIcon.src = INPUTS_TYPES.rub.inputIconSrc;
    secondInputText.textContent = INPUTS_TYPES.rub.inputName;
  } else if (currencyTableType === "usdToRub") {
    firstIcon.src = INPUTS_TYPES.rub.inputIconSrc;
    firstInputText.textContent = INPUTS_TYPES.rub.inputName;
    secondIcon.src = INPUTS_TYPES.usd.inputIconSrc;
    secondInputText.textContent = INPUTS_TYPES.usd.inputName;
  }
  changeFormType();
};

const swapCryptoInputs = () => {
  const firstInputValue = cryptocurrencyFirstInput.valueAsNumber;
  const secondInputValue = cryptocurrencySecondInput.valueAsNumber;
  cryptocurrencyFirstInput.valueAsNumber = secondInputValue;
  currentCource =
    Number(cryptocurrencyFirstInput.valueAsNumber) > 5000
      ? CRYPTO_COURSE.usdToUsdtSmall
      : CRYPTO_COURSE.usdtToUsdBig;
  if (cryptocurrencyTableType === "usdtToUsd") {
    cryptocurrencySecondInput.valueAsNumber = (
      Number(cryptocurrencyFirstInput.valueAsNumber) -
      Number(cryptocurrencyFirstInput.valueAsNumber) * Number(currentCource)
    ).toFixed(2);
  } else {
    cryptocurrencySecondInput.valueAsNumber = (
      Number(cryptocurrencyFirstInput.valueAsNumber) -
      Number(cryptocurrencyFirstInput.valueAsNumber) * Number(currentCource)
    ).toFixed(2);
  }
  if (cryptocurrencyTableType === "usdtToUsd") {
    firstCryptoIcon.src = INPUTS_TYPES.usd.inputIconSrc;
    firstCryptoInputText.textContent = INPUTS_TYPES.usd.inputName;
    secondCryptoIcon.src = INPUTS_TYPES.usdt.inputIconSrc;
    secondCryptoInputText.textContent = INPUTS_TYPES.usdt.inputName;
  } else if (cryptocurrencyTableType === "usdToUsdt") {
    firstCryptoIcon.src = INPUTS_TYPES.usdt.inputIconSrc;
    firstCryptoInputText.textContent = INPUTS_TYPES.usdt.inputName;
    secondCryptoIcon.src = INPUTS_TYPES.usd.inputIconSrc;
    secondCryptoInputText.textContent = INPUTS_TYPES.usd.inputName;
  }
  changeCryptoFormType();
};

const rotateBtnClick = () => {
  currencySwapBtn.classList.toggle("rotation180");
  currencySwapBtn.classList.toggle("rotation0");
  swapInputs();
};

const rotateCryptoBtnClick = () => {
  cryptocurrencySwapBtn.classList.toggle("rotation180");
  cryptocurrencySwapBtn.classList.toggle("rotation0");
  swapCryptoInputs();
};

currencySwapBtn.addEventListener("click", (event) => {
  event.preventDefault();
  rotateBtnClick();
});

cryptocurrencySwapBtn.addEventListener("click", (event) => {
  event.preventDefault();
  rotateCryptoBtnClick();
});
