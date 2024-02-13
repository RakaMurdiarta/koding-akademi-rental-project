import React from "react";
import Image from "next/image";

interface CustomCardProps {
  model: string;
  year: number;
  identityNumber: string;
  weeklyRate: number;
  dailyRate: number;
  type: string;
  imageUrl: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  model,
  year,
  identityNumber,
  weeklyRate,
  dailyRate,
  type,
  imageUrl,
}: CustomCardProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center">
        <div className="max-w-lg w-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div
              className="bg-cover bg-center h-56 p-4"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800)",
              }}
            >
              <div className="flex justify-end">
                <svg
                  className="h-6 w-6 text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                Detached house • 5y old
              </p>
              <p className="text-3xl text-gray-900">$750,000</p>
              <p className="text-gray-700">742 Evergreen Terrace</p>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-700">
              <div className="flex-1 inline-flex items-center">
                <button>hai</button>
              </div>
            </div>
            <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
              <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                owner
              </div>
              <div className="flex items-center pt-2">
                <div
                  className="bg-cover bg-center w-10 h-10 rounded-full mr-3"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)",
                  }}
                ></div>
                <div>
                  <p className="font-bold text-gray-900">Tiffany Heffner</p>
                  <p className="text-sm text-gray-700">(555) 555-4321</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
