import { Helmet } from "react-helmet";
import { Text, Heading, Img } from "../../../components";
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

export default function BoarderRegistrationSuccessful() {
    const navigate = useNavigate();

    const handleExitClick = () => {
        navigate('/optionpage'); // Adjust this path if needed
    };

    return (
    <>
    <Helmet>
    <title>HypTech</title>
    <meta name="description" content="Web site created using create-react-app" />
    <style>{globalStyles}</style>
    </Helmet>
    <div className="flex w-full flex-col justify-center border border-solid border-white-A700 py-[82px] md:py-5">
        <div className="container-xs my-[84px] flex justify-center px-[244px] md:p-5 md:px-5">
            <div className="w-[70%] h-[70%]">
                <div className="flex flex-col items-center rounded-[15px] border-[5px] border-solid border-gray-400 bg-blue_gray-100 p-[25px] shadow-xs sm:p-5">
                <button onClick={handleExitClick} className="h-[30px] w-[30px] self-end border-none bg-transparent">
                    <Img src="/images/Exit.png" alt="close" />
                </button>
                <Heading size="lg" as="h1" className="mt-[107px] tracking-[5.00px] !text-black-900" >
                    You are all set up
                </Heading>
                <Text size="4xl" as="p" className="mt-[45px] w-[89%] text-center !font-montserrat leading-[60px] tracking[5.00px] !text-black-900 md:w-full md:p-5 ">
                    <>
                    Welcome to Boarding <br />
                    House Name
                    </>
                </Text>
                <Text size="2xl" as="p" className="mb-[5px] mt-[27px] !font-montserrat tracking-[4.00px] !text-cyan-800">
                    Enjoy your first day!
                </Text>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}
