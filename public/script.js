document.addEventListener('DOMContentLoaded', function (event) {
  //get variables from index
  const loginPage = document.getElementById('loginPage');
  const notesPage = document.getElementById('notesPage');
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const passwordFail = document.getElementById('passwordFail');
  const loginBtn = document.getElementById('loginBtn');
  const createNoteBtn = document.querySelectorAll('.createNoteBtn');
  const newNoteTab = document.getElementById('newNoteTab');
  const listItem = document.querySelectorAll('.listItem');
  const logoutBtn = document.getElementById('logoutBtn');
  const textAreaTab = document.getElementById('textArea');
  const myTextArea = document.getElementById('mytextarea');
  const displayTextArea = document.getElementById('displayText');
  const editNote = document.getElementById('editNote');
  const textareaForm = document.getElementById('textareaForm');
  const saveNote = document.getElementById('saveNote');
  const editNoteTinyMce = document.getElementById('editNoteTinyMce');
  const documentNameInput = document.getElementById('documentNameInput');
  const contentManager = document.getElementById('contentManager');

  if (localStorage.getItem('username') !== null) {
    loginPage.style.display = 'none';
    notesPage.style.display = 'block';
  }

  //foreach function

  listItem.forEach((item) => {
    item.addEventListener('click', (event) => {
      displayTextArea.style.display = 'flex';
      editNote.style.display = 'flex';

      textareaForm.style.display = 'none';
      textAreaTab.style.display = 'flex';
      newNoteTab.style.display = 'none';

      fetch('/notes/' + event.currentTarget.value)
        .then((response) => response.json())
        .then((data) => {
          displayTextArea.innerHTML = data.textContent;

          editNote.addEventListener('click', (event) => {
            saveNote.style.display = 'none';
            displayTextArea.style.display = 'none';
            textareaForm.style.display = 'flex';
            editNote.style.display = 'none';
            tinymce.get('mytextarea').setContent(data.textContent);
            contentManager.innerHTML = data.id;
            documentNameInput.setAttribute('value', data.noteName);

            editNoteTinyMce.addEventListener('click', (event) => {
              event.preventDefault();
              const myContent = tinymce.get('mytextarea').getContent();
              fetch('/', {
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: contentManager.innerHTML,
                  content: myContent,
                  header: documentNameInput.value,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log('Success:', data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
              location.reload();
            });
          });
        });
    });
  });

  loginBtn.addEventListener('click', (event) => {
    let username = usernameInput.value;
    if (usernameInput.value === 'admin' && passwordInput.value === 'admin') {
      localStorage.setItem('username', username);
      loginPage.style.display = 'none';
      notesPage.style.display = 'block';
    } else {
      passwordFail.style.display = 'block';
    }
  });

  createNoteBtn.forEach((item) => {
    item.addEventListener('click', (event) => {
      console.log('hej');
      newNoteTab.style.display = 'none';
      textAreaTab.style.display = 'flex';
      textareaForm.style.display = 'flex';
      editNoteTinyMce.style.display = 'none';
      displayTextArea.style.display = 'none';

      saveNote.addEventListener('click', (event) => {
        const myContent = tinymce.get('mytextarea').getContent();
        event.preventDefault();
        fetch('/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: myContent,
            header: documentNameInput.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        location.reload();
      });
    });
  });

  logoutBtn.addEventListener('click', (event) => {
    localStorage.clear();
    location.reload();
  });
});
