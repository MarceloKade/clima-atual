import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchProps {
    type: string;
}

export function Search(props: SearchProps) {
    return (
        <div className="flex justify-center min-h-screen mt-[4vw]">
            <div className="flex-grow max-w-md">
                <input
                    className="w-full text-2xl bg-gray-900 text-gray-100 placeholder-gray-500 border rounded-3xl py-2 px-12  focus:outline-none border-gray-300 focus:border-blue-500"
                    type={props.type}
                    placeholder="Digite a localização desejada"
                />
                <span className="absolute right-[41.2em] top-[6em] transform -translate-y-1/2 text-gray-500">
                    <FiSearch size={32} />
                </span>
            </div>
        </div>

    );
}
