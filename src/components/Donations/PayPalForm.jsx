import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const PayPalForm = ({
  fundingSource,
  amount = 5,
  showSpinner = false,
  description = "Kcc Offertory",
  currency = "USD",
  postOffertory,
  setSelectTheRightCurrency,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (currency === "UGX") {
      setSelectTheRightCurrency(true);
      return;
    }
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {/* <div style={{ maxWidth: "750px", minHeight: "200px" }}> */}
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={fundingSource}
        createOrder={(data, actions) => {
          if (currency === "UGX") {
            setSelectTheRightCurrency(true);
            return;
          }
          return actions.order
            .create({
              purchase_units: [
                {
                  description: description?.toString(),
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Your code here after capture the order
            console.log(details);
            postOffertory(JSON.stringify(details));
          });
        }}
        onError={(err) => console.log(err)}
        onCancel={(data, actions) =>
          console.log("order has been canceled by User", data)
        }
      />
      {/* </div> */}
    </>
  );
};

export default PayPalForm;
