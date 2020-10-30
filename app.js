function app() {
  //Tlačítka
  const navigationButtons = document.querySelectorAll(".navigation button");
  const amrapButton = document.querySelector(".AMRAP");
  const tabataButton = document.querySelector(".tabata");
  const emomButton = document.querySelector(".EMOM");
  const stopkyButton = document.querySelector(".stopky");

  const startButton = document.querySelector(".start");
  const pauseButton = document.querySelector(".pause");
  const resetButton = document.querySelector(".stop");

  const minutesPlusBtn = document.querySelector(".btn-minutes-plus");
  const minutesMinusBtn = document.querySelector(".btn-minutes-minus");
  const secondsPlusBtn = document.querySelector(".btn-seconds-plus");
  const secondsMinusBtn = document.querySelector(".btn-seconds-minus");

  const workMinutesPlusBtn = document.querySelector(".btn-work-minutes-plus");
  const workSecondsPlusBtn = document.querySelector(".btn-work-seconds-plus");
  const workMinutesMinusBtn = document.querySelector(".btn-work-minutes-minus");
  const workSecondsMinusBtn = document.querySelector(".btn-work-seconds-minus");

  const restMinutesPlusBtn = document.querySelector(".btn-rest-minutes-plus");
  const restSecondsPlusBtn = document.querySelector(".btn-rest-seconds-plus");
  const restMinutesMinusBtn = document.querySelector(".btn-rest-minutes-minus");
  const restSecondsMinusBtn = document.querySelector(".btn-rest-seconds-minus");

  const roundsPlusBtn = document.querySelector(".btn-rounds-plus");
  const roundsMinusBtn = document.querySelector(".btn-rounds-minus");

  //Text, labely
  const time = document.querySelector(".time-show");
  const minutesInput = document.querySelector(".minutes");
  const secondsInput = document.querySelector(".seconds");
  const tabataTime = document.querySelector(".tabata-show");
  const tabataSetup = document.querySelector(".tabata-setup");
  const workTimeShow = document.querySelector(".work-show");
  const restTimeShow = document.querySelector(".rest-show");

  const workMinutesInput = document.querySelector(".work-minutes");
  const workSecondsInput = document.querySelector(".work-seconds");

  const restMinutesInput = document.querySelector(".rest-minutes");
  const restSecondsInput = document.querySelector(".rest-seconds");

  const numberOfRounds = document.querySelector(".tabata-rounds");

  //Sounds
  const shortSound = document.querySelector(".short-sound");
  const longSound = document.querySelector(".long-sound");
  const video = document.querySelector(".video");

  //images
  const startButtonImage = document.querySelector(".start-image");

  //div, form
  const timerSetupForm = document.querySelector(".timer-setup");

  //čas
  let amrapTime = new Date();
  let workTime = new Date();
  let restTime = new Date();

  let workSecondsFromInput;
  let workMinutesFromInput;
  let restSecondsFromInput;
  let restMinutesFromInput;
  let tabataTimeSeconds;
  let tabataTimeMinutes;

  let startTime;
  let updatedTime;
  let diferenceTime;
  let workDiferenceTime;
  let restDiferenceTime;
  let savedTime;
  let intertval;
  let getReadyInterval;

  let isPaused = false;
  let isFirstRound = true;
  let work = true;

  let isAMRAP = true;
  let isTabata = false;
  let isEMOM = false;
  let isStopky = false;

  //default AMRAP setting
  amrapButton.style.color = "black";

  // //assign value of inputs
  // minutesInput.addEventListener("change", (e) => {
  //   minutesFromInput = e.target.value;
  //   minutesFromInput =
  //     minutesFromInput < 10 ? `0${minutesFromInput}` : minutesFromInput;
  //   time.textContent = `${minutesFromInput}:${secondsInput.value}`;
  // });
  // secondsInput.addEventListener("change", (e) => {
  //   secondsFromInput = e.target.value;
  //   if (secondsFromInput < 10) {
  //     secondsFromInput = "0" + secondsFromInput;
  //     secondsFromInput.value = 0;
  //   }
  //   time.textContent = `${minutesInput.value}:${secondsFromInput}`;
  // });

  // Time control buttons behaviour

  //MINUTES
  minutesPlusBtn.addEventListener("click", () => {
    if (minutesInput.value < 59) {
      minutesInput.value++;
      if (minutesInput.value < 10) {
        minutesInput.value = "0" + minutesInput.value;
      }
      time.textContent = `${minutesInput.value}:${secondsInput.value}`;
    }
  });

  minutesMinusBtn.addEventListener("click", () => {
    if (minutesInput.value > 0) {
      minutesInput.value--;
      if (minutesInput.value < 10) {
        minutesInput.value = "0" + minutesInput.value;
      }
      time.textContent = `${minutesInput.value}:${secondsInput.value}`;
    }
  });

  //SECONDS
  secondsPlusBtn.addEventListener("click", () => {
    if (secondsInput.value < 59) {
      secondsInput.value++;
      if (secondsInput.value < 10) {
        secondsInput.value = "0" + secondsInput.value;
      }
      time.textContent = `${minutesInput.value}:${secondsInput.value}`;
    }
  });

  secondsMinusBtn.addEventListener("click", () => {
    if (secondsInput.value > 0) {
      secondsInput.value--;
      if (secondsInput.value < 10) {
        secondsInput.value = "0" + secondsInput.value;
      }
      time.textContent = `${minutesInput.value}:${secondsInput.value}`;
    }
  });

  //TABATA INPUTS

  // Work
  // Minutes
  workMinutesPlusBtn.addEventListener("click", () => {
    if (workMinutesInput.value < 59) {
      workMinutesInput.value++;
      countTabataTime();
      if (workMinutesInput.value < 10) {
        workMinutesInput.value = "0" + workMinutesInput.value;
      }
      workTimeShow.textContent = `${workMinutesInput.value}:${workSecondsInput.value}`;
    }
  });

  workMinutesMinusBtn.addEventListener("click", () => {
    if (workMinutesInput.value > 0) {
      workMinutesInput.value--;
      countTabataTime();
      if (workMinutesInput.value < 10) {
        workMinutesInput.value = "0" + workMinutesInput.value;
      }
      workTimeShow.textContent = `${workMinutesInput.value}:${workSecondsInput.value}`;
    }
  });

  // Seconds
  workSecondsPlusBtn.addEventListener("click", () => {
    if (workSecondsInput.value < 59) {
      workSecondsInput.value++;
      countTabataTime();
      if (workSecondsInput.value < 10) {
        workSecondsInput.value = "0" + workSecondsInput.value;
      }
      workTimeShow.textContent = `${workMinutesInput.value}:${workSecondsInput.value}`;
    }
  });

  workSecondsMinusBtn.addEventListener("click", () => {
    if (workSecondsInput.value > 0) {
      workSecondsInput.value--;
      countTabataTime();
      if (workSecondsInput.value < 10) {
        workSecondsInput.value = "0" + workSecondsInput.value;
      }
      workTimeShow.textContent = `${workMinutesInput.value}:${workSecondsInput.value}`;
    }
  });

  //Rest
  //Minutes
  restMinutesPlusBtn.addEventListener("click", () => {
    if (restMinutesInput.value < 59) {
      restMinutesInput.value++;
      countTabataTime();
      if (restMinutesInput.value < 10) {
        restMinutesInput.value = "0" + restMinutesInput.value;
      }
      restTimeShow.textContent = `${restMinutesInput.value}:${restSecondsInput.value}`;
    }
  });

  restMinutesMinusBtn.addEventListener("click", () => {
    if (restMinutesInput.value > 0) {
      restMinutesInput.value--;
      countTabataTime();
      if (restMinutesInput.value < 10) {
        restMinutesInput.value = "0" + restMinutesInput.value;
      }
      restTimeShow.textContent = `${restMinutesInput.value}:${restMinutesInput.value}`;
    }
  });

  //Seconds
  restSecondsPlusBtn.addEventListener("click", () => {
    if (restSecondsInput.value < 59) {
      restSecondsInput.value++;
      countTabataTime();
      if (restSecondsInput.value < 10) {
        restSecondsInput.value = "0" + restSecondsInput.value;
      }
      restTimeShow.textContent = `${restMinutesInput.value}:${restSecondsInput.value}`;
    }
  });

  restSecondsMinusBtn.addEventListener("click", () => {
    if (restSecondsInput.value > 0) {
      restSecondsInput.value--;
      if (restSecondsInput.value < 10) {
        restSecondsInput.value = "0" + restSecondsInput.value;
      }
      restTimeShow.textContent = `${workMinutesInput.value}:${workSecondsInput.value}`;
    }
  });

  //Number of rounds
  roundsPlusBtn.addEventListener("click", () => {
    numberOfRounds.value++;
    countTabataTime();
  });

  roundsMinusBtn.addEventListener("click", () => {
    if (numberOfRounds.value > 0) {
      numberOfRounds.value--;
      countTabataTime();
    }
  });

  function countTabataTime() {
    //seconds and minutes for the count
    let seconds =
      parseInt(restSecondsInput.value) + parseInt(workSecondsInput.value);
    let minutes =
      parseInt(restMinutesInput.value) + parseInt(restMinutesInput.value);
    console.log(minutes, seconds);
    let restultInSeconds = (seconds + minutes * 60) * numberOfRounds.value;

    tabataTimeSeconds = restultInSeconds % 60;
    tabataTimeMinutes = Math.floor(restultInSeconds / 60);

    console.log(tabataTimeSeconds, tabataTimeMinutes);

    //edit formate
    let resultSeconds =
      tabataTimeSeconds < 10 ? `0${tabataTimeSeconds}` : tabataTimeSeconds;
    let resultMinutes =
      tabataTimeMinutes < 10 ? `0${tabataTimeMinutes}` : tabataTimeMinutes;

    time.textContent = `${resultMinutes}:${resultSeconds}`;
  }

  //reset the style of buttons
  function resetButtons() {
    navigationButtons.forEach((button) => {
      button.style.color = "";
    });
  }

  amrapButton.addEventListener("click", () => {
    resetButtons();
    amrapButton.style.color = "black";
    timerSetupForm.style.display = "";
    tabataSetup.style.display = "none";
    tabataTime.style.display = "none";
    isAMRAP = true;
    isTabata = false;
    isEMOM = false;
    isStopky = false;
  });

  stopkyButton.addEventListener("click", () => {
    resetButtons();
    stopkyButton.style.color = "black";
    timerSetupForm.style.display = "none";
    tabataSetup.style.display = "none";
    tabataTime.style.display = "none";
    time.textContent = "00:00";
    isAMRAP = false;
    isTabata = false;
    isEMOM = false;
    isStopky = true;
  });

  emomButton.addEventListener("click", () => {
    resetButtons();
    emomButton.style.color = "black";
    timerSetupForm.style.display = "";
    tabataSetup.style.display = "none";
    tabataTime.style.display = "none";
    isAMRAP = false;
    isTabata = false;
    isEMOM = true;
    isStopky = false;
  });

  tabataButton.addEventListener("click", () => {
    resetButtons();
    tabataButton.style.color = "black";
    timerSetupForm.style.display = "none";
    tabataSetup.style.display = "block";
    tabataTime.style.display = "block";
    isAMRAP = false;
    isTabata = true;
    isEMOM = false;
    isStopky = false;
  });

  //Start the timer
  function timerStartStopWatch() {
    startTime = new Date().getTime();
    workStartTime = new Date().getTime();
    restStartTime = new Date().getTime();

    workSecondsFromInput = workSecondsInput.value;
    workMinutesFromInput = workMinutesInput.value;
    restSecondsFromInput = restSecondsInput.value;
    restMinutesFromInput = restMinutesInput.value;

    if (isAMRAP || isEMOM) {
      amrapTime.getTime();
      amrapTime.setSeconds(secondsInput.value);
      amrapTime.setMinutes(minutesInput.value);
    }

    //time = number of rounds *(work time + rest time)
    else {
      amrapTime.getTime();
      amrapTime.setSeconds(tabataTimeSeconds);
      amrapTime.setMinutes(tabataTimeMinutes);
    }

    workTime.getTime();
    workTime.setSeconds(workSecondsFromInput);
    workTime.setMinutes(workMinutesFromInput);

    restTime.getTime();
    restTime.setSeconds(restSecondsFromInput);
    restTime.setMinutes(restMinutesFromInput);

    if (isPaused) {
      isPaused = false;
    } else {
      if (isFirstRound) {
        if (!isTabata) {
          showTime();
        } else {
          showTabataTime;
        }
        console.log("je první kolo");
      }
      if (!isTabata) {
        intertval = setInterval(showTime, 1000);
      } else {
        intertval = setInterval(showTabataTime, 1000);
      }
    }
  }

  //Get ready timer + start timer
  function getReady() {
    let getReadyTime = 10;
    getReadyInterval = setInterval(() => {
      if (getReadyTime === 10) {
        time.textContent = `:${getReadyTime}`;
      } else {
        time.textContent = `:0${getReadyTime}`;
      }
      if (getReadyTime <= 5) {
        shortSound.play();
      }
      if (getReadyTime === 0) {
        clearInterval(getReadyInterval);
        time.textContent = `${minutesInput.value}:${secondsInput.value}`;
        getReadyInterval = false;
        timerStartStopWatch();
      }
      getReadyTime--;
    }, 1000);
  }

  //Render the current time on the screen
  function showTime() {
    updatedTime = new Date().getTime();
    let seconds;
    let minutes;
    if (!isPaused) {
      if (!savedTime) {
        diferenceTime = updatedTime - startTime;
      } else {
        diferenceTime = updatedTime + savedTime - startTime;
      }

      //STOPKY
      if (isStopky) {
        seconds = Math.floor((diferenceTime % (1000 * 60)) / 1000);
        minutes = Math.floor((diferenceTime % (1000 * 60 * 60)) / (1000 * 60));

        //AMRAP
      } else if (isAMRAP || isEMOM) {
        seconds = Math.floor(
          ((amrapTime - diferenceTime) % (1000 * 60)) / 1000
        );
        minutes = Math.floor(
          ((amrapTime - diferenceTime) % (1000 * 60 * 60)) / (1000 * 60)
        );
      }
      console.log(seconds);

      //edit formate of minutes and seconds
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      //last 3 seconds beep sound
      if (minutes <= 0 && seconds <= 3 && seconds >= 1 && isAMRAP) {
        shortSound.play();
      } else if (3 <= seconds <= 0 && minutes > 0 && isEMOM) {
        shortSound.play();
      }
      if (minutes <= 0 && seconds <= 0 && (isAMRAP || isEMOM)) {
        //if the timer ends
        clearInterval(intertval);
        time.textContent = `${minutes}:00`;
        longSound.play();
        startButtonImage.src = "./images/play-button.png";
        isFirstRound = true;
      } else {
        time.textContent = `${minutes}:${seconds}`;
      }
    }
  }

  ///TABATA
  function showTabataTime() {
    updatedTime = new Date().getTime();
    let seconds;
    let minutes;
    let workSeconds;
    let workMinutes;
    let restSeconds;
    let restMinutes;

    if (!isPaused) {
      if (!savedTime) {
        diferenceTime = updatedTime - startTime;
        workDiferenceTime = updatedTime - workStartTime;
        restDiferenceTime = updatedTime - restStartTime;
      } else {
        diferenceTime = updatedTime + savedTime - startTime;
        workDiferenceTime = updatedTime + savedTime - workStartTime;
        restDiferenceTime = updatedTime + savedTime - restStartTime;
      }

      workSeconds = Math.floor(
        ((workTime - workDiferenceTime) % (1000 * 60)) / 1000
      );
      workMinutes = Math.floor(
        ((workTime - workDiferenceTime) % (1000 * 60 * 60)) / (1000 * 60)
      );

      restSeconds = Math.floor(
        ((restTime - restDiferenceTime) % (1000 * 60)) / 1000
      );
      restMinutes = Math.floor(
        ((restTime - restDiferenceTime) % (1000 * 60 * 60)) / (1000 * 60)
      );

      seconds = Math.floor(((amrapTime - diferenceTime) % (1000 * 60)) / 1000);
      minutes = Math.floor(
        ((amrapTime - diferenceTime) % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (!(minutes === 0 && seconds === 0)) {
        //WORK
        if (work) {
          //last 3 seconds beep sound
          if (workMinutes <= 0 && 3 >= workSeconds >= 1) {
            shortSound.play();
          }

          //end of worktime
          if (workMinutes === 0 && workSeconds === 1) {
            workTimeShow.textContent = `00:01`;

            //reset the worktime
          } else if (workMinutes === 0 && workSeconds === 0) {
            workTimeShow.textContent = `${workMinutesFromInput}:${workSecondsFromInput}`;
            restStartTime = new Date().getTime();
            work = false;
            //edit format
            //restSeconds = restSeconds < 10 ? `0${restSeconds}` : restSeconds;
            //restMinutes = restMinutes < 10 ? `0${restMinutes}` : restMinutes;
            //minus first second from resttime
            //restTimeShow.textContent = `${restMinutes}:${restSeconds}`;
          } else {
            //edit format
            workSeconds = workSeconds < 10 ? `0${workSeconds}` : workSeconds;
            workMinutes = workMinutes < 10 ? `0${workMinutes}` : workMinutes;
            workTimeShow.textContent = `${workMinutes}:${workSeconds}`;
          }
          console.log(work);

          //REST
        } else {
          //last 3 seconds beep sound
          if (restMinutes <= 0 && 3 >= restSeconds >= 1) {
            shortSound.play();
          }

          //end of worktime
          if (restMinutes === 0 && restSeconds === 1) {
            restTimeShow.textContent = `00:01`;
            workStartTime = new Date().getTime();
            //reset the resttime
          } else if (restMinutes === 0 && restSeconds === 0) {
            restTimeShow.textContent = `${restMinutesFromInput}:${restSecondsFromInput}`;
            work = true;
            workStartTime = new Date().getTime();
          } else {
            //edit formate of minutes and seconds
            restSeconds = restSeconds < 10 ? `0${restSeconds}` : restSeconds;
            restMinutes = restMinutes < 10 ? `0${restMinutes}` : restMinutes;

            restTimeShow.textContent = `${restMinutes}:${restSeconds}`;
          }
        }

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        time.textContent = `${minutes}:${seconds}`;
      }

      //End of Tabata
      else {
        time.textContent = `00:00`;
        restTimeShow.textContent = `00:00`;
        workTimeShow.textContent = `00:00`;
        clearInterval(intertval);
        longSound.play();
        startButtonImage.src = "./images/play-button.png";
        isFirstRound = true;
      }

      //last 3 seconds beep sound
      // if (minutes <= 0 && seconds <= 0 && (isAMRAP || isEMOM)) {
      //   //if the timer ends
      //   clearInterval(intertval);
      //   time.textContent = `${minutes}:00`;
      //   longSound.play();
      //   startButtonImage.src = "./images/play-button.png";
      //   isFirstRound = true;
      // } else {
      //   time.textContent = `${minutes}:${seconds}`;
      // }
    }
  }

  function pauseTime() {
    savedTime = diferenceTime;
    isPaused = true;
    console.log("kliknul jsem na tlačítko pause");
  }

  startButton.addEventListener("click", () => {
    if (isFirstRound) {
      if (isStopky) {
        timerStartStopWatch();
        video.play();
      } else {
        getReady();
        video.play();
      }
      startButtonImage.src = "./images/pause.png";
      isFirstRound = false;
    } else {
      startButtonImage.src = "./images/play-button.png";
      pauseTime();
      isFirstRound = true;
    }
  });

  /*pauseButton.addEventListener("click", () => {
    pauseTime();
    isFirstRound = false;
  });*/

  resetButton.addEventListener("click", () => {
    video.stop();
    clearInterval(intertval);
    isPaused = false;
    savedTime = null;
    startButtonImage.src = "./images/play-button.png";
    isFirstRound = true;
    if (isStopky) {
      time.textContent = "00:00";
    }
    if (isAMRAP || isEMOM) {
      time.textContent = `${minutesInput.value}:${secondsInput.value}`;
    }
  });
}

app();
