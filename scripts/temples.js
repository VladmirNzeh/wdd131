document.addEventListener("DOMContentLoaded", function() {
    // Set current year dynamically
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    
    // Set last modified date dynamically
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
    });

    