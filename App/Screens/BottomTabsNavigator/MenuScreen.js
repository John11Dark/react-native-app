import useAuth from "../../hooks/useAuth";
import customProps from "../../config/customProps";
import routes from "../../Navigation/routes";
import {
  AuthorComponent,
  GridContainer,
  Icon,
  ListItem,
  PrimaryButton,
  Wrapper,
} from "../../components";

export default function MenuScreen({ navigation }) {
  const gridMenuItems = [
    {
      title: "My Profile",
      icon: {
        name: "account",
        backgroundColor: customProps.primaryColor,
      },
      targetScreen: routes.PROFILE,
      colors: ["#30496B", "#30B8D2"],
    },
    {
      title: "My Messages",
      icon: {
        name: "message",
        backgroundColor: customProps.secondaryColor,
      },
      targetScreen: routes.MESSAGES,
      colors: ["#27A47C", "#6FE594"],
    },
    {
      title: "My Listing",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: customProps.TertiaryColor,
      },
      targetScreen: routes.USER_LISTINGS,
      colors: ["#6155D4", "#5B97F2"],
      data: { userListings: true },
    },
    {
      title: "settings",
      icon: {
        name: "cog",
        backgroundColor: customProps.secondaryColor,
      },
      targetScreen: routes.SETTINGS,

      colors: ["#8D8AFC", "#97F7FB"],
    },
  ];

  const menuItems = [
    {
      title: "Images",
      icon: {
        name: "folder-multiple-image",
        backgroundColor: "#FF9966",
      },
      targetScreen: routes.IMAGES,
      colors: ["#FBCA88", "#EF69AD"],
    },
    {
      title: "Items",
      icon: {
        name: "package",
        backgroundColor: "#9966CC",
      },
      targetScreen: routes.ITEMS,
      colors: ["#FBCA88", "#EF69AD"],
    },
    {
      title: "Recycle Bin",
      icon: {
        name: "delete-restore",
        backgroundColor: customProps.importantIconColor,
      },
      targetScreen: routes.RECYCLE,
      colors: ["#e92f2f", "#e18989"],
    },
    {
      title: "Archived",
      icon: {
        name: "archive",
        backgroundColor: customProps.primaryColorLightGray,
      },
      targetScreen: routes.ARCHIVED,
      colors: ["#97F7FB", "#8D8AFC"],
      data: { userArchivedListings: false },
    },
    {
      title: "About",
      icon: {
        name: "information-outline",
        backgroundColor: "#B5C273",
      },
      targetScreen: routes.ABOUT,
      colors: ["#e92f2f", "#e18989"],
    },
    {
      title: "Help",
      icon: {
        name: "help-box",
        backgroundColor: customProps.primaryColorLightGray,
      },
      targetScreen: routes.HELP,
      colors: ["#e92f2f", "#e18989"],
    },
  ];
  const { user, logout } = useAuth();

  return (
    <Wrapper scrollBarVisible={false}>
      <AuthorComponent
        imagePath={{
          uri:
            user?.image[0].url != null
              ? user.image[0].url
              : "http://10.10.10.106:9000/assets/femaleAvatar_full.jpg",
        }}
        title={user.name}
        subTitle={user.role}
        onPress={() => navigation.navigate(routes.PROFILE)}
      />
      <GridContainer items={gridMenuItems} label={"Recent"} />

      {user.role.toLowerCase() === "administrator" && (
        <ListItem
          IconComponent={
            <Icon
              name={"account-group"}
              backgroundColor={customProps.primaryColor}
              disabled
            />
          }
          onPress={() => navigation.navigate(routes.USERS)}
          title={"Users"}
          style={{
            container: {
              width: "95%",
              backgroundColor: customProps.darkOpacity,
              marginVertical: 5,
            },
          }}
        />
      )}

      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          title={item.title}
          IconComponent={
            <Icon
              backgroundColor={item.icon.backgroundColor}
              name={item.icon.name}
              disabled
            />
          }
          style={{
            container: {
              width: "95%",
              backgroundColor: customProps.darkOpacity,
              marginVertical: 5,
            },
          }}
          onPress={() => navigation.navigate(item.targetScreen, item?.date)}
        />
      ))}
      <PrimaryButton
        handlePress={() => logout()}
        iconName="logout"
        title={"Logout"}
        style={{
          marginVertical: 40,
          backgroundColor: customProps.importantIconColor,
          borderRadius: 50,
        }}
      />
    </Wrapper>
  );
}
