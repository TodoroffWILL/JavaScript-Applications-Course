function attachEvents() {
  const inputLocation = document.getElementById('location');
  const getWeatherBTN = document.getElementById('submit');
  const forecast = document.getElementById('forecast');
  const currentWeather = document.getElementById('current');
  const upComingWeather = document.getElementById('upcoming');

  const conditions = {
    Sunny: '&#x2600', // ☀
    'Partly sunny': '&#x26C5', // ⛅
    Overcast: '&#x2601', // ☁
    Rain: '&#x2614', // ☂
    Degrees: '&#176', // °
  };

  getWeatherBTN.addEventListener('click', getWeather);

  function getWeather() {
    fetch('http://localhost:3030/jsonstore/forecaster/locations')
      .then((res) => res.json())
      .then((data) => {
        const cityIndex = data.findIndex((x) => x.name === inputLocation.value);
        forecast.style.display = 'block';
        if (cityIndex === -1) {
          throw new Error();
        }

        let cityCode = data[cityIndex].code;
        fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
          .then((res) => res.json())
          .then((data) => {
            // Main
            const forecasts = document.createElement('div');
            forecasts.classList.add('forecasts');

            // Codition Symbol
            const symbolSpan = document.createElement('span');
            symbolSpan.classList.add('condition-symbol');
            symbolSpan.innerHTML = conditions[data.forecast.condition];
            forecasts.appendChild(symbolSpan);

            // Info spans
            let condition = document.createElement('span');
            condition.classList.add('condition');

            // Span 1 - Forecast data
            const span1 = document.createElement('span');
            span1.classList.add('forecast-data');
            span1.textContent = data.name;
            condition.appendChild(span1);

            //Span 2
            const span2 = document.createElement('span');
            span2.className = 'forecast-data';
            span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
            condition.appendChild(span2);
            // Span 3
            const span3 = document.createElement('span');
            span3.className = 'forecast-data';
            span3.textContent = data.forecast.condition;
            condition.appendChild(span3);

            forecasts.appendChild(condition);
            currentWeather.appendChild(forecasts);
          });

        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
          .then((res) => res.json())
          .then((data) => {
            // Main Div
            const fcInfo = document.createElement('div');
            fcInfo.className = 'forecast-info';

            // Each Day from the array spans
            data.forecast.forEach((el) => {
              // Main Span
              const upcoming = document.createElement('span');
              upcoming.className = 'upcoming';

              // Symbol span
              const symbol = document.createElement('span');
              symbol.className = 'symbol';
              symbol.innerHTML = conditions[el.condition];
              upcoming.appendChild(symbol);
              // Forecast first data
              const fcData = document.createElement('span');
              fcData.className = 'forecast-data';
              fcData.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
              upcoming.appendChild(fcData);
              // Forecast 2nd span
              const fcData2 = document.createElement('span');
              fcData2.className = 'forecast-data';
              fcData2.textContent = el.condition;
              upcoming.appendChild(fcData2);
              fcInfo.appendChild(upcoming);
            });
            upComingWeather.appendChild(fcInfo);
          })
          .catch(() => (forecast.textContent = 'Error'));
      })
      .catch(() => (forecast.textContent = 'Error'));
  }
}

attachEvents();
