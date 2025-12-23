 function createLogger(type) {
        return function(message) {
          console.log(`(${type}) - ${message}`);
        };
      }

      const infoLogger = createLogger('INFO');
      const errorLogger = createLogger('ERROR');

      function simulateSearch(query) {
        return new Promise((resolve, reject) => {
          if (!query) {
            reject('Empty query');
            return;
          }
          
          setTimeout(() => {
            const results = [
              query.toUpperCase(),
              'RESULT1',
              'RESULT2'
            ];
            resolve(results);
          }, 1000);
        });
      }

      function cleanResults(results) {
        return new Promise((resolve) => {
          const cleaned = results.map(result => result.trim());
          resolve(cleaned);
        });
      }

      function formatResults(results) {
        return new Promise((resolve) => {
          const formatted = results.join(', ');
          resolve(formatted);
        });
      }

      function displayResults(formatted) {
        let debounceDiv = document.querySelector("#debounce");
        let existing = debounceDiv.querySelectorAll('h3, .loading');
        existing.forEach(el => el.remove());
        
        let h3 = document.createElement("h3");
        h3.innerText = `Results: ${formatted}`;
        debounceDiv.append(h3);
      }

      function handleSearch(query) {
        infoLogger('Debounced search triggered');
        
        let debounceDiv = document.querySelector("#debounce");
        let existing = debounceDiv.querySelectorAll('h3, .loading');
        existing.forEach(el => el.remove());
        
        let loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerText = 'Searching...';
        debounceDiv.append(loading);

        simulateSearch(query)
          .then(results => cleanResults(results))
          .then(cleaned => formatResults(cleaned))
          .then(formatted => {
            debounceDiv.querySelector('.loading')?.remove();
            displayResults(formatted);
          })
          .catch(error => {
            errorLogger(error);
            debounceDiv.querySelector('.loading')?.remove();
          });
      }

      function debounce(func, delay) {
        let timer;
        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => func(...args), delay);
        };
      }

      function throttle(func, delay) {
        let last = 0;
        return function (...args) {
          let now = new Date().getTime();
          if (now - last < delay) {
            return;
          }
          last = now;
          return func(...args);
        };
      }

      let search = document.querySelector("#search");

      let debouncedSearch = debounce((value) => {
        if (value) {
          handleSearch(value);
        }
      }, 500);

      let throttledLog = throttle((value) => {
        infoLogger(`Throttled keystroke: ${value}`);
        
        let throttleDiv = document.querySelector("#throttle");
        let h3 = document.createElement("h3");
        h3.innerText = value;
        throttleDiv.append(h3);
      }, 300);

      search.addEventListener("keyup", (e) => {
        let value = e.target.value;
        throttledLog(value);
        debouncedSearch(value);
      });