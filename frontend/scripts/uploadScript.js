const { PinataSDK } = require("pinata")
const fs = require("fs")
const { Blob } = require("buffer")
require("dotenv").config()

const pinata = new PinataSDK({
  pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZGQyODAwMy0zZTU5LTQ0OTItYTUzYS0xYjRkOWRmOTUyNGQiLCJlbWFpbCI6InJpc2hpYmhhcnRoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWNjZjQ2ODQ5YWQ3MTA2OWJmN2UiLCJzY29wZWRLZXlTZWNyZXQiOiJjMWM2YzFlNjEzMzE2MGM5ZGYxNjVjYTNiY2RhNTc4ZTEzZWIzNmZkODI1MjQzZjMwYjczMWM3ZDllNzY1YmRhIiwiZXhwIjoxNzYzMzU3OTQzfQ.PrUhJyw_QO7pHL6TjgO4zq_IsbTbUnpkA6Zg5SIdFDg',
  pinataGateway: 'coral-leading-bobolink-771.mypinata.cloud'
})

async function upload(){
  try {
    const blob = new Blob([fs.readFileSync("./hello-world.txt")]);
    const file = new File([blob], "hello-world.txt", { type: "text/plain"})
    const upload = await pinata.upload.file(file);
    console.log(upload)
  } catch (error) {
    console.log(error)
  }
}

upload()