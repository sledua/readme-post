
const textLoad = document.querySelectorAll('.card-header > p');
const scrinSize = document.documentElement.scrollWidth;
console.log(scrinSize)

if (scrinSize <= 375) {
	for(let i = 0; i < textLoad.length; i++){
		const newWorld = textLoad[i].innerHTML;
		console.log(newWorld)
	}
} else {
	console.log('+375')
}