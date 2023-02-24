class Popup {
	constructor(element) {
		this.element = element
		this.closeIcon = this.element.querySelector('[data-popup-close]')
		this.container = this.element.querySelector('[data-popup-container]')

		this.initEvents()
	}

	openApplication() {
		this.content = this.element.querySelector('[data-popup-content]')

		this.contentCheck()
		this.element.classList.add('popup_active')

	}

	hideContent() {
		this.content.classList.add('application__group_disabled')
	}

	contentCheck() {
		if (this.content.classList.contains('application__group_disabled')) {
			this.content.classList.remove('application__group_disabled')
		}
	}

	closeApplication() {
		this.element.classList.remove('popup_active')
	}

	initEvents() {
		this.closeIcon.addEventListener('click', this.closeApplication.bind(this))
		this.container.addEventListener('click', this.closeApplication.bind(this))
	}
}

class PopupApplication {
	constructor(button, element) {
		this.button = document.querySelector(button)
		this.element = document.querySelector(element)

		this.form = this.element.querySelector('[data-application-form]')
		this.checkbox = this.form.querySelector('[data-application-checkbox]')
		this.formButton = this.form.querySelector('[data-application-submit]')
		this.successMessage = this.element.querySelector('[data-application-message]')

		this.popup = new Popup(this.element)

		this.initEvents()		
	}

	checkPolicy() {
		this.formButton.toggleAttribute("disabled");
	}

	checkMessage() {
		if (this.successMessage.classList.contains('application__message_active')) {
			this.successMessage.classList.remove('application__message_active')
		}
	}

	formSubmit() {
		this.popup.hideContent()
		this.successMessage.classList.add('application__message_active')
	}

	initEvents() {
		this.button.addEventListener('click', () => {
			this.checkMessage()
			this.popup.openApplication()
		})

		this.checkbox.addEventListener('change', this.checkPolicy.bind(this))

		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.formSubmit()
		})
	}
}

class MenuMobile {
	constructor() {
		this.header = document.querySelector('[data-header]')
		this.hero = document.querySelector('[data-hero]')
		this.container = document.querySelector('[data-container]')
		this.button = document.querySelector('[data-mobile-button]')

		this.state = true
		this.initEvents()
	}

	openMenu() {
		this.header.classList.add('header_mobile')
		this.hero.classList.add('hero_disabled')
		this.container.classList.add('container__main_mobile')
	}

	closeMenu() {
		this.header.classList.remove('header_mobile')
		this.hero.classList.remove('hero_disabled')
		this.container.classList.remove('container__main_mobile')
	}

	toggle() {
		if (this.state) {
			this.openMenu()
			this.state = false
		}

		else {
			this.closeMenu()
			this.state = true
		}
	}

	initEvents() {
		this.button.addEventListener('click', this.toggle.bind(this))
	}
}

const popupApplication = new PopupApplication('[data-application-button]', '[data-application]')
const menuMobile = new MenuMobile()
const popupMap = new Popup(document.querySelector('[data-map]'))

const miniMap = document.querySelector('[data-map-body]')

miniMap.addEventListener('click', () => {
	popupMap.openApplication()
})
