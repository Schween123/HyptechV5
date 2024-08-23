import { Helmet } from "react-helmet";
import { Text, Img } from "../../../components";
import { Suspense, useState, useEffect } from "react";
import BoarderInfoAdmin from "../../../components/BoarderInfoAdmin/BoarderInfoAdmin";
import TotalAmount from "../../../components/TotalAmount/TotalAmount";

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

export default function BoarderInfoPage() {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tenants/');
        const data = await response.json();
        setTenants(data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  return (
    <>
      <Helmet>
        <title>HypTech</title>
        <meta name="description" content="Web site created using create-react-app" />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full border border-solid border-white-A700">
        <div className="flex flex-col items-center bg-customgray4">
          <div className="flex items-center self-stretch bg-customcyan p-3.5">
            <Img src="/images/backbtn.png" alt="arrowleftshort" className="my-6 ml-5" />
            <Text size="3xl" as="p" className="tracking-[4.50px] !text-white pl-5">
              Room 1
            </Text>
          </div>
          <div className="container max-w-[1273px] mb-5 p-2">
            <div className="flex flex-col gap-4">
              <Suspense fallback={<div>Loading feed...</div>}>
                {tenants.map((tenant, index) => (
                  <BoarderInfoAdmin
                    key={"boarderinfo" + index}
                    boarder={tenant.first_name + " " + tenant.last_name}
                    duedate={tenant.monthly_due_date}
                    dues={<TotalAmount total={tenant.monthly_due} />}
                  />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
