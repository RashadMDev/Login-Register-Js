const baseUrl = 'http://localhost:3000/';
const cards = document.querySelector('.cards');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const img = document.getElementById('image');
const myForm = document.getElementById('myForm');





async function getUsers() {
      try {
            const response = await axios.get(`${baseUrl}users`);
            const data = response.data;
            data.forEach(item => {
                  cards.innerHTML += `
                   <div class="card" style="width: 18rem;">
                  <img src=${item.img} class="card-img-top" alt="...">
                  <div class="card-body">
                        <h5 class="card-title">${item.username}</h5>
                        <p class="card-text">${item.email}</p>
                        <button class="btn btn-danger">Delete</button>
                  </div>
            </div>
      `;
            });
            console.log('Users:', data);
      } catch (error) {
            console.error('Error fetching users:', error);
      }
}

async function addUser(user) {
      try {
            await axios.post(`${baseUrl}users`, user);
            await Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500
            });
      } catch (error) {
            console.error('Error adding user:', error);
      }
}



if (myForm) {
      myForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                  username: userName.value,
                  email: email.value,
                  password: password.value,
                  img: img.value
            };
            addUser(user);
            // window.location.href = 'index.html';
      })
} else {
      console.error('Form element not found');
}

if (cards) {
      getUsers();

} else {
      console.error('Cards container not found');
}
