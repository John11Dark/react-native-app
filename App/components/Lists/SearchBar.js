import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "../Interface/Icon";
import { customProps } from "../../config";

export default function SearchBar({
  visible = true,
  placeholder = "Search or jump to...",
  icon = "feature-search",
  style = {},
  data = [
    {
      label: "Projects",
      id: 2,
      data: [
        {
          username: "username4",
          site: "name",
          id: 0,
          email: "arasdasasd@mail.com",
        },
        {
          username: "usernameas",
          site: "name",
          id: 1,
          email: "nameas@mail.com",
        },
        {
          username: "username",
          site: "name",
          id: 2,
          email: "atrname@mail.com",
        },
        { username: "anyname", name: "any", id: 3, email: "any@mail.com" },
        {
          username: "John1_1Dark",
          site: "john",
          id: 4,
          email: "John@mail.com",
        },
        {
          username: "randomname",
          site: "random",
          id: 5,
          email: "random@mail.com",
        },
      ],
    },
    {
      label: "Skimmers",
      id: 3,
      data: [
        {
          username: "username4",
          site: "name",
          id: 0,
          email: "arasdasasd@mail.com",
        },
        {
          username: "usernameas",
          name: "name",
          id: 1,
          email: "nameas@mail.com",
        },
        {
          username: "username",
          name: "name",
          id: 2,
          email: "atrname@mail.com",
        },
        { username: "anyname", name: "any", id: 3, email: "any@mail.com" },
        {
          username: "John1_1Dark",
          name: "John",
          id: 4,
          email: "John@mail.com",
        },
        {
          username: "randomname",
          name: "random",
          id: 5,
          email: "random@mail.com",
        },
      ],
    },
    {
      label: "users",
      id: 5,
      data: [
        {
          username: "username4",
          name: "name",
          id: 0,
          email: "arasdasasd@mail.com",
        },
        {
          username: "usernameas",
          name: "name",
          id: 1,
          email: "nameas@mail.com",
        },
        {
          username: "username",
          name: "name",
          id: 2,
          email: "atrname@mail.com",
        },
        { username: "anyname", name: "any", id: 3, email: "any@mail.com" },
        {
          username: "John1_1Dark",
          name: "John",
          id: 4,
          email: "John@mail.com",
        },
        {
          username: "randomname",
          name: "random",
          id: 5,
          email: "random@mail.com",
        },
      ],
    },
  ],
  catagories = [
    {
      label: "all",
      id: 1,
      backgroundColor: "#46A094",
    },
    {
      label: "projects",
      id: 2,
      backgroundColor: "#6BBD99",
    },
    {
      label: "skimmers",
      id: 3,
      backgroundColor: "#AECFA4",
    },
    {
      label: "overflow",
      id: 4,
      backgroundColor: "#C4E8C2",
    },
    {
      label: "users",
      id: 5,
      backgroundColor: "#46A094",
    },
  ],
}) {
  /**
   * Search bar component
   * @param {String} placeholder text input placeholder :defaults to "search..."
   * @param {Boolean} visible determents if the container visible or not :defaults to true
   * @param {String} icon icon name :defaults to "search"
   * @param {Array} categories object of catagories :defaults to empty object to use it must pass a parent object that holds
   * @param {Array} data array of nested arrays that contains multiple  data to search
   * @param {Object} style object of styles :defaults to empty object to use it must pass a parent object that holds
   */

  const [filterVisible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [filterByCategory, setFilterByCategory] = useState({
    label: "All",
    id: 1,
  });
  const [searchResult, setSearchResult] = useState(data);
  async function search() {
    const searchValue = input.trim().toLowerCase();
    if (searchValue.length <= 0) return; // ? * -->  if input length is empty the function going to return immediately

    if (filterByCategory.label === "all") {
      const users = data[2].data.filter((user) => user.name === searchValue);
      const projects = data[0].data.filter(
        (project) => project.site === searchValue
      );
      setSearchResult([
        { label: "projects", data: projects },
        { label: "users", data: users },
      ]);
      console.log(searchResult);
    } else if (filterByCategory.label === "users") {
      setSearchResult(data[2].data.filter((user) => user.name === searchValue));
      console.log(searchResult);
    } else if (filterByCategory.label === "overflow") {
      setSearchResult(data[0].data.filter((user) => user.site === searchValue));
      console.log(searchResult);
    } else if (filterByCategory.label === "skimmers") {
      setSearchResult(data[0].data.filter((user) => user.site === searchValue));
      console.log(searchResult);
    } else if (filterByCategory.label === "projects") {
      setSearchResult(data[0].data.filter((user) => user.site === searchValue));
      console.log(searchResult);
    } else {
      setSearchResult(data);
      console.log("else");
    }
  }
  return (
    // Main Container
    <View style={{ display: visible ? "flex" : "none" }}>
      {/* Search bar and icons container */}
      <View
        style={[
          {
            marginVertical: 10,
            width: "95%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          },
        ]}
      >
        <View
          // *--> Search Bar input container
          style={[styles.container, style.container]}
        >
          <Icon
            name={icon}
            disabled
            backgroundColor={"transparent"}
            style={style.icon}
            iconColor={customProps.primaryColorDarkGray}
            innerSize={25}
            size={35}
          />

          <TextInput
            placeholder={placeholder}
            placeholderTextColor={customProps.primaryColorDarkGray}
            style={[styles.textInput, style.textInput]}
            onChangeText={(value) => setInput(value)}
            returnKeyType={"search"}
            onEndEditing={search}
            value={input}
          />

          <Icon
            name={"close"}
            backgroundColor={customProps.primaryColorDarkGray}
            iconColor={customProps.darkCardBackgroundColor}
            innerSize={15}
            style={{ transform: [{ translateX: -10 }] }}
            size={20}
            visible={input.length > 0 ? true : false}
            onPress={() => setInput("")}
          />
        </View>
        {/* Filter icon */}
        <Icon
          name={filterVisible ? "filter-off" : "filter"}
          backgroundColor="transparent"
          onPress={() => setVisible(!filterVisible)}
          iconColor={customProps.secondaryColor}
          style={{ transform: [{ translateX: -5 }] }}
        />
      </View>
      {/* Filter options */}
      {filterVisible && (
        <ScrollView
          style={styles.filterCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {catagories?.map(({ id, label, backgroundColor }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setFilterByCategory({ id, label });
                }}
                key={id}
                style={[
                  styles.categoryContainer,
                  filterByCategory.id === id && styles.selectedCategory,
                  {
                    backgroundColor:
                      filterByCategory.id === id
                        ? backgroundColor
                        : customProps.primaryColor,
                  },
                ]}
              >
                <Text style={styles.categoryLabel}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    width: "80%",
    height: 55,
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 10,
    alignSelf: "center",
  },
  textInput: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontSize: 20,
    height: "100%",
    width: "80%",
  },
  filterCategories: {
    margin: 10,
    marginTop: 0,
    flexDirection: "row",
    overflow: "hidden",
    width: "88%",
    borderRadius: 25,
  },
  categoryContainer: {
    padding: 7.5,
    paddingHorizontal: 15,
    borderRadius: 25,
    margin: 5,
    marginHorizontal: 10,
    opacity: 0.9,
  },
  selectedCategory: {
    paddingHorizontal: 20,
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  categoryLabel: {
    ...customProps.font,
    fontSize: 20,
    color: customProps.primaryColorLight,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
