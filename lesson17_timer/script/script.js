'use strict';

window.addEventListener('DOMContentLoaded', function() {
    // timer
    function countTimer(deadline) {
        let timeHours = document.getElementById('timer-hours');
        let timerMinutes = document.getElementById('timer-minutes');
        let timerSeconds = document.getElementById('timer-seconds');
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();

        function getTimeRemaining() {
            let timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60)) % 60;
            let hours = Math.floor(timeRemaining / 60 / 60);
            // let day = Math.floor(timeRemaining / 60 / 60 / 24);
        
            return {
                'timeRemaining': timeRemaining,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timeHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            if(timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
            
        }
        updateClock();
        // console.log(getTimeRemaining());
    }
    // countTimer('01 march 2021');
    setInterval(countTimer, 1000, '01 march 2021');
});

