import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-4xl">
                
               
                <div className="w-16 h-2 bg-[#A100FF] mb-8"></div>

                <div className="flex flex-col md:flex-row gap-12">
                    
                   
                    <div className="md:w-1/3">
                        <h2 className="text-5xl font-extrabold text-black tracking-tighter leading-tight">
                            Problem<br />
                            Statement
                        </h2>
                    </div>

                    
                    <div className="md:w-2/3">
                        <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                            A large scale industry needs an application to maintain their Inventory. 
                            We are tasked to build a comprehensive <span className="text-black font-bold">Inventory Management System (IMS)</span>.
                        </p>

                        <div className="space-y-6 border-l-2 border-gray-100 pl-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#A100FF] mb-2">
                                    Methodology
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    They expect a quick working product. Thus, we have to follow <span className="font-bold text-black">Agile Methodology</span> and achieve <span className="font-bold text-black">Continuous Delivery</span>.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#A100FF] mb-2">
                                    Architecture
                                </h3>
                                <p className="text-gray-700 text-lg">
                                    Vendor and Material details are to be maintained as <span className="font-bold text-black">two different services</span>. 
                                    IMS should fetch data from remote services, manage purchase details, and generate reports.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;