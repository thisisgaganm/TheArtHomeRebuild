
/* =========================================
   PART 9 — CONTACT FORM
   THE ART HOME INTERIORS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("projectEnquiryForm");
    const status = document.getElementById("formStatus");

    if (!form || !status) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        const firstName = formData.get("firstName") || "";
        const lastName = formData.get("lastName") || "";
        const email = formData.get("email") || "";
        const phone = formData.get("phone") || "";
        const projectType = formData.get("projectType") || "";
        const propertyType = formData.get("propertyType") || "Not specified";
        const projectSize = formData.get("projectSize") || "Not specified";
        const budget = formData.get("budget") || "Not specified";
        const message = formData.get("message") || "";

        const subject = encodeURIComponent(
            "New Project Enquiry - The Art Home Interiors"
        );

        const body = encodeURIComponent(
`Hello The Art Home Interiors,

I would like to enquire about an interior design project.

PERSONAL DETAILS
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

PROJECT DETAILS
Service: ${projectType}
Property Type: ${propertyType}
Approximate Area: ${projectSize}
Estimated Budget: ${budget}

PROJECT DESCRIPTION
${message}

Thank you.`
        );

        /*
          IMPORTANT:
          Replace the placeholder below with the company's
          actual verified enquiry email address before launch.
        */

        const companyEmail = "YOUR_COMPANY_EMAIL@example.com";

        if (
            companyEmail === "YOUR_COMPANY_EMAIL@example.com" ||
            !companyEmail.includes("@")
        ) {
            status.textContent =
                "The enquiry form is ready, but the company's actual email address must be added in contact.js before enquiries can be sent.";

            return;
        }

        status.textContent =
            "Opening your email application. Please review and send your enquiry.";

        window.location.href =
            `mailto:${companyEmail}?subject=${subject}&body=${body}`;

    });

});
