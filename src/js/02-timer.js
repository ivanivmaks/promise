import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.start-btn');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(picker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTime(target) {
  const interval = setInterval(() => {
    const delta = target - new Date();

    if (delta <= 0) {
      dateDays.textContent = '00';
        dateHours.textContent = '00';
        dateMinutes.textContent = '00';
        dateSeconds.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(delta);
      dateDays.textContent = addLeadingZero(days);
      dateHours.textContent = addLeadingZero(hours);
      dateMinutes.textContent = addLeadingZero(minutes);
      dateSeconds.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
    const selectedDate = picker._flatpickr.selectedDates[0];
    if (selectedDate) {
        updateTime(selectedDate.getTime());
    }
});
