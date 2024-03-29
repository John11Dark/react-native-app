import * as Yup from "yup";
import { Styles } from "../../../config";
import localites from "../../../assets/Data/localites";
import availablePackages from "../../../assets/Data/availablePackages";
// Variables
const initialValues = {
  email: "",
  countryCode: "+356",
  clientPhoneNumber: "",
  site: "",
  clientFirstName: "",
  clientLastName: "",
  clientAddressStreetOne: "",
  clientAddressStreetTwo: "",
  clientAddressLocality: "",
  description: "",
  indoor: false,
  mosaicOrTile: true,
  poolSteps: false,
  poolLeaking: false,
  status: false,
  images: [],
  // option pickers
  projectType: null,
  poolType: null,
  poolLocation: null,
  optionalPackages: [],
  // number of options
  numberOfWallInlets: "",
  numberOfSkimmers: "",
  numberOfSumps: "",
  numberOfLights: "",
  spaJets: "",
  counterCurrent: "",
  vacuumPoints: "",
};

const validationSchema = Yup.object().shape({
  description: Yup.string().notRequired().label("Description"),
  images: Yup.array()
    .min(1, "Please select at least on image")
    .max(3, "The maximum is three images"),
  optionalPackages: Yup.array().notRequired().label("Options"),
  numberOfWallInlets: Yup.number().notRequired().label("Number of Wall Inlets"),
  numberOfSkimmers: Yup.number().notRequired().label("Number of Skimmers"),
  numberOfSumps: Yup.number().notRequired().label("Number of Sumps"),
  numberOfLights: Yup.number().notRequired().label("Number of Lights"),
  spaJets: Yup.number().notRequired().label("Spa Jets"),
  counterCurrent: Yup.number().notRequired().label("Counter Current"),
  vacuumPoints: Yup.number().notRequired().label("Vacuum Points"),
});

const projectTypeOptions = [
  {
    label: "Pool",
    value: 0,
    icon: "pool",
    backgroundColor: "#BEB3AD",
  },
  { label: "Spa", value: 1, icon: "spa", backgroundColor: "#55bbda" },
  {
    label: "Well",
    value: 2,
    icon: "apps",
    backgroundColor: "#ea552b",
  },
  {
    label: "Other",
    name: "Other",
    value: 3,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];

const tileOptions = [
  {
    label: "Mosaic",
    value: 0,
    icon: "overscan",
    backgroundColor: "#ea552b",
  },
  {
    label: "Tile",
    value: 1,
    icon: "align-vertical-bottom",
    backgroundColor: "#55bbda",
  },
  {
    label: "Liner",
    value: 2,
    icon: "update",
    backgroundColor: "#B5C273",
  },

  {
    label: "Other",
    value: 3,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];

const poolLocationOptions = [
  {
    label: "in-Ground",
    value: 0,
    icon: "floor-plan",
    backgroundColor: "#55bbda",
  },
  {
    label: "RoofTop",
    value: 1,
    icon: "home-roof",
    backgroundColor: "#ea552b",
  },
  {
    label: "AboveGround",
    value: 2,
    icon: "grass",
    backgroundColor: "#B5C273",
  },
  {
    label: "Other",
    name: "Other",
    value: 3,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];

export default {
  validationSchema,
  projectTypeOptions,
  poolLocationOptions,
  tileOptions,
  initialValues,
  Styles,
  localites,
  availablePackages,
};
