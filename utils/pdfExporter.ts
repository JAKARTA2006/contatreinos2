import { todayISO } from "./dateUtils";

export async function exportToPDF(element: HTMLElement | null) {
  if (!element) {
    alert('Elemento de exportação não encontrado.');
    return;
  }

  try {
    // Dynamic imports to keep initial bundle small and avoid direct dependencies issues if not installed immediately
    // Note: In a real production build, ensure 'jspdf' and 'html2canvas' are in package.json
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: '#0f172a', // Match the slate-950 background
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    
    const margin = 40;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.setFillColor(15, 23, 42); // Slate 950
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');

    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    pdf.save(`treinos_jj_${todayISO()}.pdf`);
  } catch (e) {
    console.error(e);
    alert('Erro ao exportar PDF. Verifique se as bibliotecas jspdf e html2canvas estão instaladas.');
  }
}
