import { Helmet } from "react-helmet";
import { Text, Input } from "../../../components";
import { useNavigate } from 'react-router-dom';

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

export default function GuardianRegistration() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/boarderfaceregistration'); // Adjust the path if needed
  };

    return (
    <>
    <Helmet>
    <title>HypTech</title>
    <meta name="description" content="Web site created using create-react-app" />
    <style>{globalStyles}</style>
    </Helmet>
    <div className="flex w-full flex-col items-center border border-solid border-white-A700 py-14 md:py-5">
        <div className="container-xs mb-[5px] flex flex-col gap-[139px] md:gap-[104px] md:p-5 sm:gap-[69px]">
            <div className="flex flex-col items-start jusify-center gap-[21px]">
                <Text size="2xl" as="p" className="!font-montserrat tracking-[8.00px] !text-black-900">
                    Kindly fill you Guardian's details
                </Text>   
                <div className="h-px self-stretch bg-cyan-800" />        
            </div>
           
            <div className="flex w-full justify-between gap-[120px] mt-[-50px]">
              {/* Left Side */}
              <div className="flex w-[48%] flex-col items-start">
                <div className="ml-[33px] flex w-full flex-col items-start md:ml-0">
                  <Text
                    size="md"
                    as="p"
                    className="relative z-[1] !font-opensans tracking-[2.50px]"
                  >
                    Name
                  </Text>
                  <div className="relative mt-[-2px] flex gap-[17px] self-stretch">
                    <Input
                      shape="square"
                      name="guardianfirstname"
                      className="w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px] "
                    />
                    <Input
                      shape="square"
                      name="guardianmiddlename"
                      className="w-[66px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                    />
                    <Input
                      shape="square"
                      name="guardianlastname"
                      className="w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                    />
                  </div>
                  
                  <Text
                    size="md"
                    as="p"
                    className="mt-[50px] !font-opensans tracking-[2.50px]"
                  >
                    Address
                  </Text>
                  <Input
                    shape="square"
                    name="guardianaddress"
                    className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="mr-[33px] flex w-[48%] flex-col items-start md:mr-0 md:w-full mt-[-6px]">
                <Text
                  size="md"
                  as="p"
                  className="!font-opensans tracking-[2.50px] "
                >
                  Contact Number
                </Text>
                <Input
                  shape="square"
                  name="guardiancontactnumber"
                  className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                />
                <Text
                  size="md"
                  as="p"
                  className="mt-[50px] !font-opensans tracking-[2.50px]"
                >
                  Relationship
                </Text>
                <Input
                  shape="square"
                  name="guardianrelationship"
                  className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                />
                
                <div className="self-end p-[50px]">
                <button onClick={handleButtonClick} className="bg-transparent border-none cursor-pointer">
                        <img src="/images/nxtbtn2.png" alt="arrowleft" />
                      </button>
                </div>
              </div>
            </div>
            </div>
        </div>
      
    </>
  );
}
