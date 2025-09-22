// Load saved settings
document.addEventListener("DOMContentLoaded", async () => {
	const result = await window.chrome.storage.sync.get([
		"bimEndpoint",
		"apiKey",
	]);

	if (result.bimEndpoint) {
		document.getElementById("endpoint").value = result.bimEndpoint;
	}

	if (result.apiKey) {
		document.getElementById("apiKey").value = result.apiKey;
	}
});

// Save settings
document
	.getElementById("settingsForm")
	.addEventListener("submit", async (e) => {
		e.preventDefault();

		const endpoint = document.getElementById("endpoint").value;
		const apiKey = document.getElementById("apiKey").value;

		try {
			await window.chrome.storage.sync.set({
				bimEndpoint: endpoint,
				apiKey: apiKey,
			});

			// Show success message
			const status = document.getElementById("status");
			status.textContent = "Settings saved successfully!";
			status.className = "status success";
			status.style.display = "block";

			setTimeout(() => {
				status.style.display = "none";
			}, 2000);
		} catch (error) {
			console.error("Failed to save settings:", error);

			const status = document.getElementById("status");
			status.textContent = "Failed to save settings";
			status.className = "status error";
			status.style.display = "block";
		}
	});
