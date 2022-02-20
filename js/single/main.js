
const textLoad = document.querySelectorAll('.card-header > p');
const scrinSize = document.documentElement.scrollWidth;

if (scrinSize <= 375) {
	let conc = '';
	for(let i = 0; i < textLoad.length; i++){
		conc += textLoad[i].textContent;
	}
	document.querySelector('.card-header > span').insertAdjacentElement('afterEnd',document.createElement('span')).innerHTML = conc;
} else {
	console.log('+375k')
}