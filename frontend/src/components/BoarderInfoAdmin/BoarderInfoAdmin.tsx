  import { Text } from "../../components";

  interface BoarderInfoAdminProps {
    boarder: string;
    duedate: string;
    dues: React.ReactElement;
  }

  const BoarderInfoAdmin: React.FC<BoarderInfoAdminProps> = ({ boarder, duedate, dues }) => {
    return (
      <>
      <div className="flex flex-1 items-start justify-between gap-5 rounded-[20px] bg-customgray p-[25px] sm:p-5 h-[124px]">
      <div className="flex flex-1 flex-col items-start">
                  <Text as="p" className="tracking-[3.00px] !text-black-900">
                      {boarder}
                  </Text>
                  <Text as="p" className="ml-auto mb-0 mt-[-20px] self-end tracking-[3.00px] !text-black-900 sm:self-auto ">
                      ₱ {dues}
                  </Text>
                  <Text size="s" as="p" className="relative mt-[-20px] tracking-[2.00px] !text-customdarkgray3">
                      Due Date {duedate}
                  </Text>
              </div>
              </div>

  </>
    );
  };

  export default BoarderInfoAdmin;