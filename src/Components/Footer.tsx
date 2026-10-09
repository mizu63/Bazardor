
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#dce3de] bg-[#f8faf8]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-6 text-sm text-[#53615a]">

                <p className="text-center md:text-left">
                    বাজারের দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p className="text-center md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
};

export default Footer;
