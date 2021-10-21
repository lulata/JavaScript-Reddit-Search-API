import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

//Form event Listener
searchForm.addEventListener('submit', e => {
  //Get search Term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  //Get Limit
   const searchLimit = document.getElementById('limit').value;

  //Check search Input
  if (searchTerm === '') {
    //Show message
    showMessage('Please add a search term', 'alert-danger');
  }

  //Clear Input
  searchInput.value = " ";

  //Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results  => {
    let output = '<div class="card-columns">';
    console.log(results);
    //Loop through posts
    results.forEach(post => {
      //check for image
      let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
      output += `
      <div class="card">
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 75)}</p>
          <a href="${post.url}" traget="_blank" class="btn btn-primary">Read More</a>
          <hr>
       <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
       <span class="badge badge-dark">Score: ${post.score}</span>
        </div>
      </div>
      `;
    })
    output+= '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});

//Show message
function showMessage(message, className) {
  const div = document.createElement('div');

  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(message));

  const searchContainer = document.getElementById('search-container');

  const search = document.getElementById('search');

  searchContainer.insertBefore(div, search);

  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//Truncade text
function truncateText(text, limit) {
  const shortened = text.indexOf('',limit);
  if (shortened === -1) {
    return text;
  }
  return text.substring(0, shortened)
}
