import { QuotationData, QuotationItem, QuotationSection } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface QuotationFormProps {
  data: QuotationData;
  setData: (data: QuotationData) => void;
}

export function QuotationForm({ data, setData }: QuotationFormProps) {
  const updateField = (field: keyof QuotationData, value: string | number) => {
    setData({ ...data, [field]: value });
  };

  const addSection = () => {
    const newSection: QuotationSection = {
      id: Date.now().toString(),
      title: 'New Section',
      items: [],
    };
    setData({ ...data, sections: [...data.sections, newSection] });
  };

  const updateSection = (id: string, field: keyof QuotationSection, value: string) => {
    setData({
      ...data,
      sections: data.sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      ),
    });
  };

  const deleteSection = (id: string) => {
    setData({ ...data, sections: data.sections.filter(section => section.id !== id) });
  };

  const addItem = (sectionId: string) => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: 'New Service',
      details: '',
      manDays: 1,
    };
    setData({
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      ),
    });
  };

  const updateItem = (sectionId: string, itemId: string, field: keyof QuotationItem, value: string | number) => {
    setData({
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : section
      ),
    });
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    setData({
      ...data,
      sections: data.sections.map(section =>
        section.id === sectionId
          ? { ...section, items: section.items.filter(item => item.id !== itemId) }
          : section
      ),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="pb-4 border-b">Quotation Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3>Your Company Details</h3>
        <div>
          <label className="block text-sm mb-1">Company Name</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            value={data.companyAddress}
            onChange={(e) => updateField('companyAddress', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={data.companyEmail}
              onChange={(e) => updateField('companyEmail', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="tel"
              value={data.companyPhone}
              onChange={(e) => updateField('companyPhone', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h3>Client Details</h3>
        <div>
          <label className="block text-sm mb-1">Client Name</label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => updateField('clientName', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Client Company</label>
          <input
            type="text"
            value={data.clientCompany}
            onChange={(e) => updateField('clientCompany', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Address</label>
          <input
            type="text"
            value={data.clientAddress}
            onChange={(e) => updateField('clientAddress', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={data.clientEmail}
            onChange={(e) => updateField('clientEmail', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <h3>Items / Services</h3>
          <button
            onClick={addSection}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>

        <div className="space-y-6">
          {data.sections.map((section) => (
            <div key={section.id} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30 space-y-3">
              {/* Section Header */}
              <div className="flex justify-between items-center gap-2 pb-2 border-b-2 border-blue-300">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                  className="flex-1 px-3 py-1.5 border-2 border-blue-300 rounded-md font-semibold text-base bg-white"
                  placeholder="Section title"
                />
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                  title="Delete section"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-300 rounded-md p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium"
                          placeholder="Item description"
                        />
                        <textarea
                          value={item.details}
                          onChange={(e) => updateItem(section.id, item.id, 'details', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700"
                          placeholder="Details"
                          rows={2}
                        />
                        <div className="w-32">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Man Days</label>
                          <input
                            type="number"
                            value={item.manDays}
                            onChange={(e) => updateItem(section.id, item.id, 'manDays', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                            min="0"
                            step="0.5"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem(section.id, item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded mt-1"
                        title="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Item Button */}
              <button
                onClick={() => addItem(section.id)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 hover:bg-white transition-colors text-sm text-gray-600 hover:text-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <label className="block text-sm mb-1">Rate ($ per Man-Day)</label>
        <input
          type="number"
          value={data.rate}
          onChange={(e) => updateField('rate', parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min="0"
          step="50"
        />
      </div>

      <div className="pt-4 border-t">
        <label className="block text-sm mb-1">Notes / Terms</label>
        <textarea
          value={data.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
          placeholder="Payment terms, delivery timeline, etc."
        />
      </div>
    </div>
  );
}