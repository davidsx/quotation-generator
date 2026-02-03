export interface QuotationItem {
    id: string;
    description: string;
    details: string;
    manDays: number;
  }
  
  export interface QuotationSection {
    id: string;
    title: string;
    items: QuotationItem[];
  }
  
  export interface QuotationData {
    date: string;
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    clientName: string;
    clientCompany: string;
    clientAddress: string;
    clientEmail: string;
    sections: QuotationSection[];
    rate: number;
    notes: string;
  }