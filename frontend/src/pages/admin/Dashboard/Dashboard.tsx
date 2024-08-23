import { Helmet } from "react-helmet";
import { Text } from "../../../components";
import Header from "../../../components/Header/Header.tsx";
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
    { boarders: "BOARDERS" },
    { boarders: "PAID FOR <br/>THE MONTH" },
    { boarders: "NOT YET PAID <br/>FOR THE MONTH" },
];

export default function DashboardPage() {
    return (
        <>
            <Helmet>
                <title>HypTech</title>
                <meta name="description" content="Web site created using create-react-app" />
                <style>{globalStyles}</style>
            </Helmet>
            <div className="w-full border border-solid border-white-A700">
                <div className="flex flex-col items-center gap-4 p-7">
                    <Header className="w-full max-w-[1306px]" />
                    <div className="w-full max-w-[1306px] flex flex-col items-center">
                        <div className="self-stretch pl-10">
                            <Text size="4xl" as="p" className="!font-opensans text-3xl md:text-4xl lg:text-5xl">
                                Boarding House Name
                            </Text>
                            <Text as="p" className="!font-opensans !text-blue_gray-700 text-lg md:text-xl lg:text-2xl">
                                DASHBOARD
                            </Text>
                        </div>
                        <div className="flex w-full justify-center mt-6">
                            <Suspense fallback={<div>Loading feed...</div>}>
                                <div className="flex justify-center gap-4 md:gap-10 lg:gap-20">
                                    {data.map((d, index) => (
                                        <div
                                            key={"dashboard" + index}
                                            className="flex flex-col items-center justify-center gap-2 rounded-[20px] bg-customdarkgray3 p-4 md:p-3 lg:p-3 w-[90px] sm:w-[120px] md:w-[180px] lg:w-[287px] h-[90px] sm:h-[120px] md:h-[180px] lg:h-[270px]"
                                        >
                                            <Text
                                                as="p"
                                                size="3xl"
                                                className="!font-open-sans text-white text-center text-md md:text-lg lg:text-3xl"
                                                dangerouslySetInnerHTML={{ __html: d.boarders }}
                                            />
                                            <Text size="5xl" as="p" className="!font-open-sans !text-white">
                                                00
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
