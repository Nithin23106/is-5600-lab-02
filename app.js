function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';
  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${user.lastname}, ${user.firstname}`;
    listItem.id = id;
    userList.appendChild(listItem);
  });
  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(u => u.id == userId);
  populateForm(user);
  renderPortfolio(user, stocks);
}

function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';
  
  portfolio.forEach(({ symbol, owned }) => {
    const container = document.createElement('div');
    container.className = 'portfolio-item';
    
    const symbolEl = document.createElement('p');
    symbolEl.innerText = symbol;
    
    const sharesEl = document.createElement('p');
    sharesEl.innerText = owned;
    
    const actionEl = document.createElement('button');
    actionEl.innerText = 'View';
    actionEl.id = symbol;
    
    container.appendChild(symbolEl);
    container.appendChild(sharesEl);
    container.appendChild(actionEl);
    portfolioDetails.appendChild(container);
  });
  
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

function viewStock(symbol, stocks) {
  const stockArea = document.querySelector('.stock-form');
  if (stockArea) {
    const stock = stocks.find(s => s.symbol == symbol);
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry'