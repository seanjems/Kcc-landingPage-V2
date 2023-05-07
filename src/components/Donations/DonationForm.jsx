import React, { useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import "./DonationForm.css";
import css from "./../Footer/Footer.module.scss";
import { IconX } from "@tabler/icons";
import CustomSelect from "./CustomeSelect";
import mobileMoney from "../../assets/images/mtnairtel.png";
import Paypal from "../../assets/images/paypal.png";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import {
  BiArrowFromRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import PayPalForm from "./PayPalForm";

const categories = ["Tithes", "Offerings", "Missions", "Building Fund"];

function DonationForm() {
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState("UGX");
  const [mobileMoneyPay, setMobileMoneyPay] = useState(false);
  const [isValidAddDonation, setIsValidAddDonation] = useState(true);

  const [donations, setDonations] = useState([
    { amount: "", category: "Donation/LCB", id: 1 },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const validateAddDonation = () => {
    for (const cartItem of donations) {
      if (
        parseInt(cartItem.amount) <= 0 ||
        cartItem.category === "" ||
        isNaN(parseInt(cartItem.amount))
      ) {
        return false;
      }
    }
    setIsValidAddDonation(true);
    return true;
  };

  const handleInitiateTransaction = () => {};
  const handleAddDonation = () => {
    //check if all donations filled
    let validationCheck = validateAddDonation();
    setIsValidAddDonation(validationCheck);
    if (!validationCheck) return;
    const newDonation = {
      amount: "",
      category: "",
      id: donations.length,
    };
    setDonations([...donations, newDonation]);
  };
  const handleDeleteItem = (idx) => {
    const newDonations = [...donations];
    const itemOff = newDonations[idx];
    const removed = newDonations.filter((item) => {
      return item.category != itemOff.category;
    });

    setDonations(removed);
  };
  const handleDonate = (index, amount, category) => {
    const newDonations = [...donations];

    newDonations[index] = { amount: amount, category: category, id: index };
    setDonations(newDonations);
  };
  useEffect(() => {
    if (donations.length == 0) {
      handleAddDonation();
    }
    const newTotal = donations.reduce(
      (sum, donation) => sum + (isNaN(donation.amount) ? 0 : donation.amount),
      0
    );
    setTotal(newTotal ?? 0);
    validateAddDonation();
  }, [donations]);
  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <div className={`paddings outer-coainer-main ${css.wrapper}`}>
      <div className="outer-container ">
        <div className="d-flex justify-content-between m-2">
          <span>
            <b>Give</b>
          </span>
          <div>
            <span>Currency</span>
            {"  "}
            <select onChange={(e) => setCurrency(e.target.value)}>
              <option value="UGX" default>
                UGX
              </option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        {donations.map((donation, index) => (
          <DonationItem
            key={donation.id}
            donation={donation}
            donationsList={donations}
            index={index}
            handledelete={handleDeleteItem}
            onDonate={(index, amount, category) =>
              handleDonate(index, amount, category)
            }
          />
        ))}
        <br />
        {!isValidAddDonation && (
          <Text color={"red"} fontSize={"small"}>
            Invalid amount or category
          </Text>
        )}
        <div className="total-section ">
          <div className="totalsSection">
            Total: {currency} {total.toLocaleString("en-US")}
          </div>
          <span className="btn-add-donation" onClick={handleAddDonation}>
            <IconPlus size="1rem" /> <span>Add Donation</span>
          </span>
        </div>
        <br />
        <br />
        {/* <div className="mobileMoneySection">
          <div
            onClick={() => setMobileMoneyPay(!mobileMoneyPay)}
            className="paymentButton"
          >
            <img
              src={mobileMoney}
              style={{
                border: "0.5px solid grey",
                borderRadius: "3px",
                width: "3.5rem",
                objectFit: "contain",
                marginRight: "-5px",
              }}
              alt=""
            />

            <span>Pay with Mtn Momo|Airtel money</span>
          </div>

          <button className="paypal ">
            <span>Visa|MasterCard</span>
            <img
              src={Paypal}
              style={{
                border: "0.5px solid grey",
                borderRadius: "3px",
                width: "3.5rem",
                height: "85%",
                objectFit: "contain",
                marginLeft: "-5px",
              }}
              alt=""
            />{" "}
          </button>
        </div> */}
        <PaymentModule
          total={total}
          handleInitiateTransaction={handleInitiateTransaction}
        />
        {mobileMoneyPay && (
          <div>
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
        )}
      </div>
    </div>
  );
}

function DonationItem({
  donation,
  onDonate,
  index,
  handledelete,
  donationsList,
}) {
  const [amountLocal, setAmountLocal] = useState(donation.amount);
  const [categoryLocal, setCategoryLocal] = useState(donation.category);

  const handleDonate = () => {
    onDonate(index, amountLocal, categoryLocal);
  };

  useEffect(() => {
    handleDonate();
  }, [amountLocal, categoryLocal]);

  const handleInitiateTransaction = () => {};
  return (
    <>
      <div className="donation-item">
        <TextInput
          type="number"
          value={amountLocal}
          placeholder="0.00"
          onChange={(event) => setAmountLocal(parseFloat(event.target.value))}
        />

        <CustomSelect
          setCategoryState={setCategoryLocal}
          donationsList={donationsList}
          donation={donation}
        />
        <div
          className="m-2"
          style={{ cursor: "pointer" }}
          onClick={() => handledelete(index)}
        >
          <IconX color="hsl(1, 83%, 62%)" />
        </div>
      </div>
    </>
  );
}

export default DonationForm;

const PayWithMomoForm = ({
  handleCancel,
  handleInitiateTransaction,
  total,
  currency,
}) => {
  const [initiateValidation, setInitiateValidation] = useState(true);
  const [onBlur, setOnBlur] = useState(false);
  const [initiateValidationObj, setInitiateValidationObj] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    processingCovered: false,
  });

  console.log(
    "🚀 ~ file: DonationForm.jsx:265 ~ PayWithMomoForm ~ initiateValidationObj:",
    initiateValidationObj
  );
  const validatePhoneNumber = (phoneNumber) => {
    console.log(
      "🚀 ~ file: DonationForm.jsx:270 ~ validatePhoneNumber ~ phoneNumber:",
      phoneNumber
    );

    const ugandaPhoneNumberPattern =
      /^(\+256|0)(7[0123456789]|3[1]|2[0])\d{7}$/;
    return ugandaPhoneNumberPattern.test(phoneNumber);
  };
  useEffect(() => {
    if (onBlur) {
      validateUserDetails();
    }
  }, [initiateValidationObj]);
  const validateUserDetails = () => {
    if (
      !initiateValidationObj?.firstName?.trim() ||
      !initiateValidationObj?.lastName?.trim()
    ) {
      console.log("names failing");
      setInitiateValidation(false);
      return false;
    }

    if (!validatePhoneNumber("0" + initiateValidationObj?.phoneNumber)) {
      setInitiateValidation(false);
      return false;
    }
    setInitiateValidation(true);
    console.log(
      "🚀 ~ file: DonationForm.jsx:303 ~ validateUserDetails ~ true:",
      true
    );

    return true;
  };
  return (
    <>
      <Box className="placeholder-gray">
        <Box
          backgroundColor="#e9ecef"
          rounded={"0.3rem"}
          overflow={"clip"}
          padding={"0.5rem"}
          my="1rem"
        >
          <Flex align="center" justify="space-between" mb="1.5rem" pr="1rem">
            <Flex gap="1rem" align={"center"}>
              <Image src={mobileMoney} alt="" width="1.5rem" rounded={"5px"} />
              <span>Pay with Mtn Momo | Airtel money</span>
            </Flex>
            <Flex
              align="center"
              cursor={"pointer"}
              onClick={() => handleCancel()}
            >
              <BiChevronLeft size={"1rem"} color="grey" />
              <span style={{ fontSize: "0.7rem" }}>Cancel</span>
            </Flex>
          </Flex>
          <>
            <Box ml="3rem">
              {!initiateValidation && (
                <Box color={"red"} fontSize={"small"} mb={"0.5rem"}>
                  Invalid name or Phone number
                </Box>
              )}
              <Flex>
                <FormControl mr="5%">
                  {/* <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                    First name
                  </FormLabel> */}
                  <Input
                    id="first-name"
                    placeholder="First name"
                    backgroundColor="white"
                    onBlur={() => setOnBlur(onBlur)}
                    onChange={(e) => {
                      setInitiateValidationObj({
                        ...initiateValidationObj,
                        firstName: e.target.value,
                      });
                    }}
                    border={
                      !initiateValidation && !initiateValidationObj?.firstName
                        ? "solid 1px red"
                        : "none"
                    }
                  />
                </FormControl>

                <FormControl>
                  {/* <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                    Last name
                  </FormLabel> */}
                  <Input
                    id="last-name"
                    placeholder="Last name"
                    backgroundColor="white"
                    placeholderTextColor="blue"
                    onBlur={() => setOnBlur(onBlur)}
                    border={
                      !initiateValidation && !initiateValidationObj?.lastName
                        ? "solid 1px red"
                        : "none"
                    }
                    onChange={(e) => {
                      setInitiateValidationObj({
                        ...initiateValidationObj,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              </Flex>
              <Flex my="5px">
                <Select background="white">
                  <option value="">Select Church Family (Optional)</option>

                  <option value="Asher Family">Asher Family</option>
                  <option value="Benjamin	Family">Benjamin Family</option>
                  <option value="Dan	Family">Dan Family</option>
                  <option value="Gad	Family">Gad Family</option>
                  <option value="Issachar	Family">Issachar Family</option>
                  <option value="Jacob	Family">Jacob Family</option>
                  <option value="Joseph	Family">Joseph Family</option>
                  <option value="Judah	Family">Judah Family</option>
                  <option value="Levi	Family">Levi Family</option>
                  <option value="Naphtali	Family">Naphtali Family</option>
                  <option value="Reuben	Family">Reuben Family</option>
                  <option value="Simeon	Family">Simeon Family</option>
                  <option value="Zebulon	Family">Zebulon Family</option>
                </Select>
              </Flex>
              <FormControl mt="2%">
                <Flex gap="5px">
                  <Select width="30%" background="white">
                    <option value="256">+256</option>
                  </Select>
                  <Input
                    id="number"
                    type="number"
                    placeholder="772 123 456"
                    backgroundColor="white"
                    border={
                      !initiateValidation &&
                      !validatePhoneNumber(
                        "0" + initiateValidationObj?.phoneNumber
                      )
                        ? "solid 1px red"
                        : "none"
                    }
                    onBlur={() => setOnBlur(onBlur)}
                    onChange={(e) => {
                      setInitiateValidationObj({
                        ...initiateValidationObj,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <FormHelperText fontSize="small" color="grey">
                  We'll never share your Contacts.
                </FormHelperText>
              </FormControl>
              <FormControl
                py="2rem"
                display="flex"
                alignItems="center"
                gap="0.5rem"
                fontSize="smaller"
                fontWeight="bold"
                ml="-1.5rem"
                onClick={() =>
                  setInitiateValidationObj((x) => !x.processingCovered)
                }
              >
                <Checkbox backgroundColor="white" />{" "}
                <span>
                  {" "}
                  Add <span>
                    UGX {(total * 0.025).toLocaleString("en-US")}
                  </span>{" "}
                  to cover processing fee.{" (Optional)"}
                </span>
              </FormControl>
              <Box w={"100%"}>
                <Button
                  rounded="5rem"
                  width={"100%"}
                  background="linear-gradient(to right, red, yellow)"
                  color="white"
                  border="solid 2px gray"
                  _hover={{
                    background: "linear-gradient(to right, yellow, red)",
                  }}
                  onClick={() => {
                    if (validateUserDetails()) {
                      handleInitiateTransaction(initiateValidationObj);
                    }
                  }}
                >
                  Initiate Transaction
                </Button>
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </>
  );
};
const PayWithPaypalCardForm = ({ handleCancel }) => {
  return (
    <>
      <Box>
        <Box
          backgroundColor="#e9ecef"
          rounded={"0.3rem"}
          overflow={"clip"}
          padding={"0.5rem"}
          my="1rem"
        >
          <Flex align="center" justify="space-between" mb="1.5rem" pr="1rem">
            <Flex gap="1rem" align={"center"}>
              <Image src={Paypal} alt="" width="1.5rem" rounded={"5px"} />
              <span>Pay with Visa | MasterCard</span>
            </Flex>
            <Flex
              align="center"
              cursor={"pointer"}
              onClick={() => handleCancel()}
            >
              <BiChevronLeft size={"1rem"} color="grey" />
              <span style={{ fontSize: "0.7rem" }}>Cancel</span>
            </Flex>
          </Flex>
          <>
            <Box ml="3rem">
              <Flex>
                <FormControl mr="5%">
                  <Input
                    id="first-name"
                    placeholder="First name"
                    backgroundColor="white"
                  />
                </FormControl>

                <FormControl>
                  <Input
                    id="last-name"
                    placeholder="First name"
                    backgroundColor="white"
                  />
                </FormControl>
              </Flex>
              <Flex my="5px">
                <Select background="white">
                  <option value="">Select Church Family (Optional)</option>

                  <option value="Asher Family">Asher Family</option>
                  <option value="Benjamin	Family">Benjamin Family</option>
                  <option value="Dan	Family">Dan Family</option>
                  <option value="Gad	Family">Gad Family</option>
                  <option value="Issachar	Family">Issachar Family</option>
                  <option value="Jacob	Family">Jacob Family</option>
                  <option value="Joseph	Family">Joseph Family</option>
                  <option value="Judah	Family">Judah Family</option>
                  <option value="Levi	Family">Levi Family</option>
                  <option value="Naphtali	Family">Naphtali Family</option>
                  <option value="Reuben	Family">Reuben Family</option>
                  <option value="Simeon	Family">Simeon Family</option>
                  <option value="Zebulon	Family">Zebulon Family</option>
                </Select>
              </Flex>
              <FormControl mt="2%">
                <Flex gap="5px">
                  <Input
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    backgroundColor="white"
                  />
                </Flex>
                <FormHelperText fontSize="small" color="grey">
                  We'll never share your email.
                </FormHelperText>
              </FormControl>
              <FormControl
                py="2rem"
                display="flex"
                alignItems="center"
                gap="0.5rem"
                fontSize="smaller"
                fontWeight="bold"
                ml="-1.5rem"
              >
                <Checkbox backgroundColor="white" />{" "}
                <span>
                  {" "}
                  Add <span>1200</span> to cover processing fee.{" (Optional)"}
                </span>
              </FormControl>
              <Box justifyContent="center" mb="1rem" width="100%">
                <PayPalForm fundingSource="card" />
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </>
  );
};
const PayWithPaypalForm = ({ handleCancel }) => {
  return (
    <>
      <Box>
        <Box
          backgroundColor="#e9ecef"
          rounded={"0.3rem"}
          overflow={"clip"}
          padding={"0.5rem"}
          my="1rem"
        >
          <Flex align="center" justify="space-between" mb="1.5rem" pr="1rem">
            <Flex gap="1rem" align={"center"}>
              <Image src={Paypal} alt="" width="1.5rem" rounded={"5px"} />
              <span>Pay with Paypal</span>
            </Flex>
            <Flex
              align="center"
              cursor={"pointer"}
              onClick={() => handleCancel()}
            >
              <BiChevronLeft size={"1rem"} color="grey" />
              <span style={{ fontSize: "0.7rem" }}>Cancel</span>
            </Flex>
          </Flex>
          <>
            <Box ml="3rem">
              <Flex>
                <FormControl mr="5%">
                  <Input
                    id="first-name"
                    placeholder="First name"
                    backgroundColor="white"
                  />
                </FormControl>

                <FormControl>
                  <Input
                    id="last-name"
                    placeholder="First name"
                    backgroundColor="white"
                  />
                </FormControl>
              </Flex>
              <Flex my="5px">
                <Select background="white">
                  <option value="">Select Church Family (Optional)</option>

                  <option value="Asher Family">Asher Family</option>
                  <option value="Benjamin	Family">Benjamin Family</option>
                  <option value="Dan	Family">Dan Family</option>
                  <option value="Gad	Family">Gad Family</option>
                  <option value="Issachar	Family">Issachar Family</option>
                  <option value="Jacob	Family">Jacob Family</option>
                  <option value="Joseph	Family">Joseph Family</option>
                  <option value="Judah	Family">Judah Family</option>
                  <option value="Levi	Family">Levi Family</option>
                  <option value="Naphtali	Family">Naphtali Family</option>
                  <option value="Reuben	Family">Reuben Family</option>
                  <option value="Simeon	Family">Simeon Family</option>
                  <option value="Zebulon	Family">Zebulon Family</option>
                </Select>
              </Flex>
              <FormControl mt="2%">
                <Flex gap="5px">
                  <Input
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    backgroundColor="white"
                  />
                </Flex>
                <FormHelperText fontSize="small" color="grey">
                  We'll never share your email.
                </FormHelperText>
              </FormControl>
              <FormControl
                py="2rem"
                display="flex"
                alignItems="center"
                gap="0.5rem"
                fontSize="smaller"
                fontWeight="bold"
                ml="-1.5rem"
              >
                <Checkbox backgroundColor="white" />{" "}
                <span>
                  {" "}
                  Add <span>1200</span> to cover processing fee.{" (Optional)"}
                </span>
              </FormControl>
              <Box justifyContent="center" mb="1rem" width="100%">
                <PayPalForm fundingSource="paypal" />
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </>
  );
};
const PaymentModule = ({ total, handleInitiateTransaction, currency }) => {
  const [isPaymentSelection, setIsPaymentSelection] = useState(true);
  const [lowTotalValidation, setLowTotalValidation] = useState(false);
  const [activePaymentMode, setActivePaymentMode] = useState();

  const handleCancel = () => {
    setIsPaymentSelection(true);
  };
  return (
    <>
      <Text fontWeight={"bold"} my={"1.5rem"}>
        Select payment method
      </Text>
      {isPaymentSelection && (
        <>
          {lowTotalValidation && (
            <Text color="red">Total Amount to pay can not be zero</Text>
          )}
          <Box
            backgroundColor="#e9ecef"
            rounded={"0.3rem"}
            overflow={"clip"}
            padding={"0.5rem"}
            onClick={() => {
              if (total > 1) {
                setLowTotalValidation(false);
                setActivePaymentMode(1);
                setIsPaymentSelection(false);
              } else {
                setLowTotalValidation(true);
              }
            }}
          >
            <Flex align="center" justify="space-between" cursor="pointer">
              <Flex gap="1rem" align={"center"}>
                <Image src={mobileMoney} alt="" width="3rem" rounded={"5px"} />
                <Text mt={"1rem"}>Pay with Mtn Momo | Airtel money</Text>
              </Flex>
              <BiChevronRight size={"2.5rem"} color="grey" />
            </Flex>
          </Box>
        </>
      )}
      {isPaymentSelection && (
        <Box
          backgroundColor="#e9ecef"
          rounded={"0.3rem"}
          overflow={"clip"}
          padding={"0.5rem"}
          onClick={() => {
            if (total > 1) {
              setLowTotalValidation(false);
              setActivePaymentMode(2);
              setIsPaymentSelection(false);
            } else {
              setLowTotalValidation(true);
            }
          }}
          mt="1rem"
        >
          <Flex align="center" justify="space-between" cursor="pointer">
            <Flex gap="1rem" align={"center"}>
              <Image src="/card.jpg" alt="" width="3rem" rounded={"5px"} />
              <Text mt={"1rem"}>Pay with Visa | MasterCard</Text>
            </Flex>
            <BiChevronRight size={"2.5rem"} color="grey" />
          </Flex>
        </Box>
      )}
      {isPaymentSelection && (
        <Box
          backgroundColor="#e9ecef"
          rounded={"0.3rem"}
          overflow={"clip"}
          padding={"0.5rem"}
          onClick={() => {
            if (total > 1) {
              setLowTotalValidation(false);
              setActivePaymentMode(3);
              setIsPaymentSelection(false);
            } else {
              setLowTotalValidation(true);
            }
          }}
          mt="1rem"
        >
          <Flex align="center" justify="space-between" cursor="pointer">
            <Flex gap="1rem" align={"center"}>
              <Image src={Paypal} alt="" width="3rem" rounded={"5px"} />
              <Text mt={"1rem"}>Pay with Visa | MasterCard | Paypal</Text>
            </Flex>
            <BiChevronRight size={"2.5rem"} color="grey" />
          </Flex>
        </Box>
      )}
      {!isPaymentSelection && activePaymentMode === 1 && (
        <PayWithMomoForm
          handleCancel={handleCancel}
          handleInitiateTransaction={handleInitiateTransaction}
          total={total}
          currency={currency}
        />
      )}
      {!isPaymentSelection && activePaymentMode === 2 && (
        <PayWithPaypalCardForm handleCancel={handleCancel} />
      )}
      {!isPaymentSelection && activePaymentMode === 3 && (
        <PayWithPaypalForm handleCancel={handleCancel} />
      )}
    </>
  );
};
