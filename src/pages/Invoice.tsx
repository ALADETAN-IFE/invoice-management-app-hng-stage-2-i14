import { useParams } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();
  return (
    <div className="w-full h-full flex justify-center pt-8 sm:pt-15.25 lg:pt-19.25">
      <div className="flex flex-col w-9/10 lg:w-182.5">Invoice {id}</div>
    </div>
  );
};

export default Invoice;
