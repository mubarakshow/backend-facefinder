async function playerStart() {
  const first = await movePlayer(100, 'Left')
  await movePlayer(100, 'Right')
  await movePlayer(100, 'Left')
  await movePlayer(430, 'Right')
}

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()
  console.log(users)
}


const urls  = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

const getData = async function() {
  try {
    const [ users, posts, albums ] = await Promise.all(urls.map(url => {
      return fetch(url).then(res => res.json())
    }))
    console.log('users', users)
    console.log('posts', posts)
    console.log('albums', albums)
  } catch (err) {
    console.log('oops', err)
  }
}












// Exercise Async Await

// 1.
const geAsyncUsers = async function() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users/")
  const usersData = await resp.json()
  console.log(usersData)
}

// 2. Remove all .then()
const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholderTYPO.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums",
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
        let response = await fetch(url)
        return response.json()
      }),
    );
    console.log("users", users);
    console.log("posta", posts);
    console.log("albums", albums);
  } catch (err) {
    console.log('oopps', err)
  }
};