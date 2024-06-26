const Router = {
	init: () => {
		document.querySelectorAll("a.navlink").forEach((a) => {
			a.addEventListener("click", (event) => {
				event.preventDefault();
				// console.log("Link clicked");
				// const url1 = a.url;
				// const url2 = a.getAttribute("href");
				// can also use event.target
				// const url1 = event.target.url;
				const url = event.target.getAttribute("href");
				Router.go(url);
			});
		});

		// // Event Handler for URL changes
		window.addEventListener("popstate", (event) => {
			Router.go(event.state.route, false);
		});

		// Check the initial URL
		Router.go(location.pathname);
	},
	go: (route, addToHistory = true) => {
		console.log(`Going to ${route}`);

		if (addToHistory) {
			history.pushState({ route }, null, route);
		}

		let pageElement = null;
		// pageElement = document.createElement("h2");
		switch (route) {
			case "/":
				pageElement = document.createElement("menu-page");
				// pageElement.textContent = "Menu";
				break;
			case "/order":
				pageElement = document.createElement("order-page");
				// pageElement.textContent = "New Order";
				break;
			default:
				if (route.startsWith("/product-")) {
					pageElement = document.createElement("details-page");
					// pageElement.textContent = "Details";
					const paramId = route.substring(route.lastIndexOf("-") + 1);
					pageElement.dataset.productId = paramId;
				}
				break;
		}

		if (pageElement) {
			// document.querySelector("main").innerHTML = "";
			// document.querySelector("main").appendChild(pageElement);
			const cache = document.querySelector("main");
			cache.innerHTML = "";
			// cache.children[0].remove();
			// Array.from(cache.children).forEach((child) => child.remove());
			cache.appendChild(pageElement);
			window.scrollX = 0;
			window.scrollY = 0;
		} else {
			// 404
			document.querySelector("main").innerHTML = "Oops, 404!";
		}
	},
};

export default Router;
