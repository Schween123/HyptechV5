import { Helmet } from "react-helmet";
import Header from "../../../components/Header/Header";
import AdminRoomInfo from "../../../components/AdminRoomInfo/AdminRoomInfo";
import { Suspense } from "react";

const globalStyles = `
  body, html {
    background-color: #C5C3C6; 
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


export default function RoomInfoPage() {
  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta
          name="description"
          content="Web site created using create-react-app"/>
          <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full border border-solid border-white-A700 ">
        <div className="flex flex-col items-center gap-[53px]  py-8 sm:gap-[26px] sm:py-5">
          <Header className="w-[92%] md:w-full md:gap-2.5 md:p-5 mt-[-30px]"/>
          <div className="container-xs mb-[5px] px-[35px] md:p-5 sm:px-5 flex items-center justify-center min-h-screen">
          <div className="mt-[-70px] grid w-[90%] grid-cols-4 justify-center items-center gap-[27px] self-center md:grid-cols-4 sm:grid-cols-1">
            <Suspense fallback={<div>Loading feed...</div>}>
              {data.map((d, index) => (
                <AdminRoomInfo {...d} key={"bhinfo" + index} />
              ))}
            </Suspense>         
          </div>  
        </div>

        </div>
      </div>
    </>
  );
}
