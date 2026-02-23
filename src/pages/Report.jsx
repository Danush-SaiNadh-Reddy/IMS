import React, { useEffect, useState } from "react";
import ReportTable from "../components/ReportTable"; // Ensure path is correct
import api from "../api/axios";


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


const inputClasses = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A100FF] focus:border-transparent transition-all duration-200 cursor-pointer";
const labelClasses = "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide";

function Report() {
    const [vendor, setVendor] = useState();
    const [vendors,setVendors] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [showReportTable, setShowReportTable] = useState(false);

    
    const [picker, setPicker] = useState({
        type: "",
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
    });

    const handleDateClick = (type) => {
        setPicker({
            type,
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
        });
        if (type === "from") { setShowFromPicker(true); setShowToPicker(false); }
        else { setShowToPicker(true); setShowFromPicker(false); }
    };

    const handlePickerChange = (field, value) => {
        setPicker((prev) => ({ ...prev, [field]: value }));
    };

    const handleDaySelect = (day) => {
        const dateStr = `${picker.year}-${String(picker.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        if (picker.type === "from") {
            setFromDate(dateStr);
            setShowFromPicker(false);
        } else {
            setToDate(dateStr);
            setShowToPicker(false);
        }
    };

    const DatePicker = ({ show, onClose }) => {
        if (!show) return null;
        const days = getDaysInMonth(picker.year, picker.month);
        return (
            <div className="absolute z-50 bg-white border border-gray-200 rounded shadow-xl p-4 mt-2 w-72 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                    <select
                        className="bg-gray-50 border-none text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer"
                        value={picker.month}
                        onChange={e => handlePickerChange("month", Number(e.target.value))}
                    >
                        {months.map((m, i) => (
                            <option key={m} value={i}>{m}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="bg-gray-50 border-none text-sm font-bold text-gray-900 w-16 focus:ring-0 text-right"
                        value={picker.year}
                        min={2000}
                        max={2100}
                        onChange={e => handlePickerChange("year", Number(e.target.value))}
                    />
                    <button
                        className="text-gray-400 hover:text-[#A100FF] transition-colors"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
                        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {Array(new Date(picker.year, picker.month, 1).getDay() || 7 - 1)
                            .fill(null)
                            .map((_, i) => <div key={`empty-${i}`}></div>)}
                        {Array.from({ length: days }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`w-8 h-8 rounded text-sm font-medium transition-colors duration-150 
                                    ${(picker.type === 'from' && fromDate.endsWith(`-${String(i+1).padStart(2,'0')}`)) || (picker.type === 'to' && toDate.endsWith(`-${String(i+1).padStart(2,'0')}`)) 
                                    ? 'bg-[#A100FF] text-white shadow-md' 
                                    : 'text-gray-700 hover:bg-purple-50 hover:text-[#A100FF]'}`}
                                onClick={() => handleDaySelect(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowReportTable(false);
        setTimeout(() => setShowReportTable(true), 10);
    };

    useEffect(() => {
        api.get('/vendor/controller/getVendors').then(res => setVendors(res.data));
    }, []);
    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
            
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-black tracking-tight mb-2">
                    Purchase Reports
                </h1>
                <p className="text-gray-500 font-medium">Generate vendor-wise transaction history</p>
            </div>

            <div className="w-full max-w-4xl">
                
                <div className="bg-white border-t-4 border-[#A100FF] shadow-lg rounded-sm p-8 sm:p-12 mb-8 animate-fade-in-up">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            
                            
                            <div>
                                <label className={labelClasses}>
                                    Vendor Name <span className="text-[#A100FF]">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        className={`${inputClasses} appearance-none`}
                                        onChange={e => setVendor(e.target.value)}
                                    >
                                        {vendors.map(v => (
                                            <option key={v.vendorName} value={v.vendorName}>{v.vendorName}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>

                           
                            <div className="relative">
                                <label className={labelClasses}>From Date</label>
                                <div className="relative">
                                    <input
                                        className={inputClasses}
                                        value={fromDate}
                                        readOnly
                                        placeholder="YYYY-MM-DD"
                                        onClick={() => handleDateClick("from")}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                </div>
                                <DatePicker
                                    show={showFromPicker}
                                    onClose={() => setShowFromPicker(false)}
                                />
                            </div>

                            
                            <div className="relative">
                                <label className={labelClasses}>To Date</label>
                                <div className="relative">
                                    <input
                                        className={inputClasses}
                                        value={toDate}
                                        readOnly
                                        placeholder="YYYY-MM-DD"
                                        onClick={() => handleDateClick("to")}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                </div>
                                <DatePicker
                                    show={showToPicker}
                                    onClose={() => setShowToPicker(false)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-[#A100FF] hover:bg-[#8500d1] text-white font-bold py-3 px-10 rounded transition-colors duration-300 ease-in-out uppercase tracking-wider"
                            >
                                Generate Report <span className="ml-2">&gt;</span>
                            </button>
                        </div>
                    </form>
                </div>

                
                {showReportTable && (
                    <div className="mt-8 animate-fade-in-up">
                         <div className="flex items-center mb-4">
                            <div className="bg-purple-50 rounded-full p-2 mr-3">
                                <svg className="w-5 h-5 text-[#A100FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
                        </div>
                        <ReportTable vendorName={vendor} reportFromDate={fromDate} reportToDate={toDate} />
                    </div>
                )}

                
            </div>
        </div>
    );
}

export default Report;