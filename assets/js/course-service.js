const rdToUsdField = document.querySelector(".currency_form__info-course")
  .children[0].children[0];
const usdToRubField = document.querySelector(".currency_form__info-course")
  .children[1].children[0];

const url = "https://whatmoneyapi.azurewebsites.net/rb";

const changeCourse = (result, type) => {
  if (type === "rb") {
    rdToUsdField.textContent = result.rubToUsd;
    usdToRubField.textContent = result.usdToRub;
  }
};

async function fetchCourse() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const middleResult = await response;
    if (middleResult.status === 204) fetchCourse();
    const result = await response.json();
    changeCourse(result, "rb");
    addEventListenersToFirstForm(result);
    addEventListenersToModalForm(result);
    return result;
  } catch (error) {
    console.error("Course service error:", error);
  }
}

fetchCourse();
