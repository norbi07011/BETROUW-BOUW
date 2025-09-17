import React, { useState } from 'react';
import useTranslations from '../hooks/useTranslations';
import { BriefcaseIcon, PaperClipIcon } from '../components/icons';
import type { Profession } from '../types';
import { toolData } from '../data/careersData';

const Careers: React.FC = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    bsn: '',
    kvk: '',
    btw: '',
    profession: '' as Profession | '',
    experience: '',
    vca: 'none',
    transport: 'no',
    drivingLicense: '',
    missingTools: '',
    toolsDate: '',
    cv: null as FileList | null,
    consent: false,
  });
  const [formStatus, setFormStatus] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  
  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profession = e.target.value as Profession;
    setFormData({ ...formData, profession });
    setSelectedTools(toolData[profession] || []);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
        alert(t.careers_form_consent_error);
        return;
    }
    console.log('Worker Application Submitted:', formData);
    setFormStatus(t.careers_form_success);
    // Here you would typically send the data to a server
  };

  const professions: {key: Profession, label: string}[] = [
      {key: 'window_fitter', label: t.profession_window_fitter},
      {key: 'carpenter', label: t.profession_carpenter},
      {key: 'mason', label: t.profession_mason},
      {key: 'facade_fitter', label: t.profession_facade_fitter},
      {key: 'concrete_specialist', label: t.profession_concrete_specialist},
      {key: 'joint_sealer', label: t.profession_joint_sealer},
      {key: 'other', label: t.profession_other},
  ];

  return (
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BriefcaseIcon className="h-16 w-16 mx-auto text-brand-gold mb-4" />
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">{t.careers_page_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.careers_page_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
            {formStatus && <p className="text-center text-green-600 bg-green-50 p-3 rounded-md">{formStatus}</p>}

            {/* Personal Information */}
            <fieldset className="space-y-6">
                <legend className="text-2xl font-bold text-brand-dark border-b-2 border-brand-gold pb-2 mb-6">{t.careers_section_personal}</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="fullName" placeholder={t.careers_form_full_name} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                    <input type="email" name="email" placeholder={t.careers_form_email} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="tel" name="phone" placeholder={t.careers_form_phone} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                    <input type="text" name="address" placeholder={t.careers_form_address} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="dob" onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder={t.careers_form_dob} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                    <input type="text" name="bsn" placeholder={t.careers_form_bsn} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="kvk" placeholder={t.careers_form_kvk} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                    <input type="text" name="btw" placeholder={t.careers_form_btw} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                </div>
            </fieldset>

            {/* Professional Information */}
            <fieldset className="space-y-6">
                <legend className="text-2xl font-bold text-brand-dark border-b-2 border-brand-gold pb-2 mb-6">{t.careers_section_professional}</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select name="profession" value={formData.profession} onChange={handleProfessionChange} required className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-gold focus:outline-none">
                        <option value="" disabled>{t.profession_placeholder}</option>
                        {professions.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                    </select>
                    <input type="number" name="experience" placeholder={t.careers_form_experience} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.careers_form_vca_title}</label>
                        <div className="flex gap-4">
                            <label className="flex items-center"><input type="radio" name="vca" value="none" checked={formData.vca === 'none'} onChange={handleFormChange} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.careers_form_vca_none}</span></label>
                            <label className="flex items-center"><input type="radio" name="vca" value="basic" checked={formData.vca === 'basic'} onChange={handleFormChange} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.careers_form_vca_basic}</span></label>
                            <label className="flex items-center"><input type="radio" name="vca" value="vol" checked={formData.vca === 'vol'} onChange={handleFormChange} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.careers_form_vca_vol}</span></label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.careers_form_transport_title}</label>
                         <div className="flex gap-4">
                            <label className="flex items-center"><input type="radio" name="transport" value="yes" checked={formData.transport === 'yes'} onChange={handleFormChange} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.careers_form_transport_yes}</span></label>
                            <label className="flex items-center"><input type="radio" name="transport" value="no" checked={formData.transport === 'no'} onChange={handleFormChange} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.careers_form_transport_no}</span></label>
                        </div>
                    </div>
                </div>

                 {selectedTools.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-md border">
                        <h4 className="font-semibold text-gray-800 mb-3">{t.careers_form_tools_title}: {t[`profession_${formData.profession}` as keyof typeof t]}</h4>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside text-gray-700 mb-4">
                            {selectedTools.map(toolKey => <li key={toolKey}>{t[toolKey as keyof typeof t]}</li>)}
                        </ul>
                        <textarea name="missingTools" placeholder={t.careers_form_missing_tools_placeholder} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none mb-2" onChange={handleFormChange} />
                        <label htmlFor="tools-date" className="block text-sm font-medium text-gray-700 mb-1">{t.careers_form_missing_tools_date}</label>
                        <input id="tools-date" type="date" name="toolsDate" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none" onChange={handleFormChange} />
                    </div>
                )}
            </fieldset>

            {/* Documents & Declarations */}
            <fieldset className="space-y-6">
                <legend className="text-2xl font-bold text-brand-dark border-b-2 border-brand-gold pb-2 mb-6">{t.careers_section_documents}</legend>
                <div>
                  <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-2">{t.careers_form_upload_cv}</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                       <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400"/>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-gold hover:text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold">
                            <span>{t.contact_form_upload_button}</span>
                            <input id="cv-upload" name="cv" type="file" className="sr-only" onChange={handleFormChange} />
                        </label>
                        {formData.cv && <p className="pl-1 text-gray-500">{formData.cv.length} {t.careers_form_cv_uploaded}</p>}
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX do 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                    <label className="flex items-start">
                        <input type="checkbox" name="consent" checked={formData.consent} onChange={handleFormChange} className="h-5 w-5 rounded text-brand-gold focus:ring-brand-gold mt-1"/>
                        <span className="ml-2 text-gray-700">{t.careers_form_data_consent}</span>
                    </label>
                </div>
            </fieldset>

            <button type="submit" className="w-full py-4 px-6 bg-brand-gold text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all text-lg">{t.careers_form_submit}</button>
        </form>
      </div>
    </div>
  );
};

// FIX: Add missing default export for the Careers component.
export default Careers;
