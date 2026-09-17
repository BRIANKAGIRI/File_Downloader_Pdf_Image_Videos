const fileInput = document.querySelector("#fileUrl");
const downloadBtn = document.querySelector("#downloadBtn");
const downloadForm = document.querySelector("#downloadForm");

downloadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const url = fileInput.value.trim();

    if (!url) {
        alert("Please enter a file URL.");
        return;
    }

    downloadFile(url);
});


async function downloadFile(url) {
    try {
        downloadBtn.innerText = "Downloading...";
        downloadBtn.disabled = true;

        // Fetch the file
        const response = await fetch(url);

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Convert response to a Blob
        const blob = await response.blob();

        // Create temporary URL for the Blob
        const temporaryUrl = URL.createObjectURL(blob);

        // Create download link
        const downloadLink = document.createElement("a");

        downloadLink.href = temporaryUrl;

        // Get filename from URL
        let fileName = url.split("/").pop().split("?")[0];

        // Use default filename if URL doesn't contain one
        if (!fileName) {
            fileName = "download";
        }

        downloadLink.download = fileName;

        // Add link to page
        document.body.appendChild(downloadLink);

        // Start download
        downloadLink.click();

        // Remove link
        downloadLink.remove();

        // Clean up temporary URL
        setTimeout(() => {
            URL.revokeObjectURL(temporaryUrl);
        }, 1000);

        downloadBtn.innerText = "Download File";
        downloadBtn.disabled = false;

    } catch (error) {
        console.error("Download failed:", error);

        alert(
            "Download failed.\n\n" +
            "Make sure you entered a direct file URL and that the server allows access."
        );

        downloadBtn.innerText = "Download File";
        downloadBtn.disabled = false;
    }
}

