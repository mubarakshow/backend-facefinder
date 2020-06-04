const fs = require('fs')
const express = require('express')

// fs.readFile('./hello.txt', (err, data) => {
//   if (err) {
//     console.log('errrrroooooorr')
//   }
//   console.log('Async', data.toString())
// })

// const file = fs.readFileSync('./hello.txt')
// console.log('Sync',file.toString('utf8'))


// APPEND
// fs.appendFile('./hello.txt', ' THis is so COOL!', err => {
//   if (err) {
//     console.log(err)
//   }
// })

// WRITE
// fs.writeFile('bye.txt', 'Sad to see you go', err => {
//   if (err) {
//     console.log(err)
//   }
// })

// DELETE 
// fs.unlink('./bye.txt', err => {
//   if (err) {
//     console.log(err)
//   }
// })


// fs.readFile('./santa_input.txt', (err, data) => {
//   console.time('santa-time')
//   if (err) {
//     console.log('errorrrr', err)
//   }

//   const input = data.toString()
//   let inputArr = input.split('')
  
//   let up = 0;
//   let down = 0;
//   for (let i=0; i< inputArr.length; i++) {
    
//     if (inputArr[i] === '(') {
//       up += 1
//     } else {
//       down += 1
//     }
//   }
//   console.timeEnd('santa-time')
//   const floor = up - down;
//   console.log('floor', floor)
// })

// Reduce 
fs.readFile('./santa_input.txt', (err, data) => {
  console.time('santa')
  const fileData = data.toString()
  const dataArr = fileData.split('')
  const answer = dataArr.reduce((acc, currentValue) => {
    if(currentValue === '(') {
      return acc +=1
    } else if (currentValue === ')') {
      return acc -=1
    }
  }, 0)
  console.timeEnd('santa')
  console.log(answer)
})