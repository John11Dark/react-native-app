// ? * --> Third parties dependencies
import React, { useState } from "react";

// ? * --> custom dependencies
import { customProps } from "../../../config";
import {
  ListItem,
  Icon,
  ScrollerView,
  DetailsContainer,
  Container,
  ButtonsList,
} from "../../../components";
import { useAuth } from "../../../hooks";

// ? * --> mainStack
export default function ListingDetails({ route }) {
  // ? * -->  variables

  const values = route.params;

  // ? * -->  States
  const [visible, setVisible] = useState(false);

  // ? * --> Hooks
  const { user } = useAuth();
  return (
    <ScrollerView title={values.site} imageUri={values.images[0].url}>
      {/* navigation container  */}
      <ButtonsList values={values} user={user} />
      {/* Quotation details area */}
      <Container title={"Quotation details"}>
        <DetailsContainer label={"Id"} value={values.id} />
        <DetailsContainer label={"Site"} value={values.site} />
        <DetailsContainer
          label={"Quotation Type"}
          value={values.newPool ? "New pool" : "Refurbishment Pool"}
        />
        <DetailsContainer
          label={"Pool Type"}
          value={values.poolType ? "Skimmer pool" : "Overflow Pool"}
        />
        <DetailsContainer label={"Created at"} value={values.initialDate} />
        <DetailsContainer label={"Created by"} value={values.user.name} />
        <DetailsContainer
          user={values.user}
          label={"Selected Package"}
          value={values.selectedPackage?.label}
        />
        <DetailsContainer
          user={values.user}
          label={"Price"}
          value={values?.finalPrice}
        />
        <DetailsContainer label={"Extra remarks"} value={values.description} />
        <DetailsContainer
          checkBox={values.status}
          label={"Status"}
          value={values?.status ? "Completed" : "in progress"}
        />
      </Container>
      {/*  */}
      <Container title={"Client details"} icon={"account"}>
        <DetailsContainer label={"First name"} value={values.clientFirstName} />
        <DetailsContainer label={"Last name"} value={values.clientLastName} />
        <DetailsContainer
          link={{
            title: values.email,
            type: "mailto:",
            url: `mailto:${values.email}`,
            canCopy: true,
          }}
          label={"Email"}
          value={values.email}
        />
        <DetailsContainer
          link={{
            title: "+356 79230096",
            type: "tel:",
            url: `tel:${values.countryCode}${values.clientPhoneNumber}`,
            canCopy: true,
          }}
          label={"Phone Number"}
          value={values.countryCode + " " + values.clientPhoneNumber}
        />
      </Container>
      {/*  */}
      <Container
        title={"Address"}
        icon="map"
        map
        pin={values.address.location}
        locationTitle={values.site}
        visible={visible}
      >
        <DetailsContainer label={"Locality"} value={values.address.locality} />
        <DetailsContainer
          label={"Line One"}
          value={values.address.streetLineOne}
        />
        {values?.streetLineTwo && (
          <DetailsContainer
            label={"Line Two"}
            value={values.address.streetLineTwo}
          />
        )}
        <DetailsContainer
          IconComponent={
            <Icon
              iconColor={customProps.secondaryColor}
              name={visible ? "arrow-up-drop-circle" : "arrow-down-drop-circle"}
              onPress={() => setVisible(!visible)}
            />
          }
          label={"Location"}
          value={
            values.address.location.latitude +
            " , " +
            values.address.location.longitude
          }
          link={{
            type: "location:",
            url: `http://www.google.com/maps/place/${values.address.location.latitude},${values.address.location.longitude}`,
            externalUrl: `${values.address.location.latitude},${values.address.location.longitude}`,
            title: "Location on Maps",
          }}
        />
      </Container>
      {/*  */}
      <Container title={"Pool required Options"} icon={"account"}>
        {/* // TODO:  */}
        <DetailsContainer
          checkBox={values.indoor}
          label={"Indoor"}
          value={values.indoor ? "Yes" : "No"}
        />
        <DetailsContainer
          checkBox={values.poolSteps}
          label={"Pool steps"}
          value={values.poolSteps ? "Yes" : "No"}
        />

        {!values.poolType && (
          <DetailsContainer
            checkBox={values.poolLeaking}
            label={"Pool leaking"}
            value={values.poolLeaking ? "Yes" : "No"}
          />
        )}
        {values.newPool && (
          <>
            <DetailsContainer
              checkBox={values.extraLights}
              label={"extraLights"}
              value={values.extraLights ? "Yes" : "No"}
            />
            <DetailsContainer
              checkBox={values.whiteGoodsOnly}
              label={"whiteGoodsOnly"}
              value={values.whiteGoodsOnly ? "Yes" : "No"}
            />
            <DetailsContainer
              checkBox={values.extra}
              label={"extra"}
              value={values.extra ? "Yes" : "no"}
            />
          </>
        )}
      </Container>
      {/*  */}
      <Container
        title={`${values.poolType ? "Skimmer" : "Overflow"} Pool Perimeters`}
        icon={"numeric"}
      >
        <DetailsContainer
          label={"Length"}
          number
          value={` ${values.poolLength} mm`}
        />
        <DetailsContainer
          label={"Width"}
          number
          value={` ${values.poolWidth} mm`}
        />
        <DetailsContainer
          label={"Depth Start"}
          number
          value={` ${values.poolDepthStart} mm`}
        />
        <DetailsContainer
          label={"Depth End "}
          number
          value={` ${values.poolDepthEnd} mm`}
        />
        <DetailsContainer
          label={"Average Depth"}
          number
          value={` ${
            (parseFloat(values.poolDepthEnd) +
              parseFloat(values.poolDepthStart)) /
            2.0
          } mm`}
        />
        <DetailsContainer
          label={"Volume"}
          number
          value={` ${values.poolVolume} mm`}
        />
      </Container>
      {/*  */}
      {!values.poolType && (
        <Container
          title={"Balance Tank Perimeters"}
          icon={"align-horizontal-distribute"}
        >
          <DetailsContainer
            label={"Length"}
            number
            value={` ${values.balanceLength} mm`}
          />
          <DetailsContainer
            label={"Width"}
            number
            value={` ${values.balanceTankWidth} mm`}
          />
          <DetailsContainer
            label={"Depth"}
            number
            value={` ${values.balanceTankDepth} mm`}
          />
          <DetailsContainer
            label={"Volume"}
            number
            value={` ${values.balanceTankVolume} mm`}
          />
        </Container>
      )}
      {/*  */}
      {values.extraOptions && (
        <Container title={"Extra Options"} icon={"format-list-numbered"}>
          {values.numberOfWallInlets && (
            <DetailsContainer
              label={"Number of Wall Inlets"}
              value={values.numberOfWallInlets}
            />
          )}
          {values.numberOfSkimmers && (
            <DetailsContainer
              label={"Number of Skimmers"}
              value={values.numberOfSkimmers}
            />
          )}
          {values.numberOfSumps && (
            <DetailsContainer
              label={"Number of Sumps"}
              value={values.numberOfSumps}
            />
          )}
          {values.numberOfLights && (
            <DetailsContainer
              label={"Number of Lights"}
              value={values.numberOfLights}
            />
          )}
          {values.spaJets && (
            <DetailsContainer label={"Spa Jets"} value={values.spaJets} />
          )}
          {values.counterCurrent && (
            <DetailsContainer
              label={"Counter Current"}
              value={values.counterCurrent}
            />
          )}
          {values.vacuumPoints && (
            <DetailsContainer
              label={"Vacuum Points"}
              value={values.vacuumPoints}
            />
          )}
        </Container>
      )}
      {/* Created by area */}
      <ListItem
        title={values.user.name}
        subTitle={values.user.role}
        imagePath={values.user.image}
        disabled={true}
        style={{
          container: { width: "90%", backgroundColor: "transparent" },
        }}
      />
    </ScrollerView>
  );
}
