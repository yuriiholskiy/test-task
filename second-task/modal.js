const getModalTemplate = (options) => {
	const isOpenClass = options.isOpen ? 'open' : '';
	const isCloseBtnOpen = options.closeBtn ? '' : 'hide';
	return `
		<div class="app-modal-backdrop ${isOpenClass}" data-type="backdrop">
		<div class="app-modal" data-type="content">
			<button class="app-modal-close-btn ${isCloseBtnOpen}" data-type="close-btn">&times;</button>
				${options.content}
			</div>
		</div>
	`;
};

// for animations
function raf(fn) {
	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			fn();
		});
	});
}

// in this plugin I use animation system similar to one that use Vue.js framework

class ModalPlugin {
	constructor(options) {
		const defaultOptions = {
			parent: '#app',
			isOpen: false,
			content: 'Default modal content',
			closeBtn: true,
			closeOnBackdrop: true,
			beforeOpen: console.log('beforeOpen'),
			afterOpen: console.log('afterOpen'),
			beforeClose: console.log('beforeClose'),
			beforeClose: console.log('beforeClose'),
			beforeDestoy: console.log('beforeDestoy'),
		};
		this.options = { ...defaultOptions, ...options };
		this.$el = document.querySelector(this.options.parent) || document.body;
	}
	static create(options) {
		return new ModalPlugin(options);
	}
	#render() {
		this.$el.insertAdjacentHTML('beforeend', getModalTemplate(this.options));
		this.$backdrop = this.$el.querySelector('[data-type="backdrop"]');
		this.$content = this.$el.querySelector('[data-type="content"]');
		this.$closeBtn = this.$el.querySelector('[data-type="close-btn"]');
	}

	backdropClickHandler = ({ target, currentTarget }) => {
		if (target !== currentTarget) {
			return;
		}
		if (this.options.closeOnBackdrop) {
			this.close();
		}
	};

	get isModalOpen() {
		return this.$backdrop.classList.contains('open');
	}

	#init() {
		this.#render();
		this.$backdrop.addEventListener('click', this.backdropClickHandler);
		return this;
	}

	open() {
		this.#init();
		if (this.isModalOpen) {
			return;
		}
		this.options.beforeOpen ? this.options.beforeOpen(this.$backdrop) : null;
		const handler = () => {
			this.$backdrop.classList.remove('modal-enter-active');
			this.$backdrop.removeEventListener('transitionend', handler);
		};
		this.$backdrop.classList.add('open');
		this.$backdrop.classList.add('modal-enter');
		raf(() => {
			this.$backdrop.classList.add('modal-enter-active');
			this.$backdrop.classList.remove('modal-enter');
		});
		this.$backdrop.addEventListener('transitionend', handler);

		this.options.afterOpen ? this.options.afterOpen(this.$backdrop) : null;
		this.options.closeBtn &&
			this.$closeBtn.addEventListener('click', this.backdropClickHandler);
		return this;
	}

	close() {
		if (!this.isModalOpen) {
			return;
		}
		this.options.beforeClose ? this.options.beforeClose(this.$backdrop) : null;
		const handler = () => {
			this.$backdrop.classList.remove('modal-leave-active');
			this.$backdrop.classList.remove('modal-leave-to');
			this.#destroy();
			this.$backdrop.removeEventListener('transitionend', handler);
		};

		raf(() => {
			this.$backdrop.classList.add('modal-leave-active');
			this.$backdrop.classList.add('modal-leave-to');
		});
		this.$backdrop.addEventListener('transitionend', handler);
		this.options.afterClose ? this.options.afterClose(this.$backdrop) : null;
		return this;
	}

	#destroy() {
		this.options.beforeDestoy
			? this.options.beforeDestoy(this.$backdrop)
			: null;
		if (this.$backdrop) {
			this.$el.removeChild(this.$backdrop);
			this.$backdrop.removeEventListener('click', this.backdropClickHandler);
			this.$closeBtn.removeEventListener('click', this.backdropClickHandler);
		}
	}
}
