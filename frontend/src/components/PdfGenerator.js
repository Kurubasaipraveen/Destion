import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const PdfGenerator = ({ invoice }) => {
  const generatePDF = () => {
    if (!invoice || !invoice.items || invoice.items.length === 0) {
      alert("No invoice data available.");
      return;
    }

    const doc = new jsPDF();

    // Set title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Invoice #${invoice.id}`, 10, 10);

    // Customer details
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer: ${invoice.customer}`, 10, 20);
    doc.text(`Total: $${invoice.total}`, 10, 30);

    // Table Headers
    const tableColumn = ["Item Name", "Quantity", "Price"];
    const tableRows = invoice.items.map((item) => [
      item.name,
      item.quantity,
      `$${item.price.toFixed(2)}`, // Ensure price is properly formatted
    ]);

    // AutoTable (for structured table format)
    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
    });

    // Save PDF
    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <button style={buttonStyle} onClick={generatePDF}>
      Download PDF
    </button>
  );
};


const buttonStyle = {
  background: "#007bff",
  color: "white",
  padding: "8px 12px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

export default PdfGenerator;
