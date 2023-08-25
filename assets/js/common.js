if (Swiper) {
  const quotersSlider = new Swiper('.quotes__hidden', {
		effect: 'coverflow',
		slidesPerView: 1,
    spaceBetween: 20,
    speed: 500,
    pagination: {
      el: '.quotes__slider-pag', // Элемент контейнера буллетов
      clickable: true, // Сделать буллеты кликабельными
    },
  })
}

if (AOS) {
  AOS.init({
    once: true
  })
}

document.addEventListener("DOMContentLoaded", function() {
  // Get the form by its class
  const form = document.querySelector(".form");

  form.addEventListener("submit", async function(e) {
      e.preventDefault();

      const name = form.querySelector("[name='name']").value.trim();
      const phone = form.querySelector("[name='phoneNumber']").value.trim();
      const email = form.querySelector("[name='email']").value.trim();
      const sum = parseFloat(form.querySelector("[name='sum']").value.trim());
      // Validation
      if (!name || !phone || !email || isNaN(sum)) {
          alertForm("Пожалуйста, заполните все поля.");
          return;
      }
      if (!validateEmail(email)) {
          alertForm("Пожалуйста, введите действительный адрес электронной почты.");
          return;
      }
      if (sum < 50000) {
          alertForm("Сумма должна быть не менее 50,000$.");
          return;
      }

      // Collect data from the form
      const formData = new FormData(form);

      // Convert FormData to JSON
      const data = {};
      formData.forEach((value, key) => {
          data[key] = value;
      });

      try {
          const response = await fetch("https://whatmoneyapi.azurewebsites.net/invest", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              // If the response was successful, display a popup
              successForm("Ваша заявка принята!");
              form.reset();
          } else {
              // Handle error
              alertForm("Произошла ошибка при отправке. Пожалуйста, попробуйте снова.");
          }
      } catch (error) {
          console.error("Error:", error);
          alertForm("Произошла ошибка при отправке. Пожалуйста, попробуйте снова.");
      }
  });
});

function alertForm(message) {
  const messageContainer = document.getElementById("formMessage");
  messageContainer.textContent = message;
  // Optionally, hide the message after a few seconds
  setTimeout(() => {
      messageContainer.textContent = '';
  }, 5000);  // 5 seconds
}

function successForm(message) {
  const messageContainer = document.getElementById("formSuccess");
  messageContainer.textContent = message;
  // Optionally, hide the message after a few seconds
  setTimeout(() => {
      messageContainer.textContent = '';
  }, 20000);  // 5 seconds
}


function validateEmail(email) {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
}
