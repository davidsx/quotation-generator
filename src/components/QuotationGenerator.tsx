"use client";

import { QuotationData } from "@/types";
import { QuotationForm } from "./QuotationForm";
import { QuotationPreview } from "./QuotationPreview";
import { useState, useEffect } from "react";

const STORAGE_KEY = "quotation-generator-data";

const defaultQuotationData: QuotationData = {
  date: "2026-02-03",
  companyName: "Your Company Name",
  companyAddress: "123 Business St, City, State 12345",
  companyEmail: "info@yourcompany.com",
  companyPhone: "+1 (555) 123-4567",
  clientName: "Client Name",
  clientCompany: "Client Company",
  clientAddress: "456 Client Ave, City, State 67890",
  clientEmail: "client@company.com",
  sections: [
    {
      id: "1",
      title: "Application Development Tasks",
      items: [
        {
          id: "1",
          description: "Architecture & Security Foundation",
          details: "Database schema Design, Key Management, API Security Layer",
          manDays: 4,
        },
        {
          id: "2",
          description: "Backend Development",
          details:
            "Manufacturer Upload & Sign API, Verification Logic API, Report\nManagement, Manufacturer Management & Auth, Audit Logging System, 15\nRED Admin Management",
          manDays: 15,
        },
        {
          id: "3",
          description: "Frontend Development",
          details:
            "Manufacturer Upload and View Portal, RED Verification Admin Portal, PDF\nPreview & Handling",
          manDays: 15,
        },
        {
          id: "1770119426270",
          description: "Infrastructure Setup",
          details:
            "Cloud Environment Setup, Document Cloud Storage, CI/CD Pipeline,\nMonitoring & Alerting System, Audit Log Access, High-availability &\nDisaster Recovery Setup",
          manDays: 5,
        },
        {
          id: "1770119455569",
          description: "Testing & Quality Assurance",
          details:
            "Unit Testing, User Acceptance Testing, Security Testing, Cross-Browser &\nDevice Testing, Performance & Load Testing, Technical Documentation,\nNetwork Setup",
          manDays: 12,
        },
      ],
    },
    {
      id: "1770119478710",
      title: "Ongoing Operations and Maintenance (First year)",
      items: [
        {
          id: "1770119485953",
          description: "Routine Monitoring & Operations ",
          details: "0.5 MD / month",
          manDays: 6,
        },
        {
          id: "1770119493646",
          description: "Quarterly Patching ",
          details: "1.0 MD / quarter",
          manDays: 4,
        },
        {
          id: "1770119499271",
          description: "Incident Response",
          details: "2.0 MD as needed",
          manDays: 2,
        },
      ],
    },
  ],
  rate: 2300,
  notes: "Delivery timeline: 13-15 weeks from project start",
};

export function QuotationGenerator() {
  // Load data from localStorage on initial render using lazy initialization
  const [quotationData, setQuotationData] = useState<QuotationData>(() => {
    try {
      if (typeof window !== "undefined") {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          return JSON.parse(savedData) as QuotationData;
        }
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
    return defaultQuotationData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotationData));
      console.log(JSON.stringify(quotationData));
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
    }
  }, [quotationData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <QuotationForm data={quotationData} setData={setQuotationData} />
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <QuotationPreview data={quotationData} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
      </div>
    </div>
  );
}
