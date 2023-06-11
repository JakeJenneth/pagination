const requestURL = 'https://swapi.dev/api/people/?format=json'
const table = document.querySelector('#table')
const pagination = document.querySelector('#pagination')

function sendRequest(method, url) {
   return fetch(url)
      .then(response => response.json())
      .then(data => data.results)
      .catch(err => console.log(err))
}

sendRequest('GET', requestURL)
   .then(people => processPeople(people))
   .catch(err => console.log(err))


const notesOnPage = 3
const items = []

function processPeople(people) {
   for(let i = 1; i <= Math.ceil(people.length/notesOnPage); i++){
      let li = document.createElement('li')
      li.innerHTML = i;
      pagination.appendChild(li)
      items.push(li)
   }

   showPage(items[0])

   for (let item of items) {
      item.addEventListener('click', function() {
         showPage(this)
      })
   }


   function showPage(item) {
      const active = document.querySelector('#pagination li.active')
      if (active){
         active.classList.remove('active')
      }
      
      item.classList.add('active')

      const pageNum = +item.innerHTML
      const start = (pageNum - 1) * notesOnPage
      const end = start + notesOnPage
      const notes = people.slice(start, end)

      table.innerHTML = '';
      for (let note of notes){
         let tr = document.createElement('tr')
         table.appendChild(tr)

         createCell(note.name, tr)
         createCell(note['eye_color'], tr)
         createCell(note.gender, tr)
      }
   }

   function createCell(text, tr){
      const td = document.createElement('td')
      td.innerHTML = text
      table.appendChild(td)
   }
}
