const Store = {
	menu: null,
	cart: [],
};

// export default Store;

const proxiedStore = new Proxy(Store, {
	// For updating the UI
	// not for validating data
	set(target, property, value) {
		target[property] = value;
		if (property == "menu") {
			// dispatch event over the window object
			// not document - because there are 2 documents now (shadow dom)
			window.dispatchEvent(new Event("appmenuchange"));
		}
		console.log(`propery to change: ${property}`);
		if (property == "cart") {
			window.dispatchEvent(new Event("appcartchange"));
		}
		return true;
	},
});

export default proxiedStore;
