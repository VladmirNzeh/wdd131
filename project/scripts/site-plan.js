// main.js

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Home Page: e.g., a dynamic updates container
    if (document.getElementById('update-container')) {
      fetchNews('Nigeria corruption reform', 'update-container');
    }
  
    // About the Justice System Page
    if (document.getElementById('about-content')) {
      fetchNews('Nigeria justice system analysis', 'about-content');
    }
  
    // Forms of Corruption Page
    if (document.getElementById('corruption-content')) {
      fetchNews('forms of corruption Nigeria', 'corruption-content');
    }
  
    // Case Studies & Real Stories Page
    if (document.getElementById('case-studies-content')) {
      fetchNews('Nigeria corruption case studies', 'case-studies-content');
    }
  
    // Impact on Society Page
    if (document.getElementById('impact-content')) {
      fetchNews('Nigeria justice impact society', 'impact-content');
    }
  
    // News & Updates Page
    if (document.getElementById('news-content')) {
      fetchNews('Nigeria corruption justice', 'news-content');
    }
  
    // Solutions & Call to Action Page
    if (document.getElementById('solutions-content')) {
      fetchNews('anti corruption solutions Nigeria', 'solutions-content');
    }
  
    // Additional dynamic functions (e.g., theme toggle and form submission)
    setupThemeToggle();
    handleFormSubmission();
  });
  
  /**
   * fetchNews: Fetches news articles from a reputable API using the NewsAPI.
   * @param {string} query - The search term for querying relevant articles.
   * @param {string} containerId - The ID of the element where content will be injected.
   */
  function fetchNews(query, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Replace 'YOUR_API_KEY' with your actual NewsAPI key.
    const API_KEY = 'ac6ace10078c425aba7771a8dd8f4e7e';
    const endpoint = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        let htmlContent = '';
        if (data.articles && data.articles.length > 0) {
          data.articles.forEach(article => {
            htmlContent += `
              <article>
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">Read more</a>
              </article>
            `;
          });
        } else {
          htmlContent = '<p>No news available at the moment.</p>';
        }
        container.innerHTML = htmlContent;
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        container.innerHTML = '<p>Error loading news. Please try again later.</p>';
      });
  }
  
  /**
   * setupThemeToggle: Demonstrates DOM interaction and localStorage usage.
   * Creates a button to toggle the theme between 'light' and 'dark' modes.
   */
  function setupThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
  
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Theme';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '1em';
    toggleButton.style.right = '1em';
    document.body.appendChild(toggleButton);
  
    toggleButton.addEventListener('click', () => {
      if (document.body.classList.contains('light')) {
        document.body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  /**
   * handleFormSubmission: Processes the contact form submission.
   * Uses DOM interaction, template literals, and localStorage to store data.
   */
  function handleFormSubmission() {
    const form = document.getElementById('contact-form');
    if (!form) return;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submission = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
      };
  
      let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
      submissions.push(submission);
      localStorage.setItem('submissions', JSON.stringify(submissions));
  
      alert(`Thank you, ${submission.name}. Your message has been received.`);
      form.reset();
    });
  }
  