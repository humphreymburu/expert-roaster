import Link from 'next/link';
import React from "react";

export default function Logo() {
  return (
    <div className="p-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">ER</span>
        </div>
        <span className="font-semibold text-lg">Expert Roster</span>
      </Link>
    </div>
  );
}
