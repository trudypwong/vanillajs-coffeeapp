export class MenuPage extends HTMLElement {
	constructor() {
		super();
		this.root = this.attachShadow({ mode: "open" });

		const styles = document.createElement("style");
		this.appendChild(styles);
		this.root.appendChild(styles);

		// these styles only apply to the current js file/web component
		async function loadCSS() {
			const request = await fetch("/components/MenuPage.css");
			const css = await request.text();
			styles.textContent = css;
		}
		loadCSS();
	}

	// when the component is attached to the DOM
	// (ie. when the router appends to the main html)
	connectedCallback() {
		// const template = document.getElementById("template1");
		const template = document.getElementById("menu-page-template");
		const content = template.content.cloneNode(true); // template is unstable - need to clone it
		// this.appendChild(content);
		this.root.appendChild(content);

		window.addEventListener("appmenuchange", () => {
			this.render();
		});
		this.render();
	}

	render() {
		if (app.store.menu) {
			// clear first
			this.root.querySelector("#menu").innerHTML = "";
			// add new content
			for (let category of app.store.menu) {
				const liCategory = document.createElement("li");
				liCategory.innerHTML = `
		      <h3>${category.name}</h3>
		      <ul class='category'>
		      </ul>
		    `;
				this.root.querySelector("#menu").appendChild(liCategory);
				category.products.forEach((product) => {
					const item = document.createElement("product-item");
					item.dataset.product = JSON.stringify(product);
					liCategory.querySelector("ul").appendChild(item);
				});
			}
		} else {
			this.root.querySelector("#menu").innerHTML = "Loading...";
		}
	}
}

customElements.define("menu-page", MenuPage);
