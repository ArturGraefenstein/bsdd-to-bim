// Wait for the page to load
function getUri() {
	const allElements = document.querySelectorAll("*");

	// Filter elements whose text starts with 'https://'
	const httpsElements = Array.from(allElements).filter((el) => {
		const text = el.textContent?.trim() || "";
		return text.startsWith("https:");
	});

	return [...httpsElements].reverse().shift().innerHTML;
}

function waitForElement(selector, timeout = 10000) {
	return new Promise((resolve, reject) => {
		const element = document.querySelector(selector);
		if (element) {
			resolve(element);
			return;
		}

		const observer = new MutationObserver((mutations, obs) => {
			const element = document.querySelector(selector);
			if (element) {
				obs.disconnect();
				resolve(element);
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		setTimeout(() => {
			observer.disconnect();
			reject(new Error(`Element ${selector} not found within ${timeout}ms`));
		}, timeout);
	});
}

// Extract dictionary data from the page
function extractDictionaryData() {
	const data = {};

	// Extract basic info from the page
	const nameElement = document.querySelector('h1, [data-testid="name"], .name');
	if (nameElement) {
		data.name = nameElement.textContent.trim();
	}

	// Extract identifier/URI
	const uriElement = document.querySelector(
		'[data-testid="identifier"], .identifier',
	);
	if (uriElement) {
		data.identifier = uriElement.textContent.trim();
	} else {
		// Fallback to current URL
		data.identifier = window.location.href;
	}

	// Extract dictionary code
	const codeElement = document.querySelector(
		'[data-testid="dictionary-code"], .dictionary-code',
	);
	if (codeElement) {
		data.dictionaryCode = codeElement.textContent.trim();
	}

	// Extract version
	const versionElement = document.querySelector(
		'[data-testid="version"], .version',
	);
	if (versionElement) {
		data.version = versionElement.textContent.trim();
	}

	// Extract organization
	const orgElement = document.querySelector(
		'[data-testid="organization"], .organization',
	);
	if (orgElement) {
		data.organization = orgElement.textContent.trim();
	}

	return data;
}

// Show notification
function showNotification(message, type = "success") {
	const notification = document.createElement("div");
	notification.className = `bim-notification ${type}`;
	notification.textContent = message;
	document.body.appendChild(notification);

	setTimeout(() => {
		notification.remove();
	}, 3000);
}

// Handle BIM import
async function handleBimImport(button) {
	const originalText = button.innerHTML;

	try {
		// Show loading state
		button.classList.add("loading");
		button.innerHTML = `
      <div class="bim-import-spinner"></div>
      Importing...
    `;

		// Extract data from the page
		const dictionaryData = extractDictionaryData();

		// Get user preferences from storage
		// const result = await window.chrome.storage.sync.get([
		// 	"bimEndpoint",
		// 	"apiKey",
		// ]);

		const uri = getUri();

		console.log(uri);
		// Make the API call
		const response = await fetch("http://localhost:4000/graphql", {
			headers: {
				accept:
					"application/graphql-response+json, application/json, multipart/mixed",
				"accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1VQRVIiLCJwbGF0Zm9ybSI6IldFQiIsInR5cGUiOjEsInRhcmdldCI6MCwiaXNzIjoiaHR0cHM6Ly9zZXJ2aWNlLnJlY2tlcnNmbHVpZC5kZSIsImF1ZCI6InJlY2tlcnMtc2VydmljZSIsInN1YiI6IjY4Y2RhZDAxYzBmNWM3YTQyOWU2NjliOSIsImlhdCI6MTc1ODU1ODU0MSwiZXhwIjoxNzU5MTYzMzQxfQ.3HDN3NcKoGpGSXWCHAdSImAlThk8XyuhUnFhSzgcS0A",
				"cache-control": "no-cache",
				"content-type": "application/json",
				pragma: "no-cache",
				"sec-ch-ua":
					'"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: `http://localhost:4000/graphql?query=mutation+MyMutation+%7B%0A++convertDictionary%28%0A++++input%3A+%7Buri%3A+%22${encodeURIComponent(uri)}%22%7D%0A++%29+%7B%0A++++converted%0A++%7D%0A%7D`,
			body: `{"query":"mutation MyMutation{convertDictionary(input:{uri:\\\"${uri}\\\"}){blob}}","operationName":"MyMutation"}`,
			method: "POST",
			mode: "cors",
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const responseData = await response.json();
		downloadXml(responseData.data.convertDictionary.blob, `${uri}.xml`);

		// Show success state
		button.classList.remove("loading");
		button.classList.add("success");
		button.innerHTML = `
      <svg class="bim-import-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      Imported!
    `;

		showNotification("Successfully imported to BIM!", "success");

		// Reset button after 2 seconds
		setTimeout(() => {
			button.classList.remove("success");
			button.innerHTML = originalText;
		}, 2000);
	} catch (error) {
		console.error("BIM Import Error:", error);

		// Show error state
		button.classList.remove("loading");
		button.classList.add("error");
		button.innerHTML = `
      <svg class="bim-import-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      Failed
    `;

		showNotification(`Import failed: ${error.message}`, "error");

		// Reset button after 3 seconds
		setTimeout(() => {
			button.classList.remove("error");
			button.innerHTML = originalText;
		}, 3000);
	}
}

// Create and inject the BIM import button
function createBimImportButton() {
	const button = document.createElement("button");
	button.className = "import-to-bim";
	button.innerHTML = `
    <svg class="bim-import-icon" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>
    Import to BIM
  `;

	button.addEventListener("click", () => handleBimImport(button));

	return button;
}

// Main function to inject the button
async function injectBimButton() {
	try {
		// Wait for the button container to load
		// Look for common button container patterns
		const selectors =
			".bsdd-background-block.mt-2 > .flex.justify-between > .flex.justify-between";

		// Try to find an existing button container
		let buttonContainer = document.querySelector(selectors);

		// If no container found, look for existing buttons and use their parent
		if (!buttonContainer) {
			const existingButton = document.querySelector(".import-to-bim");
			if (existingButton) {
				buttonContainer = existingButton.parentElement;
			}
		}

		// If still no container, create one and append to a suitable location
		if (!buttonContainer) {
			buttonContainer = document.createElement("div");
			buttonContainer.className = "bim-button-container";
			buttonContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      `;
			document.body.appendChild(buttonContainer);
		}

		// Create and inject the button
		const bimButton = createBimImportButton();

		// Add some margin if there are other buttons
		if (buttonContainer.children.length > 0) {
			bimButton.style.marginLeft = "8px";
		}

		buttonContainer.appendChild(bimButton);

		console.log("BIM Import button injected successfully");
	} catch (error) {
		console.error("Failed to inject BIM button:", error);
	}
}

// Initialize when the page loads
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		if (document.readyState == "complete") injectBimButton();
		else setTimeout(injectBimButton, 2000);
	});
} else {
	setTimeout(() => {
		injectBimButton();
	}, 2000);
}

// Also try to inject after a short delay in case of dynamic content

// Suppose 'data.blob' is the base64 string from your GraphQL mutation
function downloadXml(base64, filename) {
	const binary = atob(base64); // decode base64
	const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
	const blob = new Blob([array], { type: "application/xml" });

	// Create a temporary link to download
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
