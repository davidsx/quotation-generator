import { QuotationData } from '@/types';
import { Download } from 'lucide-react';
import { useRef } from 'react';

interface QuotationPreviewProps {
  data: QuotationData;
}

export function QuotationPreview({ data }: QuotationPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const totalManDays = data.sections.reduce((sum, section) => {
    return sum + section.items.reduce((itemSum, item) => itemSum + item.manDays, 0);
  }, 0);
  const total = totalManDays * data.rate;

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    // Use html2pdf library to generate PDF
    const html2pdf = (await import('html2pdf.js')).default;
    
    const opt = {
      margin: 0,
      filename: `quotation-${data.date}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>

      {/* Preview Content */}
      <div className="p-4 overflow-auto max-h-[calc(100vh-12rem)]">
        <div
          ref={printRef}
          className="bg-white shadow-lg"
          style={{
            width: '210mm',
            minHeight: '297mm',
            padding: '20mm',
            margin: '0 auto',
          }}
          id="quotation-preview"
        >
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">QUOTATION</h1>
          <div className="text-sm text-gray-600">
            <p>Date: {new Date(data.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Company and Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
          <div>
            <p className="font-semibold mb-2">From:</p>
            <p className="font-semibold">{data.companyName}</p>
            <p className="text-gray-600">{data.companyAddress}</p>
            <p className="text-gray-600">{data.companyEmail}</p>
            <p className="text-gray-600">{data.companyPhone}</p>
          </div>
          <div>
            <p className="font-semibold mb-2">To:</p>
            <p className="font-semibold">{data.clientName}</p>
            <p className="text-gray-600">{data.clientCompany}</p>
            <p className="text-gray-600">{data.clientAddress}</p>
            <p className="text-gray-600">{data.clientEmail}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          {data.sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-3">{section.title}</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 font-semibold">Description</th>
                    <th className="text-left py-2 font-semibold">Details</th>
                    <th className="text-right py-2 font-semibold">MD</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-3">{item.description}</td>
                      <td className="py-3 text-gray-600">{item.details}</td>
                      <td className="text-right py-3">{item.manDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-2">
              <span>Total Man-Days:</span>
              <span>{totalManDays}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Rate (per MD):</span>
              <span>${data.rate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-300 font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="text-sm">
            <p className="font-semibold mb-2">Notes & Terms:</p>
            <p className="text-gray-600 whitespace-pre-line">{data.notes}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}