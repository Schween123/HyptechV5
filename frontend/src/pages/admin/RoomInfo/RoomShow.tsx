import { Helmet } from "react-helmet";
import { Suspense } from "react";

const globalStyles = `
  body, html {
    background-color: #C5C6C8; 
    height: 100%;
    margin: 0;
  }
  #root, .app {
    height: 100%;
  }
`;

const data = [
  { roomnumber: "Room 1", capacity: "1/2" },
  { roomnumber: "Room 2", capacity: "1/2"  },
  { roomnumber: "Room 3", capacity: "1/2"  },
  { roomnumber: "Room 4", capacity: "1/2" },
  { roomnumber: "Room 5", capacity: "1/2" },
  { roomnumber: "Room 6", capacity: "1/2"  },
  { roomnumber: "Room 7", capacity: "1/2"  },
  { roomnumber: "Room 8", capacity: "1/2"},
  { roomnumber: "Room 9", capacity: "1/2"},
  { roomnumber: "Room 10", capacity: "1/2" },
  { roomnumber: "Room 11", capacity: "1/2" },
  { roomnumber: "Room 12", capacity: "1/2" },
];

export default function RoomShow() {
  return (
    <>
      <Helmet>
        <title>HypTech - Room Show</title>
        <meta name="description" content="Room information display page" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full border border-solid border-white-A700">
        <div className="flex flex-col items-center gap-[53px] py-8 sm:gap-[26px] sm:py-5">
          <h1 className="text-4xl font-bold text-gray-800">Available Rooms</h1> {/* Title Added */}
          <div className="container-xs mb-[5px] px-[35px] md:p-5 sm:px-5 flex items-center justify-center min-h-screen">
            <div className="mt-[-70px] grid w-[90%] grid-cols-4 justify-center items-center gap-[27px] self-center md:grid-cols-4 sm:grid-cols-1">
              <Suspense fallback={<div>Loading rooms...</div>}>
                {data.map((d, index) => (
                  <div 
                    key={`roomshow-${index}`} 
                    className="p-4 bg-gray-700 text-white rounded-lg shadow-md"
                  >
                    <h2 className="text-xl font-bold">{d.roomnumber}</h2>
                    <p className="text-sm">Capacity: {d.capacity}</p>
                  </div>
                ))}
              </Suspense>         
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}
