const $ = (selector) => document.querySelector(selector);

const modalOpenBtn = $('.open-modal');

modalOpenBtn.addEventListener('click', () => {
	const modal1 = ModalPlugin.create({ content: 'content' });

	// second window
	// const modal2 = ModalPlugin.create({
	// 	content: 'Other content',
	// 	parent: '#app1',
	// });

	modal1.open();
	// modal2.open();
});
