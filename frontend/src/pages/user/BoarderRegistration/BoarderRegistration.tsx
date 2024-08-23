import { Helmet } from "react-helmet";
import { Text, Input, Heading } from "../../../components";
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

export default function BoarderRegistration1Page() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/guardianregistration'); // Adjust the path if needed
  };

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="flex w-full justify-center border border-solid border-white-A700 py-[50px] md:py-2">
        <div className="container-xs mb-[23px] flex justify-center md:p-5">
          <div className="flex w-full flex-col gap-[142px] md:gap-[106px] sm:gap-[71px]">
            <div className="flex flex-col items-center gap-2 px-[30px] sm:px-5">
              <Heading
                as="h1"
                className="!font-montserrat tracking-[9.00px] ! text-black-900"
              >
                WELCOME TO BOARDING HOUSE NAME
              </Heading>
              <div className="h-px self-stretch bg-cyan-800" />
            </div>

            <div className="flex w-full justify-between gap-[120px] mt-[-50px]">
              {/* Left Side */}
              <div className="flex w-[48%] flex-col items-start">
                <div className="ml-[33px] flex w-full flex-col items-start md:ml-0">
                  <Text
                    size="md"
                    as="p"
                    className="relative z-[1] !font-open-sans tracking-[2.50px]"
                  >
                    Name
                  </Text>
                  <div className="relative mt-[-2px] flex gap-[17px] self-stretch">
                    <Input
                      shape="square"
                      name="boarderfirstname"
                      className="w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px] "
                    />
                    <Input
                      shape="square"
                      name="boardermiddlename"
                      className="w-[66px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                    />
                    <Input
                      shape="square"
                      name="boarderlastname"
                      className="w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                    />
                  </div>
                  {/* Gender and Age Section */}
                  <div className="mt-5 flex flex-col md:flex-row items-start justify-between gap-[30px]">
                    {/* Gender Section */}
                    <div className="flex flex-col items-start">
                      <Text
                        size="md"
                        as="p"
                        className="!font-open-sans tracking-[2.50px] mb-1 "
                      >
                        Gender
                      </Text>
                      <div className="flex items-center gap-2">
                        <Input
                          shape="square"
                          name="boardergender"
                          className="relative w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                        />
                      </div>
                    </div>

                    {/* Age Section */}
                    <div className="flex flex-col items-start mt-1 md:mt-0">
                      <Text
                        size="md"
                        as="p"
                        className="!font-open-sans tracking-[2.50px] mb-1 "
                      >
                        Age
                      </Text>
                      <div className="flex items-center gap-2">
                        <Input
                          shape="square"
                          name="boarderage"
                          className="relative w-[220px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                        />
                      </div>
                    </div>
                  </div>
                  <Text
                    size="md"
                    as="p"
                    className="mt-[25px] !font-open-sans tracking-[2.50px]"
                  >
                    Address
                  </Text>
                  <Input
                    shape="square"
                    name="boarderaddress"
                    className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="mr-[33px] flex w-[48%] flex-col items-start md:mr-0 md:w-full mt-[-6px]">
                <Text
                  size="md"
                  as="p"
                  className="!font-open-sans tracking-[2.50px] "
                >
                  Contact Number
                </Text>
                <Input
                  shape="square"
                  name="boardercontactnumber"
                  className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                />
                <Text
                  size="md"
                  as="p"
                  className="mt-[25px] !font-open-sans tracking-[2.50px]"
                >
                  Course/Profession
                </Text>
                <Input
                  shape="square"
                  name="boardercourse"
                  className="w-[546px] border-b-2 border-customColor1 pb-[-30px] pt-[30px] !text-xl mt-[-10px]"
                />
                <Text
                  size="md"
                  as="p"
                  className="mt-[25px] !font-open-sans tracking-[2.50px]"
                >
                  School/Company
                </Text>
                <Input
                  shape="square"
                  name="boarderinstitution"
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
      </div>
    </>
  );
}
