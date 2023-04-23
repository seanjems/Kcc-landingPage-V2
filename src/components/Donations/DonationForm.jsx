import React, { useState } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import "./DonationForm.css";
import css from "./../Footer/Footer.module.scss";
import { IconX } from "@tabler/icons";
import data from "./OfferToryData";
import CustomSelect from "./CustomeSelect";

const categories = ["Tithes", "Offerings", "Missions", "Building Fund"];

function DonationForm() {
  const [total, setTotal] = useState(0);
  const [uniqueCounter, setUniqueCounter] = useState(1);
  const [currency, setCurrency] = useState("UGX");
  const [donations, setDonations] = useState([
    { amount: 0, category: "", id: uniqueCounter },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddDonation = () => {
    const newDonation = { amount: 0, category: "" };
    setDonations([...donations, newDonation]);
  };

  const handleDonate = (index, amount, category) => {
    const newDonations = [...donations];
    newDonations[index] = { amount, category };
    setDonations(newDonations);

    const newTotal = newDonations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    setTotal(newTotal);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <div className={`paddings outer-coainer-main ${css.wrapper}`}>
      <div className="outer-container ">
        <div className="d-flex justify-content-between m-2">
          <span>Give</span>
          <select onChange={(e) => setCurrency(e.target.value)}>
            <option value="UGX" default>
              UGX
            </option>
            <option value="USD">USD</option>
          </select>
        </div>
        {donations.map((donation, index) => (
          <DonationItem
            key={index}
            donation={donation}
            onDonate={(amount) =>
              handleDonate(index, amount, donation.category)
            }
          />
        ))}
        <br />
        <div className="total-section ">
          <div>
            Total: {currency} {total.toLocaleString("en-US")}
          </div>
          <span className="btn-add-donation" onClick={handleAddDonation}>
            <IconPlus size="1rem" /> <span>Add Donation</span>
          </span>
        </div>
        <br />
        <br />
        <TextInput
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextInput
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="submit-section mt-2">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

function DonationItem({ donation, onDonate }) {
  const [amount, setAmount] = useState(donation.amount);
  const [category, setCategory] = useState(donation.category);
  const [uniqueCounter, setUniqueCounter] = useState(donation.uniqueCounter);

  const handleDonate = () => {
    if (amount > 0 && category !== "") {
      onDonate(amount);
      setAmount(0);
      setCategory("");
    }
  };

  return (
    <>
      <div className="donation-item">
        <TextInput
          type="number"
          value={amount}
          onChange={(event) => setAmount(parseFloat(event.target.value))}
        />
        {/* <Select
        data={categories}
        placeholder="Select a category"
        value={category}
        onChange={(event) => console.log(event)}
        style={{ minWidth: "8rem" }}
      /> */}
        <CustomSelect />
        <div className="m-2" style={{ cursor: "pointer" }}>
          <IconX color="hsl(1, 83%, 62%)" />
        </div>
        {/* <Button onClick={handleDonate}>Donate</Button> */}
      </div>
    </>
  );
}

export default DonationForm;

// import React, { useState } from "react";
// import { Button, Input, Select } from "@mantine/core";

// const DonationForm = () => {
//   const [donations, setDonations] = useState([{ amount: "", category: "" }]);
//   const [totalDonation, setTotalDonation] = useState(0);

//   const addDonation = () => {
//     const newDonations = [...donations];
//     newDonations.push({ amount: "", category: "" });
//     setDonations(newDonations);
//   };

//   const updateDonation = (index, field, value) => {
//     const newDonations = [...donations];
//     newDonations[index][field] = value;
//     setDonations(newDonations);
//   };

//   const validateAndAdd = (index) => {
//     const donation = donations[index];
//     if (donation.amount && donation.category) {
//       const newTotal = totalDonation + Number(donation.amount);
//       setTotalDonation(newTotal);
//       addDonation();
//     }
//   };

//   return (
//     <div>
//       {donations.map((donation, index) => (
//         <div key={index}>
//           <Input
//             placeholder="Amount"
//             type="number"
//             value={donation.amount}
//             onChange={(event) =>
//               updateDonation(index, "amount", event.target.value)
//             }
//           />
//           <Select
//             placeholder="Category"
//             data={["Category A", "Category B", "Category C"]}
//             value={donation.category}
//             onChange={(value) => updateDonation(index, "category", value)}
//           />
//           <Button onClick={() => validateAndAdd(index)}>Add Donation</Button>
//         </div>
//       ))}
//       <p>Total Donation: {totalDonation}</p>
//     </div>
//   );
// };

// export default DonationForm;
