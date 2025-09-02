# Parallel Processing with Promise.all

Create a function that takes in an array of objects containing URLs of images to download. Use Promise.all to download all the images in parallel. Once all the images are downloaded, display them on the webpage.

## Instructions

1. You have been given the array of img urls in the js file.
2. On click of the button with the id `download-images-button`, start downloading and show the images on the screen
3. If image fails to download, reject the promise with the following error: `Failed to load image's URL: ${image.url}`
4. Show the images in the div of id `output`
