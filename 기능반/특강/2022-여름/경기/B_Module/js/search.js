let data = null

window.addEventListener('load', async e=> {
    const response = await fetch('./js/garden.json')
    const jsonData = await response.json()
    console.log(jsonData.gardens);
})