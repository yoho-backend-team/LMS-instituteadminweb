import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const FindMissingOrder = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/help-faqs");
  };

  return (
    <div>
      <div onClick={() => handleNavigate()} className="">
        {" "}
        <IoArrowBackOutline className="h-6 w-6 bg-[#1BBFCA] rounded text-white" />
      </div>
      <div className="bg-[#1BBFCA] p-5 mt-5 text-white text-xl rounded-md font-semibold">
        Find a Missing Package
      </div>
      <div className="bg-white mt-5 rounded-2xl gap-5 p-15">
        <div className="text-[#1BBFCA] text-3xl font-semibold">
          Finding a Missing Package that shows as Delivered
        </div>
        <div className="text-[#716F6F] text-sm mt-5 border-b-1 pb-3">
          Follow these steps if tracking shows a package as delivered in Your
          Orders but you can't find it.
        </div>

        <div className="grid gap-6 mt-5  text-[#716F6F]">
          <div>
            <img
              src="https://m.media-amazon.com/images/G/01/support_images/GUID-E51A1BBB-939D-473D-96FF-6196455DA460=1=en-US=Normal.svg"
              alt=""
            />
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              1 - Confirm shipping address in Your Orders
            </h3>
            <ul className="list-disc list-inside">
              <li>
                Verify if your shipping address in Your Orders is correct. For
                more information on how to handle a wrong shipping address, go
                to Add and Manage Addresses.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              2 - Look for a notice of delivery attempt
            </h3>
            <ul className="list-disc list-inside">
              <li>Check the Message Center.</li>
              <li>Look for a delivery confirmation in Your Orders.</li>
              <li>Check your mailbox or wherever else you receive mail.</li>
              <li>Look for a delivery photo.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              3 - Check around the delivery location
            </h3>
            <ul className="list-disc list-inside">
              <li>
                Check your delivery instructions in Your Addresses. The package
                could have been left where you requested.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              4 - Ask your household members and neighbors
            </h3>
            <ul className="list-disc list-inside">
              <li>Check if someone else accepted the delivery.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              5 - Wait 48 hours for the package to be delivered
            </h3>
            <ul className="list-disc list-inside">
              <li>Packages may be scanned as delivered before arrival.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">
              6 - You can check with the carrier
            </h3>
            <ul className="list-disc list-inside">
              <li>
                The carrier may have more information about the location of the
                package. To track your package on the carrier website or contact
                them, go to Carrier Contact Information.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindMissingOrder;
