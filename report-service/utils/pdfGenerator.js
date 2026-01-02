import PDFDocument from "pdfkit";

export function generatePDF(title, lines, res) {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);

  doc.pipe(res);

  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();

  lines.forEach((line) => {
    doc.fontSize(12).text(line);
    doc.moveDown(0.5);
  });

  doc.end();
}
