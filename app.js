// Login Functionality
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'home.html';
    })
    .catch(error => {
      alert(error.message);
    });
});

// Register Person
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  const file = document.getElementById('photo').files[0];
  const storageRef = firebase.storage().ref(`photos/${file.name}`);
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then(photoUrl => {
      const person = { name, phone, address, photoUrl };
      // Save to Firestore
      db.collection('people').add(person).then(() => {
        alert('Person registered successfully!');
      });
    });
  });
});

// List Registered People
document.addEventListener('DOMContentLoaded', () => {
  const personList = document.getElementById('personList');
  if (personList) {
    db.collection('people').get().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${data.name}</strong> - ${data.phone}
          <img src="${data.photoUrl}" alt="Photo" width="50">
        `;
        personList.appendChild(listItem);
      });
    });
  }
});