import React from 'react';

export default function PurchaseSummary({ data, onClose }) {
    if (!data) return null;

    return (
        
        <div className="mt-8 bg-white border-l-4 border-[#A100FF] shadow-lg rounded-sm p-6 animate-fade-in-up">
            
          
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                   
                    <div className="bg-purple-50 rounded-full p-2 mr-3">
                        <svg className="w-6 h-6 text-[#A100FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-black tracking-tight">ENTRY CONFIRMED</h2>
                        <p className="text-sm text-gray-500">Transaction recorded successfully.</p>
                    </div>
                </div>
                
              
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-[#A100FF] focus:outline-none transition-colors duration-200"
                >
                    <span className="text-3xl leading-none">&times;</span>
                </button>
            </div>

       
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm border-t border-gray-100 pt-6">
                
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Vendor</p>
                    <p className="font-bold text-gray-900 text-base truncate">{data.vendorNameLabel}</p>
                </div>
                
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Category</p>
                    <p className="font-bold text-gray-900 text-base">{data.categoryLabel}</p>
                </div>
                
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Material Type</p>
                    <p className="font-bold text-gray-900 text-base">{data.typeLabel}</p>
                </div>
                
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Details</p>
                    <p className="font-bold text-gray-900 text-base">
                        {data.quantity} {data.unitLabel} <span className="text-gray-400 font-normal">|</span> {data.brandName}
                    </p>
                </div>
                
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Purchase Date</p>
                    <p className="font-bold text-gray-900 text-base">{data.purchaseDate}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Transaction Id</p>
                    <p className="font-bold text-gray-900 text-base">{data.transactionId}</p>
                </div>
                
               
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Total Amount</p>
                    <p className="font-extrabold text-[#A100FF] text-2xl">₹{data.purchaseAmount}</p>
                </div>
            </div>
        </div>
    );
}