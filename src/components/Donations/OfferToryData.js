import tithe from "../../assets/images/tithe.png";
import Donation from "../../assets/images/Donate.png";
import thanksgiving from "../../assets/images/thanksgiving.jpg";
import construction from "../../assets/images/construction.jpg";
import campexpenses from "../../assets/images/campexpenses.jpg";
import campoffering from "../../assets/images/campOffering.jpg";
import kirekahospital from "../../assets/images/kirekahospital.jpg";
import lugogo from "../../assets/images/lugogo.JPG";
import coperateShow from "../../assets/images/coperateShow.JPG";
import lunch from "../../assets/images/lunch.jpg";
import Welfare from "../../assets/images/welfare.jpg";
import communication from "../../assets/images/communication.jpg";
import others from "../../assets/images/others.jpg";
import lcb from "../../assets/images/localchurchbudget.jpg";

const OffertoryData = [
  // {
  //   id: 13,
  //   image: lugogo,
  //   label: "lugogo",
  //   desc: "Lugogo Show - AOC eTicket",
  //   price: 0,
  // },
  // {
  //   id: 14,
  //   image: coperateShow,
  //   label: "imperial",
  //   desc: "Imperial Royale Show - AOC eTicket",
  //   price: 0,
  // },

  {
    id: 1,
    image: Donation,
    label: "Donation/LCB",
    value: "Donation/LCB",
    description:
      "General Contribution. Will be considered as Local church budget",
    price: 0,
  },
  {
    id: 2,
    image: tithe,
    label: "Tithe (10%)",
    value: "Tithe",
    description:
      "The tithe is the main source of funding for the total proclamation of the gospel to all the world",
    price: 0,
  },
  {
    id: 3,
    image: thanksgiving,
    label: "Thanks Giving",
    value: "Thanks Giving",
    description:
      "Thanks giving means thanks-living. A grateful person will be a happier, healthier, and holier person.",
    price: 0,
  },
  {
    id: 4,
    image: construction,
    label: "Church Construction",
    value: "Church Construction",
    description:
      "Contribute towards the construction of the new SDA Tower for Kampala Central",
    price: 0,
  },
  {
    id: 5,
    image: lunch,
    label: "Lunch",
    value: "Lunch",
    description:
      "Sabbath Lunch contributions. This is based on the church Family.",
    price: 0,
  },

  {
    id: 6,
    image: communication,
    label: "Communication Department",
    value: "Communication Department",
    description:
      "Support media ministry and purchase of Livestreaming equipment and gear.",
    price: 0,
  },
  {
    id: 7,
    image: campexpenses,
    label: "Campmeeting Expenses",
    value: "Campmeeting Expenses",
    description: "Yearly Campmeeting Epenses",
    price: 0,
  },
  {
    id: 8,
    image: campoffering,
    label: "Campmeeting Offering",
    value: "Campmeeting Offering",
    description: "Yearly Campmeeting offering contributions",
    price: 0,
  },

  {
    id: 9,
    image: kirekahospital,
    label: "Kireka Adventist Hospital",
    value: "Kireka Adventist Hospital",
    description: "Contruction of the Adventist hospital at Kireka Hill",
    price: 0,
  },
  {
    id: 10,
    image: others,
    label: "Others",
    description: "Contribute for any other cause and Specify the reason.",
    price: 0,
  },
];

export default OffertoryData;
