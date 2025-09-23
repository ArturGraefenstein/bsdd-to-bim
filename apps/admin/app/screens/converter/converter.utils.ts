export function downloadXml(base64, filename) {
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
