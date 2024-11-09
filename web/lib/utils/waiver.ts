import MarkdownIt from "markdown-it";
import { BrowserWaiver } from "@lib/types/common";

export default async function downloadWaiver(waiver: BrowserWaiver) {
  const mdParser = new MarkdownIt();

  const element = document.createElement("div");

  // Add basic styling to the waiver PDF content
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
      <h1 style="text-align: center; font-size: 24px; color: #333; margin-bottom: 10px;">${waiver.name}</h1>
      <div style="margin-bottom: 20px; font-size: 14px; color: #555;">
        ${mdParser.render(waiver.content)}
      </div>
      <hr style="border: 1px solid #ddd; margin: 20px 0;">
      <div style="display: flex; justify-content: space-between; font-size: 14px; color: #333;">
        Signature: ${waiver?.caregiverName}<br/>
        Date: ${new Date(waiver.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  `;

  const html2pdf = (await import("html2pdf.js")).default;

  html2pdf()
    .set({
      margin: [10, 10, 10, 10], // Adjust margins for better layout
      filename: `${waiver.name}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait" },
    })
    .from(element)
    .save();
}
