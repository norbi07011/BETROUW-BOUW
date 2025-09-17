
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import { PHONE_NUMBER, EMAIL_ADDRESS, WHATSAPP_LINK } from '../constants';
import { PhoneIcon, MailIcon, WhatsAppIcon, MapPinIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, PaperClipIcon } from '../components/icons';

type ActiveTab = 'quote' | 'consultation' | 'question';

const Contact: React.FC = () => {
  const t = useTranslations();
  const location = useLocation();
  const initialCategory = location.state?.category || '';

  const [activeTab, setActiveTab] = useState<ActiveTab>('quote');

  const [quoteData, setQuoteData] = useState({
    name: '', email: '', phone: '', category: initialCategory, message: '',
    buildingType: 'renovation', materials: [], quantity: '', address: '', files: null,
  });
  const [consultationData, setConsultationData] = useState({
    name: '', phone: '', contactMethod: 'phone', time: 'morning', note: ''
  });
  const [questionData, setQuestionData] = useState({ name: '', email: '', question: '' });

  const [formStatus, setFormStatus] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, formType: ActiveTab) => {
    const { name, value, type } = e.target;
    
    const updater = (setter: React.Dispatch<React.SetStateAction<any>>) => {
       if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setter((prev: any) => ({
          ...prev,
          materials: checked ? [...prev.materials, value] : prev.materials.filter((m: string) => m !== value)
        }));
      } else if (type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        setter((prev: any) => ({ ...prev, [name]: files }));
      } else {
        setter((prev: any) => ({ ...prev, [name]: value }));
      }
    };

    if (formType === 'quote') updater(setQuoteData);
    if (formType === 'consultation') updater(setConsultationData);
    if (formType === 'question') updater(setQuestionData);
  };
  
  const handleSubmit = (e: React.FormEvent, formType: ActiveTab) => {
    e.preventDefault();
    let dataToSubmit;
    if (formType === 'quote') dataToSubmit = quoteData;
    if (formType === 'consultation') dataToSubmit = consultationData;
    if (formType === 'question') dataToSubmit = questionData;

    console.log(`Form '${formType}' submitted:`, dataToSubmit);
    setFormStatus(t.contact_form_success);

    // Reset forms
    setQuoteData({ name: '', email: '', phone: '', category: initialCategory, message: '', buildingType: 'renovation', materials: [], quantity: '', address: '', files: null });
    setConsultationData({ name: '', phone: '', contactMethod: 'phone', time: 'morning', note: '' });
    setQuestionData({ name: '', email: '', question: '' });

    setTimeout(() => setFormStatus(''), 5000);
  };

  const categoryOptions = [
    t.offer_windows_title, t.offer_doors_title, t.offer_blinds_title,
    t.offer_facades_title, t.projects_filter_modernization, t.contact_form_category_other
  ];
  
  const materialOptions = ['PVC', t.about_value_1, t.about_value_2];

  const tabButtonStyle = (tabName: ActiveTab) =>
    `flex-1 sm:flex-none flex items-center justify-center gap-x-3 text-sm font-bold p-4 rounded-t-lg border-b-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold ${
      activeTab === tabName
        ? 'border-brand-gold text-brand-gold bg-white'
        : 'border-transparent text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="bg-brand-light py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">{t.contact_page_title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.contact_page_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
             <div className="flex flex-col sm:flex-row border-b border-gray-200">
                <button className={tabButtonStyle('quote')} onClick={() => setActiveTab('quote')}><DocumentTextIcon className="h-5 w-5"/> {t.contact_tab_quote}</button>
                <button className={tabButtonStyle('consultation')} onClick={() => setActiveTab('consultation')}><ChatBubbleLeftRightIcon className="h-5 w-5"/> {t.contact_tab_consultation}</button>
                <button className={tabButtonStyle('question')} onClick={() => setActiveTab('question')}><QuestionMarkCircleIcon className="h-5 w-5"/> {t.contact_tab_question}</button>
            </div>
            
            <div className="bg-white p-8 rounded-b-lg shadow-lg">
              {formStatus && <p className="mb-4 text-center text-green-600 bg-green-50 p-3 rounded-md">{formStatus}</p>}
              
              {/* Quote Form */}
              {activeTab === 'quote' && (
                <form onSubmit={(e) => handleSubmit(e, 'quote')} className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input type="text" name="name" placeholder={t.contact_form_name} value={quoteData.name} onChange={(e) => handleFormChange(e, 'quote')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                    <input type="email" name="email" placeholder={t.contact_form_email} value={quoteData.email} onChange={(e) => handleFormChange(e, 'quote')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                  </div>
                  <div>
                    <input type="tel" name="phone" placeholder={t.contact_form_phone} value={quoteData.phone} onChange={(e) => handleFormChange(e, 'quote')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">{t.project_details_title}</h3>
                     <select name="category" value={quoteData.category} onChange={(e) => handleFormChange(e, 'quote')} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-gold focus:outline-none">
                        <option value="" disabled>{t.contact_form_project_type}</option>
                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input type="text" name="address" placeholder={t.contact_form_address} value={quoteData.address} onChange={(e) => handleFormChange(e, 'quote')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                      <input type="text" name="quantity" placeholder={t.contact_form_approx_quantity} value={quoteData.quantity} onChange={(e) => handleFormChange(e, 'quote')} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                   </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact_form_building_type}</label>
                     <div className="flex gap-4">
                        <label className="flex items-center"><input type="radio" name="buildingType" value="renovation" checked={quoteData.buildingType === 'renovation'} onChange={(e) => handleFormChange(e, 'quote')} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.contact_form_building_renovation}</span></label>
                        <label className="flex items-center"><input type="radio" name="buildingType" value="new" checked={quoteData.buildingType === 'new'} onChange={(e) => handleFormChange(e, 'quote')} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.contact_form_building_new}</span></label>
                     </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact_form_materials}</label>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center"><input type="checkbox" name="materials" value="PVC" onChange={(e) => handleFormChange(e, 'quote')} className="h-4 w-4 rounded text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">PVC</span></label>
                        <label className="flex items-center"><input type="checkbox" name="materials" value="Aluminium" onChange={(e) => handleFormChange(e, 'quote')} className="h-4 w-4 rounded text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">Aluminium</span></label>
                        <label className="flex items-center"><input type="checkbox" name="materials" value="Wood" onChange={(e) => handleFormChange(e, 'quote')} className="h-4 w-4 rounded text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">Drewno</span></label>
                    </div>
                  </div>
                  <div>
                    <textarea name="message" placeholder={t.contact_form_message} value={quoteData.message} onChange={(e) => handleFormChange(e, 'quote')} rows={4} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"></textarea>
                  </div>
                  <div>
                      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">{t.contact_form_upload_label}</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                           <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400"/>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-gold hover:text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold">
                              <span>{t.contact_form_upload_button}</span>
                              <input id="file-upload" name="files" type="file" multiple className="sr-only" onChange={(e) => handleFormChange(e, 'quote')} />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">{quoteData.files ? `${quoteData.files.length} plik(ów) wybrano` : 'PNG, JPG, PDF do 10MB'}</p>
                        </div>
                      </div>
                  </div>
                  <button type="submit" className="w-full py-3 px-6 bg-brand-gold text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all">{t.contact_form_submit}</button>
                  <a
                    href={`https://wa.me/31684111366?text=${encodeURIComponent('Dzień dobry! Chciałbym umówić konsultację.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block mt-4 py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 text-center transition-all"
                  >
                    Wyślij przez WhatsApp
                  </a>
              <a
                href={`https://wa.me/31684111366?text=${encodeURIComponent('Dzień dobry! Chciałbym uzyskać wycenę projektu.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block mt-4 py-3 px-6 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 text-center transition-all"
              >
                Wyślij przez WhatsApp
              </a>
                </form>
              )}

              {/* Consultation Form */}
              {activeTab === 'consultation' && (
                <form onSubmit={(e) => handleSubmit(e, 'consultation')} className="space-y-6 animate-fade-in">
                    <p className="text-gray-600 text-center">{t.contact_consultation_desc}</p>
                    <input type="text" name="name" placeholder={t.contact_form_name} value={consultationData.name} onChange={(e) => handleFormChange(e, 'consultation')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                    <input type="tel" name="phone" placeholder={t.contact_form_phone} value={consultationData.phone} onChange={(e) => handleFormChange(e, 'consultation')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact_form_preferred_contact}</label>
                        <div className="flex gap-4">
                           <label className="flex items-center"><input type="radio" name="contactMethod" value="phone" checked={consultationData.contactMethod === 'phone'} onChange={(e) => handleFormChange(e, 'consultation')} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.contact_form_contact_phone}</span></label>
                           <label className="flex items-center"><input type="radio" name="contactMethod" value="whatsapp" checked={consultationData.contactMethod === 'whatsapp'} onChange={(e) => handleFormChange(e, 'consultation')} className="h-4 w-4 text-brand-gold focus:ring-brand-gold"/> <span className="ml-2 text-gray-700">{t.contact_form_contact_whatsapp}</span></label>
                        </div>
                    </div>
                    
                     <select name="time" value={consultationData.time} onChange={(e) => handleFormChange(e, 'consultation')} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-gold focus:outline-none">
                        <option value="" disabled>{t.contact_form_best_time}</option>
                        <option value="morning">{t.contact_form_time_morning}</option>
                        <option value="afternoon">{t.contact_form_time_afternoon}</option>
                        <option value="evening">{t.contact_form_time_evening}</option>
                    </select>

                    <textarea name="note" placeholder={t.contact_form_message} value={consultationData.note} onChange={(e) => handleFormChange(e, 'consultation')} rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"></textarea>
                    <button type="submit" className="w-full py-3 px-6 bg-brand-gold text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all">{t.contact_consultation_submit}</button>
                </form>
              )}

              {/* Question Form */}
              {activeTab === 'question' && (
                <form onSubmit={(e) => handleSubmit(e, 'question')} className="space-y-6 animate-fade-in">
                  <p className="text-gray-600 text-center">{t.contact_question_desc}</p>
                   <input type="text" name="name" placeholder={t.contact_form_name} value={questionData.name} onChange={(e) => handleFormChange(e, 'question')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                   <input type="email" name="email" placeholder={t.contact_form_email} value={questionData.email} onChange={(e) => handleFormChange(e, 'question')} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"/>
                   <textarea name="question" placeholder={t.contact_form_your_question} value={questionData.question} onChange={(e) => handleFormChange(e, 'question')} rows={5} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none"></textarea>
                  <button type="submit" className="w-full py-3 px-6 bg-brand-gold text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all">{t.contact_form_submit}</button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">{t.contact_info_title}</h3>
                <ul className="space-y-4">
                    <li className="flex items-center"><PhoneIcon className="h-6 w-6 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold"/><a href={`tel:${PHONE_NUMBER}`} className="text-gray-700 hover:text-brand-gold">{PHONE_NUMBER}</a></li>
                    <li className="flex items-center"><MailIcon className="h-6 w-6 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold"/><a href={`mailto:${EMAIL_ADDRESS}`} className="text-gray-700 hover:text-brand-gold">{EMAIL_ADDRESS}</a></li>
                    <li className="flex items-center"><WhatsAppIcon className="h-6 w-6 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold"/><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-gold">{t.contact_on_whatsapp}</a></li>
                    <li className="flex items-start"><MapPinIcon className="h-6 w-6 mr-3 rtl:ml-3 rtl:mr-0 text-brand-gold flex-shrink-0 mt-1"/><span className="text-gray-700">{t.contact_address}</span></li>
                </ul>
            </div>
             <div className="h-80 w-full rounded-lg shadow-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.941655694819!2d4.8922304159048!3d52.37021597978586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c1b3f2a1e7%3A0x1d4a1b6a1b6a1b6a!2sDam%20Square%2C%20Amsterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1626886481747!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Company Location"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact;
